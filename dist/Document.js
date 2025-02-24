//Classe per gestire i file di tipo Google Doc
class Document {
    //Funzione che condivide un Google doc con i relatori
    static shareDocToSupervisor(Id) {
        //id del Google doc già fatto da inviare
        let docId = Id;
        //Recupero il file da Google Drive
        let docToDoList = DriveApp.getFileById(docId);
        //Recupero le email dei relatori 
        let emailSupervisor = Graduate.getAllEmailSupervisorOfGraduate();
        let i = 0;
        //Condivido il documento
        for (i = 0; i < emailSupervisor.length; i++) {
            docToDoList.addViewer(emailSupervisor[i]);
        }
    }
    //Mostra i documenti presenti in drive
    static showPickerDocs() {
        let html = HtmlService.createHtmlOutputFromFile('html/docs').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Documento da condividere con i relatori');
    }
    //Metodo che ritorna il nome del Doc impostato
    static getDocName() {
        var docId = PropertiesService.getUserProperties().getProperty("docId");
        if (docId != null) {
            return DriveApp.getFileById(docId).getName();
        }
        else {
            return ("Non presente");
        }
    }
    //Metodo per settare il Google Doc
    static setDocId(id) {
        PropertiesService.getUserProperties().setProperty("docId", id);
        Setting.showSettingFile();
    }
}
