var commission_manager = /** @class */ (function () {
    function commission_manager() {
    }
    commission_manager.start = function () {
        Setting.showSettingFile();
    };
    commission_manager.shareFile = function () {
        var properties = PropertiesService.getUserProperties();
        var docId = properties.getProperty('docId');
        var formId = properties.getProperty('formId');
        var sheetId = properties.getProperty('sheetId');
        if (docId == null || formId == null || sheetId == null) {
            SpreadsheetApp.getUi().alert("Attenzione!! Inserire i file mancanti per andate avanti");
            Setting.showSettingFile();
        }
        else {
            Document.shareDocToSupervisor(docId);
            Form.shareFormAvailability(formId);
        }
    };
    commission_manager.createCommission = function () {
        var responseForm = Form_Response.getFormResponses();
        var teacherAvailable = Sheet.compareResponseFormWithStatistics(responseForm);
        Commission.new(teacherAvailable);
    };
    return commission_manager;
}());
