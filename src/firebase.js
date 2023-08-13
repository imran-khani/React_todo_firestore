// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to u0se
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdKF-DNEq0d_RZF2X94qqAlQ5senEKkNQ",
  authDomain: "advancereacttodo.firebaseapp.com",
  projectId: "advancereacttodo",
  storageBucket: "advancereacttodo.appspot.com",
  messagingSenderId: "343566274170",
  appId: "1:343566274170:web:bd1561261a31b17c9c35c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)