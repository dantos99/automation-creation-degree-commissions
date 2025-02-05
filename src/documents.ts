class documents {

    //Funzione che condivide un Google doc con i relatori
    static shareDocToSupervisor(Id: string) {

        //id del Google doc già fatto da inviare
        let docId: string = Id;

        //Recupero il file da Google Drive
        let docToDoList = DriveApp.getFileById(docId);

        //Recupero le email dei relatori 
        let emailRelatori: Array<string> = degree.getAllSupervisorEmail();

        let i: number = 0;
        //Condivido il documento
        for (i = 0; i < emailRelatori.length; i++) {
            docToDoList.addViewer(emailRelatori[i]);
        }
    }
    //Mostra i documenti presenti in drive
    static showPickerDocs() {
        let html = HtmlService.createHtmlOutputFromFile('html/docs').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Documento da condividere con i relatori');
    }

}
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

function setDocId(id: string) {
    PropertiesService.getUserProperties().setProperty("docId", id);
    settings.showSettingFile();
}

function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
}