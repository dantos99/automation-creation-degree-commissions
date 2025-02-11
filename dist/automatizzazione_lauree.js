function onOpen() {
    SpreadsheetApp.getUi().createMenu("Genera Commissioni").addItem('Genera', 'main').addToUi();
}
function main() {
    commission_manager.start();
}
