import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import SubLogo from '../../assets/images/sub-logo.svg';
import FirmLogo from '../../assets/images/firm-settings.svg';
import AccountLogo from '../../assets/images/account-seetings.svg';
import ReferalLogo from '../../assets/images/referal-logo.svg';
import NotiLogo from '../../assets/images/noti-logo.svg';
import PaymentLogo from '../../assets/images/payment-logo.svg';
import SecurityLogo from '../../assets/images/security-logo.svg';
import ClientLogo from '../../assets/images/client-and-team-logo.svg';
import LogoutLogo from '../../assets/images/logout.svg';
import { FaAngleLeft } from "react-icons/fa";
import { FaRegUser , FaUsers } from "react-icons/fa6";

const Layout = ({ title, content , description }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
      };
    const items = [
        {
            text: 'Account Settings',
            route: '/settings/account',
            icon : AccountLogo,
        },
        {
            text: 'Firm Settings',
            route: '/settings/firm',
            icon : FirmLogo
        },
        {
            text: 'Client & Team Settings',
            route: '/settings/clientAndTeam',
            icon : ClientLogo,
        },
        {
            text: 'Security Customization',
            route: '/settings/security',
            icon : SecurityLogo
        },
        {
            text: 'Payments & Billing',
            route: '/settings/payment',
            icon : PaymentLogo,
        },
        {
            text: 'Notification Settings',
            route: '/settings/notification',
            icon: NotiLogo,
        },
        {
            text: 'Referral Link',
            route: '/settings/referral',
            icon : ReferalLogo
        }
    ];

    return <div className='flex settings'>
        <div className='w-[20%] h-[100vh] border-r-2 border-[#f9f9f9]'>
            <div id="top" style={{
                display: 'flex',
                alignItems:"center",
                // width: "50%",
                padding:"30px 20px"
            }}>
                <img src={Logo} alt="logo" width={"120px"} className='border-r-2 pr-2' />
                <img src={SubLogo} alt="logo" className='pl-1' width={"150px"} />
            </div>
            <div id="menu ">
                {items.map((item) => <><div className='items flex items-center pt-10 pb-2 flex mb-1 px-2 cursor-pointer border-b-2 border-[#F9F9F9]' onClick={() => navigate(item.route)}>
                    <div style={{

                    }} className='ml-2 mr-2'>
                        <img className={`${title === item?.text ? "testing" : ""}`} src={item.icon} alt="" />
                    </div>
                    <p className={`${title === item?.text ? "text-[#4E2357] font-semibold" : "text-[#8a8a8a]"}`}>{item?.text}</p>
                </div></>)}
            </div>
            <div style={{
                position: "absolute",
                bottom: "15px"
            }}>
                <div className='items pt-5 flex mb-1 px-3 flex items-center cursor-pointer' onClick={() => navigate('/auth/login')}>
                   <img src={LogoutLogo} alt="" />
                    <p className="text-gray-800 font-semibold ms-1">Logout</p>
                </div>
            </div>
        </div>
        <div className='w-[80%]'>
            <div className='items flex flex-col justify-center items-start px-10 py-5'>
                {/* <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'lightgray',
                }} className='ml-5 mr-2 mt-2'>
                </div> */}
                <button className='my-3 bg-[#F6F7F7] px-5 py-3 font-bold rounded-[50px] flex items-center' onClick={handleBack} > <FaAngleLeft className='text-[17px]' /> Back</button>
                <h3 className='font-medium'>{title}</h3>
                <p className='my-2 text-[#8A8A8A] font-light' >{description}</p>
            </div>
            <div className='overflow-y-scroll h-[90vh]'>
                {content}
            </div>
        </div>
    </div >
}

export default Layout;