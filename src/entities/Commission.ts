//Nome dello sheet che verrà creato contenente la prosposta di commissione
const sheetCommissionName = "Proposta di commissione";

 //Classe che rappresenta la commissione proposte
class Commission {

    //Metodo per creare una nuova proposta di commissione
    public static new(teachers: Array<Form_Response>) {

        //Recupera lo spreadsheet attivo
        let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

        //Crea un nuovo sheet 
        let sheet = spreadsheet.insertSheet(sheetCommissionName);

        //Trasforma l'array in bidimensionale per poter essere scritto sullo sheet
        let keys = Object.keys(teachers[0]);
        let teachersToStamp = teachers.map(obj => keys.map(key => (obj as { [key: string]: any })[key]));

        //Intestazioni per ogni colonna
        let headers = [["Email", "Nome", "Cognome", "Tipo di Disponibilità", "Ora inizio", "Ora fine"]];

        //Stampa i valori sullo sheet
        sheet.getRange(1, 1, 1, headers[0].length).setValues(headers).setFontWeight("bold");
        sheet.getRange(2, 1, teachersToStamp.length, headers[0].length).setValues(teachersToStamp);
    }
}