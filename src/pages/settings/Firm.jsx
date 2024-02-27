import React, { useState, useRef } from 'react';
import UploadLogo from '../../assets/images/upload-your-logo.svg';
import Layout from "./Layout";
import { firmSettings } from '../../redux/user/user-actions';
import { useDispatch } from 'react-redux';


const FirmSettings = () => {
    const dispatch = useDispatch();
    const [fileName, setFileName] = useState(null);
    const [firmName, setFirmName] = useState("");
    const [link, setLink] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const desc = "Lorem ipsum dolor sit amet consectetur. Cras nunc diam tortor tincidunt. Mi ut enim feugiat blandit egestas."


    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        // Handle the dropped files as needed
        handleFiles(files);
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        // Handle the selected files as needed
        handleFiles(files);
    };

    const handleFiles = (files) => {
        if (files.length > 0) {
            const selectedFile = files[0];

            setFileName(selectedFile.name);

            // Read the selected image file
            const reader = new FileReader();

            reader.onload = (e) => {
                // Set the data URL as the source for the image
                setSelectedImage(e.target.result);
            };

            reader.readAsDataURL(selectedFile);
        }
    };

    const firmSetting = <div className='ml-[2%] w-[70%] flex flex-col mb-10 mt-10'>

    <div className='flex justify-between items-center border-2 border-[#F9F6F9] rounded-[30px] p-5'>
                {selectedImage && (
                    <div className='border border-[#cdcdcd] rounded-3xl'>
                        <img src={selectedImage} alt="Selected" style={{ width: '200px', height: '200px' }} />
                    </div>
                )}
                {!selectedImage && <div className='bg-[#F9F6F9] pt-20 pb-20 pl-10 pr-10 rounded-3xl'>
                    <p className='text-gray-400 '>Logo not uploaded</p>
                </div>
                }

                    <div className='ml-[-150px]' >
                        <h6 className='font-medium' >Firm Picture</h6>
                        <p className='text-[#8A8A8A]' >PNG, SVG under 15MB</p>
                    </div>

                    <div className='flex items-start justify-end'>
                    <div className={` px-3 py-[5px] rounded-2xl w-full text-black outline-none flex items-center ${fileName ? "justify-between" : ""}`} onDrop={handleFileDrop}
                        onDragOver={(e) => e.preventDefault()} >
                        <div>
                            <input
                                type='file'
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                            />
                            <button className='px-[25px] py-[7px] rounded-3xl font-medium flex items-center bg-[#FBF5FC] border-2 border-[#EAE0EC] text-[#4E2357] text-[16px]' onClick={handleButtonClick}>
                                <img src={UploadLogo} alt="" />
                                <small className='mx-2' >{fileName ? fileName : "Upload New Picture"}</small>
                            </button>
                        </div>
                        {/* {!fileName && <p className='text-center text-gray-400 text-sm mt-[6px] ml-3'>or drop photo here</p>} */}
                        {fileName && <div className=' bg-[#F9F6F9] px-6 py-3 font-medium rounded-3xl ml-4 cursor-pointer' onClick={() => {
                            setFileName(null);
                            setSelectedImage(null);
                        }}>
                            <button>remove</button>
                        </div>
                        }
                    </div>
                </div>
    </div>

    {/* input fields */}
    <div className='my-10 ms-2' >
    <label className=' text-gray-400 text-sm'>Firm Name</label>
    <input type="text" placeholder='Enter your firm name' onChange={(e) => setFirmName(e.target.value)} value={firmName} className='px-3 py-[14px] my-2 rounded-3xl w-full text-black outline-none mb-4 bg-[#F9F9F9]' />
    </div>

        {/* <div>
            <h4 className="pb-3 font-medium">Firm Name</h4>
        </div>
        <label className=' text-gray-400 text-sm'>Firm Name</label>
        <input type="text" placeholder='Enter your firm name' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setFirmName(e.target.value)} value={firmName} />
        <div className='flex justify-between'>
            <div className='mt-10 w-full'>
                <div>
                    <h4 className="pb-3 font-medium">Firm Logo</h4>
                </div>
                <label className=' text-gray-400 text-sm'>Firm Logo</label>
                <div className={`border border-[#cdcdcd] px-3 py-[5px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100 flex ${fileName ? "justify-between" : ""}`} onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()} >
                    <div>
                        <input
                            type='file'
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                        <button className='bg-white px-[5px] py-[7px] rounded-xl flex' onClick={handleButtonClick}>
                            <small className='mx-2' >{fileName ? fileName : "Upload"}</small>
                        </button>
                    </div>
                    {!fileName && <p className='text-center text-gray-400 text-sm mt-[6px] ml-3'>or drop photo here</p>}
                    {fileName && <div className='mt-[5px] cursor-pointer' onClick={() => {
                        setFileName(null);
                        setSelectedImage(null);
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12.5" r="12" fill="#D9D9D9" />
                            <path opacity="0.25" d="M7.5 7.25L12.375 12.5M17.25 17.75L12.375 12.5M12.375 12.5L17.25 7.25L7.5 17.75" stroke="black" stroke-width="1.5" />
                        </svg>
                    </div>
                    }
                </div>
            </div>
            {selectedImage && (
                <div style={{
                    position: "absolute",
                    left: "65%"
                }} className='border border-[#cdcdcd] rounded-2xl'>
                    <img src={selectedImage} alt="Selected" style={{ width: '200px', height: '200px' }} />
                </div>
            )}
            {!selectedImage && <div style={{
                position: "absolute",
                left: "65%"
            }} className='border border-[#cdcdcd] pt-20 pb-20 pl-10 pr-10 rounded-2xl'>
                <p className='text-gray-400 text-sm'>Logo not uploaded</p>
            </div>
            }
        </div>
        <div className='flex justify-between'>
            <div className='mt-10 w-full'>
                <div>
                    <h4 className="pb-3 font-medium">Referral Link</h4>
                </div>
                <label className=' text-gray-400 text-sm'>Referral Link</label>
                <div className='flex flex-row'>
                    <input style={{
                        paddingRight: "50px"
                    }} type="text" placeholder='Enter your referral link' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setLink(e.target.value)} value={link} />
                    {link && <div className='ml-[-45px] mt-[10px] cursor-pointer font-semibold' onClick={() => navigator.clipboard.writeText(link)}>
                        <p className='text-sm'>Copy</p>
                    </div>
                    }
                </div>
            </div>
        </div>
        <div className='mt-10'>
            <h4 className="pb-3 font-medium">Cancel membership</h4>
            <label className=' text-gray-400 text-sm'>support@mauveplanning.com</label>
        </div> */}
        <button className='bg-[#4E2357] px-[25px] py-[10px] rounded-3xl ml-[89%] text-white' onClick={() => dispatch(firmSettings(selectedImage , firmName))} > Save</button>

    </div >

    return <Layout title={"Firm Settings"} description={desc} content={firmSetting} />
}

export default FirmSettings