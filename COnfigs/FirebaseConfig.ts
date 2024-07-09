// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfXUfKug-bCDUUhmMoosXeSqaQHkmHrB4",
  authDomain: "aitravelplanner-5bb4e.firebaseapp.com",
  projectId: "aitravelplanner-5bb4e",
  storageBucket: "aitravelplanner-5bb4e.appspot.com",
  messagingSenderId: "821801274156",
  appId: "1:821801274156:web:94647e4149e54d4928fa89",
  measurementId: "G-ZL04FCRM78"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)