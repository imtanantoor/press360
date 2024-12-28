import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useState } from "react";
import { setIsLoggedIn, setUser, logout } from "../../redux/userSlice";
import preferences from "../../assets/icons/preferencesIcon.png";
import { openPreferencesPopup } from "../../redux/preferencesPopupSlice";

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
    dispatch(logout());
  }

  if (isLoggedIn) {
    return (
      <div className="profile-icon-container">
        <img
          src={preferences}
          alt="user"
          onClick={() => dispatch(openPreferencesPopup())}
        />
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

export default TopSectionRight;
