function initWidgets() {
  updateCollapsible();
}

/**********/
/*  TABS  */
/**********/

function openSection(evt, sectionName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(sectionName).style.display = "block";
  if(evt) {
    evt.currentTarget.className += " active";
  }
}

/***************/
/* Collapsible */
/***************/

function generateCollapsibleWidget(parentDiv, collapsibleButtonInnerHTML, content, containerDivId) {
  document.getElementById(containerDivId)?.remove(); // remove
  // add
  let contentDiv = document.createElement('div');
  contentDiv.classList.add("collapsible-content");
  let collapsibleButton = document.createElement("button");
  collapsibleButton.classList.add("collapsible");
  collapsibleButton.type = "button";
  collapsibleButton.innerHTML = collapsibleButtonInnerHTML;
  let containerDiv = document.createElement('div');
  contentDiv.appendChild(content);
  containerDiv.appendChild(collapsibleButton);
  containerDiv.appendChild(contentDiv);
  parentDiv.appendChild(containerDiv);
}

function updateCollapsible() {
  let collapsible = document.getElementsByClassName("collapsible");
  let collapsibleIndex;
  
  for (collapsibleIndex = 0; collapsibleIndex < collapsible.length; collapsibleIndex++) {
    collapsible[collapsibleIndex].removeEventListener("click", collapsibleCollapseOrExtend); // remove existing
    collapsible[collapsibleIndex].addEventListener("click", collapsibleCollapseOrExtend); // Add new
  }
}

function collapsibleCollapseOrExtend() {
  this.classList.toggle("collapsible-active");
  let content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}
 