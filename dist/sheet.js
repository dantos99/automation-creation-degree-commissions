var Sheet = /** @class */ (function () {
    function Sheet() {
    }
    Sheet.compareResponseFormWithStatistics = function (responses) {
        var statistics = Statistic_Commission.getTeachersStatistics();
        statistics.sort(function (a, b) { return a.averagePresence - b.averagePresence; });
        var teacherSortWhitAverage = [];
        statistics.forEach(function (statistic) {
            responses.forEach(function (response) {
                if (statistic.name === response.name) {
                    teacherSortWhitAverage.push(new Form_Response(response.email, response.name, response.surname, response.available, response.start_time, response.end_time));
                }
            });
        });
        return teacherSortWhitAverage;
    };
    //Mostra gli sheet presenti in drive
    Sheet.showPickerSheet = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/sheet').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il file per le statistiche delle presenze dei prof');
    };
    //Mostra il nome dello sheet impostato
    Sheet.getSheetName = function () {
        var sheetId = PropertiesService.getUserProperties().getProperty("sheetId");
        if (sheetId != null) {
            return DriveApp.getFileById(sheetId).getName();
        }
        else {
            return ("Non presente");
        }
    };
    //Imposta lo sheet
    Sheet.setSheetId = function (id) {
        PropertiesService.getUserProperties().setProperty("sheetId", id);
        Setting.showSettingFile();
    };
    return Sheet;
}());
