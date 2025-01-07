import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword,
        getAuth,
        signInWithEmailAndPassword,
        signOut} from 'firebase/auth';
import {addDoc,
        collection,
        getFirestore} from 'firebase/firestore';
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCwjQrXHCozF234ZB0YXrDw6pH95VydfPE",
  authDomain: "netflix-clone-a4059.firebaseapp.com",
  projectId: "netflix-clone-a4059",
  storageBucket: "netflix-clone-a4059.firebasestorage.app",
  messagingSenderId: "416598773488",
  appId: "1:416598773488:web:af26c83aad428466dfbc35"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async(name , email , password)=>{
  try {
    const response = await createUserWithEmailAndPassword(auth , email , password)
    const user = response.user;
    await addDoc(collection(db,'user'),{
      uid:user.uid,
      name,
      authProvider:'local',
      email
    })
  } catch (error) {
      console.log(error)
      toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}


const login = async(email , password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


const logout = ()=>{
  signOut(auth)
}

export {auth,db,login,signup,logout}