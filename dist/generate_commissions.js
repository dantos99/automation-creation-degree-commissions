"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var menu_1 = require("./menu");
function onOpen() {
    SpreadsheetApp.getUi().createMenu("Genera Commissioni").addItem('Genera', 'start').addToUi();
}
function start() {
    menu_1.menu.playMenu();
}
