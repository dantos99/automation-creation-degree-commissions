export class menu {

    static playMenu() {

        let menuIstance = new menu();
        menuIstance.showPickerDocs();
    }

    private showPickerDocs() {

        let html = HtmlService.createHtmlOutputFromFile('html/docs.html').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona un Documento');
    }

    static showPickerForm() {

        let html = HtmlService.createHtmlOutputFromFile('html/forms.html').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona un Form');
    }

    //Richiesta numero di laureandi oltre il quale creare più commissioni
    static requestGraduation(): string {

        let request3: string = "Inserire la soglia minima dei laureandi oltre la quale creare più di una commisione";
        let response = SpreadsheetApp.getUi().prompt(request3);
        let graduationThreshold = response.getResponseText();

        //Controllo parametro
        if (Number.isNaN(Number.parseInt(graduationThreshold))) {
            SpreadsheetApp.getUi().alert("Inserire un numero intero");
            menu.requestGraduation();
        }

        return graduationThreshold;
    }

}

function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
}

function nextStep(data: string) {
    if ((PropertiesService.getScriptProperties().getProperty("step")) == null) {
        PropertiesService.getScriptProperties().setProperty("docId", data);
        PropertiesService.getScriptProperties().setProperty("step", "docId");
    } else if ((PropertiesService.getScriptProperties().getProperty("step")) == "docId") {
        PropertiesService.getScriptProperties().setProperty("step", "formId");
        menu.showPickerForm();
    } else if ((PropertiesService.getScriptProperties().getProperty("step")) == "formId") {
        PropertiesService.getScriptProperties().setProperty("form", data);
        menu.requestGraduation();
    }
}