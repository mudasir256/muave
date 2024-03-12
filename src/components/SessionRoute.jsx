import FullLogo from '../assets/images/logo.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SessionRoute = () => {

    const navigate = useNavigate();
    const myState = useSelector((state) => state.user);

  return (
    <div className="w-screen h-screen flex items-center justify-center" >
        <div className="w-[30%] flex flex-col items-center bg-[#e8e8e8] px-5 py-10 rounded-3xl">
        <img src={FullLogo} width={180} alt="logo"/>
        {
            myState?.userData?.isOnboarded?
            <>
            <h5 className='font-semibold my-2' >Onboarding Done Successfully!</h5>
            <button onClick={() => navigate("/user/dashboard")} className='bg-[#4E2357] text-white my-2 px-5 py-[9px] rounded-3xl w-full' >
            Go To Dashboard
            </button>
            </> :
            <>
            <h5 className='font-semibold my-2' >Onboarding Failed!</h5>
            <button onClick={() => navigate("/registration/steps")}   className='bg-[#4E2357] text-white my-2 px-5 py-[9px] rounded-3xl w-full' >
            Onboard Again
            </button>
            </>
        }
        </div>
    </div>
  )
}

export default SessionRoute