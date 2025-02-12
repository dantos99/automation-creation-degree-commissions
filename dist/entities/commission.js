var sheetCommissionName = "Proposta di commissione";
var Commission = /** @class */ (function () {
    function Commission() {
    }
    Commission.new = function (teachers) {
        //Recupera lo spreadsheet attivo
        var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        //Crea un nuovo sheet 
        var sheet = spreadsheet.insertSheet(sheetCommissionName);
        //Trasforma l'array in bidimensionale per poter essere scritto sullo sheet
        var keys = Object.keys(teachers[0]);
        var teachersToStamp = teachers.map(function (obj) { return keys.map(function (key) { return obj[key]; }); });
        //Intestazioni per ogni colonna
        var headers = [["Email", "Nome", "Cognome", "Tipo di Disponibilità", "Ora inizio", "Ora fine"]];
        //Stampa i valori sullo sheet
        sheet.getRange(1, 1, 1, headers[0].length).setValues(headers).setFontWeight("bold");
        sheet.getRange(2, 1, teachersToStamp.length, headers[0].length).setValues(teachersToStamp);
    };
    return Commission;
}());
