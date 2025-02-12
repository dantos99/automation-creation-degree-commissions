class commission_manager {

    public static start() {
        Setting.showSettingFile();
    }

    public static shareFile() {
        let properties = PropertiesService.getUserProperties();
        const docId = properties.getProperty('docId');
        const formId = properties.getProperty('formId');
        const sheetId = properties.getProperty('sheetId');
        if (docId == null || formId == null || sheetId == null) {
            SpreadsheetApp.getUi().alert("Attenzione!! Inserire i file mancanti per andate avanti");
            Setting.showSettingFile();
        } else {

            Document.shareDocToSupervisor(docId);
            Form.shareFormAvailability(formId);
        }
    }

    public static createCommission() {
        let responseForm = Form_Response.getFormResponses();
        let teacherAvailable = Sheet.compareResponseFormWithStatistics(responseForm);
        Commission.new(teacherAvailable);
    }
}


