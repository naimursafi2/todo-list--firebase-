// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUcjhn8KequcsiOLZBKNiyQBjtFE2ZaH8",
  authDomain: "todo-app-38ba8.firebaseapp.com",
  projectId: "todo-app-38ba8",
  storageBucket: "todo-app-38ba8.firebasestorage.app",
  messagingSenderId: "1064449062108",
  appId: "1:1064449062108:web:63820c6097882e0a9af019"
};

// Initialize Firebase
const dbConfig = initializeApp(firebaseConfig);
export default dbConfig;