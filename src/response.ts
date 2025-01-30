class response {

    //Oggetto per la rappresentazione delle risposte al form
    name: string;
    surname: string;
    available: string;
    startTime: string;
    endTime: string;
    average?: number;
    constructor(name: string, surname: string, available: string, start: string, end: string) {
        this.name = name;
        this.surname = surname;
        this.available = available;
        this.startTime = start;
        this.endTime = end;
    }
    private setAverage(average: number) {
        this.average = average;
    }

    static compareWithStatistics(responses: Array<response>) {
        //Foglio di statistiche
        let file = DriveApp.getFilesByName("Copia di Servizio in commissione lauree_anonimizzato");
        let sheet = SpreadsheetApp.open(file.next());
        let values = sheet.getDataRange().getValues();
        let headers: Array<string> = values[0];
        let columnAverage: string = "Media presenze";
        let columnName: string = "Nome";
        let indexColumnAverage: number = headers.indexOf(columnAverage);
        let indexColumnName: number = headers.indexOf(columnName);
        let names = responses.map(response => response.name)
        values.forEach(function (row) {
            if (names.includes(row[indexColumnName])) {
                responses.forEach(response => {
                    if (response.name == row[indexColumnName]) {
                        response.setAverage(row[indexColumnAverage]);
                    }
                });
            }
        })
        responses.sort((a, b) => (a.average! - b.average!));
        return responses;
    }

    static commissionSuggestion(teachers: Array<response>) {
        let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        let sheet = spreadsheet.insertSheet("Proposta di Commissione");
        let headers = [["Nome", "Cognome", "Tipo di Disponibilità", "Ora inizio", "Ora fine"]];
        let teachers1 = teachers.map((teacher)=>{return [teacher.name ,teacher.surname,teacher.available,teacher.startTime,teacher.endTime]});
        sheet.getRange(1, 1, 1, headers[0].length).setValues(headers).setFontWeight("bold");
        sheet.getRange(2, 1, teachers1.length, headers[0].length).setValues(teachers1);
    }
}