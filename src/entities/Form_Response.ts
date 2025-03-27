
//Classe che rappresenta le risposte al form
class Form_Response {
    private email: string;
    private name: string;
    private surname: string;
    private available: string;
    private start_time: string;
    private end_time: string;
    private sheetFormName = "Risposte al Form"; //Nome dello sheet dal quale recuperare le risposte

    constructor(email?: string, name?: string, surname?: string, available?: string, start_time?: string, end_time?: string) {

        this.email = email;
        this.name = name;
        this.surname = surname;
        this.available = available;
        this.start_time = start_time;
        this.end_time = end_time;
    }

    public getSheetName(): string {
        return this.sheetFormName;
    }

    public getEmail(): string {
        return this.email;
    }

    public getName(): string {
        return this.name;
    }

    public getSurname(): string {
        return this.surname;
    }

    public getAvailable(): string {
        return this.available;
    }
    public getStartTime(): string {

        return this.start_time
    }
    public getEndTime(): string {
        return this.end_time;
    }

    //Metodo per recuperare le risposte del form
    public getFormResponses(): Array<Form_Response> {

        //Foglio che contiene le risposte
        let sheetResponse = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(this.getSheetName());

        //Controllo l'esistenza dello sheet
        if (!sheetResponse) {
            SpreadsheetApp.getUi().alert("Sheet contenente le risposte del form non trovato");
        } else {

            //Valori inseriti nelle risposte
            let values = sheetResponse.getDataRange().getValues();

            let headers = values[0];
            values.slice(0, 1);
            //Array che conterrà le risposte
            let responses: Array<Form_Response> = [];

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
            values.forEach(function (row) {
                if ((row[indexColumnAvailable]) != "Non disponibile") {
                    if ((row[indexColumnAvailable]) == "Disponibile, ma solo in alcune fasce orarie") {
                        responses.push(new Form_Response(row[indexColumnEmail], row[indexColumnName], row[indexColumnSurname], row[indexColumnAvailable], Utilities.formatDate(row[indexColumnStartTime], Session.getScriptTimeZone(), "HH:mm"), Utilities.formatDate(row[indexColumnEndTime], Session.getScriptTimeZone(), "HH:mm")));
                    } else {
                        responses.push(new Form_Response(row[indexColumnEmail], row[indexColumnName], row[indexColumnSurname], row[indexColumnAvailable], " ", " "));
                    }
                }
            });
            return responses;
        }
    }

    public static getHeaders() {
        return [["Email", "Nome", "Cognome", "Tipo di Disponibilità", "Ora inizio", "Ora fine"]];
    }

    public serialize() {
        return [this.email, this.name, this.surname, this.available, this.start_time, this.end_time];
    }
}