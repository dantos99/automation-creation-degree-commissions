var commissions_manager = /** @class */ (function () {
    function commissions_manager() {
    }
    commissions_manager.start = function () {
        settings.showSettingFile();
    };
    commissions_manager.createCommission = function () {
        var responseForm = form_response.getFormResponses();
        var teacherAvailable = sheets.compareResponseFormWithStatistics(responseForm);
        commission.new(teacherAvailable);
    };
    return commissions_manager;
}());
function shareFile() {
    var properties = PropertiesService.getUserProperties();
    var docId = properties.getProperty('docId');
    var formId = properties.getProperty('formId');
    var sheetId = properties.getProperty('sheetId');
    if (docId == null || formId == null || sheetId == null) {
        SpreadsheetApp.getUi().alert("Attenzione!! Inserire i file mancanti per andate avanti");
        settings.showSettingFile();
    }
    else {
        documents.shareDocToSupervisor(docId);
        forms.shareFormAvailability(formId);
    }
}
