/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable func-names */

const form = document.forms.eventForm;
const nameInput = form.name;
const participantsInput = form.participants;
const dayInput = form.day;
const timeInput = form.time;

let db;

window.onload = function () {
  let openRequest = indexedDB.open("calendar", 1);

  openRequest.onupgradeneeded = function () {
    db = openRequest.result;
    let eventStore = db.createObjectStore("events", {
      keyPath: "id",
      autoIncrement: true,
    });
    eventStore.createIndex("name", "name", { unique: false });
    eventStore.createIndex("participants", "participants", { unique: false });
    eventStore.createIndex("dayTime", "dayTime", { unique: true });
    console.log("Database setup complete");
  };

  openRequest.onerror = function () {
    console.error("Error", openRequest.error);
  };

  openRequest.onsuccess = function () {
    console.log("Database opened succesfully");
    db = openRequest.result;
  };

  form.onsubmit = (e) => {
    e.preventDefault();

    let event = {
      name: nameInput.value,
      participants: participantsInput.value,
      dayTime: dayInput.value + timeInput.value,
    };

    let transaction = db.transaction(["events"], "readwrite");

    let eventStore = transaction.objectStore("events");

    let addRequest = eventStore.add(event);
    addRequest.onsuccess = function () {
      nameInput.value = "";
      participantsInput.value = "Choose...";
      dayInput.value = "Choose...";
      timeInput.value = "Choose...";
    };

    transaction.oncomplete = function () {
      console.log("Transaction completed: database modification finished.");
      displayCalendar();
    };

    transaction.onerror = function () {
      console.log("Transaction not opened due to error");
    };
  };

  function displayCalendar() {
    console.log("Ok!");
  }
};
