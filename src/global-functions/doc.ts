let doc = new Doc();

function getDocName() {
    return doc.getName();
}

function changeDoc() {
    doc.showPicker();
}

function setDocId(id: string) {
    doc.setId(id);
}