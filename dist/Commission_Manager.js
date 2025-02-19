//Classe per la gestione del processo di automatizzazione
var Commission_Manager = /** @class */ (function () {
    function Commission_Manager() {
    }
    //Metodo per avviare il processo
    Commission_Manager.start = function () {
        Setting.showSettingFile();
    };
    //Metodo di condivisione dei file
    Commission_Manager.shareFile = function () {
        //Recupero gli id dei file da condividere dalle UserProperty
        var properties = PropertiesService.getUserProperties();
        var docId = properties.getProperty('docId');
        var formId = properties.getProperty('formId');
        var sheetId = properties.getProperty('sheetId');
        //Controllo che l'utente abbia inserito tutti i file richiesti
        if (docId == null || formId == null || sheetId == null) {
            SpreadsheetApp.getUi().alert("Attenzione!! Inserire i file mancanti per andate avanti");
            Setting.showSettingFile();
        }
        else {
            //Condivido i file 
            Document.shareDocToSupervisor(docId);
            Form.shareFormAvailability(formId);
        }
    };
    //Metodo per creare una proposta di commissione
    Commission_Manager.createCommission = function () {
        var responseForm = Form_Response.getFormResponses();
        var teacherAvailable = Sheet.compareResponseFormWithStatistics(responseForm);
        Commission.new(teacherAvailable);
    };
    return Commission_Manager;
}());
