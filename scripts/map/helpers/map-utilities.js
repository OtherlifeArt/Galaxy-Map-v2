/**
 * Utilities for leaflet
 */

/*
  Used to reverse x and y coordinates
  because leaflet use (y,x) instead of (x,y)
*/
function xy2latlng (x, y) {
  if (L.Util.isArray(x)) {    // When doing xy([x, y]);
      return L.latLng(x[1], x[0]);
  }
  return L.latLng(y, x);  // When doing xy(x, y);
};

/* Reverse xy2latlng function */
function latlng2xy (latlng) {
  if (L.Util.isArray(latlng)) {    // When doing xy([x, y]);
    return {x: latlng[1], y: latlng[0]};
  }
  return [latlng.lng, latlng.lat];
}

/* List to URL in HTML anchor element*/
function stringListToURL(stringList, UrlText) {
  let urlList = "";
  const arrayList = stringList.split(",");
  for (let index = 0; index < arrayList.length; index++) {
    if(index === 0) {
      urlList += '<a href="'+arrayList[index]+'">'+UrlText+'</a>';
    } else {
      // urlList += ' <a href="'+arrayList[index]+'">(source '+(index+1)+')</a>';
      urlList += ' <a href="'+arrayList[index]+'">('+(index+1)+')</a>';
    }
  }
  return urlList;
}

/* Return full continuity formatted string for object (Canon/Legends/Unlicensed) */
function getContinuityString(properties) {
  let continuity = "";
  if(properties.CANON === "YES") {
    continuity += "Canon";
  }
  if(properties.LEGENDS === "YES") {
    if(continuity !== "") {
      continuity += "/";
    }
    continuity += "Legends";
  }
  if(properties.UNLICENSED === "YES") {
    if(continuity !== "") {
      continuity += "/";
    }
    continuity += "Unlicensed";
  }
  return continuity;
}

/* Return full date formatted string for object */
function getDateString(properties) {
  let dates = "";
  if(properties.DATE_FROM !== "") {
    let dateFrom = parseFloat(properties.DATE_FROM) >= 0 ? `${Math.abs(parseFloat(properties.DATE_FROM))} ABY` : `${Math.abs(parseFloat(properties.DATE_FROM))} BBY`;
    dates += "From " + dateFrom + " ";
  }
  if(properties.DATE_TO !== "") {
    let dateTo = parseFloat(properties.DATE_TO) >= 0 ? `${Math.abs(parseFloat(properties.DATE_TO))} ABY` : `${Math.abs(parseFloat(properties.DATE_TO))} BBY`;
    dates += "To " + dateTo;
  }
  return dates;
}

/**
 * Calculate multiPolygon center coordinates from GeoJSON feature
 * @param {*} feature GeoJSON MultiPolygon
 * @returns LatLng coordinates
 */
function calculateMultiPolygonCenter(feature) {
  if (!feature || feature.geometry.type !== "MultiPolygon") {
      console.error("Feature is not a MultiPolygon.");
      return null;
  }

  const multiPolygon = feature.geometry.coordinates; // Array of Polygons
  let totalArea = 0, centroidX = 0, centroidY = 0;

  // Loop through each polygon in the MultiPolygon
  multiPolygon.forEach(polygon => {
      const outerRing = polygon[0]; // Only the outer ring
      let area = 0, localCentroidX = 0, localCentroidY = 0;

      const numPoints = outerRing.length;

      for (let i = 0; i < numPoints; i++) {
          const x1 = outerRing[i][0]; // Longitude
          const y1 = outerRing[i][1]; // Latitude
          const x2 = outerRing[(i + 1) % numPoints][0];
          const y2 = outerRing[(i + 1) % numPoints][1];

          const a = x1 * y2 - x2 * y1; // Cross product
          area += a;
          localCentroidX += (x1 + x2) * a;
          localCentroidY += (y1 + y2) * a;
      }

      area *= 0.5;
      localCentroidX = localCentroidX / (6 * area);
      localCentroidY = localCentroidY / (6 * area);

      // Add this polygon's contribution to the total centroid
      centroidX += localCentroidX * Math.abs(area);
      centroidY += localCentroidY * Math.abs(area);
      totalArea += Math.abs(area); // Total area for weighted average
  });

  // Calculate the weighted centroid
  centroidX /= totalArea;
  centroidY /= totalArea;

  // Return the centroid as a Leaflet LatLng
  return L.latLng(centroidY, centroidX);
}

/**
 * 
 * @param {*} feature 
 * @returns 
 */
function calculatePointInMultiPolygon(feature) {
  if (!feature || feature.geometry.type !== "MultiPolygon") {
      console.error("Feature is not a MultiPolygon.");
      return null;
  }

  const multiPolygon = feature.geometry.coordinates;

  // Helper function: Check if a point is inside a polygon (including holes)
  function isPointInPolygon(point, polygon) {
      const outerRing = polygon[0]; // Outer boundary
      const innerRings = polygon.slice(1); // Holes

      // Check if the point is inside the outer boundary
      if (!isPointInRing(point, outerRing)) return false;

      // Ensure the point is not in any of the holes
      for (const hole of innerRings) {
          if (isPointInRing(point, hole)) return false;
      }

      return true;
  }

  // Helper function: Check if a point is inside a single ring
  function isPointInRing(point, ring) {
      let [px, py] = point;
      let inside = false;

      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
          const [xi, yi] = ring[i];
          const [xj, yj] = ring[j];

          const intersect = yi > py !== yj > py &&
              px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
          if (intersect) inside = !inside;
      }

      return inside;
  }

  // Loop through all polygons in the MultiPolygon
  for (const polygon of multiPolygon) {
      const outerRing = polygon[0];

      // Use the center of the outer ring's bounding box as a starting point
      const lngs = outerRing.map(coord => coord[0]);
      const lats = outerRing.map(coord => coord[1]);
      const bboxCenter = [
          (Math.min(...lngs) + Math.max(...lngs)) / 2,
          (Math.min(...lats) + Math.max(...lats)) / 2
      ];

      // Check if the bbox center is valid
      if (isPointInPolygon(bboxCenter, polygon)) {
          return L.latLng(bboxCenter[1], bboxCenter[0]); // Return valid point
      }

      // If not, loop through the outer ring's vertices to find a valid point
      for (const vertex of outerRing) {
          if (isPointInPolygon(vertex, polygon)) {
              return L.latLng(vertex[1], vertex[0]);
          }
      }
  }

  console.error("No valid point found inside the MultiPolygon.");
  return null;
}

/**
 * Generate UUID v7
 */
function generateUUIDv7() {
  // from https://gist.github.com/fabiolimace/c0c11c5ea013d4ec54cf6b0d43d366c6
  return 'tttttttt-tttt-7xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.trunc(Math.random() * 16);
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).replace(/^[t]{8}-[t]{4}/, function() {
    const unixtimestamp = Date.now().toString(16).padStart(12, '0');
    return unixtimestamp.slice(0, 8) + '-' + unixtimestamp.slice(8);
  });
}

// Function to calculate midpoint of the middle segment
function getMidpointOfMiddleSegment(multiLineString) {
  const segments = [];
  
  // Collect all segments into an array
  multiLineString.coordinates.forEach(line => {
    for (let i = 0; i < line.length - 1; i++) {
      segments.push([line[i], line[i + 1]]);
    }
  });

  // Find the middle segment
  const middleSegmentIndex = Math.floor(segments.length / 2);
  const middleSegment = segments[middleSegmentIndex];

  // Calculate midpoint
  const midpoint = [
    (middleSegment[0][0] + middleSegment[1][0]) / 2,
    (middleSegment[0][1] + middleSegment[1][1]) / 2
  ];

  return midpoint;
}

/**
 * Convert : searated travl time in readable text.
 * @param {*} travelTime 
 */
function travelTimeToString(travelTime) {
  const durationArray = travelTime.split(":");
  let text = "";
  for (let index = 0; index < durationArray.length; index++) {
    const element = durationArray[index];
    if(index === 0 && element !== "0") {
      text += `${element} d `;
    } else if (index === 1 && element !== "0") {
      text += `${element} h `;
    } else if (index === 2 && element !== "0") {
      text += `${element} min `
    } else if (index === 3 && element !== "0") {
      text += `${element} s `
    }
  }
  return text;
}

