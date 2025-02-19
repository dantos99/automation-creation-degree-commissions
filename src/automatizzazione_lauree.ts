function onOpen() {
    SpreadsheetApp.getUi().createMenu("Genera Commissioni").addItem('Genera', 'main').addToUi();
}

function main() {
    Commission_Manager.start();
}










