import  { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import "./App.css";
import { AuthContext, FirebaseContext } from "./store/Context";
import Post from "./store/PostContext";
import Home from "./Pages/Home";

function App() {
  const { user, setUser } = useContext(AuthContext); 
  const { auth } = useContext(FirebaseContext); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); 
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth, setUser]);

  return (
    <div>
      <Post>
        <Router>
          {/* Show a loading indicator while authentication state is being determined */}
          {isLoading ? (
            <div className="loading">
              <img src="../../../Images/olx-logo.png" alt="Loading" className="loading-logo" />
            </div>
          ) : (
            // Routes for authenticated and unauthenticated users
            <Routes>
              {/* Public Routes */}
              {!user && <Route path="/login" element={<Login />} />}
              {!user && <Route path="/signup" element={<Signup />} />}

              {/* Private Routes */}
              {user && <Route path="/create" element={<Create />} />}
              {user && <Route path="/view" element={<View />} />}

              {!user && <Route path="/view" element={<Navigate to='/login'/>} />}

              {/* Shared Routes */}
              <Route path="/" element={<Home />} />

              {/* Redirects */}
              {user && <Route path="/login" element={<Navigate to="/" />} />}
              {user && <Route path="/signup" element={<Navigate to="/" />} />}
              {!user && <Route path="/create" element={<Navigate to="/login" />} />}
            </Routes>
          )}
        </Router>
      </Post>
    </div>
  );
}

export default App;
