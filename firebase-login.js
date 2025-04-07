import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyALzwHUENOFTd_SBpMHzDGHVaBJng2uefg",
  authDomain: "notetracker-2e7d0.firebaseapp.com",
  databaseURL:
    "https://notetracker-2e7d0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "notetracker-2e7d0",
  storageBucket: "notetracker-2e7d0.firebasestorage.app",
  messagingSenderId: "558504822246",
  appId: "1:558504822246:web:feffcfd81b24fc6ee4c227",
  measurementId: "G-QH4QB85JZR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const actionCodeSettings = {
  url: "https://note-tracker-kozel.netlify.app", // Make sure this matches what you added to Firebase Auth settings
  handleCodeInApp: true,
};
document.addEventListener("DOMContentLoaded", function () {
  // Send the link
  document.getElementById("sendLink").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
      window.localStorage.setItem("emailForSignIn", email);
      alert("Check your inbox for the login link!");
    });
  });

  // Handle the login if link clicked
  if (isSignInWithEmailLink(auth, window.location.href)) {
    console.log("📩 Login link detected");

    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = prompt("Please enter your email:");
    }

    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        console.log("✅ Signed in as:", result.user.email);
        window.localStorage.removeItem("emailForSignIn");
      })
      .catch((error) => {
        console.error("❌ Error during sign-in", error);
      });
  }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("✅ Logged in as:", user.email);
      document.getElementById("login-section").style.display = "none";
      document.getElementById("app-section").style.display = "block";
    } else {
      console.log("❌ Not logged in");
      document.getElementById("login-section").style.display = "block";
      document.getElementById("app-section").style.display = "none";
    }
  });
});
