// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC25RqmTHx7cWSRsCgjF2Wuc4rBNBABVY",
  authDomain: "qorsheeye-bde5e.firebaseapp.com",
  projectId: "qorsheeye-bde5e",
  storageBucket: "qorsheeye-bde5e.appspot.com",
  messagingSenderId: "689564766095",
  appId: "1:689564766095:web:4ad25c5102b041570705fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
export {auth,db};
