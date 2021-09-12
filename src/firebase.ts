// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfigDev = {
  apiKey: "AIzaSyCTG9Jax36GIZAF3sTl0GYhqma103o2mZ0",
  authDomain: "nenesan-clicker-dev.firebaseapp.com",
  projectId: "nenesan-clicker-dev",
  storageBucket: "nenesan-clicker-dev.appspot.com",
  messagingSenderId: "905810650612",
  appId: "1:905810650612:web:a2bc66c931fc66d22e05a1"
};

const firebaseConfigProd = {
  apiKey: "AIzaSyAScn8_08eKA0HYa2xOF4VLXrVthZ4h7go",
  authDomain: "nenesan-clicker.firebaseapp.com",
  projectId: "nenesan-clicker",
  storageBucket: "nenesan-clicker.appspot.com",
  messagingSenderId: "1002128382783",
  appId: "1:1002128382783:web:182a6d25069ea1fab8d18a",
  measurementId: "G-91CB05B24F"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfigProd);

export default firebase;
export const db = getFirestore();