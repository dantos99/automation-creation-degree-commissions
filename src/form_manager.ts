class form_manager {

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
        let spreadSheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
        form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadSheetId);

        //Imposto l'email da iviare
        let object: string = "Form Disponibilità";
        let messageText: string = formUrl; //Da aggiungere frasi cordiali (es. Buongiorno..ecc)

        //Recupero le email dei relatori
        var emailTeachers = email_manager.getAllTeachersEmail();

        let i: number = 0;
        //Invio il form ai docenti dei cds
        for (i = 0; i < emailTeachers.length; i++) {
            MailApp.sendEmail(emailTeachers[i], object, messageText);
        }
    }

    //Funzione che seleziona tutti i docenti che hanno risposto positivamente(che hanno dato disponibilità) al form
    static selectResponse() {

        //Foglio che contiene le risposte
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Risposte al modulo 1");

        //Valori inseriti nelle risposte
        let value = sheet.getDataRange().getValues();

        let headers = value[0];
        let columnAvailable: string = "Disponibilità";

        //Array che conterrà le risposte
        let responses: Array<response> = [];

        //Trovo gli indici di tutti i campi che mi interessano
        let indexColumnAvailable: number = headers.indexOf(columnAvailable);
        if (indexColumnAvailable === -1) {
            throw new Error("Colonna '" + columnAvailable + "' non trovata.");
        }
        let indexColumnName: number = headers.indexOf("Nome");
        if (indexColumnName === -1) {
            throw new Error("Colonna 'Nome' non trovata.");
        }
        let indexColumnSurname: number = headers.indexOf("Cognome");
        if (indexColumnSurname === -1) {
            throw new Error("Colonna 'Cognome' non trovata.");
        }
        let indexColumnStartTime: number = headers.indexOf("Disponibile dalle ore");
        if (indexColumnStartTime === -1) {
            throw new Error("Colonna 'Disponibile dalle ore' non trovata.");
        }
        let indexColumnEndTime: number = headers.indexOf("Disponibile fino alle ore");
        if (indexColumnEndTime === -1) {
            throw new Error("Colonna 'Disponibile fino alle ore' non trovata.");
        }

        //Seleziono tutti i docenti che hanno dato disbonibilità
        value.forEach(function (row) {
            if ((row[indexColumnAvailable]) == "Disponibile") {
                responses.push(new response(row[indexColumnName], row[indexColumnSurname], row[indexColumnAvailable], " ", " "));
            } else if ((row[indexColumnAvailable]) == "Disponibile, ma solo in alcune fasce orarie") {
                responses.push(new response(row[indexColumnName], row[indexColumnSurname], row[indexColumnAvailable], Utilities.formatDate(row[indexColumnStartTime], Session.getScriptTimeZone(), "HH:mm:ss"), Utilities.formatDate(row[indexColumnEndTime], Session.getScriptTimeZone(), "HH:mm:ss")));
            }
        });
        return responses;
    }
}