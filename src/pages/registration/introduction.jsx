import React, { useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

const Introduction = () => {
    const navigate = useNavigate();
    const [openOne, setOpenOne] = useState(0);
    const [openTwo, setOpenTwo] = useState(0);
    const [openThree, setOpenThree] = useState(0);

    const CloseIcon = () => <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_669_7807)">
            <path d="M6 2.5L13 10L6 17.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_669_7807">
                <rect width="18" height="18" fill="white" transform="translate(0 0.5)" />
            </clipPath>
        </defs>
    </svg>


    const OpenIcon = () => <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 6.5L9.5 13.5L2 6.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>



    return <>
        <Header />
        <div className='ml-[25%] mr-[25%] flex items-center flex-col mb-10 mt-20'>
            <h1 className="text-center pb-3">Introduction</h1>
            <p className='text-center text-gray-400 text-sm pb-5'>Hello! We're glad you've taken this important step in planning for the future. This questionnaire is designed to guide you gently through the process of preparing your will or trust. Don't worry, no legal expertise needed here! Just answer these questions to the best of your ability.</p>
            <button className='bg-[#D0D0D0] px-20 py-[5px] rounded-xl border-2 flex-col' onClick={() => navigate('/registration/steps')}> <small className='mx-2' >Start</small></button>
        </div>
        <div className='grid grid-cols-1 w-[60%] ml-[30%]'>
            <div className='mb-10'>
                <div className='flex mb-[15px]'>
                    <div>
                        <span className='bg-[#F8F8F8] px-2 py-1 rounded-xl mr-3'>1</span>
                        <span className='font-medium'>Tell us about yourself</span>
                    </div>
                    {openOne === 0 && <div className='cursor-pointer ml-[40%]' onClick={() => setOpenOne(1)}>
                        <CloseIcon />
                    </div>
                    }
                    {openOne === 1 && <div className='cursor-pointer ml-[40%]' onClick={() => setOpenOne(0)}>
                        <OpenIcon />
                    </div>
                    }
                </div>
                {openOne === 1 && <p className=' text-gray-400 text-xs pb-5 mr-64 w-[65%]'>Begin shaping your legacy by detailing beneficiaries or other important people in your estate plan.</p>}
                <hr className='w-[65%]' />
            </div>
            <div className='mb-10'>
                <div className='flex mb-[15px]'>
                    <div>
                        <span className='bg-[#F8F8F8] px-2 py-1 rounded-xl mr-3'>2</span>
                        <span className='font-medium'>Enter information about your company</span>
                    </div>
                    {openTwo === 0 && <div className='cursor-pointer ml-[26%]' onClick={() => setOpenTwo(1)}>
                        <CloseIcon />
                    </div>
                    }
                    {openTwo === 1 && <div className='cursor-pointer ml-[26%]' onClick={() => setOpenTwo(0)}>
                        <OpenIcon />
                    </div>
                    }
                </div>
                {openTwo === 1 && <p className=' text-gray-400 text-xs pb-5 mr-64 w-[65%]'>Begin shaping your legacy by detailing beneficiaries or other important people in your estate plan.</p>}
                <hr className='w-[65%]' />
            </div>
            <div className='mb-10'>
                <div className='flex mb-[15px]'>
                    <div>
                        <span className='bg-[#F8F8F8] px-2 py-1 rounded-xl mr-3'>3</span>
                        <span className='font-medium'>What's next?</span>
                    </div>
                    {openThree === 0 && <div className='cursor-pointer ml-[47%]' onClick={() => setOpenThree(1)}>
                        <CloseIcon />
                    </div>
                    }
                    {openThree === 1 && <div className='cursor-pointer ml-[47%]' onClick={() => setOpenThree(0)}>
                        <OpenIcon />
                    </div>
                    }
                </div>
                {openThree === 1 && <p className=' text-gray-400 text-xs pb-5 mr-64 w-[65%]'>Begin shaping your legacy by detailing beneficiaries or other important people in your estate plan.</p>}
                <hr className='w-[65%]' />
            </div>
        </div>
    </>
}

export default Introduction;