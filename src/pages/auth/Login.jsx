import React from 'react'
import Logo from '../../assets/images/logo.svg'
import { FaGoogle , FaArrowRightLong } from "react-icons/fa6";
const Login = () => {
  return (
    <>
    <section className="login w-screen h-screen flex items-center justify-center text-black bg-[#EEEEEE]">
    <div className="login-form flex flex-col items-center justify-center w-[30%] bg-[#fff] px-10 py-10 rounded-3xl border border-[#cdcdcd]">
      <div className='logo' >
        <img src={Logo} alt="logo" className='my-2' />
      </div>
    <div className='py-5 flex flex-col items-center justify-center w-full' >
    <input type="email" placeholder='enter your email address' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none' />
    <small className='m-auto my-2' >OR</small>
    <button className='bg-[#EEEEEE] px-5 py-[5px] rounded-xl flex items-center border-2'> <FaGoogle /> <small className='mx-2' >Continue with Google</small></button>
    </div>
    </div>
    </section>
    </>
  )
}

export default Login