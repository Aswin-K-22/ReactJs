
import { useContext } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import { useNavigate } from "react-router-dom";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../store/Context";


function Header() {
    const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { logout  } = useContext(FirebaseContext);
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder="India" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find Cars, Mobile Phones and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>
            {user ? (
              `Welcome ${user.displayName}`
            ) : (
              <span
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer" }}
              >
                Login
              </span>
            )}
          </span>
          <hr />
        </div>
        {user && (
          <a>
            <span
              onClick={() => {
                logout();
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              Logout
            </span>
          </a>
        )}

 <div
  className="sellMenu"
  onClick={() => {
    if (user) {
        navigate("/create");
    } else {
        navigate("/login");
    }
  }}
>
  <SellButton></SellButton>
  <div className="sellMenuContent">
    <SellButtonPlus></SellButtonPlus>
    <span>SELL</span>
  </div>
</div>

      </div>
    </div>
  );
}

export default Header;