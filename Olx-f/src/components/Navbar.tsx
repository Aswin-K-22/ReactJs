import logo from '../assets/olx.png';
import lens from '../assets/lens.png';
import arrow from '../assets/arrow.png';
import search from '../assets/search.png';
import userIcon from '../assets/guitar.png';
import Login from './Login';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/setUp';
import { User , signOut} from 'firebase/auth';
import {toast} from 'react-toastify'


type searchProp = {
  setSearch: any,
};

const Navbar = (props: searchProp) => {
  const navigate = useNavigate();
  const [loginPop, setLoginPop] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSellClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/sell');
    }
  };


  const handleLogout = async () =>{
   try {
      await signOut(auth)
      setUser(null)
      toast.success('Logged Out Successfully',{
         position : 'top-right',
         autoClose:2000
      })
   } catch (error) {
      console.error('LogOut err', error)
      toast.error('failed to log out . ',{
         position:'top-center',
         autoClose:2000
      })
   }
  }

  return (
    <>
      <div className='flex p-4 bg-slate-100 shadow-md'>
        <img src={logo} alt="" className='w-11 h-9' />
        <div className="flex border border-spacing-1 w-64 p-2 border-black ml-5 bg-white">
          <img src={lens} alt="" className='w-6 h-5 mt-1' />
          <input type="text" placeholder='Location' className='ml-5 outline-none' />
          <img src={arrow} alt="" className='w-8 h-7 ' />
        </div>
        <div className='flex h-12 ml-4 border border-black bg-white'>
          <input onChange={(e) => props?.setSearch(e.target.value)} type="text" placeholder='Find Cars, Mobile phones and more' className='ml-3 w-96 outline-none' />
          <img src={search} alt="" />
        </div>
        <div className='flex h-12 p-3 ml-10 cursor-pointer'>
          <h1 className='font-semibold'>ENGLISH</h1>
          <img src={arrow} alt="" className='w-8 h-7' />
        </div>
  

        {user ? (
          <div className='flex h-12 p-3 ml-10 cursor-pointer'>
            <img src={userIcon} alt="User Icon" className='w-8 h-8' /> 
            <button onClick={handleLogout} className='ml-2 text-lg text-red-500'>Logout</button>
          </div>
        ) : (
          <div onClick={() => setLoginPop(!loginPop)} className='flex h-12 p-3 ml-10 cursor-pointer underline hover:no-underline'>
            <h1 className='font-bold text-lg'>Login</h1>
          </div>
        )}


        <div onClick={user?handleSellClick:() => setLoginPop(!loginPop)}  className='w-28 flex h-12 p-2 ml-10 cursor-pointer rounded-full border border-yellow-500'>
          <h1 className='font-bold text-lg ml-3 '>+SELL</h1>
        </div>
      </div>
      {loginPop && <Login setLoginPop={setLoginPop} />}
    </>
  );
};

export default Navbar;
