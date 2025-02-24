//Classe che rappresenta le statistiche dei docenti 
class Statistic_Commission {
    constructor(name, averagePresence) {
        this.name = name;
        this.averagePresence = averagePresence;
    }
    //Metodo per recuperare le statistiche
    static getTeachersStatistics() {
        //Foglio di statistiche
        const file = DriveApp.getFileById(PropertiesService.getUserProperties().getProperty("sheetId"));
        //Controllo l'esistenza del file 
        if (!file) {
            SpreadsheetApp.getUi().alert("Sheet contenente le statistiche non trovato");
        }
        else {
            //Apro il foglio di statistiche
            let sheet = SpreadsheetApp.openById(PropertiesService.getUserProperties().getProperty("sheetId"));
            //Recupero i valori
            let values = sheet.getDataRange().getValues();
            //Intestazioni delle colonne
            let headers = values[0];
            //Cerco gli indici delle colonne che mi interessano
            let columnAverage = "Media presenze";
            let columnName = "Nome";
            const indexColumnAverage = headers.indexOf(columnAverage);
            const indexColumnName = headers.indexOf(columnName);
            //Ritorno un array con le statistiche dei docenti
            let teachersStatistics = [];
            values.forEach((row) => {
                if (row[indexColumnName] != "Nome") {
                    teachersStatistics.push(new Statistic_Commission(row[indexColumnName], row[indexColumnAverage]));
                }
            });
            return teachersStatistics;
        }
    }
}
