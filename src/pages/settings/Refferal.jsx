import React, { useState } from 'react';
import { Checkbox } from 'antd';
import Layout from "./Layout";


const Refferal = () => {
    const desc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, ut?"
    const [link, setLink] = useState("http://127.0.0.1:5173/settings/clientAndTeam");


    const refferalSettings = <div className='ml-[2%] mr-[50%] flex flex-col mb-10 mt-10'>
        <div className='flex flex-col justify-end'>
        <label className=' text-gray-400 text-sm ms-3 mb-2'>Referral Link</label>
        <div className='flex flex-row'>
        <input style={{
        paddingRight: "50px"
        }} type="text" placeholder='Enter your referral link' className=' px-5 py-[12px] rounded-[30px] w-full text-black outline-none mb-4 bg-[#F9F6F9]' value={link} disabled={true} />
        <div className='ml-[-54px] mt-[14px] cursor-pointer font-semibold' onClick={() => navigator.clipboard.writeText(link)}>
        <p className='text-sm text-[#4E2357] font-bold'>Copy</p>
        </div>
        </div>
        </div>
    </div>

    return <Layout title={"Refferal Settings"} description={desc} content={refferalSettings} />
}

export default Refferal

