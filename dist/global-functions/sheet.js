function getSheetName() {
    return sheet.getSheetName();
}
//Cambia lo sheet
function changeSheet() {
    sheet.showPickerSheet();
}
//Imposta lo sheet
function setSheetId(id) {
    PropertiesService.getUserProperties().setProperty("sheetId", id);
    setting.showSettingFile();
}
