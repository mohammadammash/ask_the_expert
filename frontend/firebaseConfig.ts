// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwmDScEa3_9_iHyJNSxJzbkotmCcwGeJw",
  authDomain: "asktheexpert-40cf3.firebaseapp.com",
  projectId: "asktheexpert-40cf3",
  storageBucket: "asktheexpert-40cf3.appspot.com",
  messagingSenderId: "90068489206",
  appId: "1:90068489206:web:8e8dc223e70db08012edd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);