import { initializeApp } from "firebase/app";

import {getAuth , GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMRUGCCFxkVC_6yGQkKUGuCJrcGB81Db8",
  authDomain: "web-olx-clone.firebaseapp.com",
  projectId: "web-olx-clone",
  storageBucket: "web-olx-clone.firebasestorage.app",
  messagingSenderId: "310207945533",
  appId: "1:310207945533:web:6e974f4bafca4bffdb8354",
  measurementId: "G-W3S0BJV7Y6"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)