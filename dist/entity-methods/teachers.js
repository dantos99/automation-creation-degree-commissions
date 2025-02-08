var teachers = /** @class */ (function () {
    function teachers() {
    }
    //Funzione che restituisce le email dei prof dei tre cds
    teachers.getEmailCdsTeachers = function (cds) {
        //Foglio Elenco Docenti
        var sheetTeachersName = "elenco docenti";
        var sheetTeachers = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTeachersName);
        if (!sheetTeachers) {
            SpreadsheetApp.getUi().alert("Sheet " + sheetTeachersName + " non presente");
        }
        else {
            var valuesSheetTeachers = sheetTeachers.getDataRange().getValues();
            var columnCDS = "CORSO";
            //Cerco la colonna contente i cds
            var headers = valuesSheetTeachers[0];
            var indexcolumnCDS_1 = headers.indexOf(columnCDS);
            if (indexcolumnCDS_1 === -1) {
                throw new Error("Colonna '" + columnCDS + "' non trovata.");
            }
            //Cerco la colonna contenente le email
            var indexEmailTeachers_1 = headers.indexOf("EMAIL");
            if (indexcolumnCDS_1 === -1) {
                throw new Error("Colonna '" + columnCDS + "' non trovata.");
            }
            var email_1 = [];
            //Riempio l'array con le email dei docenti che appartengono ai cds di interesse
            valuesSheetTeachers.forEach(function (row) {
                if (cds.includes(row[indexcolumnCDS_1])) {
                    email_1.push(row[indexEmailTeachers_1]);
                }
            });
            email_1 = Array.from(new Set(email_1));
            return email_1;
        }
    };
    return teachers;
}());
