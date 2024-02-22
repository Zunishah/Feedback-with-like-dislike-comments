// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo2TBfmpqJLw43uRCrOAiQZb3bXEu1pyo",
  authDomain: "feedback-5b3e5.firebaseapp.com",
  projectId: "feedback-5b3e5",
  storageBucket: "feedback-5b3e5.appspot.com",
  messagingSenderId: "676733590077",
  appId: "1:676733590077:web:0d102e12d6063f903ce854",
  measurementId: "G-TV4N3TSD4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app } 