class form {

    //Funzione che invia Form per la disponibilità ai docenti dei cds
    public static shareFormAvailability(Id: string) {

        //id del Form da inviare
        let formId: string = Id;

        //Recupero il link pubblico per la condivisione del Form
        let formAvailability = FormApp.openById(formId);
        let formUrl: string = formAvailability.getPublishedUrl();

        //Elimino tutte le risposte all'interno del form
        formAvailability.deleteAllResponses();


        //Collego il form allo spreadsheet corrente per memorizzare le risposte
        let spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
        let spreadSheetId = spreadSheet.getId();
        formAvailability.setDestination(FormApp.DestinationType.SPREADSHEET, spreadSheetId);

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
            var emailTeachers = teacher.getEmailCdsTeachers(graduate.getCds());

            let i: number = 0;
            //Invio il form ai docenti dei cds
            for (i = 0; i < emailTeachers.length; i++) {
                MailApp.sendEmail(emailTeachers[i], object, messageText);
            }

            form.createTrigger();
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

    //Mostra i form presenti in drive
    public static showPickerForm() {

        let html = HtmlService.createHtmlOutputFromFile('html/forms').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Form per la richiesta di disponibilità');
    }
    public static getFormName(): string {

        var formId = PropertiesService.getUserProperties().getProperty("formId");
        if (formId != null) {
            return DriveApp.getFileById(formId).getName();
        }
        else {
            return ("Non presente");
        }
    }
}

