import Header from "components/Header/Header";
import { Outlet } from "react-router-dom";

function Layot() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layot;
