import React, { useState } from 'react';
import MauveLogo from '../../assets/images/mauve-single-logo.svg';
import { FaAngleDown } from "react-icons/fa";

import Layout from "./Layout";

const PaymentSettings = () => {

    const desc = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, commodi."

    const [largeView , setLargeView] = useState(false);

    const data = {
        sub: [{
            title: 'Active License',
            credits: '6',
            dollars: '2.400',
            description: 'Next annual billing cycle',
            createdAt: '20.01.2025'
        }],
        bill: [{
            title: 'Active License',
            credits: '6',
            dollars: '2.400',
            description: 'Next annual billing cycle',
            createdAt: '20.01.2025'
        },
        {
            title: 'Active License',
            credits: '6',
            dollars: '2.400',
            description: 'Next annual billing cycle',
            createdAt: '20.01.2025'
        },
            // {
            //     title: 'Active License',
            //     credits: '6',
            //     dollars: '2.400',
            //     description: 'Next annual billing cycle',
            //     createdAt: '20.01.2025'
            // },
            // {
            //     title: 'Active License',
            //     credits: '6',
            //     dollars: '2.400',
            //     description: 'Next annual billing cycle',
            //     createdAt: '20.01.2025'
            // },
            // {
            //     title: 'Active License',
            //     credits: '6',
            //     dollars: '2.400',
            //     description: 'Next annual billing cycle',
            //     createdAt: '20.01.2025'
            // }
        ]
    }
    const paymentSetting = <div className='ml-[2%] mr-[40%] flex flex-col mb-10 mt-10'>
        <div>
            <h5 className="pb-3 font-medium">Subscription Information</h5>
            {
                data.sub.map((sub) => <div className='border-2 border-[#F9F6F9] rounded-2xl flex'>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '10px',
                        backgroundColor: '#FBF5FC',
                        margin: "15px"
                    }} />
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <h6 className='font-semibold'>{sub.title}</h6>
                        <p className=' text-gray-400 text-sm mt-1'>{sub.description} - {sub.createdAt}</p>
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems:"center",
                        justifyContent: "end",
                        marginLeft: '27%'
                    }}>
                        <img src={MauveLogo} alt="" />
                        <h6 className='font-semibold ms-2 text-[16px]'>{sub.credits} credits ({sub.dollars}$)</h6>
                    </div>
                </div>)
            }
        </div>
        <div className='mt-10'>
            <h5 className="pb-3 font-medium">Billing History</h5>
            <div className='border-2 border-[#F9F6F9] rounded-2xl'>
                {
                    data.bill.map((bill) => <div>
                        <div className='flex'>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '10px',
                                backgroundColor: '#FBF5FC',
                                margin: "15px"
                            }} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <h6 className='font-semibold'>{bill.title}</h6>
                                <p className=' text-gray-400 text-sm mt-1'>{bill.description} - {bill.createdAt}</p>
                            </div>
                            <div style={{
                                display: "flex",
                                alignItems:"center",
                                justifyContent: "end",
                                marginLeft: '27%'
                            }}>
                                <img src={MauveLogo} alt="" />
                                <h6 className='font-semibold ms-2 text-[16px]'>{bill.credits} credits ({bill.dollars}$)</h6>
                            </div>
                        </div>
                    </div>)
                }

                <button className={`m-5 text-[#4E2357] font-medium flex items-center`} onClick={() => setLargeView(!largeView)}  >view more information <FaAngleDown className="ms-1 text-[20px]" /></button>
            </div>
        </div>
        <div className='mt-10'>
            <h4 className="pb-3 font-medium">Billing Support</h4>
            <label className=' text-sm'>
                <span className='text-gray-400 '>For billing questions, please reach out to our team at</span>
                <strong> support@mauveplanning.com</strong>
            </label>
        </div>
    </div >

    return <Layout title={"Payments & Billing"} description={desc} content={paymentSetting} />
}

export default PaymentSettings