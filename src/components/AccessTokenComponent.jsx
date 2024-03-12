import React, { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { getPlans, userDetails } from '../redux/user/user-actions';
import { FaCircleCheck , FaBan } from "react-icons/fa6";
import { set } from 'lodash';

const AccessTokenComponent = () => {

  const dispatch = useDispatch();
  const myState = useSelector((state) => state.user);
  
  
  const navigate = useNavigate();
  
  const [myToken, setMyToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const receivedAccessToken = urlParams.get('access_token');

    if(token || receivedAccessToken){
      if(token){
      localStorage.setItem("accessToken" , token)
      dispatch(userDetails());
      setMyToken(true);
      }
      else if(receivedAccessToken){
      localStorage.setItem("accessToken" , receivedAccessToken)
      dispatch(userDetails());
      setMyToken(true);
      }
    }
    else{
      setMyToken(false);
    }
  },[token])
  
  
  // useEffect(() => {

  // },[])


  // useEffect(() => {
  //   setMyToken(localStorage.getItem("accessToken"))
  // },[myToken])

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.hash.substr(1));
  //   const receivedAccessToken = urlParams.get('access_token');

  //   if (receivedAccessToken) {
  //     alert(receivedAccessToken);
  //     setAccessToken(receivedAccessToken);
  //     localStorage.setItem("accessToken" , receivedAccessToken);
  //     dispatch(userDetails());
  //   }
   
   


  // }, [myToken]);
  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.hash.substring(1));
  //   const receivedAccessToken = queryParams.get('access_token');

  //   if (receivedAccessToken) {
  //     localStorage.setItem('accessToken', receivedAccessToken);
  //     setAccessToken(receivedAccessToken);
  //     dispatch(userDetails());
  //     dispatch(getPlans());
  //   }
  // }, [location.hash , accessToken]);




  // useEffect(() => {
  //   if(myToken && myState?.userData?.isOnboarded === false && (myState?.userData?.role === "owner" || myState?.userData?.role === "member")){
  //     navigate('/registration/steps')
  // }
  //  if(myToken && myState?.userData?.isOnboarded && (myState?.userData?.role === "owner" || myState?.userData?.role === "member" )){
  //     navigate('user/dashboard')
  //   }
  //   if(myToken && myState?.userData?.isOnboarded === false && myState?.userData?.role === "client"){
  //     navigate('/onboarding')
  //   }
  // },[myState , myToken])


  // useEffect(() => {
  // dispatch(getPlans());
  // },[])

  return (
    <div className='w-screen h-screen flex items-center justify-center' >
      {myToken ? (
        <>
        {/* <div className='w-[25%] h-[30%] rounded-3xl bg-[#f5f5f5] flex flex-col items-center justify-center font-medium'>
        <FaCircleCheck className='text-6xl my-2' />
        <h2>Login Successful</h2>
        <Link to="/user/dashboard" className='px-5 py-1 border-2 border-[#cscscs] rounded-xl my-2'>Go to Dashboard</Link>
        </div> */}
        {
        (myToken && myState?.userData?.isOnboarded === false && (myState?.userData?.role === "owner" || myState?.userData?.role === "member")) ?
        navigate('/registration/steps') : 
         (myToken && myState?.userData?.isOnboarded && (myState?.userData?.role === "owner" || myState?.userData?.role === "member" )) ?
            navigate('user/dashboard') :
          (myToken && myState?.userData?.isOnboarded === false && myState?.userData?.role === "client") ? 
            navigate('/onboarding') : ""
        }
        </>
      ) : (
      <>
      {
        navigate('/auth/login')
      }
      </>
      )}
    </div>
  );
};

export default AccessTokenComponent;
