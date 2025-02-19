//Classe per la gestione del processo di automatizzazione
class Commission_Manager {

    //Metodo per avviare il processo
    public static start() {
        Setting.showSettingFile();
    }

    //Metodo di condivisione dei file
    public static shareFile() {
        //Recupero gli id dei file da condividere dalle UserProperty
        let properties = PropertiesService.getUserProperties();
        const docId = properties.getProperty('docId');
        const formId = properties.getProperty('formId');
        const sheetId = properties.getProperty('sheetId');

        //Controllo che l'utente abbia inserito tutti i file richiesti
        if (docId == null || formId == null || sheetId == null) {
            SpreadsheetApp.getUi().alert("Attenzione!! Inserire i file mancanti per andate avanti");
            Setting.showSettingFile();
        } else {

            //Condivido i file 
            Document.shareDocToSupervisor(docId);
            Form.shareFormAvailability(formId);
        }
    }

    //Metodo per creare una proposta di commissione
    public static createCommission() {
        let responseForm = Form_Response.getFormResponses();
        let teacherAvailable = Sheet.compareResponseFormWithStatistics(responseForm);
        Commission.new(teacherAvailable);
    
    }
}


