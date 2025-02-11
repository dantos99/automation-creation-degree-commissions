function createCommission() {
    let responseForm = form_response.getFormResponses();
    let teacherAvailable = sheet.compareResponseFormWithStatistics(responseForm);
    commission.new(teacherAvailable);
}

function shareFile() {
    commission_manager.shareFile();
}