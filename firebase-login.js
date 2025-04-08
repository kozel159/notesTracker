import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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

initializeApp(firebaseConfig);

const auth = getAuth();

// 🔐 Try auto-login
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ Logged in as:", user.email);
    document.getElementById("login-section").style.display = "none";
    document.getElementById("app-section").style.display = "block";
  } else {
    console.log("🔓 Not logged in");
    document.getElementById("login-section").style.display = "block";
    document.getElementById("app-section").style.display = "none";
  }
});

// 🔐 Manual login button
document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("✅ Logged in:", userCredential.user.email);
    })
    .catch((error) => {
      console.error("❌ Login error:", error.message);
      alert("Login failed: " + error.message);
    });
});

// 🚪 Optional logout button
document.getElementById("logout-btn")?.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("🔒 Logged out");
  });
});
