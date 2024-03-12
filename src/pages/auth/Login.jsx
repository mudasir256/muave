import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/mauve-single-logo.svg";
import FullLogo from "../../assets/images/logo.svg";
// import SliderImgOne from "../../assets/images/slider-img-1.svg";
import Frame1 from "../../assets/images/frame-1.svg";
import Frame2 from "../../assets/images/frame-2.svg";
import Frame3 from "../../assets/images/frame-3.svg";
import LoaderImg from "../../assets/images/loader.png";
import { FaGoogle, FaArrowRightLong, FaPaperPlane } from "react-icons/fa6";
import { userLogin, googleLogin } from "../../redux/auth/action";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const myState = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (email !== "") {
      dispatch(userLogin(email));
    } else {
      toast.error("Enter your Email Please");
    }
  };

  const handleGoogleAuth = () => {
    dispatch(googleLogin());
  };
  // slider setting
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
    <Toaster
    toastOptions={{
      duration: 2000,
      style: {
        background: '#cdcdcd',
        color: '#fff',
      },
      success: {
      duration: 2000,
      theme: {
        primary: 'green',
        secondary: 'black',        },
      },
      error: {
        duration: 2000,
        theme: {
          primary: 'red',
          secondary: 'black',
        },
      },
    }}
    /> 
    <section className="login w-screen h-screen flex justify-center text-black bg-[#F9F6F9]">
      <div className='w-[50%]' >
      <div className="logo px-20 mt-10">
    <img src={FullLogo} alt="" />
      </div>
      <div className="auth-slider flex flex-col justify-center items-center  px-20 my-6 h-[80%]">
        <img className='w-[90%]' src={Frame3} alt="" />
        <h1 className="font-semibold text-[#4e2357] text-[50px]" >Estates Made Simple</h1>
        <p className="text-center text-[17px] px-5"> Mauve let’s advisors manage their client’s legacy effectively and clients organize their values for the future. Sign in today.</p>
      {/* <Slider  {...settings}>
      <div className='flex items-center flex-col' >
        <img className='w-[90%] m-auto' src={Frame1} alt="" />
        <h3 className='text-center font-medium' > Get access to the client base</h3>
        <p className='text-center text-[13px] text-[#8A8A8A] font-light mb-5' >Lorem ipsum dolor sit amet consectetur. Laoreet ipsum amet eget nibh. Diam posuere leo eget pellentesque mattis morbi nulla imperdiet turpis.</p>
      </div>
      <div className='flex items-center flex-col' >
        <img className='w-[90%] m-auto' src={Frame2} alt="" />
        <h3 className='text-center font-medium' > Get access to the client base</h3>
        <p className='text-center text-[13px] text-[#8A8A8A] font-light' >Lorem ipsum dolor sit amet consectetur. Laoreet ipsum amet eget nibh. Diam posuere leo eget pellentesque mattis morbi nulla imperdiet turpis.</p>
      </div>
      <div className='flex items-center flex-col' >
        <img className='w-[90%] m-auto' src={Frame3} alt="" />
        <h3 className='text-center font-medium' > Get access to the client base</h3>
        <p className='text-center text-[13px] text-[#8A8A8A] font-light' >Lorem ipsum dolor sit amet consectetur. Laoreet ipsum amet eget nibh. Diam posuere leo eget pellentesque mattis morbi nulla imperdiet turpis.</p>
      </div>
    </Slider> */}
      </div>
      </div>
      
      <div className='bg-white w-[50%] h-screen flex flex-col items-center justify-center' >
        <div className='flex flex-col items-center justify-center w-[80%]' >
      <img src={Logo} alt="" className='bg-[#F9F6F9] px-4 py-6 rounded-2xl' />
      <h1 className='my-5' >Welcome To Mauve</h1>
      <p className='text-center text-[#8a8a8a]' >to access to the Mauve platform, enter your email below and continue through the onboarding steps</p>
      <div className='w-full my-4' >
        <label className='ms-2 text-[#8a8a8a] text-[12px]'>E-Mail</label>
        <input type="email" value={email}  onChange={(e) => setEmail(e.target.value) } placeholder='Enter your email' className='bg-[#F9F9F9]  my-2 px-5 py-[13px] rounded-3xl w-full text-black outline-none relative' />
        {
      myState.loading ?
      <button className='bg-[#4E2357] text-white my-2 px-5 py-[9px] rounded-[40px] w-full' >
      <svg className='relative  left-[50%]' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 200 200"><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
      </button>
      : 
      <button onClick={handleLogin} className='bg-[#4E2357] text-white my-2 px-5 py-[13px] rounded-[40px] w-full' >
      Login
      </button>
    }
    </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Login;
