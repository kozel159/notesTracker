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

const titleInputField = document.getElementById("title");
const submitBtn = document.getElementById("submit-btn");

onValue(referenceInDB, (snapshot) => {
  console.log(snapshot.val());
});

submitBtn.addEventListener("click", function () {
  push(referenceInDB, titleInputField.value);
  titleInputField.value = "";
});
