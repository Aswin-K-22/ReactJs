import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import {login , signup} from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const [signState , setSignState] = useState('Sign In')
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [loading , setLoading] = useState(false)
  const [errors, setErrors] = useState({});


  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setErrors({});
  };

  const handleFormChange = (formName)=>{
    setSignState(formName);
    resetForm();

  }
  const validateForm = () => {
    const newErrors = {};
    if (signState === 'Sign Up' && !name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };





  
  const user_auth = async (event) =>{
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    if(signState==='Sign In'){
      await login(email , password)
   
    }else{
      await signup(name , email , password)
   
    }
    resetForm();
    setLoading(false);
  }

  return  loading ? (
    
    <div className='login-spinner'>
          <img src={netflix_spinner} alt="" />
    </div>) : (
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className='login-form'>
        <h1>{signState}</h1>
        <form  onSubmit={user_auth}>
          {signState === 'Sign Up'  && (
             <div className="form-group">
             <input 
             type="text"
              value={name} 
              onChange={(e)=>{setName(e.target.value)}}
               placeholder='Your Name'
                name="" id="" />
                 {errors.name && <span className="error">{errors.name}</span>}
                 </div>
        )}
         <div className="form-group">
          <input 
          type="email" 
          value={email} 
          onChange={(e)=>{setEmail(e.target.value)}} 
          placeholder='Your Email' name="" id="" 
          />
          {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">

          <input 
          type="password" 
          value={password} 
          onChange={(e)=>{setPassword(e.target.value)}} 
          placeholder='Enter Your Password' name="" id="" 
          />
           {errors.password && <span className="error">{errors.password}</span>}
           </div>

          <button type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
                < input type="checkbox"  />
                <label htmlFor="">Remember Me</label>

            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className='form-switch'>
          {signState === 'Sign In' ? (
             <p>
              New to Netflix?{' '} 
              <span onClick={()=>handleFormChange('Sign Up')}>Sign Up Now</span>
              </p> 
              ) :( <p>Already have Account?{' '}
              <span onClick={()=>handleFormChange('Sign In')}>Sign In Now</span>
              </p>
              )}      
        </div>
      </div>
    </div>
  );
};

export default Login
