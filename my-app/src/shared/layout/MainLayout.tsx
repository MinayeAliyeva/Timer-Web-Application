import Header from "./header";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "./footer";

const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      {location.pathname === "/" ? <Navigate to="/timezone" /> : <Outlet />}
      <Footer />
    </>
  );
};

export default MainLayout;
