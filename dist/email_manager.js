"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.email_manager = void 0;
var email_manager = /** @class */ (function () {
    function email_manager() {
        //SpreadSheet Attivo
        this.spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
        this.listTeacherSheetName = "elenco_docenti";
    }
    //Funzione che restituisce le email dei relatori
    email_manager.prototype.findSupervisorEmail = function () {
        //Foglio Lauree
        var sheet = new email_manager().spreadSheet.getActiveSheet();
        //Creo un array con il contenuto della prima riga
        var valuesSheet = sheet.getDataRange().getValues();
        var headers = valuesSheet[0];
        var columnEmail = "EMAIL_REL";
        //Cerco l'indice della colonna contenente le email dei relatori
        var indexColumnEmail = headers.indexOf(columnEmail);
        if (indexColumnEmail === -1) {
            throw new Error("Colonna '" + columnEmail + "' non trovata.");
        }
        //Creo un array con le email dei relatori
        var emailValue = sheet.getRange(2, indexColumnEmail + 1, sheet.getLastRow() - 1, 1).getValues();
        var email = this.map2Dto1D(emailValue);
        //Elimino i duplicati
        email = Array.from(new Set(email));
        return email;
    };
    //Funzione che restituisce le email dei prof dei tre cds
    email_manager.prototype.findAllTeachersEmail = function () {
        //Foglio Lauree
        var sheet = new email_manager().spreadSheet.getActiveSheet();
        //Creo un array con il contenuto della prima riga
        var valuesSheet = sheet.getDataRange().getValues();
        var headers = valuesSheet[0];
        var columnCDS = "GRUPPO_ESSE3";
        //Cerco l'indice della colonna contenente i corsi di studio
        var indexcolumnCDS = headers.indexOf(columnCDS);
        if (indexcolumnCDS === -1) {
            throw new Error("Colonna '" + columnCDS + "' non trovata.");
        }
        //Creo un array con i corsi di studio
        var cdsValue = sheet.getRange(2, indexcolumnCDS + 1, sheet.getLastRow() - 1, 1).getValues();
        var cds = this.map2Dto1D(cdsValue);
        //Elimino i duplicati
        cds = Array.from(new Set(cds));
        //Foglio Elenco Docenti
        var sheetTeachers = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(columnCDS);
        var valuesSheetTeachers = sheetTeachers === null || sheetTeachers === void 0 ? void 0 : sheetTeachers.getDataRange().getValues();
        var email = [];
        //Riempio l'array con le email dei docenti che appartengono ai cds di interesse 
        valuesSheetTeachers === null || valuesSheetTeachers === void 0 ? void 0 : valuesSheetTeachers.forEach(function (row) {
            if (cds.includes(row[2])) {
                email.push(row[0]);
            }
        });
        return email;
    };
    //Funzione per recuperare le email dei relatori
    email_manager.getSupervisorEmail = function () {
        var email = new email_manager();
        return email.findSupervisorEmail();
    };
    email_manager.getAllTeachersEmail = function () {
        var email = new email_manager();
        return email.findAllTeachersEmail();
    };
    //Funzione che trasforma l'array in monodimensionale
    email_manager.prototype.map2Dto1D = function (array2D) {
        var array1D = array2D.map(function (row) {
            return row[0];
        });
        return array1D;
    };
    return email_manager;
}());
exports.email_manager = email_manager;
