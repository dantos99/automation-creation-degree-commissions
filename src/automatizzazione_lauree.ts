function onOpen() {
    SpreadsheetApp.getUi().createMenu("Genera Commissioni").addItem('Genera', 'main').addToUi();
}

function main() {
    commissions_manager.start();
}










