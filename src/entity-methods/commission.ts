class commission {

    static new(teachers: Array<form_response>) {
        //Recupera lo spreadsheet attivo
        let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        
        //Crea un nuovo sheet 
        let sheet = spreadsheet.insertSheet("Proposta di Commissione");

        //Trasforma l'array in bidimensionale per poter essere scritto sullo sheet
        let keys = Object.keys(teachers[0]);
        let teachersToStamp = teachers.map(obj => keys.map(key => (obj as {[key:string]:any})[key]));
        
        //Intestazioni per ogni colonna
        let headers = [["Nome", "Cognome", "Tipo di Disponibilità", "Ora inizio", "Ora fine"]];
        
        //Stampa i valori sullo sheet
        sheet.getRange(1, 1, 1, headers[0].length).setValues(headers).setFontWeight("bold");
        sheet.getRange(2, 1, teachersToStamp.length, headers[0].length).setValues(teachersToStamp);
    }
}