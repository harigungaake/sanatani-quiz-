// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

// Firestore ke liye import add karna hai:
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKD0QM42c0zkcg2krMOlPnHB94Gt-pAu0",
  authDomain: "sanatani-quiz.firebaseapp.com",
  projectId: "sanatani-quiz",
  storageBucket: "sanatani-quiz.firebasestorage.app",
  messagingSenderId: "679912664019",
  appId: "1:679912664019:web:d4725ee956afff1287dd26",
  measurementId: "G-X7KNYJND2F"
};

// Firebase app initialize kar rahe hain
const app = initializeApp(firebaseConfig);

// Auth instance create kar rahe hain
const auth = getAuth(app);

// Firestore instance create karke export karna hoga
const db = getFirestore(app);

// Export auth, onAuthStateChanged jo already use ho raha tha, aur ab db bhi export karenge
export { auth, onAuthStateChanged, db };