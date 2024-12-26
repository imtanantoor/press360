import { NavLink } from "react-router";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  return (
    <header>
      <NavLink to="/">
        <h1 aria-label="Press 360 Home">Press 360</h1>
      </NavLink>
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
    </header>
  );
};

export default Header;
