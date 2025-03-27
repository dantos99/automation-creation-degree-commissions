//Classe per gestire i file di tipo Google Form
class Form {

    //Funzione che invia Form per la disponibilità ai docenti dei cds
    public shareFormAvailability(Id: string) {

        //id del Form da inviare
        const formId: string = Id;

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
            let formResponse: Form_Response = new Form_Response();

            responseSheet.setName(formResponse.getSheetName());
            //Imposto l'email da iviare
            let object: string = "Form Disponibilità";
            let messageText: string = formUrl; //Da aggiungere frasi cordiali (es. Buongiorno..ecc)

            let teacher = new Teacher();
            let graduate = new Graduate();
            //Recupero le email dei docenti che insegnano nei cds dei laureandi
            var emailTeachers = teacher.getEmailCdsTeachers(graduate.getCds());

            let i: number = 0;
            //Invio il form ai docenti dei cds
            for (i = 0; i < emailTeachers.length; i++) {
                MailApp.sendEmail(emailTeachers[i], object, messageText);
            }

            this.createTrigger();
        }

    }

    //Metodo che crea un trigger che esegue la funzione createCommission dopo tre giorni lavorativi
    private createTrigger() {

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
    public showPicker() {

        let html = HtmlService.createHtmlOutputFromFile('html/forms').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il Form per la richiesta di disponibilità');
    }

    //Metodo che ritorna il Form impostato
    public getName(): string {

        var formId = PropertiesService.getUserProperties().getProperty("formId");
        if (formId != null) {
            return DriveApp.getFileById(formId).getName();
        }
        else {
            return ("Non presente");
        }
    }

    //Metodo per settare il Form
    public setId(id: string) {
        let setting = new Setting();
        PropertiesService.getUserProperties().setProperty("formId", id);
        setting.showSettingFile();
    }
}

