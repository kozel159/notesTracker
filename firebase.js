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
const referenceInDBNotes = ref(database, "notes");
const referenceInDBTodos = ref(database, "todos");

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "note-form") {
      event.preventDefault();

      const noteData = {
        title: document.getElementById("title").value,
        note: document.getElementById("note").value,
        tag: document.getElementById("tags-container").value,
      };

      push(referenceInDBNotes, noteData)
        .then(() => {
          console.log("Data saved successfully.");
          document.getElementById("note-form").reset();
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    }
  });

  onValue(referenceInDBNotes, (snapshot) => {
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

  document.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "todo-form") {
      event.preventDefault();

      const todoData = {
        title: document.getElementById("title").value,
        task: document.getElementById("task").value,
      };

      push(referenceInDBTodos, todoData)
        .then(() => {
          console.log("Data saved successfully.");
          event.target.reset();
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    }
  });

  onValue(referenceInDBTodos, (snapshot) => {
    const snapshotDoesExist = snapshot.exists();
    if (snapshotDoesExist) {
      const snapshotValues = snapshot.val();
      const todos = Object.values(snapshotValues);

      let todoGroup = "";

      todos.forEach((item) => {
        todoGroup += `
          
          <li><label class="custom-checkbox"><input type="checkbox"><span class="checkmark"></span></label>${item.title}</li>`;
      });

      document.getElementById("todo-storage-ul").innerHTML = todoGroup;
    }
  });
});
