var response = /** @class */ (function () {
    function response(name, surname, available, start, end) {
        this.name = name;
        this.surname = surname;
        this.available = available;
        this.startTime = start;
        this.endTime = end;
    }
    response.compareWithStatistics = function (response) {
        //Foglio di statistiche
        var file = DriveApp.getFilesByName("Copia di Servizio in commissione lauree_anonimizzato");
        var sheet = SpreadsheetApp.open(file.next());
        var values = sheet.getDataRange().getValues();
        var headers = values[0];
        var average = [];
        var names = response.map(function (response) { return response.name; });
        var teachers = [];
        var columnAverage = "Media presenze";
        var columnName = "Nome";
        var indexColumnAverage = headers.indexOf(columnAverage);
        var indexColumnName = headers.indexOf(columnName);
        values.forEach(function (row) {
            if (names.includes(row[indexColumnName])) {
                teachers.push({ name: row[indexColumnName + 1], average: row[indexColumnAverage] });
            }
        });
        return teachers;
    };
    return response;
}());
