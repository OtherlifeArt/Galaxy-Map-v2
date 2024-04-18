/**
 * Used to parse CSV data into JSON
 */


/** Configuration **/

/** Variable and constants **/
const input = document.getElementById("astro-object-input-file");
const notification = document.getElementById('notification');
const totalTimeNotification = document.getElementById('totalTime');
const outputContainer = document.getElementById('output');
const copyBlock = document.getElementById('copyBlock');
const copyButton = document.getElementById('copyButton');
const copyNotification = document.getElementById("copyNotification");
var totalParseTime = 0;
var JSONOutput = [];

/** FUNCTIONS **/

/* Parse files */
function parseCSVFiles(event) {
  const files = event.target.files;
  const fileNbr = files.length;
  JSONOutput = [];
  totalParseTime = 0;

  notification.innerHTML = `${fileNbr} file(s) selected`;

  for(const file of files) {
    parseAstronomicalObjectCSV(file);
  }
}

/* Parse CSV */
function csvLineToAstroObject(line, headers) {
  if (line.length === headers.length) {
    const record = {};
    for (let j = 0; j < headers.length; j++) {
      const cell = line[j].trim();
      // Skip empty cell
      if(cell === "") {
        continue;
      }
      switch (headers[j]) {
        case "OBJECT":
          record["name"] = cell;
          break;
        case "CANONICITY":
          record["canonicity"] = cell;
          break;
        case "TYPE":
          record["type"] = cell;
          break;
        case "TYPE CLASSES":
          record["typeClasses"] = cell;
          break;
        case "IS CAPITAL":
          record["isCapital"] = (cell !== "true" ? false : true);
          break;
        // Location
        case "GRID LOCATION":
          record["gridLocation"] = cell;
          break;
        case "X":
          if(record["coord"] === undefined) record["coord"] = {};
          record["coord"]["x"]= parseFloat(cell);
          break;
        case "Y":
          if(record["coord"] === undefined) record["coord"] = {};
          record["coord"]["y"]= parseFloat(cell);
          break;
        case "Z":
          if(record["coord"] === undefined) record["coord"] = {};
          record["coord"]["z"]= parseFloat(cell);
          break;
        // Parent
        case "PARENT OBJECT":
          record["parentName"] = cell;
          break;
        case "ORBITAL POSITION":
          record["orbitalPosition"] = parseInt(cell);
          break;
        // Size
        case "SIZE (LY)":
          if(record["size"] === undefined) record["size"] = {};
          record["size"]["ly"] = parseFloat(cell);
          break;
        case "SIZE (KM)":
          if(record["size"] === undefined) record["size"] = {};
          record["size"]["km"] = parseFloat(cell);
          break;
        // Urls
        case "WIKI URLS":
          record["urls"] = cell.split(",");
          break;
        // "Surface Data"
        case "KNOWN ENVIRONMENTS":
          record["knownEnvironment"] = cell;
          break;
        case "CLIMATE":
          record["climate"] = cell;
          break;
        case "ATMOSPHERE":
          record["atsmophere"] = cell;
          break;
        case "NATIVE SPECIES":
          record["nativeSpecies"] = cell;
          break;
        case "IMMIGRATED SPECIES":
          record["ImmigratedSpecies"] = cell;
          break;
        // Meta Data
        case "PLACEMENT CERTITUDE":
          if(record["metaData"] === undefined) record["metaData"] = {};
          record["metaData"]["placementCertitude"] = cell;
          break;
        case "PLACEMENT SOURCES":
          if(record["metaData"] === undefined) record["metaData"] = {};
          record["metaData"]["placementSources"] = cell;
          break;
        case "NOTES":
          if(record["metaData"] === undefined) record["metaData"] = {};
          record["metaData"]["notes"] = cell;
          break;
        case "INTERESTING":
          if(record["metaData"] === undefined) record["metaData"] = {};
          record["metaData"]["interresting"] = cell;
          break;
        case "PLACEMENT LOGIC":
          if(record["metaData"] === undefined) record["metaData"] = {};
          record["metaData"]["placementLogic"] = cell;
          break;
      }
    }
    return record;
  } else {
    console.error("Length error for this line", line);
  }
}

/* Parse CSV into objects */
function parseAstronomicalObjectCSV(csvFile) {
  const beginningDate = Date.now();
  const reader = new FileReader();

  reader.onload = (e) => {
      const contents = e.target.result;
      const lines = contents.split('\n');

      // Assuming the first row contains headers
      const headers = lines[0].split(';');

      // Initialize an array to store the parsed data
      const data = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].split(';');
        data.push(csvLineToAstroObject(line, headers));
      }
      console.log(data);
      JSONOutput = JSONOutput.concat(data);
  };
  
  reader.onloadend = (e) => {
    // time
    let parseTime = Math.abs(new Date() - beginningDate) / 1000;
    totalParseTime += parseTime;
    console.log(`Files parsed in ${parseTime} seconds`);
    totalTimeNotification.innerHTML = `parsed in ${totalParseTime} seconds`;
    // Result
    outputContainer.innerHTML = JSON.stringify(JSONOutput);
    // Display copy button
    copyBlock.style.display = 'block'
  };

  reader.readAsText(csvFile);
}

/* Copy Text */
function copyText() {
  navigator.clipboard.writeText(outputContainer.innerHTML);
  // Display success
  copyNotification.innerHTML = "Text Copied !";
}

/** Event listeners **/
input.addEventListener("change", parseCSVFiles);
copyButton.addEventListener("click", copyText);