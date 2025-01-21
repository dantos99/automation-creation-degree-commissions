"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var email_manager_1 = require("./email_manager");
var doc_manager = /** @class */ (function () {
    function doc_manager() {
    }
    //Funzione che condivide un Google doc con i relatori
    doc_manager.prototype.shareDocToSupervisor = function (Id) {
        //id del Google doc già fatto da inviare
        var docId = Id;
        //Recupero il file da Google Drive
        var docToDoList = DriveApp.getFileById(docId);
        //Recupero le email dei relatori 
        var emailRelatori = email_manager_1.email_manager.getAllTeachersEmail();
        var i = 0;
        //Condivido il documento
        for (i = 0; i < emailRelatori.length; i++) {
            docToDoList.addViewer(emailRelatori[i]);
        }
    };
    return doc_manager;
}());
