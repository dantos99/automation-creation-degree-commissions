import { menu } from "./menu";
import { doc_manager } from "./doc_manager";
import { form_manager } from "./form_manager";

function onOpen() {
    SpreadsheetApp.getUi().createMenu("Genera Commissioni").addItem('Genera', 'start').addToUi();
}

function start() {
    menu.playMenu();
}










