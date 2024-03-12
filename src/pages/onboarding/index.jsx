import React, { useState, useEffect, useRef } from 'react';
import LOGO from '../../assets/images/sub-logo.svg';
import CONVERSATION from '../../assets/images/conversation.jpg';
import { Badge, DatePicker, Avatar, Upload, message, Table, Space, Popover } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import Modal from '../../components/Modal';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getBaseApi } from '../../config/Environment';
import { useDispatch, useSelector } from 'react-redux';
import {
    getOnboardingAction,
    postOnboardingAction,
    getStep1Action,
    postStep1Action,
    getStep2Action,
    postStep2Action,
    getStep3Action,
    postStep3Action,
    getStep4Action,
    postStep4Action,
    getStep5Action,
    postStep5Action,
    getStep6Action,
    postStep6Action,
    getStep7Action,
    postStep7Action,
    deleteStep2Action,
    editStep2Action,
    deleteStep3Action,
    editStep3Action,
    deleteStep4Action,
    editStep4Action,
    deleteStep5Action,
    editStep5Action
} from '../../redux/onboarding/action';
import { usePlaidLink } from 'react-plaid-link';
import PlaidLogoSvg from '../../assets/images/Plaid_logo.svg'
import CONSTANT from '../../data/constant';

const { RangePicker } = DatePicker;
const { Dragger } = Upload;

const columns = [
    {
        title: 'Document Name',
        dataIndex: 'name',
        render: (text, record) => (
            <div className="flex flex-row">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.0782 26.7987C28.0782 28.787 26.4664 30.3987 24.4782 30.3987H7.33438C5.34615 30.3987 3.73438 28.787 3.73438 26.7987V5.45937C3.73438 3.47115 5.34615 1.85938 7.33438 1.85938H17.9738C18.6683 1.85938 19.3393 2.11029 19.8634 2.56591L27.0878 8.84664C27.7169 9.39362 28.0782 10.1864 28.0782 11.0201V26.7987Z" fill="#884A95" />
                    <path d="M10.2773 14.9941L21.5393 14.9941" stroke="white" stroke-width="1.6" stroke-linecap="round" />
                    <path d="M10.2773 19.4336L21.5393 19.4336" stroke="white" stroke-width="1.6" stroke-linecap="round" />
                    <path d="M10.2773 23.873L18.3216 23.873" stroke="white" stroke-width="1.6" stroke-linecap="round" />
                    <path d="M27.6881 9.39712C27.8887 9.57203 27.765 9.90222 27.4988 9.90222H20.3879C19.479 9.90222 18.7422 9.16541 18.7422 8.25651V2.23269C18.7422 1.98551 19.0331 1.85317 19.2194 2.01558L27.6881 9.39712Z" fill="#BA71CA" />
                </svg>
                <span className="ml-3 mt-2">{text}</span>
            </div>
        ),
    },
    {
        title: 'Category',
        dataIndex: 'category',
        render: (text, record) => (
            <div className='bg-[#F6F6F6] border-2 p-1 pl-4 pr-4 rounded-2xl w-[max-content] mt-2 mb-2 text-sm'>
                {text}
            </div>
        ),
    },
    {
        title: 'Last Updated',
        dataIndex: 'lastUpdated',
    },
    {
        title: 'Access',
        dataIndex: 'access',
    },
    {
        title: 'Options',
        key: 'options',
        render: (text, record) => (
            <Space size="middle">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4" cy="17" r="3" fill="#E3E3E3" />
                    <circle cx="16" cy="17" r="3" fill="#E3E3E3" />
                    <circle cx="28" cy="17" r="3" fill="#E3E3E3" />
                </svg>
            </Space>
        ),
    },
];

const Onboarding = () => {
    const [messageApi, contextHolder] = message.useMessage();
    let plaidLinkStep = useRef(0);

    const navigate = useNavigate();
    const myState = useSelector((state) => state.onboarding);
    const dispatch = useDispatch();

    const [linkToken, setLinkToken] = useState(null);

    // Fetch Link Token from your backend
    useEffect(() => {
        const fetchLinkToken = async () => {
            // Replace 'your/api/endpoint' with your actual token fetching endpoint
            /* GET LINK TOKEN API */

            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `${getBaseApi()}plaid/plaid`,
                {
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            const lT = response.data.link_token;
            setLinkToken(lT); // Adjust according to your API response structure
        };
        fetchLinkToken();
    }, []);

    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: async (public_token, metadata) => {
            // send public_token to server
            console.log('Your public token is', public_token);

            const token = localStorage.getItem("accessToken");
            await axios.post(
                `${getBaseApi()}plaid/plaid-access-token`,
                {
                    "public_token": public_token
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (plaidLinkStep.current === 3) {

                dispatch(postStep3Action({
                    source: source,
                    totalIncome: amount,
                    type: "integration"
                }))
                setIncomes([...incomes]);
                setIncomeModal(false);
                setNextStepButtonState(false);

                // Empty States
                setAmount("");
                setAddIncomeState(true);

                plaidLinkStep.current = 0;
            }

            if (plaidLinkStep.current === 4) {

                dispatch(postStep4Action({
                    assetName: assetName,
                    assetType: assetType,
                    amount: assetAmount,
                    type: "integration"
                }))
                setAssets([...assets]);
                setAssetModal(false);
                setNextStepButtonState(false);

                // Empty States
                setAssetName("");
                setAssetAmount("");
                setAddAssetState(true);

                plaidLinkStep.current = 0;
            }

            if (plaidLinkStep.current === 5) {

                dispatch(postStep5Action({
                    name: liabilitiesName,
                    liabilityType: liabilitiesType,
                    amount: liabilitiesAmount,
                    loanPeriodStart: loanPeriodStart,
                    loanPeriodEnd: loanPeriodEnd,
                    type: "integration"
                }))
                setLiabilities([...liabilities]);
                setLiabilitiesModal(false);
                setNextStepButtonState(false);

                // Empty States
                setLiabilitiesLoanPeriod("");
                setLoanPeriod("");
                setLiabilitiesAmount("");
                setLiabilitiesName("")
                setAddLiabilitiesState(true);

                plaidLinkStep.current = 0;
            }

        },
    });

    // Introduction
    const [intro, setIntro] = useState([]);
    const [finish, setFinish] = useState(true);
    const [finishButtonState, setFinishButtonsState] = useState(true);
    const [step, setStep] = useState(-1);
    const [check, setCheck] = useState(-1);
    const [notification, setNotification] = useState(true);
    const [nextStepButtonState, setNextStepButtonState] = useState(true);
    const [edit, setEdit] = useState(-1);

    // Step 1
    const [fullName, setFullName] = useState("");
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [addInformationState, setAddInformationState] = useState(true);

    // Step 2
    const [familyModal, setFamilyModal] = useState(false);
    const [familyName, setFamilyName] = useState("");
    const [relationship, setRelationship] = useState(CONSTANT.relationship[0]);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [families, setFamilies] = useState([]);
    const [addFamilyState, setAddFamilyState] = useState(true);
    const [editFamilyModal, setEditFamilyModal] = useState(false);
    const [familyId, setFamilyId] = useState("");

    // Step 3 - 5
    const [incomeModal, setIncomeModal] = useState(false);
    const [source, setSource] = useState("Cryptocurency");
    const [amount, setAmount] = useState("");
    const [addIncomeState, setAddIncomeState] = useState(true);
    const [manual, setManual] = useState(false);
    const [integration, setIntegration] = useState(true);
    const [incomes, setIncomes] = useState([]);
    const [incomeInterval, setIncomeInterval] = useState("Every Year");
    const [assetModal, setAssetModal] = useState(false);
    const [assetType, setAssetType] = useState(CONSTANT.assetType[0]);
    const [assetName, setAssetName] = useState("");
    const [assetAmount, setAssetAmount] = useState("");
    const [addAssetState, setAddAssetState] = useState(true);
    const [assets, setAssets] = useState([]);
    const [liabilitiesModal, setLiabilitiesModal] = useState(false);
    const [liabilitiesType, setLiabilitiesType] = useState("Liability Type");
    const [liabilitiesName, setLiabilitiesName] = useState("");
    const [liabilitiesAmount, setLiabilitiesAmount] = useState("");
    const [liabilitiesLoanPeriod, setLiabilitiesLoanPeriod] = useState("");
    const [loanPeriod, setLoanPeriod] = useState("");
    const [loanPeriodStart, setLoanPeriodStart] = useState("");
    const [loanPeriodEnd, setLoanPeriodEnd] = useState("");
    const [addLiabilitiesState, setAddLiabilitiesState] = useState(true);
    const [liabilities, setLiabilities] = useState([]);
    const [editIncomeModal, setEditIncomeModal] = useState(false);
    const [editAssetModal, setEditAssetModal] = useState(false);
    const [editLiabilitiesModal, setEditLiabilitiesModal] = useState(false);
    const [incomeId, setIncomeId] = useState("");
    const [assetId, setAssetId] = useState("");
    const [liabilityId, setLiabilityId] = useState("");

    // Step 6
    const [goalModal, setGoalModal] = useState(false);
    const [goalName, setGoalName] = useState("");
    const [goalPriority, setGoalPriority] = useState("High Priority");
    const [goalDate, setGoalDate] = useState(null);
    const [goalDescription, setGoalDescription] = useState("");
    const [addGoalState, setAddGoalState] = useState(true);
    const [goalDateSetter, setGoalDateSetter] = useState(null);
    const [goals, setGoals] = useState([]);

    // Step 7
    const [documentModal, setDocumentModal] = useState(false);
    const [pdf, setPdf] = useState(null);
    const [documentName, setDocumentName] = useState("");
    const [documentCategory, setDocumentCategory] = useState("Trust");
    const [documentAccess, setDocumentAccess] = useState("Private");
    const [addDocumentState, setAddDocumentState] = useState(true);
    const [documents, setDocuments] = useState([]);

    const props = {
        name: 'file',
        onChange(info) {
            setPdf(info?.fileList[0]);
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    useEffect(() => {
        dispatch(getOnboardingAction())
    }, [])

    useEffect(() => {
        const data = myState.onboardingData;
        if (data?.step) {
            setCheck(data.step - 1);
        }
        if (data?.finish) {
            setFinishButtonsState(false);
        }
    }, [myState.onboardingData])

    useEffect(() => {
        const currentStep = step + 1;
        if (currentStep == 1) {
            dispatch(getStep1Action())
        }
        if (currentStep == 2) {
            dispatch(getStep2Action())
        }
        if (currentStep == 3) {
            dispatch(getStep3Action())
            dispatch(getStep4Action())
            dispatch(getStep5Action())
        }
        if (currentStep == 4) {
            dispatch(getStep1Action())
            dispatch(getStep6Action())
        }
        if (currentStep == 5) {
            dispatch(getStep7Action())
        }
    }, [step])

    useEffect(() => {
        if (myState?.stepOne) {
            setFullName(myState.stepOne.fullName);
            setSelectedImage(myState.stepOne.Avatar);
        }
        if (myState?.stepTwo) {
            const fam = myState.stepTwo.map((step) => ({
                ...step,
                familyName: step.fullName,
                phoneNumber: step.contactNo,
            }))
            setFamilies([...fam]);
        }
        if (myState?.stepThree) {
            const inc = myState.stepThree.map((step) => ({
                ...step,
                source: step.source,
                amount: step.totalIncome,
                interval: incomeInterval
            }))
            setIncomes([...inc]);
        }
        if (myState?.stepFour) {
            const asst = myState.stepFour.map((step) => ({
                ...step,
                type: step.type,
                name: step.assestName,
                amount: step.assetAmount
            }))
            setAssets([...asst]);
        }
        if (myState?.stepFive) {
            const lib = myState.stepFive.map((step) => ({
                ...step,
                type: step.liablityType,
                name: step.name,
                amount: step.amount,
                loanPeriod: `${moment(step.loanPeriodStart).format('DD.MM.YYYY')} - ${moment(step.loanPeriodEnd).format('DD.MM.YYYY')}`
            }))
            setLiabilities([...lib]);
        }
        if (myState?.stepSix) {
            const goal = myState.stepSix.map((step) => ({
                ...step,
                name: step.name,
                priority: step.priority,
                date: step.date ? `${moment(step.date).format('DD.MM.YYYY')}` : "",
                description: step.description
            }))
            setGoals([...goal]);
        }
        if (myState?.stepSeven) {
            const docs = myState.stepSeven.map((step) => ({
                ...step,
                name: step.name,
                category: step.category,
                access: step.access,
                lastUpdated: `${moment(step.lastUpdated).format('DD.MM.YYYY')}`,
                documentId: step.documentId,
            }))
            setDocuments([...docs]);
        }
    }, [myState])

    useEffect(() => {

        setIntro([
            {
                title: 'Your information',
                description: 'Please tell us what your name is.'
            },
            {
                title: 'Tell us about you and your family.',
                description: 'Help us get a picture of your assets. Tell us about your family members and loved ones.'
            },
            {
                title: "Calculating your Net Worth",
                description: "Begin picturing all your valuables and assets by integrating your accounts for real time net worth tracking and asset management"
            },
            {
                title: 'Share your life goals and plans for the future',
                description: "Share anything on your mind about your life's plans - from children, saving money to retire, taking care of your family in the future or anything else. Your advisor will review these as they plan your financial future."
            },
            {
                title: 'Onboarding your Estate Plan',
                description: "Begin shaping your legacy by detailing beneficiaries or other important people in your estate plan."
            }
        ])

    }, [])

    useEffect(() => {
        if (fullName) {
            setAddInformationState(false);
            setNextStepButtonState(false);
        } else {
            setAddInformationState(true);
            setNextStepButtonState(true);
        }
    }, [fullName])

    useEffect(() => {
        if (familyName && relationship) {
            setAddFamilyState(false);
        } else {
            setAddFamilyState(true);
        }
    }, [familyName, relationship])

    useEffect(() => {
        if (amount && source && incomeInterval) {
            setAddIncomeState(false);
        } else {
            setAddIncomeState(true);
        }
    }, [amount, source, incomeInterval])

    useEffect(() => {
        if (assetName && assetAmount && assetType) {
            setAddAssetState(false);
        } else {
            setAddAssetState(true);
        }
    }, [assetName, assetAmount, assetType])

    useEffect(() => {
        if (liabilitiesName && liabilitiesAmount && loanPeriod && liabilitiesType) {
            setAddLiabilitiesState(false);
        } else {
            setAddLiabilitiesState(true);
        }
    }, [liabilitiesName, liabilitiesAmount, loanPeriod, liabilitiesType])

    useEffect(() => {
        if (goalName && goalPriority) {
            setAddGoalState(false);
        } else {
            setAddGoalState(true);
        }
    }, [goalName, goalPriority])

    useEffect(() => {
        if (documentName && documentCategory && documentAccess && pdf) {
            setAddDocumentState(false);
        } else {
            setAddDocumentState(true);
        }
    }, [documentName, documentCategory, documentAccess, pdf]);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        handleFiles(files);
    };

    const handleFiles = (files) => {
        if (files.length > 0) {
            const selectedFile = files[0];

            // Read the selected image file
            const reader = new FileReader();

            reader.onload = (e) => {
                // Set the data URL as the source for the image
                setSelectedImage(e.target.result);
            };

            reader.readAsDataURL(selectedFile);
        }
    };

    const content = (data, index, step) => <div>
        <button className='bg-[lightgray] rounded-xl border-2 h-[35px]'
            onClick={() => {

                if (step === 2) {
                    dispatch(deleteStep2Action({
                        familyMemberId: data.id
                    }))
                }
                if (step == 3) {
                    dispatch(deleteStep3Action({
                        incomeId: data.id
                    }))
                }
                if (step == 4) {
                    dispatch(deleteStep4Action({
                        assetId: data.id
                    }))
                }
                if (step == 5) {
                    dispatch(deleteStep5Action({
                        liabilityId: data.id
                    }))
                }
            }}> <small className='mx-2 text-black' >Yes</small></button>
    </div>

    const editDeleteContent = (data, index, step) => <div>
        <div className='items flex cursor-pointer pr-2 p-2' onClick={() => {
            if (step === 2) {
                setFamilyId(data.id);
                setRelationship(data.relationship);
                setFamilyName(data.familyName);
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber);
                setEditFamilyModal(true);
            }
            if (step === 3) {
                setSource(data.source);
                setAmount(data.amount);
                setIncomeId(data.id);
                setEditIncomeModal(true);
            }
            if (step == 4) {
                setAssetName(data.name);
                setAssetAmount(data.amount);
                setAssetType(data.type);
                setAssetId(data.id);
                setEditAssetModal(true);
            }
            if (step == 5) {
                setLiabilitiesName(data.name);
                setLiabilitiesType(data.type);
                setLiabilitiesAmount(data.amount);
                //setLiabilitiesLoanPeriod([moment(data.loanPeriodStartDate), moment(data.loadPeriodEndDate)])
                setLoanPeriodStart(data.loanPeriodStartDate);
                setLoanPeriodEnd(data.loadPeriodEndDate);
                setLiabilityId(data.id);
                setEditLiabilitiesModal(true);
            }
        }}>
            <div style={{
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                backgroundColor: 'rgba(11,11,11,0.1)',
            }} className='mt-2'>
                <p className='ml-6 mt-[-3px]'>Edit</p>
            </div>
        </div>
        {
            <Popover content={content(data, index, step)} title="Are you sure?" trigger="click">
                <div className='items flex cursor-pointer p-2'>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(11,11,11,0.1)',
                    }} className='mt-2'>
                        <p className='ml-6 mt-[-3px]'>Delete</p>
                    </div>
                </div>
            </Popover>
        }
    </div>


    const header = (showFinish = true) => <div className='flex justify-between p-5 pb-16'>
        {myState?.userData?.Organization?.logo ? <img src={myState?.userData?.Organization?.logo} alt='logo' width={50} /> : <p>{myState?.userData?.Organization?.name}</p>}
        {showFinish && <button className={`bg-[#4E2357] px-[20px] py-[5px] rounded-2xl border-2 ${finishButtonState ? "opacity-30" : ""}`} disabled={finishButtonState} onClick={() => {
            messageApi.open({
                type: 'success',
                content: 'Onboarding data saved successfully',
            });
            setTimeout(() => navigate('/user/dashboard'), 2000);
        }}> <small className='mx-2 text-white' >Finish</small></button>}
    </div>

    const footer = <div className='ml-[3%] mr-[3%]'>

        <div className='flex flex-col absolute bottom-5' style={{
            width: '93%'
        }}>
            <h6 className='pb-3 font-medium'>Background article</h6>

            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>

                <div className='flex border-[1px] border-[lightgray] rounded-3xl p-4'>
                    <img src={CONVERSATION} alt='Introduction' width={80} height={80} className='rounded-2xl border-2 m-1' />
                    <div>
                        <p className='w-[80%] font-semibold '>The conversation: letting your beneficiaries know they're secure.</p>
                        <div className='flex mt-1'>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" stroke="#4E2357" stroke-width="1.5" stroke-linecap="round" />
                                <path opacity="0.5" d="M12 9V13H16" stroke="#4E2357" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#4E2357" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="0.5 3.5" />
                            </svg>
                            <p className='text-gray-400 text-sm ml-1 mt-1'>5 minute read</p>
                        </div>
                    </div>
                    <svg className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => window.open("https://www.forbes.com/sites/investorhub/article/what-is-estate-planning-guide-faq-investors/?sh=8254a774f21d", "/blank")}>
                        <path d="M19.4333 9.11085V16.7997C19.4333 18.5671 18.0006 19.9997 16.2333 19.9997H7.7C5.93269 19.9997 4.5 18.5671 4.5 16.7997V8.26641C4.5 6.4991 5.93269 5.06641 7.7 5.06641H14.7667" stroke="#4E2357" stroke-width="1.6" stroke-linecap="round" />
                        <path d="M15.166 9.33333L20.4993 4" stroke="#4E2357" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.3008 4H20.5008V6.13333" stroke="#4E2357" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                {/* <div className='flex mt-7'>
                    <p className=' font-semibold pr-4'>Add commentary</p>
                    <div className='mt-[2px] cursor-pointer'>
                        {notification && <Badge count={3} onClick={() => setNotification(false)} style={{
                            backgroundColor: '#4E2357'
                        }}>
                            <MessageOutlined style={{ fontSize: '20px', color: '#4E2357' }} />
                        </Badge>}
                        {!notification && <MessageOutlined style={{ fontSize: '20px', color: '#4E2357' }} />}
                    </div>
                </div> */}

            </div>

        </div>
    </div>

    const introduction = <div>

        <div className='w-[70%] ml-[15%] mr-[10%]'>

            <h3 className='text-center pb-3 font-medium'>Your Estate Journey</h3>
            <p className='text-center text-gray-400 text-sm pb-5'>Welcome to our estate plan module. This will help get a picture of you and your loved ones, your valuables, your wishes, to paint a view of your estate.</p>
            <p className='text-center text-gray-400 text-sm pb-5'>This process should take about an hour to complete, with additional time if you are required to complete any documentation. Throughout this process, you may use the Comment feature to raise any questions to your advisor. Additionally, you can save and return back to this journey anytime.</p>

            <div className='border-[1px] border-[lightgray] rounded-3xl p-4 mt-6'>
                {
                    intro.map((intro, index) => <div className='p-4'>
                        <div className='flex justify-between'>
                            <div className='flex'>
                                <p className={`border-[1px] border-[lightgray] rounded-3xl pt-[10px] pl-3 pr-3 mt-[-10px] h-[40px] ${check >= index ? "FBF5FC" : ""}`}>{!(check >= index) ? "0" + (index + 1) : <svg className='mt-1' width="14" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 8.2L5.85714 13L18 1" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                }
                                </p>
                                <p className='font-medium ml-3'>{intro.title}</p>
                            </div>
                            <button className={`bg-[${check >= index ? "FBF5FC" : "#4E2357"}] px-[20px] py-[5px] rounded-2xl border-2 ${check + 1 >= index ? "" : "opacity-30"}`} onClick={() => {
                                setStep(index); setFinish(false)
                                if (check >= index) {
                                    setEdit(index + 1)
                                }
                            }} disabled={check + 1 >= index ? false : true}> <small className={`mx-2 ${check >= index ? "text-black" : "text-white"}`} >{check >= index ? "Edit" : "Start"}</small></button>
                        </div>
                        <p className='text-gray-400 text-md w-[80%]  mt-2'>{intro.description}</p>
                        <hr className='mt-2' />
                    </div>)
                }
            </div>
        </div>
    </div>

    // const IntegrationView = ({ setState }) => <div className='grid grid-cols-3 gap-6 mt-3 mb-3'>

    //     <div className='border-[1px] border-[lightgray] rounded-2xl p-6 h-[108px] w-[218px]' style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "space-between",
    //         alignItems: "center"
    //     }}>
    //         <input type="radio" className='cursor-pointer' style={{
    //             marginLeft: "-100%"
    //         }} id="radioButton" name="radioGroup" onClick={() => setState(false)} />
    //         <svg width="129" height="24" viewBox="0 0 129 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M113.312 0C112.848 0 112.473 0.375996 112.473 0.839629V6.7284H128.021L120.94 0.000543177L113.312 0Z" fill="#117ACA" />
    //             <path d="M128.592 8.50999C128.592 8.04527 128.218 7.6709 127.752 7.6709H121.867V23.2268L128.589 16.1397L128.592 8.50999Z" fill="#117ACA" />
    //             <path d="M120.081 23.7894C120.544 23.7894 120.92 23.4128 120.92 22.9481V17.0615H105.371L112.453 23.7883L120.081 23.7894Z" fill="#117ACA" />
    //             <path d="M104.805 15.281C104.805 15.7452 105.181 16.1234 105.646 16.1234H111.529V0.566406L104.806 7.65132L104.805 15.281Z" fill="#117ACA" />
    //             <path d="M33.5345 2.84113V10.025H23.5304V2.84113L19.8867 2.83789V20.9516H23.5304V13.1699H33.5345V20.9516H37.1841V2.84113H33.5345Z" fill="#211E1E" />
    //             <path d="M82.0039 2.84082V20.947H97.9894L95.9648 17.7594H85.6578V13.1696H95.6382V10.0994H85.6578V5.95372H95.9475L97.931 2.84082H82.0039Z" fill="#211E1E" />
    //             <path d="M6.34123 2.83691C2.55104 2.83691 0.636719 5.14211 0.636719 8.4963V15.2577C0.636719 19.1394 3.10367 20.9517 6.3223 20.9517L17.754 20.9506L15.6348 17.6397H7.02854C5.20021 17.6397 4.40368 16.9786 4.40368 14.9315V8.7971C4.40368 6.81812 5.07422 6.04612 7.0772 6.04612H15.7245L17.7594 2.83691H6.34123Z" fill="#211E1E" />
    //             <path d="M66.014 2.83245C63.825 2.83245 61.5814 4.1487 61.5814 7.53427V8.40419C61.5814 11.9337 63.7401 13.2802 65.8999 13.2894H73.4808C74.2682 13.2894 74.9079 13.4203 74.9079 14.7517L74.9068 16.2898C74.8868 17.4859 74.2903 17.7597 73.4538 17.7597H63.4805L61.4375 20.9472H73.6885C76.6427 20.9472 78.6484 19.4768 78.6484 16.0804V14.8323C78.6484 11.5485 76.7849 9.99689 73.8956 9.99689H66.6569C65.8544 9.99689 65.2953 9.77778 65.2953 8.58867V7.33626C65.2953 6.32351 65.6787 5.95401 66.6137 5.95401L76.1116 5.95023L78.0968 2.82812L66.014 2.83245Z" fill="#211E1E" />
    //             <path d="M47.7682 2.84082L39.1836 20.9502H43.2409L44.913 17.2103H54.2417L55.9083 20.9502H59.9835L51.3789 2.84082H47.7682ZM49.5684 6.60076L52.8671 14.1277H46.2908L49.5684 6.60076Z" fill="#211E1E" />
    //         </svg>
    //     </div>

    //     <div className='border-[1px] border-[lightgray] rounded-2xl p-6 h-[108px] w-[218px]' style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "space-between",
    //         alignItems: "center"
    //     }}>
    //         <input type="radio" className='cursor-pointer' style={{
    //             marginLeft: "-100%"
    //         }} id="radioButton" name="radioGroup" onClick={() => setState(false)} />
    //         <svg width="128" height="45" viewBox="0 0 128 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M63.9977 2.26065C64.4671 1.49407 65.2461 0.691966 66.0848 0.352718C67.5285 -0.304136 69.4636 -0.0216634 70.6414 1.01772C71.7813 2.05036 72.3594 3.46565 72.0867 5.04796C72.3662 4.9964 72.6484 4.81742 72.9444 4.71558C74.7137 4.2162 76.585 4.75772 77.7194 6.27472C78.5716 7.35764 78.7942 9.04013 78.2827 10.3484C78.0289 11.0064 77.596 11.598 77.033 12.1029L77.0898 12.1599C78.7359 12.2399 80.3536 13.5182 80.8529 15.0855C81.3943 16.6664 80.918 18.3558 79.7619 19.512C78.8174 20.4456 77.6028 20.7687 76.2527 20.7414H51.7416C49.729 20.7848 48.174 19.8933 47.3367 18.1036C46.6799 16.5674 47.0042 14.6025 48.2309 13.4315C49.0043 12.6227 49.9733 12.2914 51.0182 12.1247C49.8349 11.0269 49.2649 9.52475 49.5974 7.91393C49.8349 6.60862 50.9476 5.28689 52.2258 4.83092C53.352 4.38308 54.8774 4.46175 55.9088 5.0696L55.9455 5.02479C55.6347 3.24848 56.4218 1.64593 57.8953 0.663451C59.209 -0.225212 61.3095 -0.202298 62.5959 0.742376C63.174 1.09639 63.6503 1.70436 63.9977 2.26065Z" fill="white" />
    //             <path d="M70.9369 2.92408C71.4635 3.98663 71.1542 5.37888 70.6045 6.33285L66.3517 15.9009L66.315 15.9457L64.7777 6.23928C64.6544 5.30721 65.6502 4.90954 66.2364 4.4617C66.2066 4.32473 66.0559 4.33148 65.9611 4.2677L64.5241 4.25268L64.4805 4.20927C64.4886 3.00428 65.1373 1.89157 66.2364 1.30676C67.3846 0.64329 69.0019 0.82367 69.9979 1.67453C70.4023 2.03529 70.743 2.45448 70.9369 2.92408Z" fill="#645FAA" />
    //             <path d="M63.1024 2.59236C63.4499 3.23559 63.6508 3.96577 63.5286 4.77436L61.7944 15.8881C61.8039 15.9016 61.7877 15.9166 61.7739 15.9232L61.3248 15.0291L56.9784 5.32263C56.574 4.07282 56.9486 2.76612 57.859 1.87032C58.7763 0.939525 60.2853 0.687095 61.485 1.19196C62.1201 1.46616 62.7266 1.97102 63.1024 2.59236Z" fill="#C9234A" />
    //             <path d="M77.2297 7.26934C77.8145 8.26659 77.683 9.7757 77.0327 10.7012C76.63 11.3511 75.9648 11.6755 75.4017 12.1016L66.3956 18.2838H66.375L66.4756 17.988L71.2495 7.21244C71.9646 5.94227 73.3298 5.29903 74.7736 5.49303C75.7628 5.67367 76.752 6.31678 77.2297 7.26934Z" fill="#0089CF" />
    //             <path d="M56.7681 7.2139L61.736 18.2841H61.656L51.6403 11.3811C50.621 10.5222 50.2032 9.23577 50.5492 7.93581C50.8084 6.96147 51.6171 6.05104 52.5792 5.6899C54.1545 5.11324 55.9293 5.72656 56.7681 7.2139Z" fill="#F36F21" />
    //             <path d="M79.8457 15.0848C80.345 16.1392 80.1483 17.583 79.4346 18.4798C78.7264 19.3389 77.7791 19.8084 76.6676 19.7785L65.9883 19.7854L74.9346 13.561C75.8088 12.9979 77.1372 12.8959 78.0912 13.3519C78.8279 13.641 79.5214 14.3629 79.8457 15.0848Z" fill="#0DB14B" />
    //             <path d="M48.2182 15.0848C47.7204 16.1392 47.9156 17.583 48.6308 18.4798C49.3391 19.3389 50.2835 19.8084 51.3963 19.7785L62.0757 19.7854L53.1292 13.561C52.2553 12.9979 50.927 12.8959 49.9743 13.3519C49.2372 13.641 48.544 14.3629 48.2182 15.0848Z" fill="#FDB913" />
    //             <path d="M29.0392 26.1777C23.8502 26.1777 19.6328 30.3979 19.6328 35.5871C19.6328 40.7748 23.8502 44.9975 29.0392 44.9975C34.2284 44.9975 38.4485 40.7748 38.4485 35.5871C38.4485 30.398 34.2284 26.1777 29.0392 26.1777ZM29.0392 43.1439C24.872 43.1439 21.4809 39.7531 21.4809 35.5872C21.4809 31.4224 24.872 28.0314 29.0392 28.0314C33.2065 28.0314 36.5976 31.4225 36.5976 35.5872C36.5976 39.7531 33.2065 43.1439 29.0392 43.1439Z" fill="black" />
    //             <path d="M110.167 35.7091C109.662 35.4443 106.591 33.8635 106.15 33.6343C104.539 32.8105 103.968 32.0831 103.968 30.851C103.968 29.1386 105.374 28.0327 107.554 28.0327C108.834 28.0327 110.072 28.5958 110.798 29.0042C110.929 29.0761 111.086 29.1169 111.248 29.1169C111.756 29.1169 112.172 28.7003 112.172 28.1928C112.172 27.8509 111.985 27.5509 111.71 27.3907C110.795 26.8804 109.236 26.1816 107.554 26.1816C104.351 26.1816 102.116 28.1003 102.116 30.851C102.116 33.3195 103.739 34.4837 105.326 35.2952C105.771 35.5218 108.878 37.123 109.343 37.3685C110.57 38.0104 111.248 38.9739 111.248 40.0826C111.248 41.5685 109.989 43.148 107.659 43.148C105.393 43.148 103.633 41.6282 103.147 41.16L103.002 41.0215L101.633 42.2699L101.793 42.43C102.401 43.0328 104.624 45.0001 107.659 45.0001C111.062 45.0001 113.097 42.4993 113.097 40.0826C113.097 38.278 112.03 36.6832 110.167 35.7091Z" fill="black" />
    //             <path d="M9.75039 28.0313C11.7709 28.0313 13.6692 28.8185 15.0941 30.2418C15.4333 30.5797 16.0711 30.5797 16.4049 30.2418C16.5813 30.0695 16.6749 29.8375 16.6749 29.5892C16.6749 29.3435 16.5813 29.1088 16.4049 28.9364L16.2909 28.8197C14.5295 27.1153 12.2051 26.1777 9.75039 26.1777C4.56391 26.1777 0.34375 30.3993 0.34375 35.5857C0.34375 40.7749 4.56391 44.9976 9.75039 44.9976C12.4886 44.9976 14.9556 43.8228 16.6749 41.9499L15.3654 40.6391C13.9813 42.1752 11.9784 43.1441 9.75027 43.1441C5.58433 43.1441 2.19325 39.7518 2.19325 35.5858C2.19338 31.4238 5.58446 28.0313 9.75039 28.0313Z" fill="black" />
    //             <path d="M73.5304 28.0313C75.5483 28.0313 77.4493 28.8185 78.874 30.2418C79.2118 30.5797 79.8498 30.5797 80.1836 30.2418C80.36 30.0695 80.4577 29.8375 80.4577 29.5892C80.4577 29.3435 80.3599 29.1088 80.1836 28.9364L80.071 28.8197C78.3056 27.1153 75.9838 26.1777 73.5304 26.1777C68.3428 26.1777 64.1211 30.3992 64.1211 35.5855C64.1211 40.7748 68.3428 44.9975 73.5304 44.9975C76.2673 44.9975 78.7343 43.8227 80.4563 41.9498L79.1454 40.639C77.7613 42.1751 75.7556 43.1439 73.5304 43.1439C69.3631 43.1439 65.9706 39.7517 65.9706 35.5857C65.9706 31.4238 69.3631 28.0313 73.5304 28.0313Z" fill="black" />
    //             <path d="M57.5956 26.1777C57.2482 26.1777 56.974 26.4017 56.8247 26.6906C56.6727 26.9796 51.2883 40.2983 51.287 40.2983C51.287 40.2983 45.9026 26.9795 45.7519 26.6906C45.6013 26.4015 45.3273 26.1777 44.98 26.1777C44.5741 26.1777 44.2689 26.4762 44.1617 26.8523C44.0545 27.2307 41.0163 43.9933 41.0163 43.9933C41.0053 44.0477 41 44.1048 41 44.163C41 44.6242 41.3759 44.9975 41.8346 44.9975C42.2417 44.9975 42.5809 44.7073 42.6541 44.3232L45.2852 29.9814C45.2852 29.9814 50.3617 42.5225 50.5096 42.8209C50.6589 43.1181 50.9357 43.3502 51.2886 43.3502C51.6413 43.3502 51.9169 43.1181 52.0647 42.8209C52.214 42.5223 57.2904 29.9814 57.2904 29.9814L60.0246 44.8944H61.7238C61.7238 44.8944 58.5226 27.2306 58.4154 26.8523C58.3066 26.4762 58.0012 26.1777 57.5956 26.1777Z" fill="black" />
    //             <path d="M91.0437 26.1816C90.6922 26.1804 90.4197 26.4096 90.2663 26.7081C90.1142 27.0054 83.2983 43.8401 83.2983 43.8401C83.2575 43.939 83.2344 44.0491 83.2344 44.1657C83.2344 44.6269 83.6076 45.0016 84.0689 45.0016C84.4204 45.0016 84.7217 44.7817 84.8453 44.471L87.4912 37.9618H94.5976L97.4203 44.897H99.2236C99.2236 44.897 91.9693 27.0053 91.8201 26.708C91.6719 26.4096 91.3964 26.1804 91.0437 26.1816ZM88.2456 36.1092L91.0436 29.2293L93.8444 36.1092H88.2456Z" fill="black" />
    //             <path d="M126.744 26.2793H116.268C115.758 26.2793 115.344 26.6947 115.344 27.2061C115.344 27.715 115.758 28.1302 116.268 28.1302H120.659V44.8943H122.355V28.1303H126.744C127.254 28.1303 127.672 27.7151 127.672 27.2063C127.672 26.6947 127.254 26.2793 126.744 26.2793Z" fill="black" />
    //         </svg>
    //     </div>

    //     <div className='border-[1px] border-[lightgray] rounded-2xl p-6 h-[108px] w-[218px]' style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "space-between",
    //         alignItems: "center"
    //     }}>
    //         <input type="radio" className='cursor-pointer' style={{
    //             marginLeft: "-100%"
    //         }} id="radioButton" name="radioGroup" onClick={() => setState(false)} />
    //         <svg width="50" height="46" viewBox="0 0 50 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M0 48H50V-1.99999H0V48Z" fill="#DD1E25" />
    //             <path d="M43.0893 28.7632C43.0893 26.7542 42.2605 25.5846 40.7283 25.5846C39.1955 25.5846 38.3674 26.7542 38.3674 28.7632C38.3674 30.784 39.1843 31.9417 40.7283 31.9417C42.2717 31.9417 43.0893 30.784 43.0893 28.7632ZM44.951 28.7632C44.951 31.2377 43.1917 32.9746 40.7283 32.9746C38.2762 32.9746 36.5057 31.2377 36.5057 28.7632C36.5057 26.2998 38.2875 24.5517 40.7283 24.5517C43.1798 24.5517 44.951 26.2998 44.951 28.7632ZM32.1912 29.1263C32.1912 29.353 32.2256 29.5008 32.3161 29.6825H33.6672V31.6914C33.2248 31.8737 32.7816 31.9529 32.3279 31.9529C30.6928 31.9529 29.8415 30.784 29.8415 28.7632C29.8415 26.7423 30.6928 25.5734 32.2368 25.5734C33.2697 25.5734 33.8713 26.0845 34.2233 26.9695L34.3481 27.2872H35.1657V25.2557C34.1441 24.7677 33.2248 24.5517 32.1575 24.5517C29.6599 24.5517 27.9804 26.2206 27.9804 28.7744C27.9804 31.3401 29.6149 32.9746 32.1575 32.9746C33.1673 32.9746 34.2121 32.6906 35.3355 32.1346V28.5928H32.3161C32.2256 28.7744 32.1912 28.9111 32.1912 29.1263ZM25.2893 27.0606C25.2893 26.2318 24.7781 25.7893 23.7565 25.7893H22.4172V28.3431H23.7565C24.7669 28.3431 25.2893 27.8776 25.2893 27.0606ZM16.4008 29.376L15.288 26.3679L14.1759 29.376H16.4008ZM27.4911 31.8506C27.5598 31.9753 27.5935 32.1233 27.5935 32.3162C27.5935 32.509 27.5598 32.6569 27.4911 32.7817C27.2415 32.8155 26.9238 32.8379 26.6061 32.8379C25.5052 32.8379 24.9716 32.3842 24.8462 31.3282L24.8012 30.9313C24.6652 29.7848 24.2901 29.3423 23.0419 29.3423H22.4172V31.7601H23.4956V32.7474H16.3553V31.7601H17.2864L16.764 30.3409H13.8127L13.2903 31.7601H14.2439V32.7474H11.2357V31.7601H12.0302L14.8112 24.8014H16.3209L19.1594 31.7601H20.7258V25.7893H19.761V24.8014H24.3244C25.9477 24.8014 27.0031 25.6076 27.0031 26.9015C27.0031 28.184 25.9477 28.8655 24.9261 28.9111V28.9448C25.9589 29.0241 26.379 29.6032 26.4813 30.5L26.5263 30.9201C26.5943 31.5785 26.731 31.8737 27.2527 31.8737C27.3438 31.8737 27.4231 31.8618 27.4911 31.8506ZM10.191 25.7893C10.9512 25.7893 11.2127 26.1182 11.4623 27.0718L11.5416 27.3783H12.3591V24.8014H5.51459V25.7893H6.47946V31.7601H5.51459V32.7474H9.30539V31.7601H8.17015V29.4441H10.5087C10.5998 29.2512 10.6335 29.1039 10.6335 28.8768C10.6335 28.6608 10.5998 28.5247 10.5087 28.3319H8.17015V25.7893H10.191ZM44.6789 18.4892C44.6789 17.2403 43.9181 16.3778 42.4877 16.0489L41.046 15.7194C40.206 15.5266 39.8546 15.197 39.8546 14.6416C39.8546 13.9713 40.3882 13.5513 41.4323 13.5513C42.4764 13.5513 43.0893 13.9264 43.3277 14.8113L43.4301 15.1971H44.247V13.2336C43.3277 12.768 42.3516 12.5303 41.3637 12.5303C39.4227 12.5303 38.1745 13.4608 38.1745 14.9586C38.1745 16.117 38.9003 16.9682 40.2971 17.2747L41.7388 17.5924C42.6581 17.7971 42.9988 18.1603 42.9988 18.7619C42.9988 19.4996 42.4421 19.9084 41.33 19.9084C40.0699 19.9084 39.4227 19.4085 39.1394 18.4555L38.9915 17.9668H38.1745V20.1924C39.2074 20.7029 40.1947 20.93 41.5228 20.93C43.4301 20.93 44.6789 19.9764 44.6789 18.4892ZM37.4131 17.9899H36.5962L36.505 18.3875C36.2779 19.3973 35.9602 19.7149 35.2113 19.7149H33.6335V13.7447H34.712V12.7568H30.9767V13.7447H31.9422V19.7149H30.9767V20.7029H37.4131V17.9899ZM30.2615 17.9899H29.4439L29.3534 18.3875C29.1263 19.3973 28.8086 19.7149 28.0597 19.7149H26.4813V13.7447H27.5598V12.7568H23.8251V13.7447H24.79V19.7149H23.8251V20.7029H30.2615V17.9899ZM7.16035 20.7029L5.16198 13.7447H4.25391V12.7568H7.95484V13.7447H6.88762L8.21571 18.5347L9.80468 12.7568H11.4398L13.0625 18.546L14.3681 13.7447H13.256V12.7568H22.8827V15.3337H22.0652L21.9859 15.0273C21.7356 14.0736 21.4748 13.7447 20.7146 13.7447H18.8304V16.1395H21.1122C21.2027 16.3323 21.2364 16.469 21.2364 16.6843C21.2364 16.9115 21.2027 17.0587 21.1122 17.2522H18.8304V19.7149H20.7939C21.5316 19.7149 21.8611 19.3973 22.0883 18.3875L22.1788 17.9899H22.9963V20.7029H16.1743V19.7149H17.1391V13.7447H15.5714L13.5849 20.7029H12.0071L10.3951 14.9368L8.73808 20.7029H7.16035Z" fill="#FEFEFE" />
    //         </svg>
    //     </div>

    //     <div className='border-[1px] border-[lightgray] rounded-2xl p-6 h-[108px] w-[218px]' style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "space-between",
    //         alignItems: "center"
    //     }}>
    //         <input type="radio" className='cursor-pointer' style={{
    //             marginLeft: "-100%"
    //         }} id="radioButton" name="radioGroup" onClick={() => setState(false)} />
    //         <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M42.0882 32.5498C40.7255 32.5498 39.6218 33.5741 39.6218 34.8415C39.6218 36.1035 40.7255 37.1278 42.0882 37.1278C43.4482 37.1278 44.5519 36.1035 44.5519 34.8415C44.5519 33.5741 43.4482 32.5498 42.0882 32.5498ZM42.0882 36.7181C40.9708 36.7181 40.066 35.8768 40.066 34.8415C40.066 33.8036 40.9708 32.9623 42.0882 32.9623C43.2056 32.9623 44.1077 33.8036 44.1077 34.8415C44.1077 35.8768 43.2056 36.7181 42.0882 36.7181ZM0.164062 32.8475V40.2063C0.164062 44.3172 2.715 45.0001 4.85167 45.0001C8.01309 45.0001 9.4766 42.9432 9.4766 40.1653V32.8448H7.38625V40.4139C7.38625 41.3699 7.06739 43.1536 4.85167 43.1181C2.83491 43.0825 2.46699 41.2606 2.46699 40.0888V32.8475H0.164062ZM18.2168 33.3283C18.2168 33.3283 16.8814 32.6782 15.3634 32.6782C13.4747 32.6782 11.0982 33.6315 11.0982 36.2401C11.0982 38.0484 12.4527 38.9033 13.3739 39.3431C13.8644 39.578 14.4586 39.8402 14.9491 40.0997C15.2026 40.2363 16.2082 40.5695 16.2082 41.6376C16.2082 42.7848 14.9328 43.1727 14.3604 43.1727C12.3219 43.1727 10.9319 42.2604 10.9319 42.2604L11.1472 44.5548C11.1472 44.5548 11.9812 44.9728 14.4749 44.9782C16.8541 44.97 18.5684 43.465 18.5684 41.3945C18.5684 39.802 17.4646 38.8569 16.5189 38.4062C15.7776 38.0511 15.347 37.8544 14.7011 37.5539C14.0552 37.2535 13.3875 36.7372 13.3875 35.9369C13.3875 35.0792 14.1887 34.4619 15.3634 34.4619C17.0967 34.4619 17.7917 35.2322 18.2168 35.4725V33.3283ZM35.2367 32.8284H32.7293L33.1272 33.8254L29.23 44.055L25.2101 32.8284H22.7028L23.1007 33.8254L18.9472 44.7324H21.2147L21.9397 42.6564H26.2348L26.957 44.7324H31.244L31.9717 42.6564H36.2641L36.9891 44.7324H39.5018L35.2367 32.8284ZM22.5038 41.0421L24.1717 36.3821L25.6598 41.0421H22.5038ZM32.5331 41.0421L34.1956 36.3821L35.6863 41.0421H32.5331Z" fill="#1A3258" />
    //             <path d="M42.5779 34.9077C42.5779 34.9077 43.0685 34.741 43.0685 34.2958C43.0685 33.8478 42.6188 33.5965 42.0683 33.5965C41.5178 33.5965 41.1826 33.7222 41.1826 33.7222V35.9129H41.8366V35.1125H42.0329L42.7251 35.9047H43.5563L42.5779 34.9077ZM42.1419 34.741H41.8366V34.0117C41.8366 34.0117 42.379 33.9653 42.379 34.3231C42.379 34.6891 42.1419 34.741 42.1419 34.741ZM0.0351562 19.4555L0.14417 23.1758C0.14417 23.1758 1.07079 22.5011 2.10915 22.5011C3.15024 22.5011 4.32214 23.2386 4.32214 23.2386L13.6238 28.5842L14.4114 25.2244L4.32214 19.4227C4.32214 19.4227 3.15024 18.6934 2.10915 18.6934C1.06534 18.6934 0.0378816 19.4582 0.0378816 19.4582" fill="#1A3258" />
    //             <path d="M0.0351562 14.5939L0.14417 18.3143C0.14417 18.3143 1.07079 17.6396 2.10915 17.6396C3.15024 17.6396 4.32214 18.3744 4.32214 18.3744L14.6267 24.299L15.4116 20.9392L4.31941 14.5611C4.31941 14.5611 3.15296 13.8291 2.10915 13.8291C1.06534 13.8291 0.0378816 14.5939 0.0378816 14.5939" fill="#1A3258" />
    //             <path d="M0.0351562 9.73182L0.14417 13.4522C0.14417 13.4522 1.07079 12.7747 2.10915 12.7747C3.15024 12.7747 4.32214 13.5122 4.32214 13.5122L15.6324 20.0133L16.4173 16.6535L4.32214 9.69904C4.32214 9.69904 3.15024 8.96973 2.10915 8.96973C1.06534 8.96973 0.0378816 9.73182 0.0378816 9.73182" fill="#1A3258" />
    //             <path d="M19.4218 3.8132L20.4574 8.20275L34.6238 16.3427C34.6238 16.3427 35.7358 17.0747 36.8314 17.0747C37.9269 17.0747 38.9053 16.3099 38.9053 16.3099L38.7963 12.5896C38.7963 12.5896 37.9106 13.2643 36.8314 13.2643C35.7494 13.2643 34.6238 12.5295 34.6238 12.5295L23.6652 6.2306L22.9075 3.40894C22.9075 3.28875 23.0165 3.23412 23.0574 3.22593L24.9106 2.65231C25.1614 2.65231 25.3058 2.86536 25.3058 3.04291L25.4039 3.24505C25.4721 3.28056 25.7501 3.14671 25.7691 3.13579V2.02132C25.7692 1.83676 25.7326 1.65404 25.6615 1.48376C25.5905 1.31349 25.4864 1.15906 25.3553 1.02945C25.2242 0.899838 25.0687 0.797626 24.8979 0.728752C24.727 0.659879 24.5443 0.625716 24.3601 0.62825H22.5069C22.5069 0.62825 22.2344 0 21.4467 0H17.9256C16.9989 0 16.7727 0.86316 16.7727 0.86316L14.3281 10.5928L4.32332 4.84025C4.32332 4.84025 3.23863 4.10274 2.11033 4.10274C0.982035 4.10274 0.0390625 4.86757 0.0390625 4.86757L0.145351 8.59063C0.145351 8.59063 0.97931 7.91595 2.10761 7.91595C3.2359 7.91595 4.32332 8.65346 4.32332 8.65346L16.6337 15.7254L19.4218 3.8132Z" fill="#1A3258" />
    //             <path d="M20.7305 9.40723L21.7661 13.8159L34.6189 21.2019C34.6189 21.2019 35.769 21.9394 36.8264 21.9394C37.8839 21.9394 38.9004 21.1719 38.9004 21.1719L38.7941 17.4516C38.7941 17.4516 37.9711 18.1262 36.8264 18.1262C35.6818 18.1262 34.6189 17.3942 34.6189 17.3942L20.7305 9.40723Z" fill="#1A3258" />
    //             <path d="M22.0508 15.0273L23.0864 19.4388L34.6228 26.0654C34.6228 26.0654 35.7729 26.8002 36.8304 26.8002C37.8878 26.8002 38.9044 26.0354 38.9044 26.0354L38.7954 22.315C38.7954 22.315 37.9778 22.9897 36.8304 22.9897C35.6857 22.9897 34.6228 22.2577 34.6228 22.2577L22.0508 15.0273Z" fill="#1A3258" />
    //             <path d="M23.3711 20.6484L24.4013 25.0516L34.6214 30.9244C34.6214 30.9244 35.7715 31.6619 36.8289 31.6619C37.8836 31.6619 38.9029 30.8944 38.9029 30.8944L38.7939 27.1768C38.7939 27.1768 37.9763 27.8487 36.8289 27.8487C35.6815 27.8487 34.6214 27.1139 34.6214 27.1139L23.3711 20.6484Z" fill="#1A3258" />
    //         </svg>
    //     </div>

    //     <div className='border-[1px] border-[lightgray] rounded-2xl p-6 h-[108px] w-[218px]' style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "space-between",
    //         alignItems: "center"
    //     }}>
    //         <input type="radio" className='cursor-pointer' style={{
    //             marginLeft: "-100%"
    //         }} id="radioButton" name="radioGroup" onClick={() => setState(false)} />
    //         <svg width="181" height="45" viewBox="0 0 181 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M145.976 12.0105H143L147.525 22H149.93L159 2H156.045L148.727 18.1175L145.976 12.0105Z" fill="#D52B1E" />
    //             <path d="M124.267 35.3885H130.256V24.953C130.256 22.566 131.707 20.8892 133.862 20.8892C135.934 20.8892 137.011 22.2701 137.011 24.2625V35.3885H143V23.1775C143 19.0349 140.389 16.1153 136.162 16.1153C133.468 16.1153 131.582 17.22 130.173 19.2322H130.049V16.6677H124.247L124.267 35.3885ZM112.497 16.1548C106.24 16.1548 102.054 20.4355 102.054 26.0774C102.054 31.6798 106.24 36 112.497 36C118.755 36 122.941 31.6798 122.941 26.0774C122.962 20.4355 118.755 16.1548 112.497 16.1548ZM112.456 31.7785C109.617 31.7785 108.104 29.5099 108.104 26.0774C108.104 22.6055 109.596 20.3763 112.456 20.3763C115.295 20.3763 116.87 22.6055 116.87 26.0774C116.891 29.5099 115.316 31.7785 112.456 31.7785ZM84.9789 35.3885H101.805V30.8907H92.273V30.7724L101.391 21.047V16.648H84.9789V21.1654H94.2001V21.2838L84.9789 31.088V35.3885ZM77.2911 35.3885H83.3212V16.6677H77.2911V35.3885ZM63.3039 35.3885H69.3132V26.7876C69.3132 22.8816 71.7791 21.1457 75.5298 21.6388H75.6541V16.7071C75.3433 16.5888 74.991 16.569 74.4315 16.569C72.09 16.569 70.5151 17.5948 69.1682 19.7845H69.0439V16.6677H63.3039V35.3885ZM52.2799 31.7982C49.6275 31.7982 48.0112 30.1609 47.7004 27.6358H61.8741C61.9156 23.6115 60.7966 20.3961 58.455 18.3839C56.7973 16.9241 54.6215 16.1153 51.8448 16.1153C45.9183 16.1153 41.8154 20.3961 41.8154 25.9985C41.8154 31.6404 45.7318 35.9408 52.2385 35.9408C54.7044 35.9408 56.6522 35.3096 58.2685 34.264C59.9884 33.1396 61.2317 31.4825 61.5633 29.8452H55.8026C55.2431 31.0683 54.0413 31.7982 52.2799 31.7982ZM51.9691 20.1988C54.0827 20.1988 55.5332 21.698 55.7819 23.8877H47.7418C48.2184 21.6783 49.4825 20.1988 51.9691 20.1988ZM29.8382 35.3885H36.1376L42.9758 16.6677H36.9458L33.1122 28.7011H33.0294L29.1958 16.6677H23L29.8382 35.3885ZM77.2911 10H83.3212V15.0895H77.2911V10Z" fill="black" />
    //         </svg>
    //     </div>

    //     <div className='border-[1px] border-[lightgray] rounded-2xl p-6 h-[108px] w-[218px]' style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "space-between",
    //         alignItems: "center"
    //     }}>
    //         <input type="radio" className='cursor-pointer' style={{
    //             marginLeft: "-100%"
    //         }} id="radioButton" name="radioGroup" onClick={() => setState(false)} />
    //         <svg width="145" height="24" viewBox="0 0 145 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <g clip-path="url(#clip0_27_19796)">
    //                 <path d="M78.793 10.2695H95.7096V13.1231H78.793V10.2695Z" fill="#0057B8" />
    //                 <path d="M78.793 0.0742188H95.7096V2.92776H78.793V0.0742188Z" fill="#00AEEF" />
    //                 <path d="M17.2376 23.8852L5.6263 8.53091C4.33301 6.86792 3.68164 5.93249 3.17188 4.9876H3.09635C3.17188 5.7813 3.20964 6.75453 3.20964 7.95453V23.8947H0V0.0742188H3.28516L14.4245 14.8522C15.8688 16.7703 16.5579 17.6774 17.0205 18.6506H17.096C17.0583 17.753 17.0205 16.7325 17.0205 15.5419V0.0742188H20.2301V23.8947H17.2376V23.8852Z" fill="#470A68" />
    //                 <path fill-rule="evenodd" clip-rule="evenodd" d="M41.5921 23.8866L39.1755 17.6693H29.9808L27.7435 23.8866H24.4961L33.6152 0H35.6732L44.9434 23.8866H41.5921ZM35.6071 7.70079C35.1729 6.51024 34.8802 5.52756 34.7008 4.73386H34.6631C34.4554 5.60315 34.1628 6.50079 33.7285 7.66299L31.0947 14.8913H38.0993L35.6071 7.70079Z" fill="#470A68" />
    //                 <path d="M54.5801 23.9986H52.5599L43.082 0.0742188H46.471L52.2767 15.1451C52.7393 16.4112 53.2113 17.7435 53.6455 19.0096H53.7116C54.1458 17.7813 54.5801 16.553 55.1559 15.1829L61.4336 0.0742188H64.8226L54.5801 23.9986Z" fill="#470A68" />
    //                 <path d="M69.6641 23.8852V0.0742188H72.8737V23.8947C72.8737 23.8947 69.6641 23.8947 69.6641 23.8852Z" fill="#470A68" />
    //                 <path d="M78.793 21.0322H95.7096V23.8858H78.793V21.0322Z" fill="#470A68" />
    //                 <path d="M119.171 23.8852L107.56 8.53091C106.257 6.86792 105.606 5.92304 105.105 4.9876H105.03C105.105 5.7813 105.143 6.75453 105.143 7.94508V23.8852H101.934V0.0742188H105.219L116.358 14.8522C117.802 16.7703 118.482 17.6774 118.954 18.6506H119.02C118.982 17.753 118.954 16.7325 118.954 15.5419V0.0742188H122.164V23.8947C122.164 23.8947 119.171 23.8947 119.171 23.8852Z" fill="#470A68" />
    //                 <path d="M144.961 2.92776H137.352V23.8852H134.104V2.92776H126.543V0.0742188H144.961V2.92776Z" fill="#470A68" />
    //                 <path fill-rule="evenodd" clip-rule="evenodd" d="M141.975 23.8868C141.267 23.8868 140.691 23.3199 140.691 22.6112C140.691 21.9026 141.267 21.3262 141.975 21.3262C142.674 21.3262 143.25 21.9026 143.25 22.6112C143.25 23.3199 142.674 23.8868 141.975 23.8868ZM143.07 22.6112C143.07 21.997 142.579 21.5057 141.966 21.5057C141.362 21.5057 140.871 21.997 140.871 22.6112C140.871 23.2159 141.362 23.7073 141.966 23.7073C142.579 23.7073 143.07 23.2159 143.07 22.6112ZM142.296 23.3388L141.956 22.7529H141.758V23.3388H141.503V21.8742H142.013C142.277 21.8742 142.523 22.0159 142.523 22.3088C142.523 22.6112 142.277 22.7151 142.221 22.7246L142.589 23.3388H142.296ZM141.975 22.0632H141.758V22.564H141.975C142.136 22.564 142.249 22.4884 142.249 22.3088C142.249 22.1293 142.136 22.0632 141.975 22.0632Z" fill="#470A68" />
    //             </g>
    //             <defs>
    //                 <clipPath id="clip0_27_19796">
    //                     <rect width="145" height="24" fill="white" />
    //                 </clipPath>
    //             </defs>
    //         </svg>
    //     </div>

    //     <div className='border-[1px] border-[lightgray] rounded-2xl p-6 h-[108px] w-[218px]' style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "space-between",
    //         alignItems: "center"
    //     }}>
    //         <input type="radio" className='cursor-pointer' style={{
    //             marginLeft: "-100%"
    //         }} id="radioButton" name="radioGroup" onClick={() => setState(false)} />
    //         <svg width="181" height="45" viewBox="0 0 181 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M112.186 31.3719H112.157C107.139 34.8983 101.218 38.5927 94.8174 42.4829L94.5636 42.6229C94.536 42.6341 94.5112 42.6515 94.4913 42.6736C94.4714 42.6958 94.4569 42.7221 94.4487 42.7507C94.4405 42.7792 94.439 42.8092 94.4443 42.8384C94.4495 42.8677 94.4614 42.8953 94.479 42.9193C94.4965 42.9433 94.5194 42.963 94.5458 42.977C94.5722 42.9909 94.6014 42.9988 94.6313 42.9999C94.6612 43.001 94.6909 42.9953 94.7182 42.9833C94.7456 42.9714 94.7699 42.9534 94.7892 42.9307L94.9865 42.8188C100.428 40.02 106.659 36.6895 112.919 33.2471L113.031 33.1911C112.662 32.6287 112.377 32.0159 112.186 31.3719ZM145.117 4.89581C137.223 -3.75231 86.3024 4.0282 64.6768 8.73008L64.1693 8.84203C64.1197 8.85473 64.0759 8.88382 64.0451 8.92451C64.0144 8.96521 63.9985 9.01509 64.0001 9.06593C64.0029 9.09121 64.0114 9.11554 64.025 9.13708C64.0386 9.15863 64.0569 9.17682 64.0786 9.1903C64.1004 9.20377 64.1249 9.21218 64.1504 9.21487C64.1758 9.21757 64.2016 9.21449 64.2257 9.20587L64.7332 9.12191C82.6653 5.95933 119.967 1.5653 127.975 9.45776C130.428 11.8647 129.864 14.9713 127.016 18.6376C128.588 19.6571 129.7 21.2424 130.118 23.0596C141.198 15.7549 148.642 8.75807 145.117 4.89581Z" fill="#CC2427" />
    //             <path d="M69.4346 24.5985C68.8202 24.6003 68.222 24.7963 67.7257 25.1582C67.2171 25.5819 66.887 26.1815 66.8012 26.8375C66.6331 27.7051 66.7171 28.2928 67.0533 28.6846C67.2491 28.8747 67.482 29.0225 67.7374 29.1188C67.9929 29.2151 68.2654 29.2579 68.5381 29.2444C68.9627 29.2529 69.3838 29.1669 69.7708 28.9925C70.1444 28.8199 70.464 28.549 70.6953 28.2088C70.9574 27.8197 71.1384 27.3819 71.2276 26.9214C71.3677 26.1378 71.2556 25.578 70.8914 25.1862C70.7055 24.9889 70.479 24.8342 70.2276 24.7327C69.9761 24.6313 69.7055 24.5855 69.4346 24.5985ZM60.7218 35.4576L63.0471 22.3595H67.2494L66.9132 24.0387C67.3734 23.4637 67.9845 23.0277 68.6782 22.7793C69.5418 22.4269 70.4631 22.2371 71.3957 22.2195C72.4883 22.2195 73.1607 22.2755 73.9732 22.6953C74.7434 23.0814 75.3425 23.7398 75.6541 24.5425C75.9842 25.3885 76.0621 26.312 75.8782 27.2013C75.7616 27.9648 75.4934 28.6974 75.0892 29.3559C74.6851 30.0143 74.1532 30.5854 73.5249 31.0356C72.2362 31.9591 71.0876 32.211 69.4346 32.211C68.9345 32.2202 68.4353 32.1638 67.9498 32.0431C67.6157 31.9705 67.2946 31.8478 66.9973 31.6793C66.7068 31.47 66.4433 31.2256 66.2128 30.9516L65.4284 35.4576H60.7218ZM109.217 32.0711H104.342L106.807 18.4692L111.542 18.5812L109.217 32.0711ZM84.8993 22.2475L85.2354 20.2604L90.2222 19.1969L89.6899 22.2475H92.1553L91.679 24.2346H89.2977L87.8689 32.0711H83.0222L84.479 24.2346H82.658L83.0222 22.2755H84.8993V22.2475ZM46.0696 28.5727C44.764 28.8645 43.4292 29.0053 42.0914 28.9925C39.8221 28.9925 38.0011 27.873 38.1132 25.7739C38.1692 24.4025 39.8221 21.4919 43.9684 21.4919C45.2818 21.4615 46.5758 21.8114 47.6945 22.4994L48.2828 19.1129C46.7878 18.5197 45.1831 18.2525 43.5762 18.3293C38.1132 18.3852 32.8743 20.8481 32.2299 25.8859C31.5855 30.9236 37.833 32.295 40.6066 32.295C42.2035 32.295 43.8844 32.211 45.4253 32.0711L46.0696 28.5727ZM99.2152 27.5931L98.4028 27.817L96.5257 28.1529C96.0818 28.1892 95.6513 28.323 95.265 28.5447C95.1523 28.6081 95.0557 28.6966 94.9828 28.8034C94.9099 28.9102 94.8627 29.0324 94.8448 29.1604C94.8113 29.2846 94.8176 29.4163 94.8628 29.5367C94.9081 29.6572 94.9899 29.7605 95.0969 29.8321C95.3491 30 95.7413 30.056 96.3016 30.056C96.7183 30.0572 97.1331 30.0007 97.5343 29.8881C97.9028 29.7803 98.2458 29.5995 98.5429 29.3563C98.7392 29.1842 98.8846 28.9615 98.9631 28.7126C99.0812 28.3479 99.1656 27.9732 99.2152 27.5931ZM104.37 24.3746C104.342 24.8503 104.258 25.2981 104.146 25.9978L103.277 30.8956C103.231 31.0926 103.253 31.2994 103.34 31.4824C103.426 31.6654 103.572 31.8137 103.754 31.9032V32.0711H98.739V30.8117C97.9844 31.2601 97.1744 31.6083 96.3296 31.8472C95.5428 32.0484 94.7323 32.1426 93.9203 32.1271C92.3234 32.1271 91.3989 31.9591 90.7545 31.3994C90.1102 30.8397 89.802 30.4478 89.83 29.6642C89.8831 29.1279 90.098 28.6203 90.4463 28.2088C90.8127 27.8089 91.2621 27.4936 91.7631 27.2852C92.3953 27.003 93.0654 26.8144 93.7522 26.7255C94.6487 26.5856 95.8814 26.4456 97.5343 26.3057C98.0889 26.2521 98.6348 26.1299 99.1592 25.9419C99.4954 25.8019 99.6355 25.662 99.6915 25.3821C99.7475 25.1022 99.6355 24.5985 98.9631 24.4585C97.1701 24.0947 93.8082 24.6824 92.0713 25.1022L92.9958 22.5834C95.2107 22.2315 97.4488 22.0444 99.6915 22.0236C103.249 22.0516 104.398 23.0871 104.37 24.3746ZM75.7381 32.0711L77.4751 22.3035H82.2658L80.5288 32.0711H75.7381ZM77.7553 20.0645C77.8954 19.2529 79.1561 18.6091 80.5849 18.6091C82.0136 18.6091 83.0222 19.2529 82.8821 20.0645C82.7421 20.8761 81.4813 21.5198 80.0526 21.5198C78.6238 21.5198 77.6152 20.8481 77.7553 20.0645ZM56.1272 27.5651C55.866 27.6709 55.5933 27.746 55.3148 27.789L53.4657 28.1249C53.0121 28.1571 52.5717 28.291 52.177 28.5167C52.0635 28.5861 51.967 28.6799 51.8943 28.7912C51.8216 28.9026 51.7746 29.0287 51.7568 29.1604C51.7279 29.2835 51.7396 29.4127 51.7901 29.5286C51.8406 29.6446 51.9271 29.7412 52.0369 29.8041C52.395 30.0041 52.805 30.0918 53.2136 30.056C53.6316 30.0477 54.0464 29.9818 54.4463 29.8601C54.8148 29.7523 55.1578 29.5715 55.4548 29.3283C55.6512 29.1562 55.7965 28.9335 55.8751 28.6846C56.0111 28.3251 56.0959 27.9482 56.1272 27.5651ZM61.2821 24.3746C61.2541 24.8503 61.17 25.2702 61.058 25.9978L60.1895 30.8676C60.1433 31.0646 60.1652 31.2715 60.2517 31.4544C60.3382 31.6374 60.4841 31.7857 60.6657 31.8752V32.0711H55.651V30.8397C54.8897 31.2677 54.0811 31.6058 53.2416 31.8472C52.4654 32.0567 51.6643 32.1603 50.8603 32.1551C49.2354 32.1551 48.3109 31.9871 47.6945 31.4274C47.0782 30.8676 46.714 30.4758 46.742 29.6642C46.8022 29.1381 47.0166 28.6415 47.3583 28.2368C47.723 27.8281 48.1723 27.5034 48.6751 27.2852C49.3204 27.0122 49.9984 26.8241 50.6922 26.7255C51.5607 26.5856 52.7934 26.4456 54.4463 26.3057C55.0062 26.2889 55.5577 26.1654 56.0712 25.9419C56.4354 25.8019 56.5475 25.662 56.6035 25.3821C56.6595 25.1022 56.5475 24.5985 55.8751 24.4585C54.0821 24.1227 50.7202 24.6824 48.9832 25.1302L49.9078 22.5834C52.1228 22.2326 54.3608 22.0455 56.6035 22.0236C60.1615 22.0236 61.3101 23.0591 61.2821 24.3746Z" fill="#013D5B" />
    //             <path d="M128.718 25.6898L129.81 25.5779C130.174 25.5779 130.483 25.6618 130.511 25.9977C130.539 26.3335 130.146 27.6769 130.062 28.0408L129.306 31.3153C129.026 32.6587 128.69 34.0581 128.409 35.1776H130.314L131.379 29.9719C134.685 26.5574 135.946 25.4379 136.702 25.4379C136.785 25.4291 136.869 25.439 136.948 25.4668C137.027 25.4946 137.098 25.5397 137.157 25.5987C137.216 25.6578 137.262 25.7293 137.289 25.808C137.317 25.8867 137.327 25.9706 137.318 26.0537C137.346 26.6414 136.954 28.0128 136.842 28.4046L135.721 32.1829C135.497 33.0505 135.301 33.8062 135.329 34.3659C135.357 34.9257 135.862 35.5694 136.59 35.5694C137.991 35.5694 139.027 34.114 139.896 32.6867L139.644 32.2109C139.279 32.7706 138.467 34.0301 137.795 34.0301C137.599 34.0301 137.402 33.8901 137.402 33.5543C137.425 33.0308 137.519 32.5129 137.683 32.015L138.915 27.565C139.223 26.3335 139.392 25.5499 139.392 25.1301C139.392 24.7103 138.859 23.9266 138.131 23.9266C136.87 23.9266 135.189 24.8502 131.659 28.9084H131.603L132.051 26.9213C132.304 25.8298 132.528 24.7103 132.752 23.9266C131.424 24.3978 130.067 24.7811 128.69 25.0741L128.718 25.6898ZM147.46 25.8018C147.432 25.0181 147.04 24.4864 146.227 24.4864C144.266 24.4864 142.193 28.3206 141.829 29.8599C145.023 29.8599 147.544 27.9568 147.46 25.8018ZM147.88 31.8191L148.244 32.0709C147.292 34.0021 145.359 35.5694 143.062 35.5694C141.185 35.5694 139.672 34.3379 139.588 32.015C139.42 27.8169 143.37 23.9266 146.563 23.9266C147.936 23.9266 149.225 24.5423 149.281 26.0257C149.393 29.3562 144.714 30.3637 141.633 30.4197C141.532 30.8219 141.494 31.2373 141.521 31.6511C141.577 33.0505 142.417 34.198 144.126 34.198C145.835 34.198 147.124 32.9945 147.88 31.8191ZM114.85 29.1043C114.934 32.1549 116.867 34.6458 119.388 34.6458C124.263 34.6458 126.336 28.6565 126.196 24.6543C126.084 21.6037 124.123 19.1128 121.602 19.1128C117.399 19.1128 114.682 25.0741 114.85 29.1043ZM112.272 28.9364C112.076 23.7307 116.167 18.4131 122.078 18.4131C126.056 18.4131 128.634 21.0719 128.774 25.1021C128.97 30.5876 125.16 35.6254 118.968 35.6254C114.99 35.6254 112.412 32.9945 112.272 28.9364Z" fill="#013D5B" />
    //         </svg>
    //     </div>

    //     <div className='border-[1px] border-[lightgray] rounded-2xl p-6 h-[108px] w-[218px]' style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "space-between",
    //         alignItems: "center"
    //     }}>
    //         <input type="radio" className='cursor-pointer' style={{
    //             marginLeft: "-100%"
    //         }} id="radioButton" name="radioGroup" onClick={() => setState(false)} />
    //         <svg width="181" height="45" viewBox="0 0 181 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M30.4993 36C39.0622 36 46 29.2836 46 20.9986C46 12.7151 39.0622 6 30.4993 6C21.9392 6 15 12.7148 15 20.9986C15 29.2836 21.9392 36 30.4993 36Z" fill="white" />
    //             <path d="M28.3891 23.7185H34.011L35.6532 24.7938H28.1411L24.7697 35.3162C21.045 33.8575 17.598 30.4786 16.1519 26.6812C14.6104 23.001 14.6104 18.3773 16.1857 14.6815C17.6624 10.8827 21.2091 7.45174 24.9839 6.04235C27.9547 4.80002 31.9299 4.66846 35.0801 5.64627C38.6954 6.69169 42.1089 9.30793 44.0932 12.7234C46.3129 16.4687 46.9365 21.2282 45.5869 25.5025C44.7349 28.3393 42.9791 31.0559 40.5619 32.9985L36.4126 26.0175L42.1887 29.2704C42.2211 29.2704 42.2378 29.2335 42.2211 29.1997L34.6555 22.6049L44.4405 24.1117C44.4743 24.1117 44.4882 24.0962 44.4882 24.0791L44.4238 24.0295L35.1978 20.7628L44.7854 18.4254C44.8175 18.4254 44.8175 18.3945 44.8007 18.3773L34.9651 19.0238L42.6664 13.1366C42.6831 13.104 42.6159 13.0885 42.6005 13.1226L33.949 17.551L38.7247 9.0434C38.7247 9.03072 38.7247 8.99523 38.6954 9.01213L32.4555 16.4064L33.6536 6.69198C33.6536 6.67366 33.6184 6.65676 33.5863 6.67366L30.7165 16.1064L28.2041 6.39055C28.1874 6.37505 28.1536 6.35787 28.1355 6.39055L28.8277 16.4687L22.9018 8.68112C22.8836 8.66281 22.868 8.68112 22.8513 8.69662L27.3339 17.3147L18.8604 12.64C18.8451 12.64 18.8113 12.6583 18.8113 12.6738L26.3474 18.9221L16.7278 17.8961C16.694 17.9144 16.694 17.9443 16.7278 17.9598L26.0547 20.7146L16.7783 23.4666C16.7601 23.4807 16.7601 23.5148 16.7783 23.5303L26.3474 22.404L18.8281 28.8529C18.8113 28.8529 18.7957 28.8856 18.8281 28.9039L18.9291 28.8712L24.9505 25.6876L26.3644 23.4168H27.9717L26.8574 22.6218L30.5821 16.5845L28.3849 23.714L28.3891 23.7185ZM56.1345 31.6638H48.6278L54.6394 9.99783H70.0251L68.5595 15.1396H60.7082L59.7007 18.828H67.5534L66.229 23.5607H58.3779L56.1345 31.6638ZM73.5047 31.6641H66.085L70.4851 15.836H77.9062L73.5047 31.6641ZM78.3083 14.3263H70.8886L72.0964 9.99811H79.5161L78.3083 14.3263ZM92.756 31.6635H85.4791L85.9961 29.8921C84.5289 31.1415 83.034 32.0399 80.6474 32.0399C78.2302 32.0399 76.7071 30.8781 76.7071 28.4106C76.7071 25.6814 77.772 21.615 79.3526 18.7697C80.5029 16.6487 82.5742 15.5467 85.0193 15.5467C87.1171 15.5467 88.6712 16.4749 89.2749 17.6364L91.3459 9.99896H98.7657L92.756 31.6635ZM87.176 20.5397C86.5131 20.5397 85.8533 20.7448 85.4791 21.673C84.9326 23.0086 84.4435 24.316 84.4435 25.622C84.4435 26.2333 84.8751 26.7553 85.5938 26.7553C86.1683 26.7553 86.5424 26.5812 86.8591 26.3789L88.3556 21.1791C88.0967 20.8017 87.6358 20.5397 87.176 20.5397ZM113.707 24.7521H103.469C103.267 25.5924 103.067 26.1741 103.067 26.8418C103.067 27.1615 103.124 27.9751 104.158 27.9751C105.194 27.9751 105.655 27.5675 106.085 26.0296H113.362C112.441 30.5302 107.15 32.0683 103.901 32.0683C99.4991 32.0683 96.0775 31.4303 96.0775 27.1615C96.0775 24.8087 97.256 20.9177 98.81 18.8562C100.679 16.3873 103.929 15.459 106.921 15.459C111.522 15.459 114.513 16.4169 114.513 20.3659C114.512 21.3251 114.11 23.4447 113.707 24.7521ZM106.287 19.4376C105.366 19.4376 104.734 20.0757 104.331 21.6733H107.38C107.467 21.3535 107.582 20.8597 107.582 20.5681C107.582 19.6979 107.063 19.4376 106.287 19.4376ZM121.165 31.6638H113.744L119.755 9.99783H127.176L121.165 31.6638ZM130.969 31.6641H123.548L127.948 15.836H135.369L130.969 31.6641ZM135.771 14.3263H128.352L129.559 9.99811H136.979L135.771 14.3263ZM149.111 15.836L149.757 19.4086H144.078L142.41 25.4189C142.266 25.8845 142.151 26.4646 142.151 26.8423C142.151 27.5385 142.439 27.772 143.445 27.772H145.027L143.933 31.6644H137.318C135.132 31.6644 134.298 30.5891 134.298 28.9619C134.298 28.2954 134.385 27.5683 134.617 26.7547L138.643 12.3217H146.062L145.084 15.8363L149.111 15.836ZM48.476 34.0972L50.3257 34.0958L49.1472 37.9924H47.3031L48.476 34.0972ZM54.9317 34.1003L57.6375 34.0989L58.3311 36.6965H58.3495L59.1326 34.0975L60.7386 34.0961L59.5517 37.9842L56.962 37.9927L56.2124 35.2167H56.1998L55.3787 37.987L53.7728 37.9884L54.9317 34.1003ZM64.2453 34.102L66.2812 34.1006L66.6386 36.5498L68.5009 34.0978L70.3855 34.0964L67.2789 37.9859L65.0173 37.9887L64.2453 34.102ZM73.9313 34.1034L78.1395 34.0992L77.9026 34.8888L75.4826 34.8902L75.2488 35.6894L77.5173 35.688L77.2902 36.4379L75.0217 36.4393L74.7876 37.2107L77.2327 37.209L76.9861 37.9972L72.7559 38L73.9313 34.1034ZM92.0024 35.0519L90.562 35.0536L90.8465 34.1082L95.5756 34.104L95.2913 35.0494L93.8508 35.0505L92.968 37.9823L91.1197 37.9837L92.0024 35.0519ZM99.4023 34.0983L102.205 34.0955L102.339 36.6963H102.352L104.024 34.0941L106.837 34.0913L105.669 37.9893L103.955 37.9907L104.834 35.0561H104.821L102.739 37.9921L100.952 37.9935L100.699 35.0592H100.68L99.803 37.9851L98.2336 37.9865L99.4023 34.0983ZM118.612 34.1003L121.315 34.0989L122.011 36.6965H122.03L122.813 34.0961H124.417L123.243 37.9927L120.62 37.9856L119.893 35.2167H119.88L119.041 37.987L117.434 37.9884L118.612 34.1003ZM128.852 35.046L127.41 35.0474L127.694 34.1009L132.425 34.098L132.14 35.0432L130.699 35.0446L129.817 37.9862L127.967 37.9876L128.852 35.046ZM160.982 28.4802C159.871 28.4802 158.965 29.3941 158.965 30.5175C158.965 31.6396 159.871 32.5548 160.982 32.5548C162.094 32.5548 163 31.6393 163 30.5175C163 29.3941 162.094 28.4802 160.982 28.4802ZM160.982 32.1929C160.542 32.1929 160.12 32.0164 159.809 31.7022C159.498 31.388 159.323 30.962 159.323 30.5177C159.323 30.0734 159.498 29.6473 159.809 29.3331C160.12 29.019 160.542 28.8425 160.982 28.8425C161.422 28.8425 161.844 29.019 162.155 29.3331C162.467 29.6473 162.641 30.0734 162.641 30.5177C162.641 30.962 162.467 31.388 162.155 31.7022C161.844 32.0164 161.422 32.1929 160.982 32.1929Z" fill="black" />
    //             <path d="M162.041 30.0666C162.041 29.6676 161.806 29.4428 161.304 29.4428H160.515V31.5138H160.88V30.6666H161.16L161.682 31.5138H162.086L161.539 30.6374C161.825 30.6027 162.041 30.4268 162.041 30.0666ZM160.88 30.3442V29.7637H161.161C161.396 29.7595 161.658 29.7734 161.658 30.0513C161.658 30.3306 161.396 30.3445 161.161 30.3445L160.88 30.3442ZM83.6069 35.1817C83.5659 35.1386 83.5631 35.0658 83.5817 35.0072C83.6423 34.8118 83.8875 34.6834 84.2807 34.6834C84.5119 34.682 84.8683 34.7084 84.9699 34.7896C85.0199 34.8224 85.0575 34.8709 85.0766 34.9272C85.0958 34.9836 85.0955 35.0447 85.0757 35.1008H86.7232C86.9176 34.4141 86.4807 33.9718 84.6202 33.9745C82.8529 33.9759 81.8508 34.3513 81.5929 35.1889C81.5267 35.4068 81.5183 35.676 81.7015 35.8561C82.1567 36.3054 84.2116 36.4841 84.3851 36.727C84.4036 36.7517 84.4158 36.7805 84.4204 36.811C84.4251 36.8414 84.4221 36.8725 84.4117 36.9015C84.3172 37.21 83.876 37.2894 83.4913 37.2894C83.246 37.2894 82.9275 37.2378 82.8361 37.1374C82.7502 37.0371 82.7502 36.8821 82.7993 36.7829L81.0744 36.7856C80.9023 37.3817 80.8277 38.0011 83.225 38C85.2362 37.9972 86.158 37.5101 86.389 36.7523C86.5032 36.381 86.3904 36.1746 86.2593 36.0434C85.8126 35.5877 83.8224 35.4204 83.6069 35.1817ZM110.556 34.0209L114.788 34.0168L114.55 34.7957L112.116 34.7971L111.881 35.5857L114.161 35.5843L113.933 36.3241L111.653 36.3252L111.417 37.0874L113.875 37.0846L113.627 37.8619L109.374 37.8647L110.556 34.0209ZM159.364 16.0006L155.313 24.6523L155.429 16.0006H147.88L149.325 31.6139C149.14 32.5281 148.836 33.0431 148.256 33.297C147.622 33.5763 146.19 33.526 145.686 33.498L145.594 33.5035L144.403 37.7463L149.498 37.7505C152.507 37.7505 153.983 36.2529 156.124 32.9311L167 16H159.364V16.0006ZM137.331 35.1722C137.29 35.1292 137.288 35.055 137.305 34.9977C137.366 34.8024 137.613 34.674 138.004 34.674C138.236 34.6726 138.592 34.699 138.694 34.7801C138.744 34.813 138.781 34.8614 138.8 34.9178C138.82 34.9741 138.819 35.0352 138.799 35.0914H140.447C140.641 34.4047 140.204 33.9623 138.344 33.9651C136.578 33.9665 135.575 34.3419 135.318 35.1794C135.25 35.3973 135.242 35.6666 135.425 35.8467C135.88 36.296 137.935 36.4747 138.109 36.7176C138.127 36.7422 138.14 36.7711 138.144 36.8015C138.149 36.8319 138.146 36.863 138.135 36.8921C138.042 37.2005 137.6 37.28 137.215 37.28C136.97 37.28 136.651 37.2283 136.56 37.128C136.474 37.0277 136.474 36.8726 136.523 36.7734L134.798 36.7762C134.626 37.3723 134.551 37.9917 136.948 37.9905C138.96 37.9878 139.881 37.5006 140.114 36.7428C140.227 36.3716 140.114 36.1651 139.983 36.0339C139.538 35.5785 137.546 35.4109 137.331 35.1722Z" fill="black" />
    //         </svg>
    //     </div>


    // </div>

    const stepOne = <div>

        <div className='ml-[3%] mr-[3%]'>

            <div className='flex justify-between'>
                <button className='bg-[#F6F7F7] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px]' onClick={() => {
                    setFinish(true);
                    setStep(-1);
                }}>
                    <svg className='mt-2' width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <small className='mx-2 text-black mt-1' >Back</small>
                </button>
                <div>
                    <h3 className='text-center pb-3 font-medium'>Your information</h3>
                    <p className='text-center text-gray-400 text-sm pb-5'>Set your own avatar if you wish, as well as your full name</p>
                </div>
                {
                    edit === 1 ? <button className={`bg-[#4E2357] px-[20px] py-[5px] rounded-2xl border-2 h-[40px] ${nextStepButtonState && "opacity-25"}`} onClick={() => {
                        setStep(-1);
                        setFinish(true);
                        setNextStepButtonState(true);
                        dispatch(postStep1Action({
                            fullName: fullName,
                            avatar: selectedImage
                        }))
                    }}> <small className='mx-2 text-white' >Save</small></button> : <button className={`bg-[#4E2357] px-[20px] py-[5px] rounded-2xl border-2 h-[40px] ${nextStepButtonState && "opacity-25"}`} onClick={() => {
                        setStep(-1);
                        setCheck(0);
                        setFinish(true);
                        setNextStepButtonState(true);
                        dispatch(postOnboardingAction({
                            step: 1,
                            finish: false
                        }))
                        dispatch(postStep1Action({
                            fullName: fullName,
                            avatar: selectedImage
                        }))
                    }} disabled={nextStepButtonState}> <small className='mx-2 text-white' >Next Step</small></button>
                }
            </div>

        </div>

        <div className='ml-[25%] mr-[25%] mt-5'>


            <div className='border-[1px] border-[lightgray] rounded-3xl p-4'>

                <div className='flex justify-between'>

                    <div className='flex'>

                        {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: "80px", height: "80px", borderRadius: '40px' }} />}

                        {!selectedImage && <svg width="80" height="80" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="130" height="130" rx="65" fill="#F9F6F9" />
                            <g opacity="0.3">
                                <circle cx="65.0013" cy="52.5003" r="8.33333" fill="#4E2357" />
                                <ellipse cx="65.0013" cy="75.4163" rx="14.5833" ry="8.33333" fill="#4E2357" />
                            </g>
                        </svg>}

                        <div className='mt-5 ml-3'>
                            <h6 className='pb-1 font-medium'>Profile Picture</h6>
                            <p className=' text-gray-400 text-sm pb-5'>PNG, JPEG under 15MB</p>
                        </div>

                    </div>

                    <div className='flex space-x-2'>

                        <button onClick={handleButtonClick} className='bg-[#c8adce] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px] mt-6'>
                            <input
                                type='file'
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                            />
                            <svg className='mt-[5px]' width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2" stroke="#4E2357" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M2 12.5001L3.75159 10.9675C4.66286 10.1702 6.03628 10.2159 6.89249 11.0721L11.1822 15.3618C11.8694 16.0491 12.9512 16.1428 13.7464 15.5839L14.0446 15.3744C15.1888 14.5702 16.7369 14.6634 17.7765 15.599L21 18.5001" stroke="#4E2357" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M18.562 2.9354L18.9791 2.5183C19.6702 1.82723 20.7906 1.82723 21.4817 2.5183C22.1728 3.20937 22.1728 4.32981 21.4817 5.02087L21.0646 5.43797M18.562 2.9354C18.562 2.9354 18.6142 3.82172 19.3962 4.60378C20.1783 5.38583 21.0646 5.43797 21.0646 5.43797M18.562 2.9354L14.7275 6.76995C14.4677 7.02968 14.3379 7.15954 14.2262 7.30273C14.0945 7.47163 13.9815 7.65439 13.8894 7.84776C13.8112 8.01169 13.7532 8.18591 13.637 8.53437L13.2651 9.65M21.0646 5.43797L17.23 9.27253C16.9703 9.53225 16.8405 9.66211 16.6973 9.7738C16.5284 9.90554 16.3456 10.0185 16.1522 10.1106C15.9883 10.1888 15.8141 10.2468 15.4656 10.363L14.35 10.7349M14.35 10.7349L13.6281 10.9755C13.4567 11.0327 13.2676 10.988 13.1398 10.8602C13.012 10.7324 12.9673 10.5433 13.0245 10.3719L13.2651 9.65M14.35 10.7349L13.2651 9.65" stroke="#4E2357" stroke-width="1.5" />
                            </svg>
                            <small className='mx-2 text-black mt-1' >Upload Picture</small>
                        </button>

                        {selectedImage && <button className='bg-[#F6F7F7] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px] mt-6' onClick={() => setSelectedImage(null)}>
                            <small className='mx-2 text-black mt-1' >Remove</small>
                        </button>}

                    </div>

                </div>

            </div>

            <div className='mt-4'>
                <label className=' text-gray-400 text-sm'>Your full name</label>
                <input type="text" placeholder='Enter your your full name' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setFullName(e.target.value)} value={fullName} />
            </div>

        </div>

    </div>

    const stepTwo = <div>

        <div className='ml-[3%] mr-[3%]'>

            <div className='flex justify-between'>
                <button className='bg-[#F6F7F7] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px]' onClick={() => {
                    setFinish(true);
                    setStep(-1);
                }}>
                    <svg className='mt-2' width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <small className='mx-2 text-black mt-1' >Back</small>
                </button>
                <div>
                    <h3 className='text-center pb-3 font-medium'>Your family</h3>
                    <p className='text-center text-gray-400 text-sm pb-5'>Begin shaping your legacy by detailing beneficiaries or other important people in your estate plan.</p>
                </div>
                {
                    edit === 2 ? <button className={`bg-[#4E2357] px-[20px] py-[5px] rounded-2xl border-2 h-[40px] ${nextStepButtonState && "opacity-25"}`} onClick={() => {
                        setStep(-1);
                        setFinish(true);
                        setNextStepButtonState(true);
                    }}> <small className='mx-2 text-white' >Save</small></button> : <button className={`bg-[#4E2357] px-[20px] py-[5px] rounded-2xl border-2 h-[40px] ${nextStepButtonState && "opacity-25"}`} onClick={() => {
                        setStep(-1);
                        setCheck(1);
                        setFinish(true);
                        setNextStepButtonState(true);
                        dispatch(postOnboardingAction({
                            step: 2,
                            finish: false
                        }))
                    }} disabled={nextStepButtonState}> <small className='mx-2 text-white' >Next Step</small></button>
                }
            </div>

        </div>

        <div className={families.length > 0 ? `ml-[3%] mr-[3%] border-[1px] border-[lightgray] rounded-2xl p-5` : ''} style={{
            height: "48vh",
            overflowY: "auto"
        }}>

            <div className='grid grid-cols-2 gap-2'>
                {
                    families.map((family, index) => <div className='ml-[3%] mr-[3%] border-[1px] border-[lightgray] rounded-2xl p-5'>
                        <div className='border-b-[1px] border-[lightgray] flex justify-between'>
                            <div>
                                <label className=' text-gray-400 text-sm'>{family.relationship}</label>
                                <h6 className='pb-3 font-medium mt-1'>{family.familyName}</h6>
                            </div>
                            <Popover content={editDeleteContent(family, index, 2)} title="Options" trigger="click">
                                <svg className='cursor-pointer mt-2' width="30" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4" r="4" fill="#B9B9B9" />
                                    <circle cx="20" cy="4" r="4" fill="#B9B9B9" />
                                    <circle cx="36" cy="4" r="4" fill="#B9B9B9" />
                                </svg>
                            </Popover>
                        </div>
                        <div className='grid grid-cols-12 grid-row pb-3 pt-3'>
                            <label className=' text-gray-400 text-sm col-span-4'>Relationship</label>
                            <label className=' text-gray-400 text-sm col-span-4'>Email</label>
                            <label className=' text-gray-400 text-sm col-span-4'>Phone Number</label>
                        </div>
                        <div className='grid grid-cols-12 grid-row pb-3'>
                            <p className='text-sm break-words col-span-4 mb-2'>{family.relationship}</p>
                            <p className='text-sm break-words col-span-4 mb-2'>{family.email}</p>
                            <p className='text-sm break-words col-span-4 mb-2'>{family.phoneNumber}</p>
                        </div>
                    </div>)
                }
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>

                <div className='mt-20 text-center'>
                    {
                        families.length === 0 && <><h6 className='text-center pb-3 font-medium'>You haven't added a family member yet</h6>
                            <p className='text-center text-gray-400 text-sm pb-5'>You do not have a family member added yet, please click on the
                                "Add Family Member" button to add a family member</p>
                        </>
                    }
                </div>

                <button className='bg-[#FBF5FC] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px] mt-6' onClick={() => setFamilyModal(true)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="#4E2357" />
                        <path d="M12 7V12M12 12V17M12 12H17M12 12H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <small className='mx-2 text-[#4E2357] mt-1' >Add Family Member</small>
                </button>

            </div>

        </div>

        <Modal isOpen={familyModal} onClose={() => setFamilyModal(false)} title={"Add Family Member"} description={"You can add a member of your family here"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <div className='mt-3'>
                        <label className=' text-gray-400 text-sm'>Full name of family member</label>
                        <input type="text" placeholder='Enter full name of family member' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setFamilyName(e.target.value)} value={familyName} />
                    </div>
                    <label className=' text-gray-400 text-sm'>Relationship</label>
                    <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                        <select className='bg-[rgba(244,241,241,0.1)] w-full' name="relationship" id="relationship" value={relationship} onChange={(e) => setRelationship(e.target.value)}>
                            {CONSTANT.relationship.map((rel, index) => <option value={rel} key={index}>{rel}</option>)}
                        </select>
                    </div>
                    <div className='flex space-x-2'>
                        <div className='mt-4'>
                            <label className=' text-gray-400 text-sm'>Email</label>
                            <input type="text" placeholder='Enter family member e-mail address' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                        <div className='mt-4'>
                            <label className=' text-gray-400 text-sm'>Phone Number</label>
                            <input type="text" placeholder='Enter family member phone number' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                        </div>
                    </div>
                </div>
            </div>
            <button className={`bg-[#4E2357] px-[5px] py-[5px] rounded-2xl border-2 w-full ${addFamilyState && "opacity-25"}`} onClick={() => {
                families.push({
                    familyName,
                    email,
                    relationship,
                    phoneNumber
                });
                dispatch(postStep2Action({
                    familyName: familyName,
                    contactNo: phoneNumber,
                    email: email,
                    relationship: relationship
                }))
                setFamilies([...families]);
                setFamilyModal(false);
                setNextStepButtonState(false);

                // Empty States
                setFamilyName("");
                setEmail("");
                setPhoneNumber("");
                setAddFamilyState(true);
            }
            } disabled={addFamilyState}> <small className='mx-2 text-white' >Add Family Member</small></button>
        </Modal>


        <Modal isOpen={editFamilyModal} onClose={() => setEditFamilyModal(false)} title={"Edit Family Member"} description={"You can edit a member of your family here"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <div className='mt-3'>
                        <label className=' text-gray-400 text-sm'>Full name of family member</label>
                        <input type="text" placeholder='Enter full name of family member' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setFamilyName(e.target.value)} value={familyName} />
                    </div>
                    <label className=' text-gray-400 text-sm'>Relationship</label>
                    <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                        <select className='bg-[rgba(244,241,241,0.1)] w-full' name="relationship" id="relationship" value={relationship} onChange={(e) => setRelationship(e.target.value)}>
                            {CONSTANT.relationship.map((rel, index) => <option value={rel} key={index}>{rel}</option>)}
                        </select>
                    </div>
                    <div className='flex space-x-2'>
                        <div className='mt-4'>
                            <label className=' text-gray-400 text-sm'>Email</label>
                            <input type="text" placeholder='Enter family member e-mail address' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                        <div className='mt-4'>
                            <label className=' text-gray-400 text-sm'>Phone Number</label>
                            <input type="text" placeholder='Enter family member phone number' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                        </div>
                    </div>
                </div>
            </div>
            <button className={`bg-[#4E2357] px-[5px] py-[5px] rounded-2xl border-2 w-full`} onClick={() => {
                dispatch(editStep2Action({
                    familyName: familyName,
                    contactNo: phoneNumber,
                    email: email,
                    relationship: relationship,
                    familyMemberId: familyId
                }))
                setEditFamilyModal(false);

                // Empty States
                setFamilyName("");
                setEmail("");
                setPhoneNumber("");
                setFamilyId("");
            }
            }> <small className='mx-2 text-white' >Edit Family Member</small></button>
        </Modal>

    </div>

    const stepThree = <div>

        <div className='ml-[3%] mr-[3%]'>

            <div className='flex justify-between'>
                <button className='bg-[#F6F7F7] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px]' onClick={() => {
                    setFinish(true);
                    setStep(-1);
                }}>
                    <svg className='mt-2' width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <small className='mx-2 text-black mt-1' >Back</small>
                </button>
                <div>
                    <h3 className='text-center pb-3 font-medium'>Calculating your Net Worth</h3>
                    <p className='text-center text-gray-400 text-sm pb-5'>You will need to provide your approximate net worth</p>
                </div>
                {
                    edit === 3 ? <button className={`bg-[#4E2357] px-[20px] py-[5px] rounded-2xl border-2 h-[40px] ${nextStepButtonState && "opacity-25"}`} onClick={() => {
                        setStep(-1);
                        setFinish(true);
                        setNextStepButtonState(true);
                    }}> <small className='mx-2 text-white' >Save</small></button> : <button className={`bg-[#4E2357] px-[20px] py-[5px] rounded-2xl border-2 h-[40px] ${nextStepButtonState && "opacity-25"}`} onClick={() => {
                        setStep(-1);
                        setCheck(2);
                        setFinish(true);
                        setNextStepButtonState(true);
                        dispatch(postOnboardingAction({
                            step: 3,
                            finish: false
                        }))
                    }} disabled={nextStepButtonState}> <small className='mx-2 text-white' >Next Step</small></button>
                }
            </div>

        </div>

        <div className={incomes.length > 0 || assets.length > 0 || liabilities.length > 0 ? `ml-[3%] mr-[3%] border-[1px] border-[lightgray] rounded-2xl p-5` : ''} style={{
            height: "48vh",
            overflowY: "auto"
        }}>

            {incomes.length > 0 && <h6 className='text-center pb-3 font-medium mt-3'>INCOMES</h6>}
            <div className='grid grid-cols-4 gap-2'>
                {
                    incomes.map((income, index) => <div className='ml-[1%] mr-[3%] border-[1px] border-[lightgray] rounded-2xl p-5'>
                        <div className='flex justify-between'>
                            <div>
                                <div>
                                    <h6 className='pb-3 font-medium text-medium'>{income.source}</h6>
                                    <h6 className='pb-3 font-semibold mt-1'>${income.amount}</h6>
                                    {/* <label className='text-gray-400 text-medium'>{income.interval}</label> */}
                                </div>
                            </div>
                            <div className='bg-[#FBF5FC] rounded-2xl'>
                                <Popover content={editDeleteContent(income, index, 3)} title="Options" trigger="click">
                                    <svg className='cursor-pointer mt-2' width="30" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="4" cy="4" r="4" fill="#B9B9B9" />
                                        <circle cx="20" cy="4" r="4" fill="#B9B9B9" />
                                        <circle cx="36" cy="4" r="4" fill="#B9B9B9" />
                                    </svg>
                                </Popover>
                                <svg className='cursor-pointer mt-[35px]' width="30" height="30" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.9306 3.5H17.814C18.3149 3.5 18.7209 3.90607 18.7209 4.40698C18.7209 4.90789 18.3149 5.31395 17.814 5.31395H16C13.124 5.31395 11.0583 5.31588 9.48619 5.52724C7.94021 5.73509 7.00818 6.1304 6.31929 6.81929C5.6304 7.50818 5.23509 8.44021 5.02724 9.98619C4.81588 11.5583 4.81395 13.624 4.81395 16.5C4.81395 19.376 4.81588 21.4417 5.02724 23.0138C5.23509 24.5598 5.6304 25.4918 6.31929 26.1807C7.00818 26.8696 7.94021 27.2649 9.48619 27.4728C11.0583 27.6841 13.124 27.686 16 27.686C18.876 27.686 20.9417 27.6841 22.5138 27.4728C24.0598 27.2649 24.9918 26.8696 25.6807 26.1807C26.3696 25.4918 26.7649 24.5598 26.9728 23.0138C27.1841 21.4417 27.186 19.376 27.186 16.5V14.686C27.186 14.1851 27.5921 13.7791 28.093 13.7791C28.5939 13.7791 29 14.1851 29 14.686V16.5694C29 19.3609 29 21.5486 28.7705 23.2555C28.5356 25.0026 28.0455 26.3813 26.9634 27.4634C25.8813 28.5455 24.5026 29.0356 22.7555 29.2705C21.0486 29.5 18.8609 29.5 16.0694 29.5H15.9306C13.1391 29.5 10.9514 29.5 9.24448 29.2705C7.49736 29.0356 6.11873 28.5455 5.03663 27.4634C3.95453 26.3813 3.46436 25.0026 3.22946 23.2555C2.99997 21.5486 2.99998 19.3609 3 16.5694V16.4306C2.99998 13.6391 2.99997 11.4514 3.22946 9.74448C3.46436 7.99736 3.95453 6.61873 5.03663 5.53663C6.11873 4.45453 7.49736 3.96436 9.24448 3.72946C10.9514 3.49997 13.1391 3.49998 15.9306 3.5Z" fill="#4E2357" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9302 8.03488C19.9302 5.53034 21.9606 3.5 24.4651 3.5C26.9697 3.5 29 5.53034 29 8.03488C29 10.5394 26.9697 12.5698 24.4651 12.5698C21.9606 12.5698 19.9302 10.5394 19.9302 8.03488ZM24.4651 5.31395C22.9624 5.31395 21.7442 6.53216 21.7442 8.03488C21.7442 9.53761 22.9624 10.7558 24.4651 10.7558C25.9678 10.7558 27.186 9.53761 27.186 8.03488C27.186 6.53216 25.9678 5.31395 24.4651 5.31395Z" fill="#4E2357" />
                                    <path d="M18.1163 14.0814C18.1163 14.5823 18.5223 14.9884 19.0233 14.9884H19.8569L17.4231 17.4222C17.305 17.5402 17.1136 17.5402 16.9955 17.4222L15.0778 15.5045C14.2514 14.678 12.9114 14.678 12.085 15.5045L9.31216 18.2773C8.95796 18.6315 8.95796 19.2057 9.31216 19.5599C9.66636 19.9141 10.2406 19.9141 10.5948 19.5599L13.3676 16.7871C13.4857 16.6691 13.6771 16.6691 13.7952 16.7871L15.7129 18.7048C16.5393 19.5313 17.8793 19.5313 18.7057 18.7048L21.1395 16.271V17.1047C21.1395 17.6056 21.5456 18.0116 22.0465 18.0116C22.5474 18.0116 22.9535 17.6056 22.9535 17.1047V14.0814C22.9535 13.5805 22.5474 13.1744 22.0465 13.1744H19.0233C18.5223 13.1744 18.1163 13.5805 18.1163 14.0814Z" fill="#4E2357" />
                                </svg>
                            </div>
                        </div>
                    </div>)
                }
            </div>

            {assets.length > 0 && <h6 className='text-center pb-3 font-medium mt-3'>ASSETS</h6>}
            <div className='grid grid-cols-4 gap-2 mt-[10px]'>
                {
                    assets.map((asset, index) => <div className='ml-[1%] mr-[3%] border-[1px] border-[lightgray] rounded-2xl p-5'>
                        <div className='flex justify-between'>
                            <div>
                                <h6 className='pb-3 font-medium text-medium'>{asset.type}</h6>
                                <h6 className='pb-3 font-semibold mt-1'>${asset.amount}</h6>
                                <label className='text-gray-400 text-medium'>{asset.name}</label>
                            </div>
                            <div className='bg-[#FBF5FC] rounded-2xl'>
                                <Popover content={editDeleteContent(asset, index, 4)} title="Options" trigger="click">
                                    <svg className='cursor-pointer mt-2' width="30" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="4" cy="4" r="4" fill="#B9B9B9" />
                                        <circle cx="20" cy="4" r="4" fill="#B9B9B9" />
                                        <circle cx="36" cy="4" r="4" fill="#B9B9B9" />
                                    </svg>
                                </Popover>
                                <svg className="mt-[35px] cursor-pointer" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 18.3998C4 13.8743 4 11.6116 5.40589 10.2057C6.81178 8.7998 9.07452 8.7998 13.6 8.7998H18.4C22.9255 8.7998 25.1882 8.7998 26.5941 10.2057C28 11.6116 28 13.8743 28 18.3998C28 22.9253 28 25.188 26.5941 26.5939C25.1882 27.9998 22.9255 27.9998 18.4 27.9998H13.6C9.07452 27.9998 6.81178 27.9998 5.40589 26.5939C4 25.188 4 22.9253 4 18.3998Z" stroke="#4E2357" stroke-width="2" />
                                    <path d="M20.7992 8.8C20.7992 6.53726 20.7992 5.40589 20.0963 4.70294C19.3933 4 18.262 4 15.9992 4C13.7365 4 12.6051 4 11.9022 4.70294C11.1992 5.40589 11.1992 6.53726 11.1992 8.8" stroke="#4E2357" stroke-width="2" />
                                    <path d="M15.9977 22.4006C17.3231 22.4006 18.3977 21.5052 18.3977 20.4006C18.3977 19.296 17.3231 18.4006 15.9977 18.4006C14.6722 18.4006 13.5977 17.5052 13.5977 16.4006C13.5977 15.296 14.6722 14.4006 15.9977 14.4006M15.9977 22.4006C14.6722 22.4006 13.5977 21.5052 13.5977 20.4006M15.9977 22.4006V23.2006M15.9977 13.6006V14.4006M15.9977 14.4006C17.3231 14.4006 18.3977 15.296 18.3977 16.4006" stroke="#4E2357" stroke-width="2" stroke-linecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>)
                }
            </div>

            {liabilities.length > 0 && <h6 className='text-center pb-3 font-medium mt-3'>LIABILITIES</h6>}
            <div className='grid grid-cols-4 gap-2 mt-[10px]'>
                {
                    liabilities.map((liabilities, index) => <div className='ml-[1%] mr-[3%] border-[1px] border-[lightgray] rounded-2xl p-5'>
                        <div className='flex justify-between'>
                            <div>
                                <h6 className='pb-3 font-medium text-sm'>{liabilities.type}</h6>
                                <h6 className='pb-1 font-semibold mt-1'>${liabilities.amount}</h6>
                                <p className='text-gray-400 text-sm pb-2'>{liabilities.name}</p>
                                <p className='text-gray-400 text-xs'>{liabilities.loanPeriod}</p>
                            </div>
                            <div className='bg-[#FBF5FC] rounded-2xl'>
                                <Popover content={editDeleteContent(liabilities, index, 5)} title="Options" trigger="click">
                                    <svg className='cursor-pointer mt-2' width="30" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="4" cy="4" r="4" fill="#B9B9B9" />
                                        <circle cx="20" cy="4" r="4" fill="#B9B9B9" />
                                        <circle cx="36" cy="4" r="4" fill="#B9B9B9" />
                                    </svg>
                                </Popover>
                                <svg className="cursor-pointer mt-[35px]" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.34 2.66699H9.66002C8.11486 2.66699 7.34228 2.66699 6.71918 2.8838C5.53763 3.29493 4.60997 4.24991 4.21061 5.46627C4 6.10772 4 6.90306 4 8.49374V27.1659C4 28.3102 5.31333 28.9174 6.14413 28.1571C6.63223 27.7105 7.36777 27.7105 7.85587 28.1571L8.5 28.7466C9.35545 29.5294 10.6446 29.5294 11.5 28.7466C12.3554 27.9638 13.6446 27.9638 14.5 28.7466C15.3554 29.5294 16.6446 29.5294 17.5 28.7466C18.3554 27.9638 19.6446 27.9638 20.5 28.7466C21.3554 29.5294 22.6446 29.5294 23.5 28.7466L24.1441 28.1571C24.6322 27.7105 25.3678 27.7105 25.8559 28.1571C26.6867 28.9174 28 28.3102 28 27.1659V8.49374C28 6.90306 28 6.10772 27.7894 5.46627C27.39 4.24991 26.4624 3.29493 25.2808 2.8838C24.6577 2.66699 23.8851 2.66699 22.34 2.66699Z" stroke="#4E2357" stroke-width="2" />
                                    <path d="M12.668 13.867L14.5727 16.0003L19.3346 10.667" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10 20.667H22" stroke="#4E2357" stroke-width="2" stroke-linecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>)
                }
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>

                {/* {
                    incomes.length === 0 && <div className='mt-20 text-center'>
                        <h6 className='text-center pb-3 font-medium'>You haven't added a income yet</h6>
                        <p className='text-center text-gray-400 text-sm pb-5'>You do not have an income added yet, please click on the "Add Income" button to add an income source.</p>
                    </div>
                }

                {
                    assets.length === 0 && <div className='mt-20 text-center'>
                        <h6 className='text-center pb-3 font-medium'>You haven't added a asset yet</h6>
                        <p className='text-center text-gray-400 text-sm pb-5'>You do not have an asset added yet, please click on the "Add Asset" button to add an asset.</p>
                    </div>
                }

                {
                    liabilities.length === 0 && <div className='mt-20 text-center'>
                        <h6 className='text-center pb-3 font-medium'>You haven't added a liability yet</h6>
                        <p className='text-center text-gray-400 text-sm pb-5'>You do not have a liability added yet, please click on the "Add Liability" button to add a liability.</p>
                    </div>
                } */}


                <button className='bg-[#FBF5FC] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px] mt-6' onClick={() => setIncomeModal(true)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="#4E2357" />
                        <path d="M12 7V12M12 12V17M12 12H17M12 12H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <small className='mx-2 text-[#4E2357] mt-1'>Add Income</small>
                </button>

                <button className='bg-[#FBF5FC] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px] mt-6'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="#4E2357" />
                        <path d="M12 7V12M12 12V17M12 12H17M12 12H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <small className='mx-2 text-[#4E2357] mt-1' onClick={() => setAssetModal(true)}>Add Asset</small>
                </button>

                <button className='bg-[#FBF5FC] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px] mt-6' onClick={() => setLiabilitiesModal(true)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="#4E2357" />
                        <path d="M12 7V12M12 12V17M12 12H17M12 12H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <small className='mx-2 text-[#4E2357] mt-1' >Add Liability</small>
                </button>

            </div>

        </div>

        <Modal isOpen={incomeModal} onClose={() => setIncomeModal(false)} title={"Add Income"} description={"Indicate your annual income (Every year)"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <div className="tri-state-toggle w-full border-[1px] border-[lightgray] rounded-2xl p-2" style={{
                        background: "white"
                    }}>
                        <button
                            className={`tri-state-toggle-button${integration ? '-active' : ''}`}
                            id="toggle-button2"
                            style={{
                                width: "-webkit-fill-available"
                            }}
                            onClick={() => {
                                setManual(false);
                                setIntegration(true);
                            }}
                        >
                            Integration
                        </button>
                        <button
                            className={`tri-state-toggle-button${manual ? '-active' : ''}`}
                            id="toggle-button1"
                            style={{
                                width: "-webkit-fill-available"
                            }}
                            onClick={() => {
                                setManual(true);
                                setIntegration(false);
                            }}
                        >
                            Manual
                        </button>
                    </div>
                    <br />
                    {
                        !integration && <>
                            <div className='mt-3'>
                                <label className=' text-gray-400 text-sm'>Source of income</label>
                                <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                                    <select className='bg-[rgba(244,241,241,0.1)] w-full' name="source" id="source" onChange={(e) => setSource(e.target.value)}>
                                        <option value={"Cryptocurency"}>Cryptocurency</option>
                                        <option value={"Real estate rentals"}>Real estate rentals</option>
                                        <option value={"Freelancing"}>Freelancing</option>
                                    </select>
                                </div>
                            </div>
                            <label className=' text-gray-400 text-sm'>Current Value ($)</label>
                            <div className="flex space-x-2">
                                <input type="text" className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-[8%] text-black outline-none mb-4 bg-gray-100' value={"$"} disabled={true} />
                                <input type="text" placeholder='Indicate the current value' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-[92%] text-black outline-none mb-4 bg-gray-100' onChange={(e) => setAmount(e.target.value)} value={amount} />
                            </div>
                        </>
                    }
                    {
                        integration && linkToken && <div className="h-[108px] w-full" style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around"
                        }}><button className={`bg-[#e0d9d9] px-[5px] py-[5px] rounded-2xl border-2 w-full ${!ready && "opacity-25"} mt-4 flex justify-center`} onClick={() => {
                            plaidLinkStep.current = 3;
                            open();
                        }
                        } disabled={!ready}><small className='mx-2 mt-1'>Connect Plaid</small><img src={PlaidLogoSvg} width={"60px"} /></button></div>
                    }
                </div>
            </div>
            {
                !integration && <button className={`bg-[#4E2357] px-[5px] py-[5px] rounded-2xl border-2 w-full ${addIncomeState && "opacity-25"}`} onClick={() => {
                    incomes.push({
                        source,
                        amount,
                        interval: incomeInterval
                    });
                    dispatch(postStep3Action({
                        source: source,
                        totalIncome: amount,
                        type: "manually"
                    }))
                    setIncomes([...incomes]);
                    setIncomeModal(false);
                    setNextStepButtonState(false);

                    // Empty States
                    setAmount("");
                    setAddIncomeState(true);
                }
                } disabled={addIncomeState}><small className='mx-2 text-white' >Add Income</small></button>
            }
        </Modal>

        <Modal isOpen={assetModal} onClose={() => setAssetModal(false)} title={"Add Asset"} description={"This is where you can add your asset. Please fill in the data given here"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <div className="tri-state-toggle w-full border-[1px] border-[lightgray] rounded-2xl p-2" style={{
                        background: "white"
                    }}>
                        <button
                            className={`tri-state-toggle-button${integration ? '-active' : ''}`}
                            id="toggle-button2"
                            style={{
                                width: "-webkit-fill-available"
                            }}
                            onClick={() => {
                                setManual(false);
                                setIntegration(true);
                            }}
                        >
                            Integration
                        </button>
                        <button
                            className={`tri-state-toggle-button${manual ? '-active' : ''}`}
                            id="toggle-button1"
                            style={{
                                width: "-webkit-fill-available"
                            }}
                            onClick={() => {
                                setManual(true);
                                setIntegration(false);
                            }}
                        >
                            Manual
                        </button>
                    </div>
                    <br />
                    {
                        !integration && <div className='mt-3'>
                            <label className=' text-gray-400 text-sm'>Asset name</label>
                            <input type="text" placeholder='Enter asset name' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setAssetName(e.target.value)} value={assetName} />
                            <div>
                                <label className=' text-gray-400 text-sm'>Type of asset</label>
                                <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                                    <select className='bg-[rgba(244,241,241,0.1)] w-full' name="type" id="type" value={assetType} onChange={(e) => setAssetType(e.target.value)}>
                                        {CONSTANT.assetType.map((type, index) => <option value={type} key={index}>{type}</option>)}
                                    </select>
                                </div>
                            </div>
                            <label className=' text-gray-400 text-sm'>Current Value ($)</label>
                            <div className="flex space-x-2">
                                <input type="text" className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-[8%] text-black outline-none mb-4 bg-gray-100' value={"$"} disabled={true} />
                                <input type="text" placeholder='Indicate the current value' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-[92%] text-black outline-none mb-4 bg-gray-100' onChange={(e) => setAssetAmount(e.target.value)} value={assetAmount} />
                            </div>
                        </div>
                    }
                    {
                        integration && linkToken && <div className="h-[108px] w-full" style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around"
                        }}><button className={`bg-[#e0d9d9] px-[5px] py-[5px] rounded-2xl border-2 w-full ${!ready && "opacity-25"} mt-4 flex justify-center`} onClick={() => {
                            plaidLinkStep.current = 4;
                            open();
                        }
                        } disabled={!ready}><small className='mx-2 mt-1'>Connect Plaid</small><img src={PlaidLogoSvg} width={"60px"} /></button></div>
                    }
                </div>
            </div>
            {
                !integration && <button className={`bg-[#4E2357] px-[5px] py-[5px] rounded-2xl border-2 w-full ${addAssetState && "opacity-25"}`} onClick={() => {
                    assets.push({
                        type: assetType,
                        name: assetName,
                        amount: assetAmount
                    });
                    dispatch(postStep4Action({
                        assetName: assetName,
                        assetType: assetType,
                        amount: assetAmount,
                        type: "manually"
                    }))
                    setAssets([...assets]);
                    setAssetModal(false);
                    setNextStepButtonState(false);

                    // Empty States
                    setAssetName("");
                    setAssetAmount("");
                    setAddAssetState(true);
                }
                } disabled={addAssetState}> <small className='mx-2 text-white' >Add Asset</small></button>
            }
        </Modal>

        <Modal isOpen={liabilitiesModal} onClose={() => setLiabilitiesModal(false)} title={"Add Liability"} description={"This is where you can add your liability. Please fill in the data given here"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <div className="tri-state-toggle w-full border-[1px] border-[lightgray] rounded-2xl p-2" style={{
                        background: "white"
                    }}>
                        <button
                            className={`tri-state-toggle-button${integration ? '-active' : ''}`}
                            id="toggle-button2"
                            style={{
                                width: "-webkit-fill-available"
                            }}
                            onClick={() => {
                                setManual(false);
                                setIntegration(true);
                            }}
                        >
                            Integration
                        </button>
                        <button
                            className={`tri-state-toggle-button${manual ? '-active' : ''}`}
                            id="toggle-button1"
                            style={{
                                width: "-webkit-fill-available"
                            }}
                            onClick={() => {
                                setManual(true);
                                setIntegration(false);
                            }}
                        >
                            Manual
                        </button>
                    </div>
                    <br />
                    {
                        !integration && <div className='mt-3'>
                            <label className=' text-gray-400 text-sm'>Liability name</label>
                            <input type="text" placeholder='Enter liability name' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setLiabilitiesName(e.target.value)} value={liabilitiesName} />
                            <div>
                                <label className=' text-gray-400 text-sm'>Type of liability</label>
                                <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                                    <select className='bg-[rgba(244,241,241,0.1)] w-full' name="type" id="type" onChange={(e) => setLiabilitiesType(e.target.value)}>
                                        <option value={"Liability Type"}>Liability Type</option>
                                    </select>
                                </div>
                            </div>
                            <label className=' text-gray-400 text-sm'>Current Value ($)</label>
                            <div className="flex space-x-2">
                                <input type="text" className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-[8%] text-black outline-none mb-4 bg-gray-100' value={"$"} disabled={true} />
                                <input type="text" placeholder='Indicate the current value' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-[92%] text-black outline-none mb-4 bg-gray-100' onChange={(e) => setLiabilitiesAmount(e.target.value)} value={liabilitiesAmount} />
                            </div>
                            <label className=' text-gray-400 text-sm'>Loan Period</label>
                            <RangePicker
                                className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100 cursor-pointer'
                                value={liabilitiesLoanPeriod}
                                onChange={(dates) => {
                                    console.log("onchange dates", dates);
                                    setLiabilitiesLoanPeriod(dates);
                                    if (dates && dates.length === 2) {
                                        const formattedStartDate = moment(dates[0]).format('DD.MM.YYYY');
                                        const formattedEndDate = moment(dates[1]).format('DD.MM.YYYY');
                                        console.log(`Selected Date Range: ${formattedStartDate} to ${formattedEndDate}`);
                                        setLoanPeriod(`${formattedStartDate} - ${formattedEndDate}`);
                                        setLoanPeriodStart(dates[0]);
                                        setLoanPeriodEnd(dates[1]);
                                    }
                                }}
                                format="DD.MM.YYYY"
                                separator="-"
                                suffixIcon={
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 2V5" stroke="#4E2357" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16 2V5" stroke="#4E2357" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.5 9.08984H20.5" stroke="#4E2357" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#4E2357" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15.6937 13.7002H15.7027" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15.6937 16.7002H15.7027" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M11.9945 13.7002H12.0035" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M11.9945 16.7002H12.0035" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8.29529 13.7002H8.30427" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8.29529 16.7002H8.30427" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                }
                            />
                        </div>
                    }
                    {
                        integration && linkToken && <div className="h-[108px] w-full" style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around"
                        }}><button className={`bg-[#e0d9d9] px-[5px] py-[5px] rounded-2xl border-2 w-full ${!ready && "opacity-25"} mt-4 flex justify-center`} onClick={() => {
                            plaidLinkStep.current = 5;
                            open();
                        }
                        } disabled={!ready}><small className='mx-2 mt-1'>Connect Plaid</small><img src={PlaidLogoSvg} width={"60px"} /></button></div>
                    }
                </div>
            </div>
            {
                !integration && <button className={`bg-[#4E2357] px-[5px] py-[5px] rounded-2xl border-2 w-full ${addLiabilitiesState && "opacity-25"}`} onClick={() => {
                    liabilities.push({
                        type: liabilitiesType,
                        name: liabilitiesName,
                        amount: liabilitiesAmount,
                        loanPeriod
                    });
                    dispatch(postStep5Action({
                        name: liabilitiesName,
                        liabilityType: liabilitiesType,
                        amount: liabilitiesAmount,
                        loanPeriodStart: loanPeriodStart,
                        loanPeriodEnd: loanPeriodEnd,
                        type: "manually"
                    }))
                    setLiabilities([...liabilities]);
                    setLiabilitiesModal(false);
                    setNextStepButtonState(false);

                    // Empty States
                    setLiabilitiesLoanPeriod("");
                    setLoanPeriod("");
                    setLiabilitiesAmount("");
                    setLiabilitiesName("")
                    setAddLiabilitiesState(true);
                }
                } disabled={addLiabilitiesState}> <small className='mx-2 text-white' >Add Liabilities</small></button>
            }
        </Modal>

        <Modal isOpen={editIncomeModal} onClose={() => setEditIncomeModal(false)} title={"Edit Income"} description={"Indicate your annual income (Every year)"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <div className='mt-3'>
                        <label className=' text-gray-400 text-sm'>Source of income</label>
                        <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                            <select className='bg-[rgba(244,241,241,0.1)] w-full' name="source" id="source" value={source} onChange={(e) => setSource(e.target.value)}>
                                <option value={"Cryptocurency"}>Cryptocurency</option>
                                <option value={"Real estate rentals"}>Real estate rentals</option>
                                <option value={"Freelancing"}>Freelancing</option>
                            </select>
                        </div>
                    </div>
                    <label className=' text-gray-400 text-sm'>Current Value ($)</label>
                    <div className="flex space-x-2">
                        <input type="text" className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-[8%] text-black outline-none mb-4 bg-gray-100' value={"$"} disabled={true} />
                        <input type="text" placeholder='Indicate the current value' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-[92%] text-black outline-none mb-4 bg-gray-100' onChange={(e) => setAmount(e.target.value)} value={amount} />
                    </div>
                </div>
            </div>
            <button className={`bg-[#4E2357] px-[5px] py-[5px] rounded-2xl border-2 w-full`} onClick={() => {
                dispatch(editStep3Action({
                    source: source,
                    totalIncome: amount,
                    incomeId: incomeId
                }))
                setEditIncomeModal(false);

                // Empty States
                setAmount("");
                setSource("");
                setIncomeId("");
            }
            }><small className='mx-2 text-white' >Edit Income</small></button>
        </Modal>

        <Modal isOpen={editAssetModal} onClose={() => setEditAssetModal(false)} title={"Edit Asset"} description={"This is where you can edit your asset. Please fill in the data given here"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <div className='mt-3'>
                        <label className=' text-gray-400 text-sm'>Asset name</label>
                        <input type="text" placeholder='Enter asset name' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setAssetName(e.target.value)} value={assetName} />
                        <div>
                            <label className=' text-gray-400 text-sm'>Type of asset</label>
                            <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                                <select className='bg-[rgba(244,241,241,0.1)] w-full' name="type" id="type" value={assetType} onChange={(e) => setAssetType(e.target.value)}>
                                    {CONSTANT.assetType.map((type, index) => <option value={type} key={index}>{type}</option>)}
                                </select>
                            </div>
                        </div>
                        <label className=' text-gray-400 text-sm'>Current Value ($)</label>
                        <div className="flex space-x-2">
                            <input type="text" className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-[8%] text-black outline-none mb-4 bg-gray-100' value={"$"} disabled={true} />
                            <input type="text" placeholder='Indicate the current value' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-[92%] text-black outline-none mb-4 bg-gray-100' onChange={(e) => setAssetAmount(e.target.value)} value={assetAmount} />
                        </div>
                    </div>
                </div>
            </div>
            <button className={`bg-[#4E2357] px-[5px] py-[5px] rounded-2xl border-2 w-full`} onClick={() => {
                dispatch(editStep4Action({
                    assetName: assetName,
                    assetType: assetType,
                    amount: assetAmount,
                    assetId: assetId
                }))
                setEditAssetModal(false);

                // Empty States
                setAssetName("");
                setAssetAmount("");
                setAssetType("");
                setAssetId("");
            }
            }> <small className='mx-2 text-white' >Edit Asset</small></button>
        </Modal>

        <Modal isOpen={editLiabilitiesModal} onClose={() => setEditLiabilitiesModal(false)} title={"Edit Liability"} description={"This is where you can edit your liability. Please fill in the data given here"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <div className='mt-3'>
                        <label className=' text-gray-400 text-sm'>Liability name</label>
                        <input type="text" placeholder='Enter liability name' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setLiabilitiesName(e.target.value)} value={liabilitiesName} />
                        <div>
                            <label className=' text-gray-400 text-sm'>Type of liability</label>
                            <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                                <select className='bg-[rgba(244,241,241,0.1)] w-full' name="type" id="type" onChange={(e) => setLiabilitiesType(e.target.value)} value={liabilitiesType}>
                                    <option value={"Liability Type"}>Liability Type</option>
                                </select>
                            </div>
                        </div>
                        <label className=' text-gray-400 text-sm'>Current Value ($)</label>
                        <div className="flex space-x-2">
                            <input type="text" className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-[8%] text-black outline-none mb-4 bg-gray-100' value={"$"} disabled={true} />
                            <input type="text" placeholder='Indicate the current value' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-[92%] text-black outline-none mb-4 bg-gray-100' onChange={(e) => setLiabilitiesAmount(e.target.value)} value={liabilitiesAmount} />
                        </div>
                        <label className=' text-gray-400 text-sm'>Loan Period</label>
                        <RangePicker
                            className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100 cursor-pointer'
                            value={liabilitiesLoanPeriod}
                            onChange={(dates) => {
                                setLiabilitiesLoanPeriod(dates);
                                if (dates && dates.length === 2) {
                                    const formattedStartDate = moment(dates[0]).format('DD.MM.YYYY');
                                    const formattedEndDate = moment(dates[1]).format('DD.MM.YYYY');
                                    console.log(`Selected Date Range: ${formattedStartDate} to ${formattedEndDate}`);
                                    setLoanPeriod(`${formattedStartDate} - ${formattedEndDate}`);
                                    setLoanPeriodStart(dates[0]);
                                    setLoanPeriodEnd(dates[1]);
                                }
                            }}
                            format="DD.MM.YYYY"
                            separator="-"
                            suffixIcon={
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2V5" stroke="#4E2357" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16 2V5" stroke="#4E2357" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.5 9.08984H20.5" stroke="#4E2357" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#4E2357" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.6937 13.7002H15.7027" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.6937 16.7002H15.7027" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.9945 13.7002H12.0035" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.9945 16.7002H12.0035" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.29529 13.7002H8.30427" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.29529 16.7002H8.30427" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>
            <button className={`bg-[#4E2357] px-[5px] py-[5px] rounded-2xl border-2 w-full`} onClick={() => {
                dispatch(editStep5Action({
                    name: liabilitiesName,
                    liabilityType: liabilitiesType,
                    amount: liabilitiesAmount,
                    loanPeriodStart: loanPeriodStart,
                    loanPeriodEnd: loanPeriodEnd,
                    liabilityId: liabilityId
                }))
                setEditLiabilitiesModal(false);

                // Empty States
                setLiabilitiesName("");
                setLiabilitiesType("");
                setLiabilitiesAmount("");
                setLiabilityId("");
            }
            }> <small className='mx-2 text-white' >Edit Liabilities</small></button>
        </Modal>

    </div>

    const stepFour = <div>

        <div className='ml-[3%] mr-[3%]'>

            <div className='flex justify-between'>
                <button className='bg-[#F6F7F7] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px]' onClick={() => {
                    setFinish(true);
                    setStep(-1);
                }}>
                    <svg className='mt-2' width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <small className='mx-2 text-black mt-1' >Back</small>
                </button>
                <div>
                    <h3 className='text-center pb-3 font-medium'>Goal Setting</h3>
                    <p className='text-center text-gray-400 text-sm pb-5'>Optionally, if you have any specific milestones that may impact your financial goals, for instance, donating to a charity, or buying a second home, you can add these to discuss with your advisor.</p>
                </div>
                {
                    edit === 4 ? <button className={`bg-[#4E2357] px-[20px] py-[5px] rounded-2xl border-2 h-[40px] ${nextStepButtonState && "opacity-25"}`} onClick={() => {
                        setStep(-1);
                        setFinish(true);
                        setNextStepButtonState(true);
                    }}> <small className='mx-2 text-white' >Save</small></button> : <button className={`bg-[#4E2357] px-[20px] py-[5px] rounded-2xl border-2 h-[40px] ${nextStepButtonState && "opacity-25"}`} onClick={() => {
                        setStep(-1);
                        setCheck(3);
                        setFinish(true);
                        setNextStepButtonState(true);
                        dispatch(postOnboardingAction({
                            step: 4,
                            finish: false
                        }))
                    }} disabled={nextStepButtonState}> <small className='mx-2 text-white' >Next Step</small></button>
                }
            </div>

        </div>

        <div className={goals.length > 0 ? `ml-[3%] mr-[3%] border-[1px] border-[lightgray] rounded-2xl p-5` : ''} style={{
            height: "48vh",
            overflowY: "auto"
        }}>

            <div className='grid grid-cols-2 gap-2'>
                {
                    goals.map((goal) => <div className='ml-[1%] mr-[3%] border-[1px] border-[lightgray] rounded-2xl p-5'>

                        <div className='flex justify-between mb-1'>
                            <div className="flex">
                                <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{fullName[0]}</Avatar>
                                <p className='text-gray-400 p-2'>{fullName} (You)</p>
                            </div>
                            <svg className='cursor-pointer mt-2' width="30" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="4" cy="4" r="4" fill="#B9B9B9" />
                                <circle cx="20" cy="4" r="4" fill="#B9B9B9" />
                                <circle cx="36" cy="4" r="4" fill="#B9B9B9" />
                            </svg>
                        </div>

                        <div className='flex justify-between pb-5 mt-3 border-b-2 border-[#F6F6F6]'>

                            <div>
                                <h5 className="font-medium">{goal.name}</h5>
                                <p className='text-gray-400 mt-1'>Сreated goal</p>
                            </div>

                            <div className='flex p-2 mt-[-20px]'>
                                <p className='font-semibold p-2 mt-2 rounded-2xl' style={{
                                    backgroundColor: "#FFF1E7",
                                    color: "#A4562A",
                                    height: "fit-content"
                                }}>{goal.priority}</p>
                            </div>

                        </div>

                        <div>

                            <div className='flex justify-between mb-5 pb-4 pt-4 border-b-2 border-[#F6F6F6]'>
                                <p className='mr-1 text-gray-400'>Discuss by Date:</p>
                                <div className='flex'>
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 1.75V4.375" stroke="#292929" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M14 1.75V4.375" stroke="#292929" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.0625 7.95312H17.9375" stroke="#292929" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M18.375 7.4375V14.875C18.375 17.5 17.0625 19.25 14 19.25H7C3.9375 19.25 2.625 17.5 2.625 14.875V7.4375C2.625 4.8125 3.9375 3.0625 7 3.0625H14C17.0625 3.0625 18.375 4.8125 18.375 7.4375Z" stroke="#292929" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M13.7335 11.9883H13.7413" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M13.7335 14.6133H13.7413" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M10.4952 11.9883H10.5031" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M10.4952 14.6133H10.5031" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.25691 11.9883H7.26477" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.25691 14.6133H7.26477" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <p className='text-sm font-semibold ml-2 mt-[2px]'>{goal.date}</p>
                                </div>
                            </div>

                            <div className='flex flex-col mb-1 pt-1'>
                                <p className='mr-1 text-gray-400'>Description</p>
                                <p className='mt-3'>{goal.description}</p>
                            </div>

                        </div>
                    </div>)
                }
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>

                <div className='mt-20 text-center'>
                    {
                        goals.length === 0 && <>
                            <h6 className='text-center pb-3 font-medium'>You haven't added a goal planing</h6>
                            <p className='text-center text-gray-400 text-sm pb-5'>You do not have a goal planned yet, please click on the "Plan Goal" button to set a goal.</p>
                        </>
                    }

                </div>

                <button className='bg-[#FBF5FC] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px] mt-6' onClick={() => setGoalModal(true)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="#4E2357" />
                        <path d="M12 7V12M12 12V17M12 12H17M12 12H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <small className='mx-2 text-[#4E2357] mt-1' >Plan Goal</small>
                </button>

            </div>

        </div>

        <Modal isOpen={goalModal} onClose={() => setGoalModal(false)} title={"Plan Goal"} description={"This is where you can schedule your goal"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <div className='mt-3'>
                        <label className=' text-gray-400 text-sm'>List a particular goal you may want to consider in your lifetime planning</label>
                        <input type="text" placeholder='Enter goal name' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setGoalName(e.target.value)} value={goalName} />
                        <div>
                            <label className=' text-gray-400 text-sm'>Priority</label>
                            <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                                <select className='bg-[rgba(244,241,241,0.1)] w-full' name="type" id="type" value={goalPriority} onChange={(e) => setGoalPriority(e.target.value)}>
                                    {CONSTANT.priority.map((pri, index) => <option value={pri} key={index}>{pri}</option>)}
                                </select>
                            </div>
                        </div>
                        <label className='text-gray-400 text-sm'>Goal Date (if you have one)</label>
                        <DatePicker
                            className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100 cursor-pointer'
                            value={goalDateSetter}
                            onChange={(date) => {
                                setGoalDateSetter(date);
                                const formattedDate = moment(date).format('DD.MM.YYYY');
                                setGoalDate(formattedDate);
                            }}
                            format="DD.MM.YYYY"
                            separator="-"
                            suffixIcon={
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2V5" stroke="#4E2357" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16 2V5" stroke="#4E2357" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.5 9.08984H20.5" stroke="#4E2357" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#4E2357" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.6937 13.7002H15.7027" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.6937 16.7002H15.7027" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.9945 13.7002H12.0035" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.9945 16.7002H12.0035" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.29529 13.7002H8.30427" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.29529 16.7002H8.30427" stroke="#4E2357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            }
                        />
                        <label className=' text-gray-400 text-sm'>Description (optional)</label>
                        <textarea type="text" placeholder='Describe your goal' className='resize-none border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setGoalDescription(e.target.value)} value={goalDescription} cols="30" rows="4" />
                    </div>
                </div>
            </div>
            <button className={`bg-[#4E2357] px-[5px] py-[5px] rounded-2xl border-2 w-full ${addGoalState && "opacity-25"}`} onClick={() => {
                goals.push({
                    name: goalName,
                    priority: goalPriority,
                    date: goalDate,
                    description: goalDescription
                });
                dispatch(postStep6Action({
                    name: goalName,
                    priority: goalPriority,
                    date: goalDateSetter,
                    description: goalDescription,
                }));
                setGoals([...goals]);
                setGoalModal(false);
                setNextStepButtonState(false);

                // Empty States
                setGoalName("");
                setGoalDate("");
                setGoalDescription("");
                setGoalDateSetter("")
                setAddGoalState(true);
            }
            } disabled={addGoalState}> <small className='mx-2 text-white' >{integration ? 'Integration' : 'Add Goal'}</small></button>
        </Modal>

    </div>

    const stepFive = <div>

        <div className='ml-[3%] mr-[3%]'>

            <div className='flex justify-between'>
                <button className='bg-[#F6F7F7] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px]' onClick={() => {
                    setFinish(true);
                    setStep(-1);
                }}>
                    <svg className='mt-2' width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <small className='mx-2 text-black mt-1' >Back</small>
                </button>
                <div>
                    <h3 className='text-center pb-3 font-medium'>Onboarding your Estate Plan</h3>
                    <p className='text-center text-gray-400 text-sm pb-5'> We request you digitize all your estate documents by uploading them into Mauve. All documents are stored in our vault, and are only viewable to
                        your estate planners.</p>
                </div>
                {
                    edit === 5 ? <button className={`bg-[#4E2357] px-[20px] py-[5px] rounded-2xl border-2 h-[40px] ${nextStepButtonState && "opacity-25"}`} onClick={() => {
                        setStep(-1);
                        setFinish(true);
                        setNextStepButtonState(true);
                    }}> <small className='mx-2 text-white' >Save</small></button> : <button className={`bg-[#4E2357] px-[20px] py-[5px] rounded-2xl border-2 h-[40px] ${nextStepButtonState && "opacity-25"}`} onClick={() => {
                        setStep(-1);
                        setCheck(4);
                        setFinish(true);
                        setFinishButtonsState(false);
                        setNextStepButtonState(true);
                        dispatch(postOnboardingAction({
                            step: 5,
                            finish: true
                        }))
                    }} disabled={nextStepButtonState}> <small className='mx-2 text-white' >Next Step</small></button>
                }
            </div>

        </div>

        <div className={documents.length > 0 ? `ml-[3%] mr-[3%] border-[1px] border-[lightgray] rounded-2xl p-5` : ''} style={{
            height: "48vh",
            overflowY: "auto"
        }}>

            {documents.length > 0 && <div>
                <Table columns={columns} dataSource={documents} />
            </div>
            }

        </div>

        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>

            <div className={`${documents.length > 0 ? "" : "mt-20"} text-center`}>
                {
                    documents.length === 0 && <>
                        <h6 className='text-center pb-3 font-medium'>You haven't added estate plan</h6>
                        <p className='text-center text-gray-400 text-sm pb-5'>You do not have an estate plan set up yet, please click on the "Set Up Estate Plan" button to create one.</p>
                    </>
                }
            </div>

            <div className="flex space-x-4 justify-center">

                <button className='bg-[#FBF5FC] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px] mt-6 ' onClick={() => setDocumentModal(true)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="#4E2357" />
                        <path d="M12 7V12M12 12V17M12 12H17M12 12H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <small className='mx-2 text-[#4E2357] mt-1' >Add Estate Plan</small>
                </button>

                <button className='bg-[#FBF5FC] px-[15px] py-[3px] rounded-2xl border-2 flex h-[35px] mt-6'>
                    <small className='mx-2 text-[#4E2357] mt-1 cursor-pointer' >Request my Estate Team to upload this</small>
                </button>

            </div>

        </div>

        <Modal isOpen={documentModal} onClose={() => setDocumentModal(false)} title={"Add Estate Plan"} description={"Here you can create a estate plan"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <div className='mt-3'>
                        <label className=' text-gray-400 text-sm'>Document</label>
                        <Dragger {...props} accept=".pdf,.doc,.docx" beforeUpload={(file) => {
                            if (!types.includes(file.type)) {
                                message.error(`${file.name} is not a pdf, doc or docx file`);
                                return false;
                            } else {
                                return true
                            }
                        }}>
                            {!pdf && <div className="flex flex-row mt-3">
                                <p className="ant-upload-drag-icon">
                                    <svg width="80" height="57" viewBox="0 0 130 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect y="0.5" width="130" height="56" rx="28" fill="#FBF5FC" />
                                        <path d="M22.2857 35.5C19.9188 35.5 18 33.6038 18 31.2647C18 28.9256 19.9188 27.0294 22.2857 27.0294C22.5698 27.0294 22.8475 27.0567 23.1162 27.1089M30.381 24.5272C30.9767 24.3191 31.6178 24.2059 32.2857 24.2059C32.9404 24.2059 33.5693 24.3147 34.1551 24.515M23.1162 27.1089C22.8871 26.4978 22.7619 25.8369 22.7619 25.1471C22.7619 22.0283 25.3203 19.5 28.4762 19.5C31.4159 19.5 33.8371 21.6937 34.1551 24.515M23.1162 27.1089C23.6806 27.2184 24.2053 27.4374 24.6667 27.7426M34.1551 24.515C36.393 25.2802 38 27.3811 38 29.8529C38 32.5599 36.0726 34.8221 33.5 35.3722" stroke="#4E2357" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M28 32.5V38.5M28 32.5L30 34.5M28 32.5L26 34.5" stroke="#4E2357" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M57.712 34.74C56.8107 34.74 56.0133 34.556 55.32 34.188C54.632 33.8147 54.0933 33.2947 53.704 32.628C53.3147 31.956 53.12 31.1667 53.12 30.26V22.988L54.816 22.98V30.172C54.816 30.6627 54.8987 31.0947 55.064 31.468C55.2293 31.8413 55.4507 32.1533 55.728 32.404C56.0053 32.6547 56.3147 32.844 56.656 32.972C57.0027 33.1 57.3547 33.164 57.712 33.164C58.0747 33.164 58.4267 33.1 58.768 32.972C59.1147 32.8387 59.4267 32.6467 59.704 32.396C59.9813 32.1453 60.2 31.8333 60.36 31.46C60.5253 31.0867 60.608 30.6573 60.608 30.172V22.98H62.304V30.26C62.304 31.1613 62.1093 31.948 61.72 32.62C61.3307 33.292 60.7893 33.8147 60.096 34.188C59.408 34.556 58.6133 34.74 57.712 34.74ZM68.5979 34.74C67.7712 34.74 67.0779 34.54 66.5179 34.14C65.9579 33.7347 65.5339 33.188 65.2459 32.5C64.9579 31.812 64.8139 31.036 64.8139 30.172C64.8139 29.308 64.9552 28.532 65.2379 27.844C65.5259 27.156 65.9472 26.6147 66.5019 26.22C67.0619 25.82 67.7499 25.62 68.5659 25.62C69.3765 25.62 70.0752 25.82 70.6619 26.22C71.2539 26.6147 71.7099 27.156 72.0299 27.844C72.3499 28.5267 72.5099 29.3027 72.5099 30.172C72.5099 31.036 72.3499 31.8147 72.0299 32.508C71.7152 33.196 71.2645 33.74 70.6779 34.14C70.0965 34.54 69.4032 34.74 68.5979 34.74ZM64.5339 38.34V25.86H66.0219V32.076H66.2139V38.34H64.5339ZM68.3659 33.228C68.8992 33.228 69.3392 33.092 69.6859 32.82C70.0379 32.548 70.2992 32.1827 70.4699 31.724C70.6459 31.26 70.7339 30.7427 70.7339 30.172C70.7339 29.6067 70.6459 29.0947 70.4699 28.636C70.2992 28.1773 70.0352 27.812 69.6779 27.54C69.3205 27.268 68.8645 27.132 68.3099 27.132C67.7872 27.132 67.3552 27.26 67.0139 27.516C66.6779 27.772 66.4272 28.1293 66.2619 28.588C66.1019 29.0467 66.0219 29.5747 66.0219 30.172C66.0219 30.7693 66.1019 31.2973 66.2619 31.756C66.4219 32.2147 66.6752 32.5747 67.0219 32.836C67.3685 33.0973 67.8165 33.228 68.3659 33.228ZM74.4363 34.5V22.74H76.1083V34.5H74.4363ZM82.2626 34.74C81.3986 34.74 80.6493 34.5453 80.0146 34.156C79.38 33.7667 78.8893 33.2307 78.5426 32.548C78.2013 31.86 78.0306 31.068 78.0306 30.172C78.0306 29.2707 78.2066 28.4787 78.5586 27.796C78.9106 27.108 79.404 26.5747 80.0386 26.196C80.6733 25.812 81.4146 25.62 82.2626 25.62C83.1266 25.62 83.876 25.8147 84.5106 26.204C85.1453 26.5933 85.636 27.1293 85.9826 27.812C86.3293 28.4947 86.5026 29.2813 86.5026 30.172C86.5026 31.0733 86.3266 31.868 85.9746 32.556C85.628 33.2387 85.1373 33.7747 84.5026 34.164C83.868 34.548 83.1213 34.74 82.2626 34.74ZM82.2626 33.164C83.0893 33.164 83.7053 32.8867 84.1106 32.332C84.5213 31.772 84.7266 31.052 84.7266 30.172C84.7266 29.2707 84.5186 28.5507 84.1026 28.012C83.692 27.468 83.0786 27.196 82.2626 27.196C81.7026 27.196 81.2413 27.324 80.8786 27.58C80.516 27.8307 80.2466 28.18 80.0706 28.628C79.8946 29.0707 79.8066 29.5853 79.8066 30.172C79.8066 31.0787 80.0146 31.804 80.4306 32.348C80.8466 32.892 81.4573 33.164 82.2626 33.164ZM90.7006 34.74C90.0606 34.74 89.5246 34.6227 89.0926 34.388C88.6606 34.148 88.3326 33.8333 88.1086 33.444C87.89 33.0493 87.7806 32.6173 87.7806 32.148C87.7806 31.7107 87.858 31.3267 88.0126 30.996C88.1673 30.6653 88.3966 30.3853 88.7006 30.156C89.0046 29.9213 89.378 29.732 89.8206 29.588C90.2046 29.476 90.6393 29.3773 91.1246 29.292C91.61 29.2067 92.1193 29.1267 92.6526 29.052C93.1913 28.9773 93.7246 28.9027 94.2526 28.828L93.6446 29.164C93.6553 28.4867 93.5113 27.9853 93.2126 27.66C92.9193 27.3293 92.4126 27.164 91.6926 27.164C91.2393 27.164 90.8233 27.2707 90.4446 27.484C90.066 27.692 89.802 28.0387 89.6526 28.524L88.0926 28.044C88.306 27.3027 88.7113 26.7133 89.3086 26.276C89.9113 25.8387 90.7113 25.62 91.7086 25.62C92.482 25.62 93.154 25.7533 93.7246 26.02C94.3006 26.2813 94.722 26.6973 94.9886 27.268C95.1273 27.5507 95.2126 27.8493 95.2446 28.164C95.2766 28.4787 95.2926 28.8173 95.2926 29.18V34.5H93.8126V32.524L94.1006 32.78C93.7433 33.4413 93.2873 33.9347 92.7326 34.26C92.1833 34.58 91.506 34.74 90.7006 34.74ZM90.9966 33.372C91.4713 33.372 91.8793 33.2893 92.2206 33.124C92.562 32.9533 92.8366 32.7373 93.0446 32.476C93.2526 32.2147 93.3886 31.9427 93.4526 31.66C93.5433 31.404 93.594 31.116 93.6046 30.796C93.6206 30.476 93.6286 30.22 93.6286 30.028L94.1726 30.228C93.6446 30.308 93.1646 30.38 92.7326 30.444C92.3006 30.508 91.9086 30.572 91.5566 30.636C91.21 30.6947 90.9006 30.7667 90.6286 30.852C90.3993 30.932 90.194 31.028 90.0126 31.14C89.8366 31.252 89.6953 31.388 89.5886 31.548C89.4873 31.708 89.4366 31.9027 89.4366 32.132C89.4366 32.356 89.4926 32.564 89.6046 32.756C89.7166 32.9427 89.8873 33.092 90.1166 33.204C90.346 33.316 90.6393 33.372 90.9966 33.372ZM100.802 34.74C99.9967 34.74 99.3007 34.54 98.714 34.14C98.1327 33.74 97.682 33.196 97.362 32.508C97.0473 31.8147 96.89 31.036 96.89 30.172C96.89 29.3027 97.05 28.5267 97.37 27.844C97.69 27.156 98.1433 26.6147 98.73 26.22C99.322 25.82 100.023 25.62 100.834 25.62C101.65 25.62 102.335 25.82 102.89 26.22C103.45 26.6147 103.871 27.156 104.154 27.844C104.442 28.532 104.586 29.308 104.586 30.172C104.586 31.036 104.442 31.812 104.154 32.5C103.866 33.188 103.442 33.7347 102.882 34.14C102.322 34.54 101.629 34.74 100.802 34.74ZM101.034 33.228C101.583 33.228 102.031 33.0973 102.378 32.836C102.725 32.5747 102.978 32.2147 103.138 31.756C103.298 31.2973 103.378 30.7693 103.378 30.172C103.378 29.5747 103.295 29.0467 103.13 28.588C102.97 28.1293 102.719 27.772 102.378 27.516C102.042 27.26 101.613 27.132 101.09 27.132C100.535 27.132 100.079 27.268 99.722 27.54C99.3647 27.812 99.098 28.1773 98.922 28.636C98.7513 29.0947 98.666 29.6067 98.666 30.172C98.666 30.7427 98.7513 31.26 98.922 31.724C99.098 32.1827 99.3593 32.548 99.706 32.82C100.058 33.092 100.501 33.228 101.034 33.228ZM103.378 34.5V28.284H103.186V22.98H104.866V34.5H103.378Z" fill="#4E2357" />
                                    </svg>
                                </p>
                                <p className=' text-gray-400 text-xs mt-6 ml-2'>or drop PDF file here</p>
                            </div>}
                        </Dragger>
                        <br />
                        <label className=' text-gray-400 text-sm mt-5'>Document name</label>
                        <input type="text" placeholder='Enter document name' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setDocumentName(e.target.value)} value={documentName} />
                        <div className="flex flex-row justify-between space-x-2">
                            <div className="w-[90%]">
                                <label className=' text-gray-400 text-sm'>Category</label>
                                <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                                    <select className='bg-[rgba(244,241,241,0.1)] w-full' name="category" id="category" value={documentCategory} onChange={(e) => setDocumentCategory(e.target.value)}>
                                        {CONSTANT.estatePlanCategories.map((cat, index) => <option value={cat} key={index}>{cat}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="w-[90%]">
                                <label className=' text-gray-400 text-sm'>Access</label>
                                <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                                    <select className='bg-[rgba(244,241,241,0.1)] w-full' name="access" id="access" onChange={(e) => setDocumentAccess(e.target.value)}>
                                        <option value={"Private"}>Private</option>
                                        <option value={"All Parties"}>All Parties</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className={`bg-[#4E2357] px-[5px] py-[5px] rounded-2xl border-2 w-full ${addDocumentState && "opacity-25"}`} onClick={async () => {
                documents.push({
                    name: documentName,
                    pdf: pdf,
                    category: documentCategory,
                    access: documentAccess,
                    lastUpdated: moment(new Date()).format('DD.MM.YYYY')
                });
                const token = localStorage.getItem("accessToken");
                let formData = new FormData();
                formData.append('category', 'Incomskd');
                formData.append('status', 'completer');
                formData.append('Access', 'true');
                formData.append('file', pdf.originFileObj);
                const response = await axios.post(
                    `${getBaseApi()}user/upload-file`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                dispatch(postStep7Action({
                    name: documentName,
                    documentId: response?.data?.id,
                    category: documentCategory,
                    access: documentAccess,
                    lastUpdated: new Date()
                }))
                setDocuments([...documents]);
                setDocumentModal(false);
                setNextStepButtonState(false);

                // Empty States
                setPdf(null);
                setDocumentName("");
                setAddDocumentState(true);
            }
            } disabled={addDocumentState}> <small className='mx-2 text-white' >{integration ? 'Integration' : 'Add Document'}</small></button>
        </Modal>

    </div>

    return <>
        {contextHolder}
        {header(finish)}
        {step === -1 && introduction}
        {step === 0 && stepOne}
        {step === 1 && stepTwo}
        {step === 2 && stepThree}
        {step === 3 && stepFour}
        {step === 4 && stepFive}
        {step != -1 && footer}
    </>;
}

export default Onboarding;