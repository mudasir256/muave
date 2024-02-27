import React, { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPlans, userDetails } from '../redux/user/user-actions';
import { FaCircleCheck , FaBan } from "react-icons/fa6";
const AccessTokenComponent = () => {
  const [accessToken, setAccessToken] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substr(1));
    const receivedAccessToken = urlParams.get('access_token');

    if (receivedAccessToken) {
      alert("REcieved")
      setAccessToken(receivedAccessToken);
      localStorage.setItem("accessToken" , receivedAccessToken);
      navigate('/registration/steps')
    }
  }, []);

  useEffect(() => {
  dispatch(userDetails());
  },[])

  useEffect(() => {
  dispatch(getPlans());
  },[])

  return (
    <div className='w-screen h-screen flex items-center justify-center' >
      {accessToken ? (
        <>
        <div className='w-[25%] h-[30%] rounded-3xl bg-[#f5f5f5] flex flex-col items-center justify-center font-medium'>
        <FaCircleCheck className='text-6xl my-2' />
        <h2>Login Successful</h2>
        <Link to="/user/dashboard" className='px-5 py-1 border-2 border-[#cscscs] rounded-xl my-2' >Go to Dashboard</Link>
        </div>
        </>
      ) : (
        <>
         <div className='w-[25%] h-[30%] rounded-3xl bg-[#f5f5f5] flex flex-col items-center justify-center font-medium'>
        <FaBan className='text-6xl my-2' />
        <h2>Login UnSuccessful</h2>
        <Link to="/auth/login" className='px-5 py-1 border-2 border-[#cscscs] rounded-xl my-2' >Login Again</Link>
        </div>
        </>
      )}
    </div>
  );
};

export default AccessTokenComponent;
