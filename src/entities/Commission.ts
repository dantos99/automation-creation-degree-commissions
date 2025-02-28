
//Classe che rappresenta la commissione proposta
class Commission {

    //Nome dello sheet che verrà creato contenente la prosposta di commissione
    private sheetCommissionName = "Proposta di commissione";

    //Funzione che ritorna il nome dello sheet impostato
    public getSheetName(): string {

        return this.sheetCommissionName;
    }
    //Metodo per creare una nuova proposta di commissione
    public new(teachers: Array<Form_Response>) {

        //Recupera lo spreadsheet attivo
        let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

        //Crea un nuovo sheet 
        let sheet = spreadsheet.insertSheet(this.getSheetName());

        //Trasforma l'array in bidimensionale per poter essere scritto sullo sheet
        let teachersToStamp = teachers.map(obj => obj.serialize());

        //Intestazioni per ogni colonna
        let headers = Form_Response.getHeaders();

        //Stampa i valori sullo sheet
        sheet.getRange(1, 1, 1, headers[0].length).setValues(headers).setFontWeight("bold");
        sheet.getRange(2, 1, teachersToStamp.length, headers[0].length).setValues(teachersToStamp);
    }
}