
import  { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useContext(FirebaseContext);


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});



  const validateFields = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      console.log( 'From signup page' ,"Name:", username, "Email:", email, "Password:", password, "Phone:", phone);

      await signup(username, email, password ,phone);

      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.code === "auth/email-already-in-use") {
        setErrors((prev) => ({ ...prev, email: "Email is already in use" }));
      } else if (error.code === "auth/weak-password") {
        setErrors((prev) => ({ ...prev, password: "Weak password" }));
      } else {
        console.log("Unhandled error:", error.message);
      }
    }
  };


  return (
<div>
      <div className="signupParentDiv">
        <img
          width="200px"
          height="200px"
          src="../../../Images/olx-logo.png"
          alt="OLX Logo"
        />
        <form onSubmit={handleSignup}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          {errors.username && <span className="error">{errors.username}</span>}
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>

        <a onClick={() => navigate("/login")}>Login</a>
      </div>
    </div>
  );
}