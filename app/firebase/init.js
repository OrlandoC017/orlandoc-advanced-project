// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwGUyN37G6Iesg_Qj09QqSx09my3LNL6M",
  authDomain: "advanced-project-summarist.firebaseapp.com",
  projectId: "advanced-project-summarist",
  storageBucket: "advanced-project-summarist.firebasestorage.app",
  messagingSenderId: "1096484511656",
  appId: "1:1096484511656:web:8ef3c5ddf532b778cc879d",
  measurementId: "G-F7GW97LCXK"
};

// Initialize Firebase
export const auth = getAuth();
const app = initializeApp(firebaseConfig);
