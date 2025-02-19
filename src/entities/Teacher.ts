//Nome dello sheet contenente l'elenco docenti
const sheetTeachersName: string = "Elenco Docenti";

//Classe per rappresentare i docenti
class Teacher {
    private name: string;
    private surname: string;
    private email: string;
    private cds: string;

    constructor(name: string, surname: string, email: string, cds: string) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.cds = cds;
    }

    //Funzione che restituisce le email dei prof dei tre cds
    public static getEmailCdsTeachers(cds: Array<string>): Array<string> {

        //Foglio Elenco Docenti

        let sheetTeachers = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTeachersName);
        if (!sheetTeachers) {

            SpreadsheetApp.getUi().alert("Sheet " + sheetTeachersName + " non presente");
        } else {

            let valuesSheetTeachers = sheetTeachers.getDataRange().getValues();
            const columnCDS = "CORSO";

            //Cerco la colonna contente i cds
            const headers = valuesSheetTeachers[0];
            const indexcolumnCDS = headers.indexOf(columnCDS);
            if (indexcolumnCDS === -1) {
                throw new Error("Colonna '" + columnCDS + "' non trovata.");
            }

            //Cerco la colonna contenente le email
            const indexEmailTeachers = headers.indexOf("EMAIL");
            if (indexcolumnCDS === -1) {
                throw new Error("Colonna '" + columnCDS + "' non trovata.");
            }

            let emails: Array<string> = [];

            //Riempio l'array con le email dei docenti che appartengono ai cds di interesse
            valuesSheetTeachers.forEach(function (row) {
                if (cds.includes(row[indexcolumnCDS])) {
                    emails.push(row[indexEmailTeachers], row[indexcolumnCDS]);
                }
            });
            emails = Array.from(new Set(emails));
            return emails;
        }
    }
}
