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
    <div style={{ background: '#F5F5F7',
    // /* overflow-x: hidden; */
    // padding: 0px;
    // margin: 0px;
    // background-color: #ffff;
    // font-size: 16px;
    // color: #333;
    
    
    }}>
      {/* <Header></Header> */}
     
      <Sidebar ></Sidebar>

    {/* <Footer></Footer> */}
    </div>
  );

}
export default Home;