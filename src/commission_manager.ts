class commission_manager {

    public static start() {
        setting.showSettingFile();
    }

    public static shareFile() {
        let properties = PropertiesService.getUserProperties();
        const docId = properties.getProperty('docId');
        const formId = properties.getProperty('formId');
        const sheetId = properties.getProperty('sheetId');
        if (docId == null || formId == null || sheetId == null) {
            SpreadsheetApp.getUi().alert("Attenzione!! Inserire i file mancanti per andate avanti");
            setting.showSettingFile();
        } else {

            document.shareDocToSupervisor(docId);
            form.shareFormAvailability(formId);
        }
    }

    public static createCommission() {
        let responseForm = form_response.getFormResponses();
        let teacherAvailable = sheet.compareResponseFormWithStatistics(responseForm);
        commission.new(teacherAvailable);
    }
}


