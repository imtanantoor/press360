import { NavLink } from "react-router";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  return (
    <header>
      <NavLink to="/">
        <h1 aria-label="Press 360 Home">Press 360</h1>
      </NavLink>
      <nav>
        <NavLink to="/sports" aria-label="Press Sports">
          Sports
        </NavLink>
        <NavLink to="/sports" aria-label="Press Sports">
          Sports
        </NavLink>
        <NavLink to="/sports" aria-label="Press Sports">
          Sports
        </NavLink>
      </nav>
      <SearchBar />
    </header>
  );
};

export default Header;
