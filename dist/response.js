var response = /** @class */ (function () {
    function response(name, surname, available, start, end) {
        this.name = name;
        this.surname = surname;
        this.available = available;
        this.startTime = start;
        this.endTime = end;
    }
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
        values[0].forEach(function (row) {
            if (response.name.includes(row[indexColumnName])) {
                Logger.log("OK");
            }
        });
    };
    response.prototype.commissionSuggestion = function (teachers) {
    };
    return response;
}());
function prova() {
    response.compareWithStatistics(form_manager.selectResponse());
}
