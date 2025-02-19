//Nome dello sheet dal quale recuperare le risposte
var sheetFormName = "Risposte al Form";
//Classe che rappresenta le risposte al form
var Form_Response = /** @class */ (function () {
    function Form_Response(email, name, surname, available, start_time, end_time) {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.available = available;
        this.start_time = start_time;
        this.end_time = end_time;
    }
    //Metodo per recuperare le risposte del form
    Form_Response.getFormResponses = function () {
        //Foglio che contiene le risposte
        var sheetResponse = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetFormName);
        //Controllo l'esistenza dello sheet
        if (!sheetResponse) {
            SpreadsheetApp.getUi().alert("Sheet contenente le risposte del form non trovato");
        }
        else {
            //Valori inseriti nelle risposte
            var value = sheetResponse.getDataRange().getValues();
            var headers = value[0];
            //Array che conterrà le risposte
            var responses_1 = [];
            //Trovo gli indici di tutti i campi che mi interessano
            var indexColumnEmail_1 = headers.indexOf("Indirizzo email");
            if (indexColumnEmail_1 === -1) {
                throw new Error("Colonna 'Disponibilità' non trovata.");
            }
            var indexColumnAvailable_1 = headers.indexOf("Disponibilità");
            if (indexColumnAvailable_1 === -1) {
                throw new Error("Colonna 'Disponibilità' non trovata.");
            }
            var indexColumnName_1 = headers.indexOf("Nome");
            if (indexColumnName_1 === -1) {
                throw new Error("Colonna 'Nome' non trovata.");
            }
            var indexColumnSurname_1 = headers.indexOf("Cognome");
            if (indexColumnSurname_1 === -1) {
                throw new Error("Colonna 'Cognome' non trovata.");
            }
            var indexColumnStartTime_1 = headers.indexOf("Disponibile dalle ore");
            if (indexColumnStartTime_1 === -1) {
                throw new Error("Colonna 'Disponibile dalle ore' non trovata.");
            }
            var indexColumnEndTime_1 = headers.indexOf("Disponibile fino alle ore");
            if (indexColumnEndTime_1 === -1) {
                throw new Error("Colonna 'Disponibile fino alle ore' non trovata.");
            }
            //Seleziono tutti i docenti che hanno dato disbonibilità
            value.forEach(function (row) {
                if ((row[indexColumnAvailable_1]) != "Non Disponibile") {
                    if ((row[indexColumnAvailable_1]) == "Disponibile, ma solo in alcune fasce orarie") {
                        responses_1.push(new Form_Response(row[indexColumnEmail_1], row[indexColumnName_1], row[indexColumnSurname_1], row[indexColumnAvailable_1], Utilities.formatDate(row[indexColumnStartTime_1], Session.getScriptTimeZone(), "HH:mm"), Utilities.formatDate(row[indexColumnEndTime_1], Session.getScriptTimeZone(), "HH:mm")));
                    }
                    else {
                        responses_1.push(new Form_Response(row[indexColumnEmail_1], row[indexColumnName_1], row[indexColumnSurname_1], row[indexColumnAvailable_1], " ", " "));
                    }
                }
            });
            return responses_1;
        }
    };
    return Form_Response;
}());
