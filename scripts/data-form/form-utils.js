/**
 * Form TOOLS and UTILITARIES
 */

/**
 * Translate canon/legends YES values to "Canon / Legends" text
 */
function canonLegendsToString(canonLegendsArray) {
  if(canonLegendsArray.length === 2) {
    if(canonLegendsArray[0] === "YES") {
      if(canonLegendsArray[1] === "YES") {
        return "Canon/Legends";
      } else {
        return "Canon";
      }
    } else {
      return "Legends";
    }
  }
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
  if(value === undefined) {
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
 */
function setCheckboxStateFromValue(checkboxId, value, trueFalseIndeterminedInputArray=[true, false, ""]) {
  const checkbox = document.getElementById(checkboxId);
  // console.log("checkboxId : ", checkboxId, ", value ? ", value);
  if(value.toString().toLowerCase() === trueFalseIndeterminedInputArray[0].toString().toLowerCase()) {
    checkbox.indeterminate = false;
    checkbox.checked = true;
  } else if(value.toString().toLowerCase() === trueFalseIndeterminedInputArray[1].toString().toLowerCase()) {
    checkbox.indeterminate = false;
    checkbox.checked = false;
  } else if(value.toString().toLowerCase() === trueFalseIndeterminedInputArray[2].toString().toLowerCase()) {
    checkbox.indeterminate = true;
  } else {
    alert(`Value ${value} is wrong for checkbox of id ${checkboxId}`);
  }
}

/**
 * return check, unchecked and indetermined checkbox values to true, false or empty value
 */
function getValueFromCheckboxState(checkboxId, trueFalseIndeterminedOutputArray=[true, false, ""]) {
  const checkbox = document.getElementById(checkboxId);
  // console.log("indeterminated ? ",checkbox.indeterminate ? "true":"false", ", checked ? ", checkbox.checked ? "true":"false");
  if(checkbox.indeterminate == true) {
    return trueFalseIndeterminedOutputArray[2];
  } else if (checkbox.checked == true) {
    return trueFalseIndeterminedOutputArray[0];
  } else if (checkbox.checked == false) {
    return trueFalseIndeterminedOutputArray[1];
  }
}
