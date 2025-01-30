var generate_commissions = /** @class */ (function () {
    function generate_commissions() {
    }
    generate_commissions.start = function () {
        generate_commissions.showSettingFile();
    };
    //Mostra la pagina di impostaizioni dell'utente
    generate_commissions.showSettingFile = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/setting.html').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, " ");
    };
    //Mostra i documenti presenti in drive
    generate_commissions.showPickerDocs = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/docs').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Documento da condividere con i relatori');
    };
    //Mostra i forms presenti in drive
    generate_commissions.showPickerForm = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/forms').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Form per la richiesta di disponibilità');
    };
    //Mostra gli sheet presenti in drive
    generate_commissions.showPickerSheet = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/sheet').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il file per le statistiche delle presenze dei prof');
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
            generate_commissions.showPickerDocs();
        }
    };
    return generate_commissions;
}());
function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
}
function getDocName() {
    var docId = PropertiesService.getUserProperties().getProperty("docId");
    if (docId != null) {
        return DriveApp.getFileById(docId).getName();
    }
    else {
        return ("Non presente");
    }
}
function getFormName() {
    var formId = PropertiesService.getUserProperties().getProperty("formId");
    if (formId != null) {
        return DriveApp.getFileById(formId).getName();
    }
    else {
        return ("Non presente");
    }
}
function getSheetName() {
    var sheetId = PropertiesService.getUserProperties().getProperty("sheetId");
    if (sheetId != null) {
        return DriveApp.getFileById(sheetId).getName();
    }
    else {
        return ("Non presente");
    }
}
function changeDoc() {
    generate_commissions.showPickerDocs();
}
function changeForm() {
    generate_commissions.showPickerForm();
}
function changeSheet() {
    generate_commissions.showPickerForm();
}
function setFormId(id) {
    PropertiesService.getUserProperties().setProperty("formId", id);
    generate_commissions.showSettingFile();
}
function setDocId(id) {
    PropertiesService.getUserProperties().setProperty("docId", id);
    generate_commissions.showSettingFile();
}
function setSheetId(id) {
    PropertiesService.getUserProperties().setProperty("sheetId", id);
    generate_commissions.showSettingFile();
}
function shareFile() {
    var properties = PropertiesService.getUserProperties();
    var docId = properties.getProperty("docId");
    var formId = properties.getProperty("formId");
    doc_manager.shareDocToSupervisor(docId);
    form_manager.shareFormAvailability(formId);
}
