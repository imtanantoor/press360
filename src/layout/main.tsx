import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { Fragment } from "react/jsx-runtime";
import { ToastContainer } from "react-toastify";

function MainLayout() {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </Fragment>
  );
}

export default MainLayout;
