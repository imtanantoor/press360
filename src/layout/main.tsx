import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import { Fragment } from "react/jsx-runtime";
import Footer from "../components/Footer";

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
