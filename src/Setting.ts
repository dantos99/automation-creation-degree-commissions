//Classe per gestire le impostazioni di settaggio dei file
class Setting {

    //Mostra la pagina di impostaizioni dell'utente
    public showSettingFile() {
        let html = HtmlService.createHtmlOutputFromFile('html/setting.html').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, " ");
    }
}