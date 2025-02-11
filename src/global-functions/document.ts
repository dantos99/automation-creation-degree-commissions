function getDocName() {
    return document.getDocName();
}

function changeDoc() {
    document.showPickerDocs();
}

function setDocId(id: string) {
    PropertiesService.getUserProperties().setProperty("docId", id);
    setting.showSettingFile();
}

function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
}