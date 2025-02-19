//Classe per gestire i file di tipo Google Doc
var Document = /** @class */ (function () {
    function Document() {
    }
    //Funzione che condivide un Google doc con i relatori
    Document.shareDocToSupervisor = function (Id) {
        //id del Google doc già fatto da inviare
        var docId = Id;
        //Recupero il file da Google Drive
        var docToDoList = DriveApp.getFileById(docId);
        //Recupero le email dei relatori 
        var emailSupervisor = Graduate.getAllEmailSupervisorOfGraduate();
        var i = 0;
        //Condivido il documento
        for (i = 0; i < emailSupervisor.length; i++) {
            docToDoList.addViewer(emailSupervisor[i]);
        }
    };
    //Mostra i documenti presenti in drive
    Document.showPickerDocs = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/docs').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Documento da condividere con i relatori');
    };
    //Metodo che ritorna il nome del Doc impostato
    Document.getDocName = function () {
        var docId = PropertiesService.getUserProperties().getProperty("docId");
        if (docId != null) {
            return DriveApp.getFileById(docId).getName();
        }
        else {
            return ("Non presente");
        }
    };
    //Metodo per settare il Google Doc
    Document.setDocId = function (id) {
        PropertiesService.getUserProperties().setProperty("docId", id);
        Setting.showSettingFile();
    };
    return Document;
}());
