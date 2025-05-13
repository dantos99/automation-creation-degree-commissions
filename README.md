# Automazione Commissioni di Laurea con Google Apps Script

Questo progetto ha l'obiettivo di automatizzare la creazione di una **commissione di laurea** tramite l'uso di [Google Apps Script](https://developers.google.com/apps-script) sviluppato in **TypeScript**, grazie all'utilizzo del tool [clasp (Command Line Apps Script Projects)](https://github.com/google/clasp).

## ⚙️ Funzionalità

- Finestra di dialogo che permette di impostare i file utili.
- Lettura di documenti Google Sheet contenenti informazioni relative ai laureandi.
- Condivisione automatica dei Google Doc impostati tramite interfaccia.
- Condivisione del Gogle Form impostato inizialmente per la richiesta di disponibilità.
- Lettura delle risposte dopo 3 giorni.
- Creazione di un Google Sheet contenente i docenti che hanno dato disponibilità ordinati in base ad un file di statistiche impostato inizialmente.

## 📁 Struttura del progetto

Struttura del progetto modulare e sviluppata in TypeScript per una maggiore manutenibilità.
Il codice è sviluppato **in locale** e sincronizzato con Google Apps Script tramite `clasp`.

## 🚀 Requisiti

- Node.js
- NPM
- Google account
- [clasp](https://github.com/google/clasp) installato globalmente:
  ```bash
  npm install -g @google/clasp

## 🛠️ Setup del progetto

1.Clona il repository

git clone https://github.com/tuo-username/nome-repo.git
cd nome-repo

2.Installa le dipendenze

npm install

3.Configura clasp

  Autenticati:
  
    clasp login
  
  Collega il progetto a uno script Google Apps Script:

    clasp create --type sheets --title "Automazione Commissioni di Laurea"

  Compila TypeScript e sincronizza con Apps Script
  
    Per compilare e pushare:  
    
      npm run build
      clasp push
  
  Apri lo script su Apps Script Editor
    
    clasp open
