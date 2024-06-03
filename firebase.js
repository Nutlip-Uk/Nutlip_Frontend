// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5WNYsDt1rflQgezH133LrcYxd7PvLdb4",
  authDomain: "nutlipimages.firebaseapp.com",
  projectId: "nutlipimages",
  storageBucket: "nutlipimages.appspot.com",
  messagingSenderId: "223737850307",
  appId: "1:223737850307:web:8001ef4f78d3afd5f77576",
  measurementId: "G-DDFWDY8JS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };