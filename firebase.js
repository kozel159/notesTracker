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

  onValue(referenceInDB, (snapshot) => {
    const snapshotDoesExist = snapshot.exists();
    if (snapshotDoesExist) {
      const snapshotValues = snapshot.val();
      const notes = Object.values(snapshotValues);

      notes.sort((a, b) => a.tag.localeCompare(b.tag));

      const result = {};

      notes.forEach((item) => {
        if (!result[item.tag]) {
          result[item.tag] = [];
        }
        result[item.tag].push(item);
      });
      console.log(result);

      let noteBlocks = "";

      for (const tag in result) {
        if (result.hasOwnProperty(tag)) {
          const tagGroup = result[tag];

          let noteGroup = `
          <div class="note-container">
          <h1 >${tag}</h1>
          <ul class="note-list">
            ${tagGroup
              .map(
                (noteObj) => `
              <li>
              <h3>${noteObj.title}<br></h3>
                <span>${noteObj.note}</span>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
          `;

          noteBlocks += noteGroup;
        }
      }

      document.getElementById("note-storage").innerHTML = noteBlocks;
    }
  });
});
