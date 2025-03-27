function createCommission() {
    new Commission_Manager().createCommission();
}

function shareFiles() {
    new Commission_Manager().shareFiles();
}

function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
}
