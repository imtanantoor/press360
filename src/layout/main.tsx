import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import { Fragment } from "react/jsx-runtime";

function MainLayout() {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
}

export default MainLayout;
