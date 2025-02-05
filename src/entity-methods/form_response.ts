class form_response {
    email: string;
    name: string;
    surname: string;
    available: string;
    start_time: string;
    end_time: string;

    constructor(email: string, name: string, surname: string, available: string, start_time: string, end_time: string) {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.start_time = start_time;
        this.end_time = end_time;
    }
    static getFormResponses(): Array<form_response> {

        //Foglio che contiene le risposte
        let sheetResponse = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Risposte al Form");
        if (!sheetResponse) {
            SpreadsheetApp.getUi().alert("Sheet contenente le risposte del form non trovato");
        } else {

            //Valori inseriti nelle risposte
            let value = sheetResponse.getDataRange().getValues();

            let headers = value[0];

            //Array che conterrà le risposte
            let responses: Array<form_response> = [];

            //Trovo gli indici di tutti i campi che mi interessano
            const indexColumnEmail: number = headers.indexOf("Indirizzo email");
            if (indexColumnEmail === -1) {
                throw new Error("Colonna 'Disponibilità' non trovata.");
            }
            const indexColumnAvailable: number = headers.indexOf("Disponibilità");
            if (indexColumnAvailable === -1) {
                throw new Error("Colonna 'Disponibilità' non trovata.");
            }

            const indexColumnName: number = headers.indexOf("Nome");
            if (indexColumnName === -1) {
                throw new Error("Colonna 'Nome' non trovata.");
            }

            const indexColumnSurname: number = headers.indexOf("Cognome");
            if (indexColumnSurname === -1) {
                throw new Error("Colonna 'Cognome' non trovata.");
            }

            const indexColumnStartTime: number = headers.indexOf("Disponibile dalle ore");
            if (indexColumnStartTime === -1) {
                throw new Error("Colonna 'Disponibile dalle ore' non trovata.");
            }

            const indexColumnEndTime: number = headers.indexOf("Disponibile fino alle ore");
            if (indexColumnEndTime === -1) {
                throw new Error("Colonna 'Disponibile fino alle ore' non trovata.");
            }

            //Seleziono tutti i docenti che hanno dato disbonibilità
            value.forEach(function (row) {
                if ((row[indexColumnAvailable]) == "Disponibile") {
                    responses.push(new form_response(row[indexColumnEmail], row[indexColumnName], row[indexColumnSurname], row[indexColumnAvailable], " ", " "));
                } else if ((row[indexColumnAvailable]) == "Disponibile, ma solo in alcune fasce orarie") {
                    responses.push(new form_response(row[indexColumnEmail], row[indexColumnName], row[indexColumnSurname], row[indexColumnAvailable], Utilities.formatDate(row[indexColumnStartTime], Session.getScriptTimeZone(), "HH:mm"), Utilities.formatDate(row[indexColumnEndTime], Session.getScriptTimeZone(), "HH:mm")));
                }
            });
            return responses;
        }
    }
}