var commissions_manager = /** @class */ (function () {
    function commissions_manager() {
    }
    commissions_manager.start = function () {
        settings.showSettingFile();
    };
    return commissions_manager;
}());
function createCommission() {
    var responseForm = form_response.getFormResponses();
    var teacherAvailable = sheets.compareResponseFormWithStatistics(responseForm);
    commission.new(teacherAvailable);
}
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
