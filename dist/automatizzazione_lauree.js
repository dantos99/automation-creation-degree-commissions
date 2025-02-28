function onOpen() {
    SpreadsheetApp.getUi().createMenu("Genera Commissioni").addItem('Genera', 'main').addToUi();
}
function main() {
    let commissionManager = new Commission_Manager();
    commissionManager.start();
}
