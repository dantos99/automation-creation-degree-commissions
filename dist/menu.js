"use strict";
var menu = /** @class */ (function () {
    function menu() {
    }
    menu.prototype.playMenu = function () {
        var ui = SpreadsheetApp.getUi();
        var request1 = "Inserire l'id del Google Doc da condividere con i relatori";
        var request2 = "Inserire l'id del form per la richiesta di disponibilità";
        var request3 = "Inserire la soglia minima dei laureandi oltre la quale creare più di una commisione";
        var response = ui.prompt(request1);
        var docId = response.getResponseText();
        response = ui.prompt(request2);
        var fromId = response.getResponseText();
        response = ui.prompt(request3);
        var graduationThreshold = response.getResponseText();
        Number.parseInt(graduationThreshold);
        var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
        var stateSheet = spreadSheet.insertSheet();
        stateSheet.setName("Program_State");
    };
    return menu;
}());
