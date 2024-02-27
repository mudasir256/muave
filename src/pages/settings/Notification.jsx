import React, { useState } from 'react';
import { Checkbox } from 'antd';
import Layout from "./Layout";
import { notificationSettings } from '../../redux/user/user-actions';
import { useDispatch } from 'react-redux';

const NotificationSettings = () => {
    const dispatch = useDispatch();

    const [enableDocument , setEnableDocument] = useState(false);
    const [enableReminders , setEnableReminders] = useState(false);
    const [enableTouchPoints , setEnableTouchPoints] = useState(false);
    
    const desc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, ut?"

    const notificationSetting = <div className='ml-[2%] mr-[50%] flex flex-col mb-10 mt-10'>
        <div className='flex flex-col justify-end'>
            <div className='flex flex-col font-semibold'>
                <Checkbox checked={enableDocument} onChange={(e) => setEnableDocument(e.target.checked)}  className='my-2' >Document Updates</Checkbox>
                <Checkbox checked={enableReminders} onChange={(e) => setEnableReminders(e.target.checked)} className='my-2'>Reminders</Checkbox>
                <Checkbox checked={enableTouchPoints} onChange={(e) => setEnableTouchPoints(e.target.checked)} className='my-2'>Potential Touchpoints</Checkbox>
                <button className='bg-[#4E2357] px-[10px] py-[8px] rounded-3xl ml-[88%] mt-5' onClick={() => dispatch(notificationSettings(enableDocument , enableReminders , enableTouchPoints))} > <small className='mx-2 text-[13px] text-white' >Save</small></button>               
            </div>
        </div>
    </div>

    return <Layout title={"Notification Settings"} description={desc} content={notificationSetting} />
}

export default NotificationSettings

