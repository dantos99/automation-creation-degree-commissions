"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.form_manager = void 0;
var email_manager_1 = require("./email_manager");
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
        var emailTeachers = email_manager_1.email_manager.getAllTeachersEmail();
        var i = 0;
        //Invio il form ai docenti dei cds
        for (i = 0; i < emailTeachers.length; i++) {
            MailApp.sendEmail(emailTeachers[i], object, messageText);
        }
    };
    return form_manager;
}());
exports.form_manager = form_manager;
