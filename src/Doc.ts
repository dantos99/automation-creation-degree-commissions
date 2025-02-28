//Classe per gestire i file di tipo Google Doc
class Doc {

    //Funzione che condivide un Google doc con i relatori
    public shareDocToSupervisor(Id: string) {

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
    public showPicker() {
        let html = HtmlService.createHtmlOutputFromFile('html/docs').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Documento da condividere con i relatori');
    }
    //Metodo che ritorna il nome del Doc impostato
    public getName(): string {

        var docId = PropertiesService.getUserProperties().getProperty("docId");
        if (docId != null) {
            return DriveApp.getFileById(docId).getName();
        }
        else {
            return ("Non presente");
        }
    }

    //Metodo per settare il Google Doc
    public setId(id: string) {
        let setting = new Setting();
        PropertiesService.getUserProperties().setProperty("docId", id);
        setting.showSettingFile();
    }
}