export class menu {

    protected ui = SpreadsheetApp.getUi();

    static playMenu(): void{

        let check = false;
        let docId: string = new menu().requestDoc();
        let formId: string = new menu().requestForm();
        let graduationThreshold: string = new menu().requestGraduation();

        //Controllo dei parametri
        try {
            while (check == false) {

                if (DriveApp.getFileById(docId)) {

                    if (DriveApp.getFileById(formId)) {
                        if (Number.parseInt(graduationThreshold)) {
                            check = true;
                        } else {
                            Logger.log("Errore: " + graduationThreshold + " non è un numero");
                        }
                    } else {
                        Logger.log("Errore: Form non trovato");
                        formId = new menu().requestForm();
                    }
                } else {
                    Logger.log("Errore: Doc non trovato");
                    docId = new menu().requestDoc();
                }
            }

        } catch (e) {
            Logger.log("Errore")
        }
    }

    //Richiesta id documento
    protected requestDoc(): string {

        let request1: string = "Inserire l'id del Google Doc da condividere con i relatori";
        let response = new menu().ui.prompt(request1);
        let docId = response.getResponseText();
        return docId;
    }

    //Richiesta numero di laureandi oltre il quale creare più commissioni
    protected requestGraduation(): string {

        let request3: string = "Inserire la soglia minima dei laureandi oltre la quale creare più di una commisione";
        let response = new menu().ui.prompt(request3);
        let graduationThreshold = response.getResponseText();
        return graduationThreshold;
    }
    //Richiesta id form
    protected requestForm(): string {

        let request2: string = "Inserire l'id del form per la richiesta di disponibilità";
        let response = new menu().ui.prompt(request2);
        let formId = response.getResponseText();
        return formId;
    }
}
