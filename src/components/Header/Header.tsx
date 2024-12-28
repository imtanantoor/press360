import { NavLink } from "react-router";
import SearchBar from "./SearchBar";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useState } from "react";
import { setIsLoggedIn, setUser } from "../../redux/userSlice";
import preferences from "../../assets/icons/preferencesIcon.png";

const TopSectionRight = () => {
  const { isLoggedIn, user } = useAppSelector((state: RootState) => state.user);
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  function handleDone() {
    setShowInput(false);
    dispatch(setUser({ name }));
    dispatch(setIsLoggedIn(true));
  }

  function handleLogout() {
    dispatch(setIsLoggedIn(false));
    dispatch(setUser(null));
  }

  if (isLoggedIn) {
    return (
      <div className="profile-icon-container">
        <img src={preferences} alt="user" />
        <button onClick={handleLogout} className="profile-icon">
          {user?.name[0].toUpperCase()}
        </button>
      </div>
    );
  }

  if (showInput) {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleDone();
            }
          }}
          style={{
            padding: "10px",
            borderRadius: "5px",
            marginRight: "10px",
            border: "1px solid #ccc",
          }}
        />
        <button disabled={!name} onClick={handleDone}>
          Done
        </button>
      </div>
    );
  }

  return <button onClick={() => setShowInput(true)}>Login</button>;
};

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
        </nav>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
