var setting = /** @class */ (function () {
    function setting() {
    }
    //Mostra la pagina di impostaizioni dell'utente
    setting.showSettingFile = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/setting.html').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, " ");
    };
    return setting;
}());
