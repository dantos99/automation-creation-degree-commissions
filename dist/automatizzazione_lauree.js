function onOpen() {
    SpreadsheetApp.getUi().createMenu("Genera Commissioni").addItem('Genera', 'main').addToUi();
}
function main() {
    generate_commissions.start();
}
