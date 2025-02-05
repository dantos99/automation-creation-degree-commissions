class settings {

    //Mostra la pagina di impostaizioni dell'utente
    static showSettingFile() {
        let html = HtmlService.createHtmlOutputFromFile('html/setting.html').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, " ");
    }
}