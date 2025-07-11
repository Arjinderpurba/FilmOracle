// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9BXSO1pmhYfL5L0DVBUe8QkI-Ytf_QP8",
  authDomain: "netflix-gpt-87681.firebaseapp.com",
  projectId: "netflix-gpt-87681",
  storageBucket: "netflix-gpt-87681.firebasestorage.app",
  messagingSenderId: "1026131716518",
  appId: "1:1026131716518:web:5d1c84b19c74d1030ec767",
  measurementId: "G-14D912H67F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 

export const auth = getAuth();