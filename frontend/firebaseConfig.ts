// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

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
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
//storage
export const storage = getStorage(app);