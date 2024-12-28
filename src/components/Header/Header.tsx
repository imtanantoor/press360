import { NavLink } from "react-router";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  return (
    <header className="container">
      <div className="header-topSection">
        <NavLink to="/">
          <h1 aria-label="Press 360 Home">Press 360</h1>
        </NavLink>
        <button>Login</button>
      </div>
      <div className=" header-contentContainer">
        <nav>
          <NavLink
            to="/sports"
            aria-label="Press Sports"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Sports
          </NavLink>
          <NavLink
            to="/entertainment"
            aria-label="Press Entertainment"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Entertainment
          </NavLink>
          <NavLink
            to="/science"
            aria-label="Press Science"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Science
          </NavLink>
        </nav>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
