//Classe per gestire i file di tipo Google Sheet
class Sheet {

    //Metodo per comparare chi ha risposto al form in base ad una media delle presenze recuperata tramite il nome
    public compareResponseFormWithStatistics(responses: Array<Form_Response>): Array<Form_Response> {

        //Recupero le statistiche dei docenti
        let statistics: Array<Statistic_Commission> = new Statistic_Commission().getTeachersStatistics();;
        //Riordino le statistiche in base alla media
        statistics.sort((a, b) => a.getAveragePresence() - b.getAveragePresence())

        let teacherSortWhitAverage: Array<Form_Response> = [];
        //Inserisco in un nuovo array i docenti di interesse ordinati in base alla media delle presenze
        statistics.forEach((statistic) => {
            responses.forEach((response) => {
                if (statistic.getName() === response.getName()) {
                    teacherSortWhitAverage.push(new Form_Response(response.getEmail(), response.getName(), response.getSurname(), response.getAvailable(), response.getStartTime(), response.getEndTime()));

                }
            });
        });

        return teacherSortWhitAverage;
    }

    //Mostra gli sheet presenti in drive
    public showPicker() {
        let html = HtmlService.createHtmlOutputFromFile('html/sheet').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il file per le statistiche delle presenze dei prof');
    }

    //Mostra il nome dello sheet impostato
    public getName(): string {
        var sheetId = PropertiesService.getUserProperties().getProperty("sheetId");
        if (sheetId != null) {
            return DriveApp.getFileById(sheetId).getName();
        }
        else {
            return ("Non presente");
        }
    }

    //Imposta lo sheet
    public setId(id: string) {
        let setting = new Setting();
        PropertiesService.getUserProperties().setProperty("sheetId", id);
        setting.showSettingFile();
    }
}