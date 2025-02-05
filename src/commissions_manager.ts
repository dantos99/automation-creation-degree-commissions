class commissions_manager {

    static start() {
        settings.showSettingFile();
    }

    static createCommission() {
        let responseForm = form_response.getFormResponses();
        let teacherAvailable = sheets.compareResponseFormWithStatistics(responseForm);
        commission.new(teacherAvailable);
    }
}

function shareFile() {
    let properties = PropertiesService.getUserProperties();
    let docId = properties.getProperty('docId');
    let formId = properties.getProperty('formId');
    let sheetId = properties.getProperty('sheetId');
    if (docId == null || formId == null || sheetId == null) {
        SpreadsheetApp.getUi().alert("Attenzione!! Inserire i file mancanti per andate avanti");
        settings.showSettingFile();
    } else {

        documents.shareDocToSupervisor(docId);
        forms.shareFormAvailability(formId);
    }
}

