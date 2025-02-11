var commission_manager = /** @class */ (function () {
    function commission_manager() {
    }
    commission_manager.start = function () {
        setting.showSettingFile();
    };
    commission_manager.shareFile = function () {
        var properties = PropertiesService.getUserProperties();
        var docId = properties.getProperty('docId');
        var formId = properties.getProperty('formId');
        var sheetId = properties.getProperty('sheetId');
        if (docId == null || formId == null || sheetId == null) {
            SpreadsheetApp.getUi().alert("Attenzione!! Inserire i file mancanti per andate avanti");
            setting.showSettingFile();
        }
        else {
            document.shareDocToSupervisor(docId);
            form.shareFormAvailability(formId);
        }
    };
    commission_manager.createCommission = function () {
        var responseForm = form_response.getFormResponses();
        var teacherAvailable = sheet.compareResponseFormWithStatistics(responseForm);
        commission.new(teacherAvailable);
    };
    return commission_manager;
}());
