/**************/
/* GOOGLE API */
/**************/

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  isGapiLoaded = true;
  enableAuthButton();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  isGisLoaded = true;
  enableAuthButton();
}

/**
 * When scripts are loaded, authentication may begin
 */
function enableAuthButton() {
  if(isGapiLoaded && isGisLoaded) {
    document.getElementById('authenticate-button').style.visibility = 'visible';
  }
}

function handleAuthenticateClick() {
  gapi.load('client', initializeGapiClient);
  postGisLoaded();
  document.getElementById('authenticate-button').style.visibility = 'hidden';
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY_INPUT.value,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function postGisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID_INPUT.value,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize-button').style.visibility = 'visible';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    document.getElementById('signout-button').style.visibility = 'visible';
    document.getElementById('authorize-button').innerText = 'Refresh';
    // List objects
    await listObjects();
    await listTypes();
    await listTypeClasses();
    await listSources();
    // Dashboard
    initDashboard();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('content').innerText = '';
    document.getElementById('authorize-button').innerText = 'Authorize';
    document.getElementById('signout-button').style.visibility = 'hidden';
  }
}