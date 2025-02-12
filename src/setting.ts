class Setting {

    //Mostra la pagina di impostaizioni dell'utente
    public static showSettingFile() {
        let html = HtmlService.createHtmlOutputFromFile('html/setting.html').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, " ");
    }
}