function getSheetName() {
    return sheet.getSheetName();
}

//Cambia lo sheet
function changeSheet() {
    sheet.showPickerSheet();
}

//Imposta lo sheet
function setSheetId(id: string) {
    PropertiesService.getUserProperties().setProperty("sheetId", id);
    setting.showSettingFile();
}