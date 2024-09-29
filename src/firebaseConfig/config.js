import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBuUcK6_7Iqg9OY60m3OyibcqYocXgM3-s",
  authDomain: "blogging-app-a5ca1.firebaseapp.com",
  projectId: "blogging-app-a5ca1",
  storageBucket: "blogging-app-a5ca1.appspot.com",
  messagingSenderId: "742064213706",
  appId: "1:742064213706:web:43a8f99f75a488926c6e33",
  measurementId: "G-VXTLWCNFYD"
};


export const app = initializeApp(firebaseConfig);

