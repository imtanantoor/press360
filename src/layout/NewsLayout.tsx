import { useAppSelector } from "../hooks/reduxHooks";
import PreferencesPopup from "../components/Popups/PreferencesPopup";

function NewsLayout({ children }: { children: React.ReactNode }) {
  const isOpen = useAppSelector((state) => state.preferencesPopup.isOpen);

  return (
    <main className="container">
      {children}
      {isOpen && <PreferencesPopup />}
    </main>
  );
}

export default NewsLayout;
