var sheetMainName = "Elenco Laureandi";
var Graduate = /** @class */ (function () {
    function Graduate(email_supervisor, corso) {
        this.corso = corso;
        this.email_supervisor = email_supervisor;
    }
    //Funzione che restituisce le email dei relatori
    Graduate.getAllEmailSupervisorOfGraduate = function () {
        //Foglio Lauree
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
            //Creo un array con le informazioni per ogni laureando
            var teachers_1 = [];
            valuesSheetMain.forEach(function (row) {
                if (row[indexColumnEmail_1] != columnEmail_1) {
                    teachers_1.push(row[indexColumnEmail_1]);
                }
            });
            teachers_1 = Array.from(new Set(teachers_1));
            return teachers_1;
        }
    };
    Graduate.getCds = function () {
        var sheetMain = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetMainName);
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
    return Graduate;
}());
