/* Starting loading overlay */

function showLoadingOverlay() {
    document.getElementById('loading-overlay').classList.add('active');
}

function hideLoadingOverlay() {
    document.getElementById('loading-overlay').classList.remove('active');
}

showLoadingOverlay();