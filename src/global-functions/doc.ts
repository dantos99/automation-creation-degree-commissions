function getDocName() {
    return new Doc().getName();
}

function changeDoc() {
    new Doc().showPicker();
}

function setDocId(id: string) {
    new Doc().setId(id);
}