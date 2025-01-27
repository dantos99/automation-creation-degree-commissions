class generate_commissions {

    static start() {

        new generate_commissions().settingFile();
    }

    private settingFile() {
        let properties = PropertiesService.getScriptProperties();
        if ((properties.getProperty("docId")) != null && (properties.getProperty("formId")) != null) {
            let html = HtmlService.createHtmlOutputFromFile('html/setting.html').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
            SpreadsheetApp.getUi().showModalDialog(html, "");
        } else {
            generate_commissions.requestGraduation();
        }

    }

    //Mostra i documenti presenti in drive
    private showPickerDocs() {
        PropertiesService.getScriptProperties().setProperty("step", "docId");
        let html = HtmlService.createHtmlOutputFromFile('html/docs.html').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Documento da condividere con i relatori');
    }

    //Mostra i forms presenti in drive
    static showPickerForm(id: string) {
        PropertiesService.getScriptProperties().setProperty("step", "formId");
        let html = HtmlService.createHtmlOutputFromFile('html/forms.html').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Form per la richiesta di disponibilità');
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
            new generate_commissions().showPickerDocs();
        }
    }
}

function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
}

function nextStep(data: string) {
    if ((PropertiesService.getScriptProperties().getProperty("step")) == "docId") {
        PropertiesService.getScriptProperties().setProperty("docId", data);
        generate_commissions.showPickerForm(data);
    } else if ((PropertiesService.getScriptProperties().getProperty("step")) == "formId") {
        shareFile();
    }
}
function changeSetting() {
    generate_commissions.requestGraduation();
}
function shareFile() {
    let properties = PropertiesService.getScriptProperties();
    let docId = properties.getProperty("docId");
    let formId = properties.getProperty("formId");
    doc_manager.shareDocToSupervisor(docId);
    form_manager.shareFormAvailability(formId);
}