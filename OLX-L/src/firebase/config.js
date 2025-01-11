import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { 
  addDoc, 
  collection, 
  getFirestore 
} from 'firebase/firestore';
import { toast } from "react-toastify";
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
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const googleProvider = new GoogleAuthProvider();

  const signup = async (name, email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      await addDoc(collection(db, 'user'), {
        uid: user.uid,
        name,
        authProvider: 'local',
        email,
      });
      toast.success("Signup successful!");
    } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(' '));
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
    } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(' '));
    }
  };


  const signupWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      const usersRef = collection(db, 'user');
      const existingUser = await addDoc(usersRef, {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
  
      if (!existingUser) {
        await addDoc(usersRef, {
          uid: user.uid,
          name: user.displayName,
          authProvider: 'google',
          email: user.email,
        });
      }
  
      toast.success("Google signup successful!");
    } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(' '));
    }
  };

  


const logout = () => {
  signOut(auth).then(() => {
    toast.success("Logged out successfully!");
  }).catch((error) => {
    console.log(error);
    toast.error("Error logging out");
  });
};


export {  auth, db, storage, googleProvider, signup, login, signupWithGoogle, logout };


