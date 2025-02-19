function createCommission() {
    Commission_Manager.createCommission();
}
function shareFile() {
    Commission_Manager.shareFile();
}
function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
}
