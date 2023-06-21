import { useContext } from "react";
import "./navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()

  const logoutHandler = (x) => { 
    dispatch({type:"LOGOUT"})
    navigate("/login");
   }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Star Hotel Booking</span>
        </Link>
        {
          user ?
          (
            <>
            {user.username}
            <b onClick={logoutHandler}>logout</b>
            </>
          )
            :
            <div className="navItems">
              <button className="navButton">Register</button>
              <button className="navButton" onClick={logoutHandler}>Login</button>
            </div>
        }
      </div>
    </div>
  )
}

export default Navbar