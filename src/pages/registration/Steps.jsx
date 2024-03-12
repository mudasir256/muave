import React, { useState, useRef, useEffect } from 'react';
import { Steps, Switch } from 'antd';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import UploadLogo from '../../assets/images/upload-your-logo.svg';
import WealthBox from '../../assets/images/wealthbox.svg';
import SalesForce from '../../assets/images/Salesforce.svg';
import TeamUpload from '../../assets/images/team-onboard-icon.svg';
import FinishIcon from '../../assets/images/finish-icon.svg';
import Subscription from '../../components/Subscription';
import { useDispatch, useSelector } from 'react-redux';
import Onboard from '../../components/onboard/Onboard';
import { getPlans, userDetails , advisorOnboard } from '../../redux/user/user-actions';
import toast, { Toaster } from 'react-hot-toast';


const App = () => {

    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [disable, setDisabled] = useState(true);
    const [finish, setFinish] = useState(false);
    const [importChecked , setImportChecked] = useState(false);
    const [onboardScreen , setOnboardScreen] = useState(false);
    const [encodedImage, setEncodedImage] = useState(null);
    
    // multistep form data
    const [multiStepData , setMultiStepData] = useState({
        fullName : "",
        email : "",
        account : "",
        twoFactor : false,
        plan :"",
        firmName : "",
        firmLogo : "",
        integrations:""
        
    }); 
    
    const dispatch = useDispatch();
    const myState = useSelector((state) => state.user);


    // Steps 1 Inputs
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    // Steps 2 Inputs
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Steps 3 Inputs
    const [fileName, setFileName] = useState(null);
    const [firmName, setFirmName] = useState("");


    const BackIcon = () => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 29L9 15.5L22 2" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

    const handleMultiStepData = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setMultiStepData((prev) => {
            return{
                ...prev,
                [name] : value
            }
        })
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
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
            reader.onloadend = () => {
                setMultiStepData((prev) => {
                    return{
                        ...prev,
                        firmLogo : reader.result
                    }
                })
            }


            reader.readAsDataURL(selectedFile);        }
    };


    useEffect(() => {
    dispatch(userDetails());
    },[])
    
    useEffect(() => {
    dispatch(getPlans());
    },[])


    useEffect(() => {
        if(myState.userDetails?.inOnboarded === false){
            navigate('/auth/login')
        }
    },[myState])

    useEffect(() => {
        setMultiStepData((prev) => {
            return{
                ...prev,
                plan : myState.subscription
            }
        })
    },[myState])

    useEffect(() => {
        if (multiStepData.email && multiStepData.fullName , multiStepData.account) setDisabled(false);
        else setDisabled(true);
    }, [multiStepData])

    useEffect(() => {
        if (password && confirmPassword && password === confirmPassword) setDisabled(false);
        else setDisabled(true);
    }, [password, confirmPassword])

    useEffect(() => {
        if (firmName && fileName)  {setDisabled(false) ; setFinish(false) ; setStep(3)} 
        else setDisabled(true);
    }, [firmName, fileName])

    useEffect(() => {
        if (email && fullName && password && confirmPassword && password === confirmPassword && firmName && fileName) setDisabled(false);
    }, [step])

    return <>
    <section className='bg-white' >
    <Toaster
    toastOptions={{
      duration: 2000,
      style: {
        background: '#cdcdcd',
        color: '#fff',
      },
      success: {
      duration: 2000,
      theme: {
        primary: 'green',
        secondary: 'black',        },
      },
      error: {
        duration: 2000,
        theme: {
          primary: 'red',
          secondary: 'black',
        },
      },
    }}
    />
    <Header />  
        <div className='flex items-center justify-between w-full min-h-[93vh]'>
        {/* respective steps body */}
        <div className='w-[70%]'>
            {
            myState.userData?.role === "owner" ? 
            <>
            {step === 0 && <div className='ml-[12%] mr-[5%] flex flex-col mb-10 mt-10'>
            <div className='items-center'>
                <h1 className="text-center pb-3">Account Registration</h1>
                <p className='text-center text-gray-400 text-sm pb-5'>Provide basic information about you. Your full name, your email, your role, your password</p>
            </div>
            <div className='my-2' >
                <h5 className='font-medium' >General information</h5>
            </div>
            <div className='flex justify-between items-center w-full'>
            <div className='w-[49%]' >
            <label className=' text-[#808080] text-sm'>Full Name</label>
            <input type="text" placeholder='Enter your full name' name='fullName' value={multiStepData.fullName} className='px-5 py-4 rounded-3xl w-full text-[#808080] outline-none mb-4 bg-[#F9F9F9]' onChange={handleMultiStepData} />
            </div>
            <div className='w-[49%]' >
            <label className=' text-[#808080] text-sm'>Account E-Mail adress</label>
            <input type="email" placeholder='Enter your email address' name='email' value={multiStepData.email} className='px-5 py-4 rounded-3xl w-full text-[#808080] outline-none mb-4 bg-[#F9F9F9]' onChange={handleMultiStepData} />
            </div>
            </div>
            <label for="depart" className='text-[#808080] text-sm'>Account Departmet</label>
            <select id="depart" onChange={handleMultiStepData} value={multiStepData.account} name='account' className='px-5 py-5 rounded-[50px] w-[50%] text-[#808080] outline-none mb-4 bg-[#F9F9F9]'>
                <option value="">Select Account department</option>
                <option value="advisor">Advisor</option>
            </select>

            {/* <div className='my-2' >
                <h5 className='font-medium' >Password</h5>
            </div>
            <div className='flex items-center justify-between' >
            <div className='w-[49%]'>
            <label className='text-[#808080] text-sm'>Your Password</label>
            <input type="password" placeholder='Enter your password' className='px-5 py-4 rounded-3xl w-full text-black outline-none mb-4 bg-[#F9F9F9]' onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className='w-[49%]' >
            <label className='text-[#808080] text-sm'>Repeat Password</label>
            <input type="password" placeholder='Repeat your password' className='px-5 py-4 rounded-3xl w-full text-black outline-none mb-4 bg-[#F9F9F9]' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
            </div>
            </div> */}

            <div>
                <h5 className="pb-3 mt-2 mb-2 font-medium">Two-Factor Authentication (2FA)</h5>
                <div className='p-3 pb-1 border border-[#cdcdcd] rounded-2xl flex justify-between w-[50%] mb-5'>
                    <h6 className="pb-3 text-sm mr-3 font-semibold">Enable Two-Factor Authentication</h6>
                    <Switch className={`${multiStepData.twoFactor ? "custom-color" : "bg-gray-400"}`}  checked={multiStepData.twoFactor}  name="twoFactor" onChange={(checked) => {
                        setMultiStepData({
                            ...multiStepData,
                            twoFactor : checked,
                        })
                    }}/>
                </div>
                <p className=' text-gray-400 text-sm pb-5'>Two-Factor Authentication. Enable Two-Factor Authentication
                    Increase security by enabling Two-Factor Authentication
                    (2FA). A verification code will be sent to your email to confirm
                    your identity when logging in.</p>
            </div>
            </div>}
            
            {( step === 1) && <div className='ml-[12%] mr-[5%] flex flex-col mb-10 mt-10'>
                    <div className='items-center'>
                        <h1 className="text-center pb-3">Firm general information</h1>
                        <p className='text-center text-gray-400 text-sm pb-5'>Provide the necessary information on the firm you are representing. This is what your clients will see when they interact with Mauve.</p>
                    </div>
                    <div className='my-2' >
                        <h5 className='font-medium' >Firm infomation</h5>
                    </div>
                    <label className=' text-gray-400 text-sm my-2'>Firm Name</label>
                    <input type="text" placeholder='Enter your firm name' className='px-5 py-3 rounded-3xl w-full w-full text-black outline-none mb-4 bg-[#F9F9F9]' name='firmName' onChange={handleMultiStepData} value={multiStepData.firmName} />
                
                    <div className='flex justify-between items-center border-2 border-[#F9F6F9] rounded-[30px] p-5'>
                        <div className='flex items-center' >
                        {selectedImage && (
                            <div className='border border-[#cdcdcd] rounded-3xl'>
                                <img src={selectedImage} alt="Selected" style={{ width: '200px', height: '200px' }} />
                            </div>
                        )}
                        {!selectedImage && <div className='bg-[#F9F6F9] pt-20 pb-20 pl-10 pr-10 rounded-3xl'>
                            <p className='text-gray-400 '>Logo not uploaded</p>
                        </div>
                        }

                            <div className='ml-10' >
                                <h6 className='font-medium' >Firm logo (Optional)</h6>
                                <p className='text-[#8A8A8A]' >PNG, SVG under 15MB</p>
                            </div>
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
                                        <small className='mx-2' >{fileName ? fileName : "Upload your logo"}</small>
                                    </button>
                                </div>
                                {/* {!fileName && <p className='text-center text-gray-400 text-sm mt-[6px] ml-3'>or drop photo here</p>} */}
                                {fileName && <div className='mt-[5px] ml-4 cursor-pointer' onClick={() => {
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
                    </div>


                    {/* <div className='mt-6' >
                        <h5 className='font-medium' >Integrations <span className='text-[#8a8a8a] font-normal' >(Optional)</span></h5>
                    </div> */}

                    {/* <div className='flex justify-between items-center' >
                    <div className="flex justify-between items-start my-6">
                    <div
                        className={`rounded-3xl border-2 ${
                        importChecked ? "bg-[#FBF5FC]" : ""
                        } border-[#EEECEC] px-2 py-4 w-full flex flex-col justify-evenly ms-5`}
                    >
                        <div className="flex">
                        <input
                            type="radio"
                            onClick={() => setImportChecked(true)}
                            onChange={(e) => setMultiStepData((prev) => {
                                return{
                                    ...prev,
                                    integrations : "wealthbox"
                                }
                            })}
                            checked={importChecked}
                            name="integrations"
                            id=""
                            className="w-[17px] h-[17px] cursor-pointer"
                        />
                        </div>
                        <div className="flex justify-center items-center">
                        <img
                            className="min-h-[100px] px-5 w-[300px]"
                            src={WealthBox}
                            alt=""
                        />
                        </div>
                    </div>

                    <div
                        className={`rounded-3xl border-2 ${
                        !importChecked ? "bg-[#FBF5FC]" : ""
                        } border-[#EEECEC] px-2 py-4 w-full flex flex-col justify-evenly ms-5`}
                    >
                        <div className="flex">
                        <input
                            type="radio"
                            onClick={() => setImportChecked(false)}
                            onChange={(e) => setMultiStepData((prev) => {
                                return{
                                    ...prev,
                                    integrations : "salesforce"
                                }
                            })}
                            checked={!importChecked}
                            name="integrations"
                            id=""
                            className="w-[17px] h-[17px] cursor-pointer"
                        />
                        </div>
                        <div className="flex justify-center">
                        <img
                            className="px-5 min-h-[100px]"
                            src={SalesForce}
                            alt=""
                        />
                        </div>
                    </div>
                    </div>
                    <button className='px-[25px] py-[10px] rounded-3xl font-medium flex items-center bg-[#FBF5FC] border-2 border-[#EAE0EC] text-[#4E2357] text-[16px]' onClick={handleButtonClick}>
                    <small className='mx-2' >Request an integration</small>
                    </button>
                    </div> */}
            </div >}
            {
            (step === 2) ? (
            <>
            <Subscription setStep={setStep} setDisabled={setDisabled}  />
            </>
            ) : null
            }
            {
            (step === 3) ?<div className='ml-[12%] mr-[5%] flex flex-col mb-10 mt-10'>
            <div className='flex flex-col justify-center items-center' >  
                <img className='bg-[#FBF5FC] p-5 rounded-3xl' src={FinishIcon} alt="" />
                <h3 className='flex items-center mt-5' >Finish <span className='text-[#8a8a8a] mx-2' >(Optional)</span> </h3>
                <p className='mt-5 text-[#8a8a8a] text-center px-20' >For a limited time, team members can join for free, they can copy paste a link or "add team member" by name and email and click "Invite".</p>
                <div className='flex justify-center' >
                </div>
            </div>
            </div> : null
            }
            </> 
            :
            <>
            {step === 0 && <div className='ml-[12%] mr-[5%] flex flex-col mb-10 mt-10'>
            <div className='items-center'>
                <h1 className="text-center pb-3">Account Registration</h1>
                <p className='text-center text-gray-400 text-sm pb-5'>Provide basic information about you. Your full name, your email, your role, your password</p>
            </div>
            <div className='my-2' >
                <h5 className='font-medium' >General information</h5>
            </div>
            <div className='flex justify-between items-center w-full'>
            <div className='w-[49%]' >
            <label className=' text-[#808080] text-sm'>Full Name</label>
            <input type="text" placeholder='Enter your full name' name='fullName' value={multiStepData.fullName} className='px-5 py-4 rounded-3xl w-full text-[#808080] outline-none mb-4 bg-[#F9F9F9]' onChange={handleMultiStepData} />
            </div>
            <div className='w-[49%]' >
            <label className=' text-[#808080] text-sm'>Account E-Mail adress</label>
            <input type="email" placeholder='Enter your email address' name='email' value={multiStepData.email} className='px-5 py-4 rounded-3xl w-full text-[#808080] outline-none mb-4 bg-[#F9F9F9]' onChange={handleMultiStepData} />
            </div>
            </div>
            <label for="depart" className='text-[#808080] text-sm'>Account Departmet</label>
            <select id="depart" onChange={handleMultiStepData} value={multiStepData.account} name='account' className='px-5 py-5 rounded-[50px] w-[50%] text-[#808080] outline-none mb-4 bg-[#F9F9F9]'>
                <option value="">Select Account department</option>
                <option value="advisor">Advisor</option>
            </select>

            <div>
                <h5 className="pb-3 mt-2 mb-2 font-medium">Two-Factor Authentication (2FA)</h5>
                <div className='p-3 pb-1 border border-[#cdcdcd] rounded-2xl flex justify-between w-[50%] mb-5'>
                    <h6 className="pb-3 text-sm mr-3 font-semibold">Enable Two-Factor Authentication</h6>
                    <Switch className='bg-gray-400'  checked={multiStepData.twoFactor} name="twoFactor" onChange={(checked) => {
                        setMultiStepData({
                            ...multiStepData,
                            twoFactor : checked,
                        })
                    }}/>
                </div>
                <p className=' text-gray-400 text-sm pb-5'>Two-Factor Authentication. Enable Two-Factor Authentication
                    Increase security by enabling Two-Factor Authentication
                    (2FA). A verification code will be sent to your email to confirm
                    your identity when logging in.</p>
            </div>
            </div>}
            {
            step === 1 && <div className='ml-[12%] mr-[5%] flex flex-col mb-10 mt-10'>
            <div className='flex flex-col justify-center items-center' >  
                <img className='bg-[#FBF5FC] p-5 rounded-3xl' src={FinishIcon} alt="" />
                <h3 className='flex items-center mt-5' >Finish <span className='text-[#8a8a8a] mx-2' >(Optional)</span> </h3>
                <p className='mt-5 text-[#8a8a8a] text-center px-20' >For a limited time, team members can join for free, they can copy paste a link or "add team member" by name and email and click "Invite".</p>
                <div className='flex justify-center' >
                {/* <button className='px-20 py-3 bg-[#FBF5FC] mt-5 rounded-3xl text-[#4E2357]' >Back</button> */}
                {/* <button className='px-20 py-3 bg-[#4E2357] text-[#fff] mt-5 rounded-3xl text-[#4E2357] mx-5' >Finish</button> */}
                </div>
            </div>
            </div>
            }
            </>
            }
        </div>

        {/* side steps */}
        <div className='flex flex-col border-2 border-[#F9F6F9] mr-[6%] rounded-[25px] py-6 px-10 custom-css'>
        <div>
            {
                myState.userData?.role === "owner" ?
                <>
                 <Steps
                    size="medium"
                    current={step}
                    items={[
                        {
                            title: 'STEP 01',
                            description : "Your information ",
                            
                        },
                        {
                            title: 'STEP 02',
                            description : "Firm general information",
                        },
                        {
                            title: 'STEP 03',
                            description : "Subscription"
                        },
                        // {
                        //     title: 'STEP 04',
                        //     description : "Finish"
                        // }
                    ]}
                    status={finish ? 'finish' : 'process'}
                    direction="vertical"
                />
                </>
                :
                <>
                 <Steps
                    size="medium"
                    current={step}
                    items={[
                        {
                            title: 'STEP 01',
                            description : "Your information ",
                            
                        },
                        {
                            title: 'STEP 02',
                            description : "Finish"
                        }
                    ]}
                    status={finish ? 'finish' : 'process'}
                    direction="vertical"
                />
                </>
            }
        </div>
            
        <div className='flex items-center justify-between border-t mt-4 pt-6' >
        <div className='ml-[1%] cursor-pointer rounded-3xl px-10 py-2 bg-[#F9F6F9]' onClick={() => {
            if(myState.userData?.role === "owner"){
                if (step === 0) {
                    // navigate('/registration');
                }
                else if (step === 1) {
                    setStep(0);
                    setDisabled(false);
                }
                else if (step === 2) {
                    setStep(1);
                    setDisabled(false);
                }
                else if (step === 3) {
                    setStep(2);
                    setDisabled(false);
                }
                else if (step === 4) {
                    setStep(3);
                    setDisabled(false);
                }
                else if (step === 5) {
                    setStep(4);
                    setDisabled(false);
                }
            }
            else{
                if (step === 0) {
                    navigate('/registration');
                }
                if (step === 1) {
                    setStep(0);
                    setDisabled(false)
                }
            }
            }}>
                Back
            </div>
            <div onClick={() => {
            if(myState.userData?.role === "owner"){
                if (step === 0) {
                    setStep(1);
                    setDisabled(true);
                }
                else if (step === 1) {
                    setStep(2);
                    setDisabled(true);
                }
                else if (step === 2) {
                    setStep(3);
                    setDisabled(false);
                }
                else if (step === 3) {
                    setStep(3);
                    setDisabled(false);
                }
                // else if (step === 4) {
                //     setStep(5);
                //     setDisabled(true);
                // }
            }
            else{
                if (step === 0) {
                    setStep(1);
                    setDisabled(false);
                }
                if(step === 1){
                    setStep(1);
                }
            }
            }}>
            {
                myState.userData?.role === "owner" ? 
                <button className={`${disable ? "bg-[#A791AB]" : "bg-[#4F2358]"} ${disable ? "text-white" : "text-white"} px-10 py-2 rounded-3xl flex text-[16px]`} disabled={disable} onClick={() => {
                    if (step === 1) {
                        dispatch(advisorOnboard(multiStepData));
                    }
                }}>
                {
                    myState?.loading ? 
                    <svg className='relative  left-[0%]' xmlns="http://www.w3.org/2000/svg" width={48} height={19} viewBox="0 0 200 200"><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                    :
                    <small className={`mx-2 ${disable ? "text-gray-300" : ""}`}>{step === 3 ? "Finish" : "Next"}</small>
                }
                </button>
                :
                <button className={`${disable ? "bg-[#A791AB]" : "bg-[#4F2358]"} ${disable ? "text-white" : "text-white"} px-10 py-2 rounded-3xl flex text-[16px]`} disabled={disable} onClick={() => {
                    if (step === 1) {
                        dispatch(advisorOnboard(multiStepData));
                    }
                }}>
                    <small className={`mx-2 ${disable ? "text-gray-300" : ""}`}>{step === 1 ? "Finish" : "Next"}</small>
                </button>
            }
            </div>
        </div>
        
        </div>
        </div>
    </section>
    </>
}

export default App;