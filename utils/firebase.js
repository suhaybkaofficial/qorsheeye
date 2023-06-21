// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Constants from "expo-constants";

const firebaseAPIKEY = Constants.manifest.extra.firebaseAPIKEY;
const authDomain = Constants.manifest.extra.authDomain;
const projectId = Constants.manifest.extra.projectId;
const storageBucket = Constants.manifest.extra.storageBucket;
const messagingSenderId = Constants.manifest.extra.messagingSenderId;
const appId = Constants.manifest.extra.appId;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:firebaseAPIKEY,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
export {auth,db};
