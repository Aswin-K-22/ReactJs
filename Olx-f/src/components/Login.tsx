import guitar from '../assets/guitar.png'
import google from '../assets/google.png'
import phone from '../assets/phone.png'
import { signInWithPopup } from 'firebase/auth'
import { auth , googleProvider } from '../firebase/setUp'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'


type popupProp = {
    setLoginPop:any
}

const Login = (props:popupProp) => {


    const navigate = useNavigate()
    const googleSignin = async() =>{
        try {
            await signInWithPopup(auth , googleProvider)
            toast.success('Logged in SuccessFully!...',{
                position:'top-center',
                autoClose:2000
            })
            setTimeout(() => {
                navigate('/')
            }, 2000);
        } catch (error) {
            console.error(error)
            toast.error("Failed to log in. Please try again.");
        }
        
    }
  return (
        <>
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

<div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-96 sm:max-w-lg">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <h1 onClick={()=>props?.setLoginPop(false)} className='cursor-pointer font-semibold text-3xl'>X</h1>
        <div className="sm:flex sm:items-start">

            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            
            <div className="mt-2">
                <img src={guitar} className='w-20 h20 ml-32' alt="" />
                <p className="text-base font-medium mt-5 text-center">Help us become one of the safest Places <br/> to buy and sell</p>
                <div className='flex border-2 border-black p-2 rounded-md mt-12'>
                    <img src={phone} alt="" className='w-6 h-6'/>
                    <h1 className='font-semibold ml-3'>Continue with Phone</h1>
                </div>
                <div onClick={googleSignin} className='flex border-2 border-grey p-2 rounded-md mt-4'>
                    <img src={google} alt="" className='w-6 h-6'/>
                    <h1 className='font-semibold ml-24'>Continue with Google</h1>
                </div>
                <h1 className='text-center font-bold mt-4'>OR</h1>
                <h1 className='text-center font-semibold mt-4 underline cursor-pointer'>Login with Email</h1>
                <h1 className='text-center text-xs mt-36'>All your personal details are safe with us.</h1>
                <h1 className='text-center text-xs mt-4'>If you continue , you are accepting <span className='text-blue-600'> OLX Terms and Conditions and Privacy Policy</span> </h1>
            </div>
            </div>
        </div>
        </div>

    </div>
    </div>
</div>
</div>

        </>
  )
}

export default Login
