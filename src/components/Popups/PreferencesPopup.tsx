import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { closePreferencesPopup } from "../../redux/preferencesPopupSlice";
import CheckList from "../CheckList";
import CheckListItem from "../../models/CheckListItem.model";
import constants from "../../constants";

function PreferencesPopup() {
  const dispatch = useAppDispatch();
  const { preferences } = useAppSelector((state) => state.user);
  const [categories, setCategories] = useState<CheckListItem[]>(constants.CATEGORIES);
  const [sources, setSources] = useState<CheckListItem[]>(constants.SOURCES);
  const [authors, setAuthors] = useState<CheckListItem[]>(constants.AUTHORS);

  return (
    <div className="preferences-popup">
      <div className="preferences-popup-content">
        <div className="preferences-popup-content-header">
          <h1>Preferences</h1>
          <button onClick={() => dispatch(closePreferencesPopup())}>X</button>
        </div>
        <div className="preferences-popup-content-body">
          <CheckList
            items={categories}
            onChange={setCategories}
            title="Categories"
          />
          <CheckList items={sources} onChange={setSources} title="Sources" />
          <CheckList items={authors} onChange={setAuthors} title="Authors" />
        </div>
      </div>
    </div>
  );
}

export default PreferencesPopup;
