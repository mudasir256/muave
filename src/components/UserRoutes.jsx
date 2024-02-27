import { Outlet } from "react-router-dom";
import React from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";

const UserRoutes = () => {
  return (
    <>
      <section className="user-dashboard px-20 py-4" >
        <Navbar />
      </section>
      <section className="user-body px-20 py-3">
        <Outlet />
      </section>
      <section className="footer bg-[#572D60] px-20 py-10">
        <Footer/>
      </section>
    </>
  )
}

export default UserRoutes