import React, { useState } from 'react';
import { Switch } from 'antd';
import Layout from "./Layout";
import { useDispatch } from 'react-redux';
import { securitySetting } from '../../redux/user/user-actions';


const SecuritySettings = () => {

    const dispatch = useDispatch();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [twoFactor , setTwoFactor] = useState(false);
    const desc = "Lorem ipsum dolor sit amet consectetur. Cras nunc diam tortor tincidunt. Mi ut enim feugiat blandit egestas."


    const securitySettings = <div className='ml-[2%] w-[70%] flex flex-col mb-10 mt-10'>
        {/* <div>
            <h5 className="pb-3 font-semibold">Password</h5>
        </div> */}

        {/* <div>
            <div className='flex item-center justify-between'>
                <div className='w-[49%]' >
                <label className=' text-gray-400 text-sm'>Old Password</label>
                <input type="password" placeholder='Enter your password' className='px-3 my-1 py-[12px] rounded-[40px] w-full text-black outline-none mb-4 bg-[#F9F9F9]' onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>

                <div className='w-[49%]'>
                <label className=' text-gray-400 text-sm'>New Password</label>
                <input type="password" placeholder='Repeat your password' className='px-3 my-1 py-[12px] rounded-[40px] w-full text-black outline-none mb-4 bg-[#F9F9F9]' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                </div>
            </div>
        </div> */}
        <div >
            <h5 className="pb-3 mt-8 mb-2 font-semibold">Two-Factor Authentication (2FA)</h5>
            <div className='p-3 border-2 border-[#E5E5E5] rounded-2xl flex justify-between w-[50%] mb-5'>
                <h6 className=" text-sm mr-3 font-semibold">Enable Two-Factor Authentication</h6>
                <Switch className='bg-gray-400' checked={twoFactor} onChange={(checked) => setTwoFactor(checked)} />
            </div>
            <p className=' text-gray-400 text-md font-light pb-5 w-[85%]'>Two-Factor Authentication. Enable Two-Factor Authentication
                Increase security by enabling Two-Factor Authentication
                (2FA). A verification code will be sent to your email to confirm
                your identity when logging in.</p>
        </div>


        <button className='bg-[#4E2357] px-[10px] py-[8px] rounded-3xl ml-[88%] mt-5' onClick={() => dispatch(securitySetting(twoFactor))} > <small className='mx-2 text-[13px] text-white' >Save</small></button>

    </div>

    return <Layout title={"Security Customization"} description={desc} content={securitySettings} />
}

export default SecuritySettings