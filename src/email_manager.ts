class email_manager {

    //SpreadSheet Attivo
    protected spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    //Nome sheet principale
    protected sheetMain: string = "Foglio1";

    //Funzione che restituisce le email dei relatori
    private findSupervisorEmail(): Array<string> {

        //Foglio Lauree
        let sheet = this.spreadSheet.getSheetByName(this.sheetMain);

        //Creo un array con il contenuto della prima riga
        let valuesSheet: Array<Array<string>> = sheet.getDataRange().getValues();
        let headers: Array<string> = valuesSheet[0];

        let columnEmail: string = "EMAIL_REL";

        //Cerco l'indice della colonna contenente le email dei relatori
        let indexColumnEmail: number = headers.indexOf(columnEmail);
        if (indexColumnEmail === -1) {
            throw new Error("Colonna '" + columnEmail + "' non trovata.");
        }

        //Creo un array con le email dei relatori
        let emailValue = sheet.getRange(2, indexColumnEmail + 1, sheet.getLastRow() - 1, 1).getValues();
        emailValue = sheet.getRange(2, indexColumnEmail + 1, emailValue.filter(String).length, 1).getValues();

        let email: Array<string> = this.map2Dto1D(emailValue);

        //Elimino i duplicati
        email = Array.from(new Set(email));

        return email;
    }

    //Funzione che restituisce le email dei prof dei tre cds
    private findAllTeachersEmail(): Array<string> {
        //Foglio Lauree
        let sheet = this.spreadSheet.getSheetByName(this.sheetMain);

        //Creo un array con il contenuto della prima riga
        let valuesSheet: Array<Array<string>> = sheet.getDataRange().getValues();
        let headers: Array<string> = valuesSheet[0];

        let columnCDS: string = "CORSO";

        //Cerco l'indice della colonna contenente i corsi di studio
        let indexcolumnCDS: number = headers.indexOf(columnCDS);

        if (indexcolumnCDS === -1) {
            throw new Error("Colonna '" + columnCDS + "' non trovata.");
        }

        //Creo un array con i corsi di studio
        let cdsValue = sheet.getRange(2, indexcolumnCDS + 1, sheet.getLastRow() - 1, 1).getValues();

        let cds: Array<string> = this.map2Dto1D(cdsValue);

        //Elimino i duplicati
        cds = Array.from(new Set(cds));

        //Foglio Elenco Docenti
        let sheetName: string = "elenco docenti";
        let sheetTeachers = new email_manager().spreadSheet.getSheetByName(sheetName);
        let valuesSheetTeachers = sheetTeachers?.getDataRange().getValues();

        //Cerco la colonna contente i cds
        headers = valuesSheetTeachers[0];
        indexcolumnCDS = headers.indexOf(columnCDS);
        if (indexcolumnCDS === -1) {
            throw new Error("Colonna '" + columnCDS + "' non trovata.");
        }

        //Cerco la colonna contenente le email
        let indexEmailTeachers = headers.indexOf("EMAIL");
        if (indexcolumnCDS === -1) {
            throw new Error("Colonna '" + columnCDS + "' non trovata.");
        }

        //Elimino i duplicati
        valuesSheetTeachers = Array.from(new Set(valuesSheetTeachers));

        let email: Array<string> = [];

        //Riempio l'array con le email dei docenti che appartengono ai cds di interesse 
        valuesSheetTeachers?.forEach(function (row) {
            if (cds.includes(row[indexcolumnCDS])) {
                email.push(row[indexEmailTeachers]);
            }
        });
        email = email.filter(value => value !== "");
        return email;
    }

    //Funzione per recuperare le email dei relatori
    static getSupervisorEmail(): Array<string> {
        let email = new email_manager();
        return email.findSupervisorEmail();
    }

    //Funzione per recuperare le email di tutti i docenti dei cds presenti
    static getAllTeachersEmail(): Array<string> {
        let email = new email_manager();
        return email.findAllTeachersEmail();
    }

    //Funzione che trasforma l'array in monodimensionale
    private map2Dto1D(array2D: Array<Array<string>>): Array<string> {
        let array1D = array2D.map(function (row: Array<string>) {
            return row[0];
        });
        return array1D;
    }
}