var sheets = /** @class */ (function () {
    function sheets() {
    }
    sheets.compareResponseFormWithStatistics = function (responses) {
        var statistics = statistic_commission.getTeachersStatistics();
        statistics.sort(function (a, b) { return a.averagePresence - b.averagePresence; });
        var teacherSortWhitAverage = [];
        statistics.forEach(function (statistic) {
            responses.forEach(function (response) {
                if (statistic.name === response.name) {
                    teacherSortWhitAverage.push(new form_response(response.email, response.name, response.surname, response.available, response.start_time, response.end_time));
                }
            });
        });
        return teacherSortWhitAverage;
    };
    //Mostra gli sheet presenti in drive
    sheets.showPickerSheet = function () {
        var html = HtmlService.createHtmlOutputFromFile('html/sheet').setWidth(900).setHeight(500).setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi().showModalDialog(html, 'Seleziona il file per le statistiche delle presenze dei prof');
    };
    return sheets;
}());
//Mostra il nome dello sheet impostato
function getSheetName() {
    var sheetId = PropertiesService.getUserProperties().getProperty("sheetId");
    if (sheetId != null) {
        return DriveApp.getFileById(sheetId).getName();
    }
    else {
        return ("Non presente");
    }
}
//Cambia lo sheet
function changeSheet() {
    sheets.showPickerSheet();
}
//Imposta lo sheet
function setSheetId(id) {
    PropertiesService.getUserProperties().setProperty("sheetId", id);
    settings.showSettingFile();
}
