import { NavLink } from "react-router";
import SearchBar from "./SearchBar";
import TopSectionRight from "./TopRightSection";


const Header: React.FC = () => {
  return (
    <header className="container" style={{ paddingTop: 10 }}>
      <div className="header-topSection">
        <NavLink to="/">
          <h1 aria-label="Press 360 Home">Press 360</h1>
        </NavLink>
        <TopSectionRight />
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
          <NavLink
            to="/my-feed"
            aria-label="Press My Feed"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Feed
          </NavLink>
        </nav>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
