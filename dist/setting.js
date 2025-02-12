var Setting = /** @class */ (function () {
    function Setting() {
    }
    //Mostra la pagina di impostaizioni dell'utente
    Setting.showSettingFile = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/setting.html').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, " ");
    };
    return Setting;
}());
