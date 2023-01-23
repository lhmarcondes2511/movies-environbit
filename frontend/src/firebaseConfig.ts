// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6lvIUGDK_aoSv_4wjnQDeLvFHK-3OzIg",
  authDomain: "movies-9a939.firebaseapp.com",
  projectId: "movies-9a939",
  storageBucket: "movies-9a939.appspot.com",
  messagingSenderId: "352726803920",
  appId: "1:352726803920:web:65db470188afb2128345d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)