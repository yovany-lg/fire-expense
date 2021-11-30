// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv5GRS8YlAN-3rVkHyCb3OyYiwkLE5lSE",
  authDomain: "fire-expense.firebaseapp.com",
  projectId: "fire-expense",
  storageBucket: "fire-expense.appspot.com",
  messagingSenderId: "1094562230527",
  appId: "1:1094562230527:web:920e15298f2904c48cdcca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);