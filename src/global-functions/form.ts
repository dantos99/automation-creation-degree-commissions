function getFormName() {
    return form.getFormName();
}
function changeForm() {
    form.showPickerForm();
}
function setFormId(id: string) {
    PropertiesService.getUserProperties().setProperty("formId", id);
    setting.showSettingFile();
}
