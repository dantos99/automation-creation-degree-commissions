import { email_manager } from "./email_manager";

export class form_manager {

    //Funzione che invia Form per la disponibilità ai docenti dei cds
    shareFormAvailability(Id: string) {

        //id del Form da inviare
        let formId: string = Id;

        //Recupero il link pubblico per la condivisione del Form
        let form = FormApp.openById(formId);
        let formUrl: string = form.getPublishedUrl();

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
}