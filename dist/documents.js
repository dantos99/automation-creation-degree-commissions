var documents = /** @class */ (function () {
    function documents() {
    }
    //Funzione che condivide un Google doc con i relatori
    documents.shareDocToSupervisor = function (Id) {
        //id del Google doc già fatto da inviare
        var docId = Id;
        //Recupero il file da Google Drive
        var docToDoList = DriveApp.getFileById(docId);
        //Recupero le email dei relatori 
        var emailRelatori = degree.getAllSupervisorEmail();
        var i = 0;
        //Condivido il documento
        for (i = 0; i < emailRelatori.length; i++) {
            docToDoList.addViewer(emailRelatori[i]);
        }
    };
    //Mostra i documenti presenti in drive
    documents.showPickerDocs = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/docs').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Documento da condividere con i relatori');
    };
    return documents;
}());
function getDocName() {
    var docId = PropertiesService.getUserProperties().getProperty("docId");
    if (docId != null) {
        return DriveApp.getFileById(docId).getName();
    }
    else {
        return ("Non presente");
    }
}
function changeDoc() {
    documents.showPickerDocs();
}
function setDocId(id) {
    PropertiesService.getUserProperties().setProperty("docId", id);
    settings.showSettingFile();
}
function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
}
