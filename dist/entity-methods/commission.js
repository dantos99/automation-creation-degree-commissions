var commission = /** @class */ (function () {
    function commission() {
    }
    commission.new = function (teachers) {
        var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = spreadsheet.insertSheet("Proposta di Commissione");
        var headers = [["Nome", "Cognome", "Tipo di Disponibilità", "Ora inizio", "Ora fine"]];
        sheet.getRange(1, 1, 1, headers[0].length).setValues(headers).setFontWeight("bold");
        sheet.getRange(2, 1, teachers.length, headers[0].length).setValues([teachers]);
    };
    return commission;
}());
