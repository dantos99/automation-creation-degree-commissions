function createCommission() {
    var responseForm = form_response.getFormResponses();
    var teacherAvailable = sheet.compareResponseFormWithStatistics(responseForm);
    commission.new(teacherAvailable);
}
function shareFile() {
    commission_manager.shareFile();
}
