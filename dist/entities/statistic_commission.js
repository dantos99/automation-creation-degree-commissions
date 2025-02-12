var Statistic_Commission = /** @class */ (function () {
    function Statistic_Commission(name, averagePresence) {
        this.name = name;
        this.averagePresence = averagePresence;
    }
    Statistic_Commission.getTeachersStatistics = function () {
        //Foglio di statistiche
        var file = DriveApp.getFileById(PropertiesService.getUserProperties().getProperty("sheetId"));
        if (!file) {
            SpreadsheetApp.getUi().alert("Sheet contenente le statistiche non trovato");
        }
        else {
            //Apro il foglio di statistiche
            var sheet = SpreadsheetApp.openById(PropertiesService.getUserProperties().getProperty("sheetId"));
            //Recupero i valori
            var values = sheet.getDataRange().getValues();
            //Intestazioni delle colonne
            var headers = values[0];
            //Cerco gli indici delle colonne che mi interessano
            var columnAverage = "Media presenze";
            var columnName = "Nome";
            var indexColumnAverage_1 = headers.indexOf(columnAverage);
            var indexColumnName_1 = headers.indexOf(columnName);
            //Ritorno un array con le statistiche dei docenti
            var teachersStatistics_1 = [];
            values.forEach(function (row) {
                if (row[indexColumnName_1] != "Nome") {
                    teachersStatistics_1.push(new Statistic_Commission(row[indexColumnName_1], row[indexColumnAverage_1]));
                }
            });
            return teachersStatistics_1;
        }
    };
    return Statistic_Commission;
}());
