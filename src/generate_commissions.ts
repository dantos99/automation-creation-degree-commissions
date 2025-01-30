class generate_commissions {

    static start() {
        generate_commissions.showSettingFile();
    }

    //Mostra la pagina di impostaizioni dell'utente
    static showSettingFile() {
        let html = HtmlService.createHtmlOutputFromFile('html/setting.html').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, " ");
    }

    //Mostra i documenti presenti in drive
    static showPickerDocs() {
        let html = HtmlService.createHtmlOutputFromFile('html/docs').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Documento da condividere con i relatori');
    }

    //Mostra i forms presenti in drive
    static showPickerForm() {
        let html = HtmlService.createHtmlOutputFromFile('html/forms').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Form per la richiesta di disponibilità');
    }

    //Mostra gli sheet presenti in drive
    static showPickerSheet() {
        let html = HtmlService.createHtmlOutputFromFile('html/sheet').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il file per le statistiche delle presenze dei prof');
    }

    //Richiesta numero di laureandi oltre il quale creare più commissioni
    static requestGraduation() {

        let request: string = "Inserire la soglia minima dei laureandi oltre la quale creare più di una commisione";
        let response = SpreadsheetApp.getUi().prompt(request);
        let graduationThreshold = response.getResponseText();

        //Controllo parametro
        if (Number.isNaN(Number.parseInt(graduationThreshold))) {
            SpreadsheetApp.getUi().alert("Inserire un numero intero");
            generate_commissions.requestGraduation();
        } else {
            generate_commissions.showPickerDocs();
        }
    }
}

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
function setFormId(id: string) {
    PropertiesService.getUserProperties().setProperty("formId", id);
    generate_commissions.showSettingFile();
}
function setDocId(id: string) {
    PropertiesService.getUserProperties().setProperty("docId", id);
    generate_commissions.showSettingFile();
}
function setSheetId(id: string) {
    PropertiesService.getUserProperties().setProperty("sheetId", id);
    generate_commissions.showSettingFile();
}
function shareFile() {
    let properties = PropertiesService.getUserProperties();
    let docId = properties.getProperty("docId");
    let formId = properties.getProperty("formId");
    doc_manager.shareDocToSupervisor(docId);
    form_manager.shareFormAvailability(formId);
}