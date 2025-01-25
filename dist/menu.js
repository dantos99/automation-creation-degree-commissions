"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = void 0;
var menu = /** @class */ (function () {
    function menu() {
        this.ui = SpreadsheetApp.getUi();
        this.scriptProperty = PropertiesService.getScriptProperties();
    }
    menu.playMenu = function () {
        var menuIstance = new menu();
        menuIstance.showPickerDocs();
        var response = [];
        return response;
    };
    menu.prototype.showPickerDocs = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/docs.html').setWidth(800).setHeight(600).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona un Documento');
    };
    menu.prototype.showPickerForm = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/form.html').setWidth(800).setHeight(600).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona un Form');
    };
    //Richiesta numero di laureandi oltre il quale creare più commissioni
    menu.prototype.requestGraduation = function () {
        var request3 = "Inserire la soglia minima dei laureandi oltre la quale creare più di una commisione";
        var response = new menu().ui.prompt(request3);
        var graduationThreshold = response.getResponseText();
        //Controllo parametro
        if (Number.isNaN(Number.parseInt(graduationThreshold))) {
            this.ui.alert("Inserire un numero intero");
            this.requestGraduation();
        }
        return graduationThreshold;
    };
    menu.prototype.loadId = function (id) {
        new menu().scriptProperty.setProperty('fileId', id);
    };
    return menu;
}());
exports.menu = menu;
