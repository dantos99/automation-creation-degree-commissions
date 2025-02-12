class Document {

    //Funzione che condivide un Google doc con i relatori
    public static shareDocToSupervisor(Id: string) {

        //id del Google doc già fatto da inviare
        let docId: string = Id;

        //Recupero il file da Google Drive
        let docToDoList = DriveApp.getFileById(docId);

        //Recupero le email dei relatori 
        let emailSupervisor: Array<string> = Graduate.getAllEmailSupervisorOfGraduate();

        let i: number = 0;
        //Condivido il documento
        for (i = 0; i < emailSupervisor.length; i++) {
            docToDoList.addViewer(emailSupervisor[i]);
        }
    }
    //Mostra i documenti presenti in drive
    public static showPickerDocs() {
        let html = HtmlService.createHtmlOutputFromFile('html/docs').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Documento da condividere con i relatori');
    }
    public static getDocName(): string {

        var docId = PropertiesService.getUserProperties().getProperty("docId");
        if (docId != null) {
            return DriveApp.getFileById(docId).getName();
        }
        else {
            return ("Non presente");
        }
    }
    public static setDocId(id: string) {
        PropertiesService.getUserProperties().setProperty("docId", id);
        Setting.showSettingFile();
    }
}