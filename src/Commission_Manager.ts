//Classe per la gestione del processo di automatizzazione
class Commission_Manager {

    //Metodo per avviare il processo
    public start() {
        let setting: Setting = new Setting();
        setting.showSettingFile();
    }

    //Metodo di condivisione dei file
    public shareFiles() {
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
        } else {

            let doc = new Doc();
            let form = new Form();
            
            //Condivido i file 
            form.shareFormAvailability(formId);
            doc.shareDocToSupervisor(docId);
        }
    }

    //Metodo per creare una proposta di commissione
    public createCommission() {
        let form_response = new Form_Response();
        let responseForm: Form_Response[] = form_response.getFormResponses();
        
        let sheet = new Sheet();
        let teacherAvailable: Form_Response[] = sheet.compareResponseFormWithStatistics(responseForm);
        
        let commission = new Commission();
        commission.new(teacherAvailable);

    }
}


