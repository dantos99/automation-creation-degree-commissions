function createCommission() {
    new Commission_Manager().createCommission();
}
function shareFile() {
    new Commission_Manager().shareFile();
}
function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
}
