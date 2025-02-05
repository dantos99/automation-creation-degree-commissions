var degree = /** @class */ (function () {
    function degree(corso, graduate_name, graduate_surname, email_supervisor) {
        this.corso = corso;
        this.graduate_name = graduate_name;
        this.graduate_surname = graduate_surname;
        this.email_supervisor = email_supervisor;
    }
    //Funzione che restituisce le email dei relatori
    degree.getAllSupervisorEmail = function () {
        //Foglio Lauree
        var sheetMainName = "Foglio1";
        var sheetMain = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetMainName);
        if (!sheetMain) {
            SpreadsheetApp.getUi().alert("Sheet " + sheetMainName + " non presente");
        }
        else {
            //Creo un array con il contenuto della prima riga
            var valuesSheetMain = sheetMain.getDataRange().getValues();
            var headers = valuesSheetMain[0];
            var columnEmail_1 = "EMAIL_REL";
            //Cerco l'indice della colonna contenente le email dei relatori
            var indexColumnEmail_1 = headers.indexOf(columnEmail_1);
            if (indexColumnEmail_1 === -1) {
                throw new Error("Colonna '" + columnEmail_1 + "' non trovata.");
            }
            //Creo un array con le email dei relatori
            var email_1 = [];
            valuesSheetMain.forEach(function (row) {
                if (row[indexColumnEmail_1] != columnEmail_1) {
                    email_1.push(row[indexColumnEmail_1]);
                }
            });
            //Elimino i duplicati
            email_1 = Array.from(new Set(email_1));
            return email_1;
        }
    };
    degree.getCds = function () {
        var sheetMain = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Foglio1");
        //Creo un array con il contenuto della prima riga
        var valuesSheet = sheetMain.getDataRange().getValues();
        var headers = valuesSheet[0];
        var columnCDS = "CORSO";
        //Cerco l'indice della colonna contenente i corsi di studio
        var indexcolumnCDS = headers.indexOf(columnCDS);
        if (indexcolumnCDS === -1) {
            throw new Error("Colonna '" + columnCDS + "' non trovata.");
        }
        //Creo un array con i corsi di studio
        var cds = [];
        valuesSheet.forEach(function (row) {
            if (row[indexcolumnCDS] != columnCDS) {
                cds.push(row[indexcolumnCDS]);
            }
        });
        //Elimino i duplicati
        cds = Array.from(new Set(cds));
        return cds;
    };
    return degree;
}());
