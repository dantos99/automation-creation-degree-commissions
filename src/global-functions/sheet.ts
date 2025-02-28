
function getSheetName() {
    return new Sheet().getName();
}

//Cambia lo Sheet
function changeSheet() {
    new Sheet().showPicker();
}

//Imposta lo sheet
function setSheetId(id: string) {
    new Sheet().setId(id);
}