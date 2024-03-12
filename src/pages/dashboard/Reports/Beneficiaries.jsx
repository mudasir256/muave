import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Modal from '../../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
    getNotesAction,
    postNotesAction,
    getProvisionAction,
    postProvisionAction
} from '../../../redux/dashboard/action';

const Beneficiaries = () => {
    const myState = useSelector((state) => state.dashboard);
    const dispatch = useDispatch();

    const [beneficiaries, setBeneficiaries] = useState([]);
    const [provisions, setProvisions] = useState([]);
    const [notes, setNotes] = useState([]);
    const [james, setJames] = useState(true);
    const [maria, setMaria] = useState(false);
    const [search, setSearch] = useState("");

    const [addBeneficiariesModalOpen, setBeneficiariesModalOpen] = useState(false);
    const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
    const [addProvisionModalOpen, setAddProvisionModalOpen] = useState(false);

    const [overview, setOverview] = useState(true);
    const [estate, setEstate] = useState(false);

    // Notes
    const [noteName, setNoteName] = useState("");
    const [noteDescription, setNoteDescription] = useState("");

    // Provisions
    const [provisionName, setProvisionName] = useState("Robert Jhonson");
    const [provisionAssociate, setProvisionAssociate] = useState(["Maria Jhonson", "Bob Jhonson", "Julia Jhonson"]);
    const [provisionPurpose, setProvisionPurpose] = useState("Charitable Donation");
    const [provisionDescription, setProvisionDescription] = useState("");
    const [provisionDistribution, setProvisionDistribution] = useState([]);

    useEffect(() => {
        console.log(myState);
        if (myState.notes) {
            const notes = myState.notes.map(function (note, index) {
                return {
                    ...note,
                    createdAt: moment(note.createdAt).format('YY.MM.DD HH:mm'),
                }
            })
            setNotes([...notes]);
        }
        if (myState.provisions) {
            const provisions = myState.provisions.map(function (provision, index) {
                return {
                    ...provision
                }
            })
            setProvisions([...provisions]);
        }
    }, [myState])

    const init = () => {

        setBeneficiaries([
            {
                type: 'Wife',
                name: 'Maria Jhonson',
                money: '$3,149,233',
                email: 'example@gmail.com',
                phone: '+1 000 000 000',
                realState: 'My Home',
                cashAndEquivalents: 'JMorgan Chase 1234',
                liabilities: 'Bank Of America 8324',
                specificAsset: 'Tesla Model Y',
                fixedAmount: '$415,421',
                percentageOfEstate: '40%',
            },
            {
                type: 'Son',
                name: 'Alex Jhonson',
                money: '$3,149,233',
                email: 'example@gmail.com',
                phone: '+1 000 000 000',
                realState: 'My Home',
                cashAndEquivalents: 'JMorgan Chase 1234',
                liabilities: 'Bank Of America 8324',
                specificAsset: 'Tesla Model Y',
                fixedAmount: '$415,421',
                percentageOfEstate: '40%',
            },
            {
                type: 'Grandson',
                name: 'Bob Jhonson',
                money: '$3,149,233',
                email: 'example@gmail.com',
                phone: '+1 000 000 000',
                realState: 'My Home',
                cashAndEquivalents: 'JMorgan Chase 1234',
                liabilities: 'Bank Of America 8324',
                specificAsset: 'Tesla Model Y',
                fixedAmount: '$415,421',
                percentageOfEstate: '40%',
            }
        ])

        dispatch(getNotesAction())
        dispatch(getProvisionAction());
    }

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {

        if (search === "") {

            init();

        } else {

            const filteredData = _.filter(beneficiaries, (item) =>
                _.includes(_.toLower(item.name), _.toLower(search))
            );

            setBeneficiaries([...filteredData]);

        }
    }, [search])

    const closeBeneficiariesModal = () => {
        setBeneficiariesModalOpen(false);
    };

    const closeNoteModal = () => {
        setAddNoteModalOpen(false);
    };

    const closeProvisionModal = () => {
        setAddProvisionModalOpen(false);
    };


    const beneficiariesContent = (ben) => <div className='bg-[#FFFDFF] col-span-6 p-4 rounded-xl mt-4 border-[1px] border-color-[lightgray]' style={{
        height: 'fit-content'
    }}>

        <div className='flex justify-between mb-1'>
            <p className='text-gray-400 font-semibold'>{ben.type}</p>
            <svg className='cursor-pointer mt-2' width="30" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" r="4" fill="#B9B9B9" />
                <circle cx="20" cy="4" r="4" fill="#B9B9B9" />
                <circle cx="36" cy="4" r="4" fill="#B9B9B9" />
            </svg>
        </div>

        <div className='flex justify-between pb-5'>

            <div>
                <h6 className="font-semibold">{ben.name}</h6>
                <h5 className='font-bold'>{ben.money}</h5>
            </div>

            <div className='flex mt-10'>
                <div className='items flex pr-2'>
                    <svg className='ml-4' width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.66797 15.9987C2.66797 10.9704 2.66797 8.45623 4.23007 6.89413C5.79216 5.33203 8.30632 5.33203 13.3346 5.33203H18.668C23.6963 5.33203 26.2104 5.33203 27.7725 6.89413C29.3346 8.45623 29.3346 10.9704 29.3346 15.9987C29.3346 21.027 29.3346 23.5412 27.7725 25.1033C26.2104 26.6654 23.6963 26.6654 18.668 26.6654H13.3346C8.30632 26.6654 5.79216 26.6654 4.23007 25.1033C2.66797 23.5412 2.66797 21.027 2.66797 15.9987Z" stroke="#8A8A8A" stroke-width="2" />
                        <path d="M8 10.668L10.8785 13.0667C13.3274 15.1074 14.5518 16.1278 16 16.1278C17.4482 16.1278 18.6726 15.1074 21.1215 13.0667L24 10.668" stroke="#8A8A8A" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <p className='font-semibold ml-2 text-[gray]'>{ben.email}</p>
                </div>

                <div className='items flex'>
                    <svg className='ml-4' width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0564 5.97426L14.0299 7.71865C14.9085 9.29287 14.5558 11.358 13.1721 12.7417C13.1721 12.7417 13.1721 12.7417 13.1721 12.7417C13.1719 12.7418 11.4938 14.4202 14.5368 17.4632C17.5791 20.5056 19.2575 18.8287 19.2583 18.8279C19.2583 18.8279 19.2583 18.8279 19.2583 18.8279C20.642 17.4442 22.7071 17.0915 24.2813 17.9701L26.0257 18.9436C28.4028 20.2702 28.6836 23.6039 26.5942 25.6933C25.3386 26.9488 23.8006 27.9257 22.1004 27.9902C19.2382 28.0987 14.3774 27.3743 9.50155 22.4984C4.62569 17.6226 3.90132 12.7618 4.00983 9.89963C4.07428 8.1994 5.0512 6.66135 6.30671 5.40585C8.39613 3.31642 11.7298 3.59716 13.0564 5.97426Z" stroke="#8A8A8A" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <p className='font-semibold ml-2 text-[gray]'>{ben.phone}</p>
                </div>

            </div>

        </div>

        <div>

            <div className='flex justify-between mb-5 pb-3 border-b-2 border-[lightgray]'>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400 font-semibold'>Real Estate:</p>
                    <p className='text-sm font-semibold'>{ben.realState}</p>
                </div>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400 font-semibold'>Fixed Amount:</p>
                    <p className='text-sm font-semibold'>{ben.fixedAmount}</p>
                </div>

            </div>

            <div className='flex justify-between mb-5 pb-3 border-b-2 border-[lightgray]'>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400 font-semibold'>Cash and Equivalents:</p>
                    <p className='text-sm font-semibold'>{ben.cashAndEquivalents}</p>
                </div>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400 font-semibold'>Percentage of Estate:</p>
                    <p className='text-sm font-semibold'>{ben.percentageOfEstate}</p>
                </div>

            </div>

            <div className='flex justify-between mb-5 pb-3 border-b-2 border-[lightgray]'>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400 font-semibold'>Liabilities:</p>
                    <p className='text-sm font-semibold'>{ben.liabilities}</p>
                </div>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400 font-semibold'>Percentage of Estate:</p>
                    <p className='text-sm font-semibold'>{ben.percentageOfEstate}</p>
                </div>

            </div>

            <div className='flex justify-between pb-3'>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400 font-semibold'>Cash and Equivalents:</p>
                    <p className='text-sm font-semibold'>{ben.specificAsset}</p>
                </div>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400 font-semibold'>Specific Asset</p>
                </div>

            </div>

        </div>

    </div>

    const notesContent = (note) => <div className='bg-[#FFFDFF] col-span-6 p-4 rounded-xl mt-4 border-[1px] border-color-[lightgray]' style={{
        height: 'fit-content'
    }
    }>

        <div className='flex flex-col pb-1'>

            <div className='flex justify-between'>
                <div className='flex'>
                    <div className='mt-2'>
                        <h6 className="font-semibold">{note.name}</h6>
                        <p className='text-sm'>{note.createdAt}</p>
                    </div>
                </div>
                <svg className='cursor-pointer mt-2' width="30" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4" cy="4" r="4" fill="#B9B9B9" />
                    <circle cx="20" cy="4" r="4" fill="#B9B9B9" />
                    <circle cx="36" cy="4" r="4" fill="#B9B9B9" />
                </svg>
            </div>

            <p className='mt-4'>{note.description}</p>

        </div>

    </div>

    const provinceContent = (province) => <div className='bg-[#FFFDFF] col-span-6 p-4 rounded-xl mt-4 border-[1px] border-color-[lightgray]' style={{
        height: 'fit-content'
    }
    }>

        <div className='flex flex-col pb-1'>

            <div className='flex justify-between'>

                <div className='flex'>
                    <div className='bg-[#FBF5FC] p-2 rounded-2xl w-[max-content] mt-2 mb-2 text-sm font-semibold pl-3 pr-3 border-2'>
                        {province.provision}
                    </div>
                    <svg className='ml-2 mr-2 mt-4' width="20" height="16" viewBox="0 0 29 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28.7071 8.70711C29.0976 8.31658 29.0976 7.68342 28.7071 7.29289L22.3431 0.928932C21.9526 0.538408 21.3195 0.538408 20.9289 0.928932C20.5384 1.31946 20.5384 1.95262 20.9289 2.34315L26.5858 8L20.9289 13.6569C20.5384 14.0474 20.5384 14.6805 20.9289 15.0711C21.3195 15.4616 21.9526 15.4616 22.3431 15.0711L28.7071 8.70711ZM0 9H28V7H0V9Z" fill="black" />
                    </svg>
                    {province.associates.map((associate) => <div className='bg-[#FBF5FC] p-2 rounded-2xl w-[max-content] mt-2 mb-2 mr-3 text-sm font-semibold pl-3 pr-3 text-[#4e2357] border-2'>
                        {associate}
                    </div>)}
                </div>

                <svg className='cursor-pointer mt-2' width="30" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4" cy="4" r="4" fill="#B9B9B9" />
                    <circle cx="20" cy="4" r="4" fill="#B9B9B9" />
                    <circle cx="36" cy="4" r="4" fill="#B9B9B9" />
                </svg>

            </div>


            <div className='flex flex-col mt-4'>
                <p className='font-semibold'>{province.purpose}:</p>
                <p>{province.description}</p>
            </div>

        </div>

    </div>

    const tab4Content = <div>

        <div className='flex justify-between'>

            <div className='flex flex-col'>

                <div className='flex'>
                    <h4 className="pb-3 font-medium pr-2">Beneficiaries</h4>
                    <svg className='mt-3 ml-1' width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="white" />
                        <path d="M11.7109 10.1562H12.4984V17.2432H13.2858" stroke="black" stroke-width="1.3999" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.2858 6.61557C13.2858 6.82441 13.2029 7.0247 13.0552 7.17237C12.9075 7.32005 12.7072 7.40301 12.4984 7.40301C12.2895 7.40301 12.0892 7.32005 11.9416 7.17237C11.7939 7.0247 11.7109 6.82441 11.7109 6.61557C11.7109 6.40672 11.7939 6.20644 11.9416 6.05876C12.0892 5.91109 12.2895 5.82812 12.4984 5.82812C12.7072 5.82812 12.9075 5.91109 13.0552 6.05876C13.2029 6.20644 13.2858 6.40672 13.2858 6.61557Z" fill="black" stroke="black" stroke-width="0.699948" />
                    </svg>
                </div>

                <p className='text-gray-400 text-sm pb-5'>Last Updated 10/17/23 2:39:42 PM</p>
            </div>

            <div>

                <div className="tri-state-toggle-a">
                    <button
                        className={`tri-state-toggle-button-a${overview ? '-active' : ''}`}
                        id="toggle-button1"
                        onClick={() => {
                            setOverview(true);
                            setEstate(false);
                        }}
                    >
                        Overview
                    </button>
                    <button
                        className={`tri-state-toggle-button-a${estate ? '-active' : ''}`}
                        id="toggle-button2"
                        onClick={() => {
                            setOverview(false);
                            setEstate(true);
                        }}
                    >
                        Estate
                    </button>
                </div>

            </div>

        </div>

        <div style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: '10px',
        }}>

            <div style={{
                display: 'flex',
                paddingTop: '25px',
            }}>

                <div className='w-[100%] ml-4'>

                    <div className='flex justify-between'>

                        <div>
                            <label className='pr-3 mt-3 mr-5'>First Death</label>
                            <div className="tri-state-toggle-b">
                                <button
                                    className={`tri-state-toggle-button-b${james ? '-active' : ''}`}
                                    id="toggle-button1"
                                    onClick={() => {
                                        setJames(true);
                                        setMaria(false);
                                    }}
                                >
                                    James
                                </button>
                                <button
                                    className={`tri-state-toggle-button-b${maria ? '-active' : ''}`}
                                    id="toggle-button2"
                                    onClick={() => {
                                        setJames(false);
                                        setMaria(true);
                                    }}
                                >
                                    Maria
                                </button>
                            </div>
                        </div>

                        <button className='bg-[#FBF5FC] rounded-2xl border-2 h-[35px]' onClick={() => setBeneficiariesModalOpen(true)}>
                            <div className='flex p-3 mt-[-5px]'>
                                <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="0.5" width="24" height="24" rx="12" fill="#4E2357" />
                                    <path d="M12 7.5V12.5M12 12.5V17.5M12 12.5H17M12 12.5H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <small className='mx-2 mt-[2px] text-[#4e2357]' >Add Beneficiary</small>
                            </div>
                        </button>

                    </div>

                    <div className='flex justify-between mt-12'>
                        <div className='w-full'>
                            <div style={{
                                width: '15px',
                                height: '15px',
                                marginLeft: "10px",
                                position: "absolute"
                            }} className=' mr-2 mt-[10px]'>
                                <svg width="17" height="17" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="9.58463" cy="10.0807" r="7.91667" stroke="#292929" stroke-width="1.5" />
                                    <path d="M15.418 15.9141L18.3346 18.8307" stroke="#292929" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                            </div>
                            <input style={{
                                paddingLeft: "40px"
                            }} type="text" placeholder='Search clients' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setSearch(e.target.value)} value={search} />
                        </div>

                    </div>

                    {
                        beneficiaries.map((ben, index) => {
                            return beneficiariesContent(ben, index);
                        })
                    }
                </div>

            </div>

            <div className='flex justify-between mt-8 pt-[25px]'>

                <div className='flex flex-col'>

                    <div className='flex'>
                        <h4 className="pb-3 font-medium pr-2">Alternate provisions</h4>
                    </div>
                </div>

                <div>
                    <button className='bg-[#FBF5FC] rounded-2xl border-2 h-[35px]' onClick={() => setAddProvisionModalOpen(true)}>
                        <div className='flex p-3 mt-[-5px]'>
                            <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y="0.5" width="24" height="24" rx="12" fill="#4E2357" />
                                <path d="M12 7.5V12.5M12 12.5V17.5M12 12.5H17M12 12.5H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <small className='mx-2 mt-[2px] text-[#4e2357]' >Add Provisions</small>
                        </div>
                    </button>
                </div>

            </div>

            <div style={{
                display: 'flex'
            }}>

                <div className='w-[100%] ml-4'>
                    {
                        provisions.map((provision, index) => {
                            return provinceContent(provision, index);
                        })
                    }
                </div>

            </div>

            <div className='flex justify-between mt-8  pt-[25px]'>

                <div className='flex flex-col'>

                    <div className='flex'>
                        <h4 className="pb-3 font-medium pr-2">Notes</h4>
                    </div>
                </div>

                <div>
                    <button className='bg-[#FBF5FC] rounded-2xl border-2 h-[35px]' onClick={() => setAddNoteModalOpen(true)}>
                        <div className='flex p-3 mt-[-5px]'>
                            <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y="0.5" width="24" height="24" rx="12" fill="#4E2357" />
                                <path d="M12 7.5V12.5M12 12.5V17.5M12 12.5H17M12 12.5H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <small className='mx-2 mt-[2px] text-[#4e2357]' >Add Notes</small>
                        </div>
                    </button>
                </div>

            </div>

            <div style={{
                display: 'flex',
            }}>

                <div className='w-[100%] ml-4'>
                    {
                        notes.map((note, index) => {
                            return notesContent(note, index);
                        })
                    }
                </div>

            </div>

        </div>

        <Modal isOpen={addBeneficiariesModalOpen} onClose={closeBeneficiariesModal} title={"Add Beneficiaries"} description={"Here you can create a Beneficiaries"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <div>
                        <h6 className='font-medium mb-1'>Main Information</h6>
                        <label className=' text-gray-400 text-sm'>Select Beneficiaries</label>
                        <div className='flex flex-row'>
                            <select id="depart" className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100'>
                                <option value="advisor">Advisor</option>
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className='mt-3'>
                        <h6 className='font-medium mb-1'>Allocation</h6>
                        <div className='p-4 bg-gray-100 rounded-2xl'>
                            <label className=' text-gray-400 text-sm'>Type</label>
                            <div className='flex flex-row'>
                                <select id="depart" className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-[#FFFFFF]'>
                                    <option value="advisor">Advisor</option>
                                </select>
                            </div>
                            <label className=' text-gray-400 text-sm'>Asset</label>
                            <div className='flex flex-row'>
                                <select id="depart" className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-[#FFFFFF]'>
                                    <option value="advisor">JpMorgan Chase 1234 ($124,555)</option>
                                </select>
                            </div>
                            <label className=' text-gray-400 text-sm'>Amount</label>
                            <div className='flex flex-row'>
                                <input type="text" placeholder='Enter your amount' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none bg-[#FFFFFF]' />
                            </div>
                            <label className=' text-gray-400 text-sm ml-2'>$500,000 available</label>
                            <div className='flex space-x-2'>
                                <button className={`bg-[#4E2357] text-white px-[5px] py-[5px] rounded-2xl border-2 w-full mt-2`}> <small className='mx-2' >Add</small></button>
                                <button className={`bg-[#FFFFFF] text-white px-[5px] py-[5px] rounded-2xl border-2 w-full mt-2`}> <small className='mx-2 text-[#4E2357]' >Cancel</small></button>
                            </div>
                        </div>
                    </div>
                    <button className=' rounded-2xl h-[35px]'>
                        <div className='flex p-3 mt-[-5px]'>
                            <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y="0.5" width="24" height="24" rx="12" fill="#4E2357" />
                                <path d="M12 7.5V12.5M12 12.5V17.5M12 12.5H17M12 12.5H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <small className='mx-2 mt-[2px] text-[#4e2357]' >Add Another Allocation</small>
                        </div>
                    </button>
                </div>
                <br />
            </div>
            <button className={`bg-[#4E2357] text-white px-[5px] py-[5px] rounded-xl border-2 w-full mt-2 opacity-30`} onClick={closeBeneficiariesModal} disabled={true}> <small className='mx-2' >Add Beneficiary</small></button>
        </Modal>

        <Modal isOpen={addNoteModalOpen} onClose={closeNoteModal} title={"Add Notes"} description={"Here you can create a notes"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <label className=' text-gray-400 text-sm'>Name</label>
                    <div className='flex flex-row'>
                        <input style={{
                            paddingRight: "50px"
                        }} type="text" placeholder='Enter your name' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setNoteName(e.target.value)} />
                    </div>
                    <br />
                    <label className=' text-gray-400 text-sm'>Note</label>
                    <div className='flex flex-row'>
                        <input style={{
                            paddingRight: "50px"
                        }} type="text" placeholder='Enter your note' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setNoteDescription(e.target.value)} />
                    </div>
                </div>
            </div>
            <button className={`bg-[#4E2357] text-white px-[5px] py-[5px] rounded-xl border-2 w-full mt-2 ${(noteName === "" || noteDescription === "") ? "opacity-30" : ""}`} onClick={() => {

                dispatch(postNotesAction({
                    name: noteName,
                    description: noteDescription
                }))

                setNoteName("");
                setNoteDescription("");

                closeNoteModal();
            }} disabled={noteName === "" || noteDescription === ""}> <small className='mx-2' >Add Note</small></button>
        </Modal>

        <Modal isOpen={addProvisionModalOpen} onClose={closeProvisionModal} title={"Add Provisions"} description={"Alternate provisions if the primary beneficiary is unable to inherit"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <label className=' text-gray-400 text-sm'>Type Provisions</label>
                    <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                        <select className='bg-[rgba(244,241,241,0.1)] w-full' name="client" id="client" onChange={(e) => setProvisionPurpose(e.target.value)} value={provisionPurpose}>
                            <option value={"Conditional Allocation:"}>Conditional Allocation:</option>
                        </select>
                    </div>
                    <hr />
                    <br />
                    <label className=' text-gray-400 text-sm'>Primary beneficiary (From whom)</label>
                    <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                        <select className='bg-[rgba(244,241,241,0.1)] w-full' name="client" id="client" onChange={(e) => setProvisionName(e.target.value)} value={provisionName}>
                            <option value={"Robert Jhonson"}>Robert Jhonson</option>
                        </select>
                    </div>
                    <br />
                    <label className=' text-gray-400 text-sm'>Will be distributed between</label>
                    <div className='flex'>{provisionAssociate.map((distributed, index) => <span className={`${(provisionDistribution.includes(distributed)) ? "bg-gray-100" : "bg-[rgba(11,11,11,0.1)]"} p-2 rounded-2xl w-[max-content] mt-2 mb-2 text-sm flex mr-3 cursor-pointer`} onClick={() => {
                        if (provisionDistribution.includes(distributed)) {
                            const ind = provisionDistribution.indexOf(distributed);
                            provisionDistribution.splice(ind, 1);
                            setProvisionDistribution([...provisionDistribution]);
                        } else {
                            provisionDistribution.push(distributed);
                            setProvisionDistribution([...provisionDistribution]);
                        }
                    }}>{distributed}</span>)}</div>
                    <hr />
                    <br />
                    <label className=' text-gray-400 text-sm'>Basic provisions of inheritance</label>
                    <div className='p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                        <textarea rows={"10"} type="text" placeholder='Enter provisions of inheritance' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setProvisionDescription(e.target.value)} value={provisionDescription} />
                    </div>
                </div>
            </div>
            <button className={`bg-[#4E2357] text-white px-[5px] py-[5px] rounded-xl border-2 w-full mt-2 ${(provisionDistribution.length === 0 || provisionDescription === "") ? "opacity-30" : ""}`} onClick={() => {
                dispatch(postProvisionAction({
                    provision: provisionName,
                    associates: provisionDistribution,
                    purpose: provisionPurpose,
                    description: provisionDescription
                }))

                setProvisionDistribution([]);
                setProvisionDescription("")

                closeProvisionModal();
            }} disabled={provisionDistribution.length === 0 || provisionDescription === ""}> <small className='mx-2' >Add Provision</small></button>
        </Modal>

    </div >

    return tab4Content;

}

export default Beneficiaries;