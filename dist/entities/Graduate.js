//Nome dello sheet contenente i laureandi
const sheetMainName = "Elenco Laureandi";
//Classe che rappresenta un laureando
class Graduate {
    constructor(email_supervisor, corso) {
        this.corso = corso;
        this.email_supervisor = email_supervisor;
    }
    //Funzione che restituisce le email dei relatori
    static getAllEmailSupervisorOfGraduate() {
        //Foglio Lauree
        let sheetMain = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetMainName);
        //Controlle l'esistenza dello sheet
        if (!sheetMain) {
            SpreadsheetApp.getUi().alert("Sheet " + sheetMainName + " non presente");
        }
        else {
            //Creo un array con il contenuto della prima riga
            let valuesSheetMain = sheetMain.getDataRange().getValues();
            let headers = valuesSheetMain[0];
            const columnEmail = "EMAIL_REL";
            //Cerco l'indice della colonna contenente le email dei relatori
            const indexColumnEmail = headers.indexOf(columnEmail);
            if (indexColumnEmail === -1) {
                throw new Error("Colonna '" + columnEmail + "' non trovata.");
            }
            //Creo un array con le informazioni per ogni laureando
            let teachers = [];
            valuesSheetMain.forEach(function (row) {
                if (row[indexColumnEmail] != columnEmail) {
                    teachers.push(row[indexColumnEmail]);
                }
            });
            teachers = Array.from(new Set(teachers));
            return teachers;
        }
    }
    //Metodo per recuperare tutti i corsi di studio presenti
    static getCds() {
        //Recupero lo sheet 
        let sheetMain = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetMainName);
        //Creo un array con il contenuto della prima riga
        let valuesSheet = sheetMain.getDataRange().getValues();
        const headers = valuesSheet[0];
        //Nome della colonna di interesse
        const columnCDS = "CORSO";
        //Cerco l'indice della colonna contenente i corsi di studio
        const indexcolumnCDS = headers.indexOf(columnCDS);
        if (indexcolumnCDS === -1) {
            throw new Error("Colonna '" + columnCDS + "' non trovata.");
        }
        //Creo un array con i corsi di studio
        let cds = [];
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
