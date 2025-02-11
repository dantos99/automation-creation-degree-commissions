var statistic_commission = /** @class */ (function () {
    function statistic_commission(name, averagePresence) {
        this.name = name;
        this.averagePresence = averagePresence;
    }
    statistic_commission.getTeachersStatistics = function () {
        //Foglio di statistiche
        var file = DriveApp.getFileById(PropertiesService.getUserProperties().getProperty("sheetId"));
        if (!file) {
            SpreadsheetApp.getUi().alert("Sheet contenente le statistiche non trovato");
        }
        else {
            //Apro il foglio di statistiche
            var sheet_1 = SpreadsheetApp.openById(PropertiesService.getUserProperties().getProperty("sheetId"));
            //Recupero i valori
            var values = sheet_1.getDataRange().getValues();
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
                    teachersStatistics_1.push(new statistic_commission(row[indexColumnName_1], row[indexColumnAverage_1]));
                }
            });
            return teachersStatistics_1;
        }
    };
    return statistic_commission;
}());
