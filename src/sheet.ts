class sheet {
    public static compareResponseFormWithStatistics(responses: Array<form_response>): Array<form_response> {

        let statistics = statistic_commission.getTeachersStatistics();
        statistics.sort((a, b) => a.averagePresence - b.averagePresence)
        let teacherSortWhitAverage: Array<form_response> = [];
        statistics.forEach((statistic) => {
            responses.forEach((response) => {
                if (statistic.name === response.name) {
                    teacherSortWhitAverage.push(new form_response(response.email, response.name, response.surname, response.available, response.start_time, response.end_time));

                }
            });
        });

        return teacherSortWhitAverage;
    }

    //Mostra gli sheet presenti in drive
    public static showPickerSheet() {
        let html = HtmlService.createHtmlOutputFromFile('html/sheet').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il file per le statistiche delle presenze dei prof');
    }

    //Mostra il nome dello sheet impostato
    public static getSheetName(): string {
        var sheetId = PropertiesService.getUserProperties().getProperty("sheetId");
        if (sheetId != null) {
            return DriveApp.getFileById(sheetId).getName();
        }
        else {
            return ("Non presente");
        }
    }
}