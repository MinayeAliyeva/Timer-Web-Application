import Header from "./header";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./footer";
import { useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    if(location.pathname === "/"){
      navigate('/timezone');
    }
  },[location.pathname, navigate])
  return (
    <>
      <Header />
     <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
