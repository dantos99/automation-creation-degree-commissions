class doc_manager {

    //Funzione che condivide un Google doc con i relatori
    static shareDocToSupervisor(Id: string) {

        //id del Google doc già fatto da inviare
        let docId: string = Id;

        //Recupero il file da Google Drive
        let docToDoList = DriveApp.getFileById(docId);

        //Recupero le email dei relatori 
        let emailRelatori: Array<string> = email_manager.getSupervisorEmail();

        let i: number = 0;
        //Condivido il documento
        for (i = 0; i < emailRelatori.length; i++) {
            docToDoList.addViewer(emailRelatori[i]);
        }
    }
}