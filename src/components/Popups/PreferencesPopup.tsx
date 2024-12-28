import { useAppDispatch } from "../../hooks/reduxHooks";
import { closePreferencesPopup } from "../../redux/preferencesPopupSlice";

function PreferencesPopup() {
  const dispatch = useAppDispatch();
  return (
    <div className="preferences-popup">
      <div className="preferences-popup-content">
        <div className="preferences-popup-content-header">
          <h1>Preferences</h1>
          <button onClick={() => dispatch(closePreferencesPopup())}>X</button>
        </div>
        <div className="preferences-popup-content-body"></div>
      </div>
    </div>
  );
}

export default PreferencesPopup;
