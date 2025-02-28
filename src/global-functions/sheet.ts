let sheet: Sheet = new Sheet();

function getSheetName() {
    return sheet.getName();
}

//Cambia lo Sheet
function changeSheet() {
    sheet.showPicker();
}

//Imposta lo sheet
function setSheetId(id: string) {
    sheet.setId(id);
}