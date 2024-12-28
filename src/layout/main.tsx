import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { Fragment } from "react/jsx-runtime";

function MainLayout() {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
}

export default MainLayout;
