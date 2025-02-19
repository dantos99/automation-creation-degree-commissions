//Nome dello sheet contenente i laureandi
const sheetMainName = "Elenco Laureandi";

//Classe che rappresenta un laureando
class Graduate {

    email_supervisor: string;
    corso: string;

    constructor(email_supervisor: string, corso: string) {

        this.corso = corso;
        this.email_supervisor = email_supervisor;
    }

    //Funzione che restituisce le email dei relatori
    public static getAllEmailSupervisorOfGraduate(): Array<string> {

        //Foglio Lauree
        let sheetMain = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetMainName);

        //Controlle l'esistenza dello sheet
        if (!sheetMain) {
            SpreadsheetApp.getUi().alert("Sheet " + sheetMainName + " non presente");
        } else {

            //Creo un array con il contenuto della prima riga
            let valuesSheetMain: Array<Array<string>> = sheetMain.getDataRange().getValues();
            let headers: Array<string> = valuesSheetMain[0];


            const columnEmail: string = "EMAIL_REL";

            //Cerco l'indice della colonna contenente le email dei relatori
            const indexColumnEmail: number = headers.indexOf(columnEmail);
            if (indexColumnEmail === -1) {
                throw new Error("Colonna '" + columnEmail + "' non trovata.");
            }

            //Creo un array con le informazioni per ogni laureando
            let teachers: Array<string> = [];
            valuesSheetMain.forEach(function (row) {
                if (row[indexColumnEmail] != columnEmail) {
                    teachers.push(row[indexColumnEmail]);
                }
            })

            teachers = Array.from(new Set(teachers));
            return teachers;
        }
    }

    //Metodo per recuperare tutti i corsi di studio presenti
    public static getCds(): Array<string> {

        //Recupero lo sheet 
        let sheetMain = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetMainName);

        //Creo un array con il contenuto della prima riga
        let valuesSheet: Array<Array<string>> = sheetMain.getDataRange().getValues();
        const headers: Array<string> = valuesSheet[0];

        //Nome della colonna di interesse
        const columnCDS: string = "CORSO";

        //Cerco l'indice della colonna contenente i corsi di studio
        const indexcolumnCDS: number = headers.indexOf(columnCDS);

        if (indexcolumnCDS === -1) {
            throw new Error("Colonna '" + columnCDS + "' non trovata.");
        }

        //Creo un array con i corsi di studio
        let cds: Array<string> = [];
        valuesSheet.forEach(function (row) {
            if (row[indexcolumnCDS] != columnCDS) {
                cds.push(row[indexcolumnCDS]);
            }
        });
        
        //Elimino i duplicati
        cds = Array.from(new Set(cds));
        return cds;
    }
}