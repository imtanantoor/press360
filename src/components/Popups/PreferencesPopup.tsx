import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { closePreferencesPopup } from "../../redux/preferencesPopupSlice";
import CheckList from "../CheckList";
import CheckListItem from "../../models/CheckListItem.model";
import constants from "../../constants";
import { updateUserPreference } from "../../redux/userSlice";

function PreferencesPopup() {
  const dispatch = useAppDispatch();
  const { preferences } = useAppSelector((state) => state.user);
  const [categories, setCategories] = useState<CheckListItem[]>(
    constants.CATEGORIES.map((item) => ({
      id: item.id,
      label: item.label,
      checked: preferences.categories.includes(item.value),
      value: item.value,
    }))
  );
  const [sources, setSources] = useState<CheckListItem[]>(
    constants.SOURCES.map((item) => ({
      id: item.id,
      label: item.label,
      checked: preferences.sources.includes(item.value),
      value: item.value,
    }))
  );
  const [authors, setAuthors] = useState<CheckListItem[]>(
    constants.AUTHORS.map((item) => ({
      id: item.id,
      label: item.label,
      checked: preferences.authors.includes(item.value),
      value: item.value,
    }))
  );

  const handleSavePreferences = () => {
    dispatch(
      updateUserPreference({
        categories: categories
          .filter((category) => category.checked)
          .map((category) => category.value),
        sources: sources
          .filter((source) => source.checked)
          .map((source) => source.value),
        authors: authors
          .filter((author) => author.checked)
          .map((author) => author.value),
      })
    );
    dispatch(closePreferencesPopup());
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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
        <button
          className="preferences-popup-content-footer-button"
          onClick={handleSavePreferences}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default PreferencesPopup;
