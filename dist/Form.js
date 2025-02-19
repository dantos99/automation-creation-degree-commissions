//Classe per gestire i file di tipo Google Form
var Form = /** @class */ (function () {
    function Form() {
    }
    //Funzione che invia Form per la disponibilità ai docenti dei cds
    Form.shareFormAvailability = function (Id) {
        //id del Form da inviare
        var formId = Id;
        //Recupero il link pubblico per la condivisione del Form
        var formAvailability = FormApp.openById(formId);
        var formUrl = formAvailability.getPublishedUrl();
        //Elimino tutte le risposte all'interno del form
        formAvailability.deleteAllResponses();
        //Collego il form allo spreadsheet corrente per memorizzare le risposte
        var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
        var spreadSheetId = spreadSheet.getId();
        formAvailability.setDestination(FormApp.DestinationType.SPREADSHEET, spreadSheetId);
        //Cambio il nome allo sheet che conterrà le risposte
        var responseSheet = spreadSheet.getSheets().find(function (sheet) { return sheet.getName().includes("Risposte del modulo"); });
        if (!responseSheet) {
            SpreadsheetApp.getUi().alert("Lo sheet per le risposte non è stato collegato correttamente");
        }
        else {
            responseSheet.setName(sheetFormName);
            //Imposto l'email da iviare
            var object = "Form Disponibilità";
            var messageText = formUrl; //Da aggiungere frasi cordiali (es. Buongiorno..ecc)
            //Recupero le email dei docenti che insegnano nei cds dei laureandi
            var emailTeachers = Teacher.getEmailCdsTeachers(Graduate.getCds());
            var i = 0;
            //Invio il form ai docenti dei cds
            for (i = 0; i < emailTeachers.length; i++) {
                MailApp.sendEmail(emailTeachers[i], object, messageText);
            }
            Form.createTrigger();
        }
    };
    //Metodo che crea un trigger che esegue la funzione createCommission dopo tre giorni lavorativi
    Form.createTrigger = function () {
        var date = new Date();
        var dayAdded = 0;
        while (dayAdded < 3) {
            date.setDate(date.getDate() + 1);
            var dayOfWeek = date.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                dayAdded++;
            }
        }
        ScriptApp.newTrigger("createCommission").timeBased().at(date).create();
    };
    //Mostra i form presenti in drive
    Form.showPickerForm = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/forms').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Form per la richiesta di disponibilità');
    };
    //Metodo che ritorna il Form impostato
    Form.getFormName = function () {
        var formId = PropertiesService.getUserProperties().getProperty("formId");
        if (formId != null) {
            return DriveApp.getFileById(formId).getName();
        }
        else {
            return ("Non presente");
        }
    };
    //Metodo per settare il Form
    Form.setFormId = function (id) {
        PropertiesService.getUserProperties().setProperty("formId", id);
        Setting.showSettingFile();
    };
    return Form;
}());
