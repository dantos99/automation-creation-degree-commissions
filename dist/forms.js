var forms = /** @class */ (function () {
    function forms() {
    }
    //Funzione che invia Form per la disponibilità ai docenti dei cds
    forms.shareFormAvailability = function (Id) {
        //id del Form da inviare
        var formId = Id;
        //Recupero il link pubblico per la condivisione del Form
        var form = FormApp.openById(formId);
        var formUrl = form.getPublishedUrl();
        //Elimino tutte le risposte all'interno del form
        form.deleteAllResponses();
        //Collego il form allo spreadsheet corrente per memorizzare le risposte
        var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
        var spreadSheetId = spreadSheet.getId();
        var existingSheets = spreadSheet.getSheets().map(function (sheet) { return sheet.getName(); });
        form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadSheetId);
        //Cambio il nome allo sheet che conterrà le risposte
        var responseSheet = spreadSheet.getSheets().find(function (sheet) { return !existingSheets.includes(sheet.getName()); });
        if (!responseSheet) {
            SpreadsheetApp.getUi().alert("Lo sheet per le risposte non è stato collegato correttamente");
        }
        else {
            responseSheet.setName("Risposte al Form");
            //Imposto l'email da iviare
            var object = "Form Disponibilità";
            var messageText = formUrl; //Da aggiungere frasi cordiali (es. Buongiorno..ecc)
            //Recupero le email dei docenti che insegnano nei cds dei laureandi
            var emailTeachers = teachers.getEmailCdsTeachers(degree.getCds());
            var i = 0;
            //Invio il form ai docenti dei cds
            for (i = 0; i < emailTeachers.length; i++) {
                MailApp.sendEmail(emailTeachers[i], object, messageText);
            }
            forms.createTrigger();
        }
    };
    forms.createTrigger = function () {
        var date = new Date();
        var dayAdded = 0;
        while (dayAdded < 3) {
            date.setDate(date.getDate() + 1);
            var dayOfWeek = date.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                dayAdded++;
            }
        }
        ScriptApp.newTrigger("commissions_manager.createCommission").timeBased().at(date).create();
    };
    //Mostra i forms presenti in drive
    forms.showPickerForm = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/forms').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Form per la richiesta di disponibilità');
    };
    return forms;
}());
function getFormName() {
    var formId = PropertiesService.getUserProperties().getProperty("formId");
    if (formId != null) {
        return DriveApp.getFileById(formId).getName();
    }
    else {
        return ("Non presente");
    }
}
function changeForm() {
    forms.showPickerForm();
}
function setFormId(id) {
    PropertiesService.getUserProperties().setProperty("formId", id);
    settings.showSettingFile();
}
