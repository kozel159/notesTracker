import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// 🔧 Your Firebase config
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
const db = getDatabase();

// 🔐 Handle magic login link
if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = window.localStorage.getItem("emailForSignIn");
  if (!email) {
    email = prompt("Please confirm your email for login");
  }
  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      window.localStorage.removeItem("emailForSignIn");
      console.log("✅ Signed in as:", result.user.email);
    })
    .catch((error) => {
      console.error("❌ Sign-in error:", error);
    });
}

// 👤 Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("app-section").style.display = "block";
    document.getElementById(
      "user-email"
    ).textContent = `Logged in as: ${user.email}`;
  } else {
    document.getElementById("login-section").style.display = "block";
    document.getElementById("app-section").style.display = "none";
  }
});

// 📩 Send sign-in link
document.getElementById("sendLink").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const actionCodeSettings = {
    url: "https://note-tracker-kozel.netlify.app",
    handleCodeInApp: true,
  };

  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem("emailForSignIn", email);
      document.getElementById("login-message").textContent =
        "✅ Login link sent! Check your email.";
    })
    .catch((error) => {
      console.error("❌ Error sending login link:", error);
      document.getElementById("login-message").textContent =
        "❌ Failed to send link.";
    });
});

// 🧪 Test Realtime DB write
document.getElementById("test-write").addEventListener("click", () => {
  const testRef = ref(db, "test/" + Date.now());
  set(testRef, {
    message: "Hello from secure app!",
    user: auth.currentUser?.email || "unknown",
  })
    .then(() => {
      alert("✅ Write succeeded!");
    })
    .catch((error) => {
      alert("❌ Write failed: " + error.message);
    });
});
