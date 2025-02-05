class commission {

    static new(teachers: Array<form_response>) {
        let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        let sheet = spreadsheet.insertSheet("Proposta di Commissione");
        let headers = [["Nome", "Cognome", "Tipo di Disponibilità", "Ora inizio", "Ora fine"]];
        sheet.getRange(1, 1, 1, headers[0].length).setValues(headers).setFontWeight("bold");
        sheet.getRange(2, 1, teachers.length, headers[0].length).setValues([teachers]);
    }
}