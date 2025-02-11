function getFormName() {
    return form.getFormName();
}
function changeForm() {
    form.showPickerForm();
}
function setFormId(id) {
    PropertiesService.getUserProperties().setProperty("formId", id);
    setting.showSettingFile();
}
