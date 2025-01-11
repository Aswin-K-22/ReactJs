import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = React.lazy(() => import('./pages/Home/Home'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Player = React.lazy(() => import('./pages/Player/Player'));

const App = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth , async(user)=>{
      if(user){
        console.log('Logged in');
        navigate('/')
      }else{
        console.log('Logged Out');
        navigate('/login');
      }
    })
  },[]);

  return (

    <div>
      <ToastContainer theme='dark'/>
      <Suspense fallback={<div>Loading...</div>}>
      
      <Routes>
          <Route path = '/' element={<Home/>} />
          <Route path = '/login' element={<Login/>} />
          <Route path='/player/:id' element={<Player/>}/>
      </Routes>
      </Suspense>
      
    </div>
  )
}

export default App

