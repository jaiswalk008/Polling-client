import { Link, useNavigate } from "react-router-dom";
import './Polling.css'
import { useDispatch } from "react-redux";
import { authActions } from "../Context/store";
const Header = () => {
  const dispatch = useDispatch(); 
  const navigate= useNavigate();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate('/login');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <h3 className="navbar-brand">Polling App</h3>
        <div className="ms-auto navbar-div">
          <button className="btn  me-2">
            <Link to="/" className="text-light text-decoration-none">Home</Link>
          </button>
          <button className="btn  me-2">
            <Link to="/profile" className="text-light text-decoration-none">Profile</Link>
          </button>
          <button onClick={logoutHandler} className="btn btn-dark">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
