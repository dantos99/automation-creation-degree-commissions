class response {

    //Oggetto per la rappresentazione delle risposte al form
    name: string;
    surname: string;
    available: string;
    startTime: string;
    endTime: string;
    constructor(name: string, surname: string, available: string, start: string, end: string) {
        this.name = name;
        this.surname = surname;
        this.available = available;
        this.startTime = start;
        this.endTime = end;
    }

    static compareWithStatistics(response: Array<response>) {
        //Foglio di statistiche
        let file = DriveApp.getFilesByName("Copia di Servizio in commissione lauree_anonimizzato");
        let sheet = SpreadsheetApp.open(file.next());
        let values = sheet.getDataRange().getValues();
        let headers: Array<string> = values[0];
        let average: Array<number> = [];
        let names = response.map(response => response.name);
        type teacher = {
            name: String,
            average: Number
        }
        let teachers: teacher[] = [];
        let columnAverage: string = "Media presenze";
        let columnName: string = "Nome";
        let indexColumnAverage: number = headers.indexOf(columnAverage);
        let indexColumnName: number = headers.indexOf(columnName);
        values.forEach(function (row) {
            if (names.includes(row[indexColumnName])) {
                teachers.push({ name: row[indexColumnName], average: row[indexColumnAverage] })
            }
        })
        return teachers;
    }
}