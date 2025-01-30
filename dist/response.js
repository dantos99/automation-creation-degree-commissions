var response = /** @class */ (function () {
    function response(name, surname, available, start, end) {
        this.name = name;
        this.surname = surname;
        this.available = available;
        this.startTime = start;
        this.endTime = end;
    }
    response.prototype.setAverage = function (average) {
        this.average = average;
    };
    response.compareWithStatistics = function (responses) {
        //Foglio di statistiche
        var file = DriveApp.getFilesByName("Copia di Servizio in commissione lauree_anonimizzato");
        var sheet = SpreadsheetApp.open(file.next());
        var values = sheet.getDataRange().getValues();
        var headers = values[0];
        var columnAverage = "Media presenze";
        var columnName = "Nome";
        var indexColumnAverage = headers.indexOf(columnAverage);
        var indexColumnName = headers.indexOf(columnName);
        var names = responses.map(function (response) { return response.name; });
        values.forEach(function (row) {
            if (names.includes(row[indexColumnName])) {
                responses.forEach(function (response) {
                    if (response.name == row[indexColumnName]) {
                        response.setAverage(row[indexColumnAverage]);
                    }
                });
            }
        });
        responses.sort(function (a, b) { return (a.average - b.average); });
        return responses;
    };
    response.commissionSuggestion = function (teachers) {
        var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = spreadsheet.insertSheet("Proposta di Commissione");
        var headers = [["Nome", "Cognome", "Tipo di Disponibilità", "Ora inizio", "Ora fine"]];
        var teachers1 = teachers.map(function (teacher) { return [teacher.name, teacher.surname, teacher.available, teacher.startTime, teacher.endTime]; });
        sheet.getRange(1, 1, 1, headers[0].length).setValues([headers]).setFontWeight("bold");
        sheet.getRange(2, 1, teachers1.length, headers[0].length).setValues(teachers1);
    };
    return response;
}());
function prova() {
    response.commissionSuggestion(response.compareWithStatistics(form_manager.selectResponse()));
}
