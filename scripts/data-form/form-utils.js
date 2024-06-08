/**
 * Form TOOLS and UTILITARIES
 */

/**
 * Translate canon/legends YES values to "Canon / Legends" text
 */
function canonLegendsUnlicencedToString(canonLegendsUnlicencedArray) {
  let tempArray = [];
  if(canonLegendsUnlicencedArray[0] === "YES") {
    tempArray.push('Canon');
  }
  if(canonLegendsUnlicencedArray[1] === "YES") {
    tempArray.push('Legends');
  }
  if(canonLegendsUnlicencedArray[3] === "YES") {
    tempArray.push('Unlicenced');
  }
  return tempArray.join("/");
}

/**
 * Prettify date from - date to display
 */
function prettifyDateFromDateTo(dateArray) {
  if(dateArray.length === 2) {
    if(dateArray[0] !== "") {
      if(dateArray[1] !== "") {
        return `from ${dateArray[0]} to ${dateArray[1]}`;
      } else {
        return `from ${dateArray[0]}`;
      }
    } else {
      if(dateArray[1] !== "") {
        return `until ${dateArray[0]}`;
      } else {
        return "";
      }
    }
  }
}

/**
 * Set undefined to empty string and trim trailing and leading spaces
 */
function sanitizeText(value) {
  if(value === undefined || value === null) {
    return "";
  } else {
    return value.trim();
  }
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

/**
 * Return key of object searching value
 */
function getKeyByObjectValue(object, value) {
  return Object.keys(object).find(key =>
    object[key] === value);
}

/**
 * Find array of objects by key/value pairs
 * 
 * @param {*} arrayOfObjects Array
 * @param {*} keyValueObjectArray [{key: keyLabel, value: valueLabel}, ...]
 * @returns Array
 */
function findArrayOfObjectByKeyValuePairs(arrayOfObjects, keyValueObjectArray) {
  return arrayOfObjects.filter(object => {
    for (let i = 0; i < keyValueObjectArray.length; i++) {
      const {key, value} = keyValueObjectArray[i];
      if(object[key] !== value) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Return object from array by ID
 * 
 * @param {*} arrayOfObjects Array
 * @param {*} id string
 * @returns Object
 */
function findObjectById(arrayOfObjects, id) {
  return arrayOfObjects.find(object => object.id === id);
}


/**
 * Parse data separated by char to html url link list
 */
function separateStringToLinkList(string, separator) {
  let urls = string.split(separator);
  let urlList = [];
  for (const url of urls) {
    let a = document.createElement("a");
    a.href =  url;
    a.target = "_blank";
    a.innerText = url;
    urlList.push(a);
  }
  return urlList;
}

/**
 * Set checkbox state between true, false and undeterminated
 * 
 * checkboxId: string
 */
function setCheckboxStateFromValue(checkboxId, value, trueFalseIndeterminedInputArray=[true, false, ""]) {
  const checkbox = document.getElementById(checkboxId);
  // console.log("checkboxId : ", checkboxId, ", value ? ", value);
  setCheckboxElementStateFromValue(checkbox, value, trueFalseIndeterminedInputArray);
}

/**
 * Set checkbox state between true, false and undeterminated
 * 
 * checkboxDOMElement: DOM Element
 */
function setCheckboxElementStateFromValue(checkboxDOMElement, value, trueFalseIndeterminedInputArray=[true, false, ""]) {
  if(value.toString().toLowerCase() === trueFalseIndeterminedInputArray[0].toString().toLowerCase()) {
    checkboxDOMElement.indeterminate = false;
    checkboxDOMElement.checked = true;
  } else if(value.toString().toLowerCase() === trueFalseIndeterminedInputArray[1].toString().toLowerCase()) {
    checkboxDOMElement.indeterminate = false;
    checkboxDOMElement.checked = false;
  } else if(value.toString().toLowerCase() === trueFalseIndeterminedInputArray[2].toString().toLowerCase()) {
    checkboxDOMElement.indeterminate = true;
  } else {
    alert(`Value ${value} is wrong for checkbox`, checkboxDOMElement);
  }
}

function getValueFromCheckboxState(checkboxId, trueFalseIndeterminedOutputArray=[true, false, ""]) {
  const checkbox = document.getElementById(checkboxId);
  return getValueFromCheckboxElementState(checkbox, trueFalseIndeterminedOutputArray);
}

/**
 * return check, unchecked and indetermined checkbox values to true, false or empty value
 */
function getValueFromCheckboxElementState(checkboxDOMElement, trueFalseIndeterminedOutputArray=[true, false, ""]) {
  // console.log("indeterminated ? ",checkbox.indeterminate ? "true":"false", ", checked ? ", checkbox.checked ? "true":"false");
  if(checkboxDOMElement.indeterminate == true) {
    return trueFalseIndeterminedOutputArray[2];
  } else if (checkboxDOMElement.checked == true) {
    return trueFalseIndeterminedOutputArray[0];
  } else if (checkboxDOMElement.checked == false) {
    return trueFalseIndeterminedOutputArray[1];
  }
}

/**
 * Convert column number to spreadsheet letter reference (Max 2 letters : ZZ)
 * @param {int} number 
 */
function convertSpreadsheetColumnNumberToLetters(number) {
  const FIRST_CHAR = number / 26 >= 1 ? String.fromCharCode(64 + parseInt(number / 26)) : "";
  const LAST_CHAR = String.fromCharCode(65 + number % 26);
  return FIRST_CHAR + LAST_CHAR;
}

/**
 * Convert object name to display name for spreadsheet
 * 
 * @param {String} objectName 
 * @param {String} orbitalRank
 */
function convertObjectNameToHumanReadableName(objectName, altNames, orbitalRank) {
  let humanReadableName = (orbitalRank !== "" ? "╚═ "+orbitalRank.toString()+". " : "") + objectName;
  if(altNames !== "") {
    humanReadableName += " / "+altNames.split("/").join(" / ").replace(/  +/g, ' '); // Format name list (space,slash,space) and remove multiple spaces
  }
  return humanReadableName;
}

/**
 * Gaussian randon generator
 * @param {*} mean the maximum of the graph
 * @param {*} stdev standard deviation
 * @returns 
 */
// Standard Normal variate using Box-Muller transform.
function gaussianRandom(mean=0, stdev=1) {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean;
}

/**
 * Probability density function
 * @param {*} x middle value for highest result
 * @param {*} a minimum bounding
 * @param {*} b maximum bounding
 * @returns 
 */
function betaPDF(x, a, b) {
  // Beta probability density function impementation
  // using logarithms, no factorials involved.
  // Overcomes the problem with large integers
  return Math.exp(lnBetaPDF(x, a, b))
}
function lnBetaPDF(x, a, b) {
      // Log of the Beta Probability Density Function
  return ((a-1)*Math.log(x) + (b-1)*Math.log(1-x)) - lnBetaFunc(a,b)
}
function lnBetaFunc(a, b) {
  // Log Beta Function
  // ln(Beta(x,y))
  foo = 0.0;

  for (i=0; i<a-2; i++) {
      foo += Math.log(a-1-i);
  }
  for (i=0; i<b-2; i++) {
      foo += Math.log(b-1-i);
  }
  for (i=0; i<a+b-2; i++) {
      foo -= Math.log(a+b-1-i);
  }
  return foo
}
