import { Link } from "react-router-dom";
import "./style.css";
function NavBar() {
  return (
    <div className="navBar">
      <Link className="btn btn-secondary" to="/">
        <i className="fas fa-home"></i> Home
      </Link>
      <span>Simple App With OpenLayers + ReactJS</span>
    </div>
  );
}

export default NavBar;
