import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../common/components/footer/footer";
import Header from "../common/components/header/header";
import Sidebar from "../common/components/Sidebar/sidebar";

function Home() {
  const location = useLocation();
  if (location.pathname === '/home') {
    return <Navigate to="dashboard" replace={true} />; // Redirect to "deals"
  }


  return (
    <div style={{ height: '100vh', background: '#F5F5F7', width: '100%', overflowY: 'auto' }}>
      {/* <Header></Header> */}
     
      <Sidebar></Sidebar>

      {/* <Footer></Footer> */}
    </div>
  );

}
export default Home;