var generate_commissions = /** @class */ (function () {
    function generate_commissions() {
    }
    generate_commissions.start = function () {
        new generate_commissions().settingFile();
    };
    generate_commissions.prototype.settingFile = function () {
        var properties = PropertiesService.getScriptProperties();
        if ((properties.getProperty("docId")) != null && (properties.getProperty("formId")) != null) {
            var html = HtmlService.createHtmlOutputFromFile('html/setting.html').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
            SpreadsheetApp.getUi().showModalDialog(html, " ");
        }
        else {
            generate_commissions.requestGraduation();
        }
    };
    //Mostra i documenti presenti in drive
    generate_commissions.prototype.showPickerDocs = function () {
        PropertiesService.getScriptProperties().setProperty("step", "docId");
        var html = HtmlService.createHtmlOutputFromFile('html/docs').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Documento da condividere con i relatori');
    };
    //Mostra i forms presenti in drive
    generate_commissions.showPickerForm = function (id) {
        PropertiesService.getScriptProperties().setProperty("step", "formId");
        var html = HtmlService.createHtmlOutputFromFile('html/forms').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Form per la richiesta di disponibilità');
    };
    //Richiesta numero di laureandi oltre il quale creare più commissioni
    generate_commissions.requestGraduation = function () {
        var request = "Inserire la soglia minima dei laureandi oltre la quale creare più di una commisione";
        var response = SpreadsheetApp.getUi().prompt(request);
        var graduationThreshold = response.getResponseText();
        //Controllo parametro
        if (Number.isNaN(Number.parseInt(graduationThreshold))) {
            SpreadsheetApp.getUi().alert("Inserire un numero intero");
            generate_commissions.requestGraduation();
        }
        else {
            new generate_commissions().showPickerDocs();
        }
    };
    return generate_commissions;
}());
function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
}
function nextStep(data) {
    if ((PropertiesService.getScriptProperties().getProperty("step")) == "docId") {
        PropertiesService.getScriptProperties().setProperty("docId", data);
        generate_commissions.showPickerForm(data);
    }
    else if ((PropertiesService.getScriptProperties().getProperty("step")) == "formId") {
        shareFile();
    }
}
function changeSetting() {
    generate_commissions.requestGraduation();
}
function shareFile() {
    var properties = PropertiesService.getScriptProperties();
    var docId = properties.getProperty("docId");
    var formId = properties.getProperty("formId");
    doc_manager.shareDocToSupervisor(docId);
    form_manager.shareFormAvailability(formId);
}
