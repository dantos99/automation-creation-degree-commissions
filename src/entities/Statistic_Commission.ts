//Classe che rappresenta le statistiche dei docenti 
class Statistic_Commission {

    private name: string;
    private averagePresence: number;
    
    constructor(name?: string, averagePresence?: number) {


        this.name = name;
        this.averagePresence = averagePresence;
    }

    public getName() {
    
        return this.name;
    }

    public getAveragePresence() {

        return this.averagePresence;
    }

    //Metodo per recuperare le statistiche
    public getTeachersStatistics(): Array<Statistic_Commission> {

        //Foglio di statistiche
        const file = DriveApp.getFileById(PropertiesService.getUserProperties().getProperty("sheetId"));

        //Controllo l'esistenza del file 
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
            let teachersStatistics: Array<Statistic_Commission> = [];
            values.forEach((row) => {
                if (row[indexColumnName] != "Nome") {

                    teachersStatistics.push(new Statistic_Commission(row[indexColumnName], row[indexColumnAverage]));
                }
            });
            return teachersStatistics;
        }
    }
}