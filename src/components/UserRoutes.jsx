import { Outlet } from "react-router-dom";
import React from 'react'
import Navbar from "./Navbar";

const UserRoutes = () => {
  return (
    <>
    <section className="user-dashboard px-20 py-6" >
      <Navbar/>
    </section>
    <section className="user-body px-20 py-3">
      <Outlet/>
    </section>
    </>
  )
}

export default UserRoutes