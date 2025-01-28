var form_manager = /** @class */ (function () {
    function form_manager() {
    }
    //Funzione che invia Form per la disponibilità ai docenti dei cds
    form_manager.shareFormAvailability = function (Id) {
        //id del Form da inviare
        var formId = Id;
        //Recupero il link pubblico per la condivisione del Form
        var form = FormApp.openById(formId);
        var formUrl = form.getPublishedUrl();
        //Elimino tutte le risposte all'interno del form
        form.deleteAllResponses();
        //Collego il form allo spreadsheet corrente per memorizzare le risposte
        var spreadSheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
        form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadSheetId);
        //Imposto l'email da iviare
        var object = "Form Disponibilità";
        var messageText = formUrl; //Da aggiungere frasi cordiali (es. Buongiorno..ecc)
        //Recupero le email dei relatori
        var emailTeachers = email_manager.getAllTeachersEmail();
        var i = 0;
        //Invio il form ai docenti dei cds
        for (i = 0; i < emailTeachers.length; i++) {
            MailApp.sendEmail(emailTeachers[i], object, messageText);
        }
    };
    //Funzione che seleziona tutti i docenti che hanno risposto positivamente(che hanno dato disponibilità) al form
    form_manager.selectResponse = function () {
        //Foglio che contiene le risposte
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Risposte al modulo 1");
        //Valori inseriti nelle risposte
        var value = sheet.getDataRange().getValues();
        var headers = value[0];
        var columnAvailable = "Disponibilità";
        //Array che conterrà le risposte
        var responses = [];
        //Trovo gli indici di tutti i campi che mi interessano
        var indexColumnAvailable = headers.indexOf(columnAvailable);
        if (indexColumnAvailable === -1) {
            throw new Error("Colonna '" + columnAvailable + "' non trovata.");
        }
        var indexColumnName = headers.indexOf("Nome");
        if (indexColumnName === -1) {
            throw new Error("Colonna 'Nome' non trovata.");
        }
        var indexColumnSurname = headers.indexOf("Cognome");
        if (indexColumnSurname === -1) {
            throw new Error("Colonna 'Cognome' non trovata.");
        }
        var indexColumnStartTime = headers.indexOf("Disponibile dalle ore");
        if (indexColumnStartTime === -1) {
            throw new Error("Colonna 'Disponibile dalle ore' non trovata.");
        }
        var indexColumnEndTime = headers.indexOf("Disponibile fino alle ore");
        if (indexColumnEndTime === -1) {
            throw new Error("Colonna 'Disponibile fino alle ore' non trovata.");
        }
        value.forEach(function (row) {
            if ((row[indexColumnAvailable]) == "Disponibile") {
                responses.push(new response(row[indexColumnName], row[indexColumnSurname], row[indexColumnAvailable], " ", " "));
            }
            else if ((row[indexColumnAvailable]) == "Disponibile, ma solo in alcune fasce orarie") {
                responses.push(new response(row[indexColumnName], row[indexColumnSurname], row[indexColumnAvailable], row[indexColumnStartTime], row[indexColumnEndTime]));
            }
        });
        return responses;
    };
    return form_manager;
}());
