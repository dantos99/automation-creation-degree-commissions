let commissionManager = new Commission_Manager();

function createCommission() {
    commissionManager.createCommission();
}

function shareFile() {
    commissionManager.shareFile();
}

function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
}