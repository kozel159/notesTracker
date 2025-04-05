import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
const firebaseConfig = {
  databaseURL:
    "https://notetracker-2e7d0-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "notes");

3;
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("note-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const noteData = {
        title: document.getElementById("title").value,
        note: document.getElementById("note").value,
        tag: document.getElementById("tags-container").value,
      };

      push(referenceInDB, noteData)
        .then(() => {
          console.log("Data saved successfully.");
          document.getElementById("note-form").reset();
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    });
});
