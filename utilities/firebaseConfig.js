// Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWx-MZyCPLb0ul_wA5aqkf6PkJV5MOfCM",
  authDomain: "todo-list-2e604.firebaseapp.com",
  projectId: "todo-list-2e604",
  storageBucket: "todo-list-2e604.appspot.com",
  messagingSenderId: "63647824202",
  appId: "1:63647824202:web:d11efe854d797a1caa29b3",
  measurementId: "G-QM63DE45VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialze Firebase Authentication
export const auth = getAuth(app);

// Initialze Firestore
export const db = getFirestore(app);
