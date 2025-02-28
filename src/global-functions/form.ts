function getFormName() {
    return new Form().getName();
}
function changeForm() {
    new Form().showPicker();
}
function setFormId(id: string) {
    new Form().setId(id);
}
