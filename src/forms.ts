

class forms {


    //Funzione che invia Form per la disponibilità ai docenti dei cds
    static shareFormAvailability(Id: string) {

        //id del Form da inviare
        let formId: string = Id;

        //Recupero il link pubblico per la condivisione del Form
        let form = FormApp.openById(formId);
        let formUrl: string = form.getPublishedUrl();

        //Elimino tutte le risposte all'interno del form
        form.deleteAllResponses();


        //Collego il form allo spreadsheet corrente per memorizzare le risposte
        let spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
        let spreadSheetId = spreadSheet.getId();
        form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadSheetId);

        //Cambio il nome allo sheet che conterrà le risposte
        let responseSheet = spreadSheet.getSheets().find(sheet => sheet.getName().includes("Risposte del modulo"));

        if (!responseSheet) {

            SpreadsheetApp.getUi().alert("Lo sheet per le risposte non è stato collegato correttamente");

        } else {

            responseSheet.setName("Risposte al Form");
            //Imposto l'email da iviare
            let object: string = "Form Disponibilità";
            let messageText: string = formUrl; //Da aggiungere frasi cordiali (es. Buongiorno..ecc)


            //Recupero le email dei docenti che insegnano nei cds dei laureandi
            var emailTeachers = teachers.getEmailCdsTeachers(degree.getCds());

            let i: number = 0;
            //Invio il form ai docenti dei cds
            for (i = 0; i < emailTeachers.length; i++) {
                MailApp.sendEmail(emailTeachers[i], object, messageText);
            }
            forms.createTrigger();
        }
    }

    private static createTrigger() {
        let date = new Date();
        let dayAdded = 0;
        while (dayAdded < 3) {
            date.setDate(date.getDate() + 1);
            let dayOfWeek = date.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                dayAdded++;
            }
        }
        ScriptApp.newTrigger("createCommission").timeBased().at(date).create();
    }

    //Mostra i forms presenti in drive
    static showPickerForm() {
        let html = HtmlService.createHtmlOutputFromFile('html/forms').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Form per la richiesta di disponibilità');
    }
}
function getFormName(){
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
function setFormId(id: string) {
    PropertiesService.getUserProperties().setProperty("formId", id);
    settings.showSettingFile();
}
