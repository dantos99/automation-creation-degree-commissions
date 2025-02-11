class statistic_commission {

    name: string;
    averagePresence: number;

    constructor(name: string, averagePresence: number) {
        this.name = name;
        this.averagePresence = averagePresence;
    }

    public static getTeachersStatistics(): Array<statistic_commission> {
        //Foglio di statistiche
        const file = DriveApp.getFileById(PropertiesService.getUserProperties().getProperty("sheetId"));
        if (!file) {
            SpreadsheetApp.getUi().alert("Sheet contenente le statistiche non trovato");
        } else {
            //Apro il foglio di statistiche
            let sheet = SpreadsheetApp.openById(PropertiesService.getUserProperties().getProperty("sheetId"));
            
            //Recupero i valori
            let values = sheet.getDataRange().getValues();
            
            //Intestazioni delle colonne
            let headers: Array<string> = values[0];

            //Cerco gli indici delle colonne che mi interessano
            let columnAverage: string = "Media presenze";
            let columnName: string = "Nome";       
            const indexColumnAverage: number = headers.indexOf(columnAverage);
            const indexColumnName: number = headers.indexOf(columnName);

            //Ritorno un array con le statistiche dei docenti
            let teachersStatistics: Array<statistic_commission> = [];
            values.forEach((row) => {
                if (row[indexColumnName] != "Nome") {

                    teachersStatistics.push(new statistic_commission(row[indexColumnName], row[indexColumnAverage]));
                }
            });
            return teachersStatistics;
        }
    }
}