let doc = new Doc();
function getDocName() {
    return doc.getName();
}
function changeDoc() {
    doc.showPicker();
}
function setDocId(id) {
    doc.setId(id);
}
