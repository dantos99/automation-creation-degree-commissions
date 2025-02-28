//Classe per la gestione del processo di automatizzazione
class Commission_Manager {
    //Metodo per avviare il processo
    start() {
        let setting = new Setting();
        setting.showSettingFile();
    }
    //Metodo di condivisione dei file
    shareFile() {
        //Recupero gli id dei file da condividere dalle UserProperty
        let properties = PropertiesService.getUserProperties();
        const docId = properties.getProperty('docId');
        const formId = properties.getProperty('formId');
        const sheetId = properties.getProperty('sheetId');
        let setting = new Setting();
        //Controllo che l'utente abbia inserito tutti i file richiesti
        if (docId == null || formId == null || sheetId == null) {
            SpreadsheetApp.getUi().alert("Attenzione!! Inserire i file mancanti per andate avanti");
            setting.showSettingFile();
        }
        else {
            let doc = new Doc();
            let form = new Form();
            //Condivido i file 
            doc.shareDocToSupervisor(docId);
            form.shareFormAvailability(formId);
        }
    }
    //Metodo per creare una proposta di commissione
    createCommission() {
        let form_response = new Form_Response();
        let responseForm = form_response.getFormResponses();
        let sheet = new Sheet();
        let teacherAvailable = sheet.compareResponseFormWithStatistics(responseForm);
        let commission = new Commission();
        commission.new(teacherAvailable);
    }
}
