import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Modal from '../../../components/Modal';

const Beneficiaries = () => {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [provisions, setProvisions] = useState([]);
    const [notes, setNotes] = useState([]);
    const [james, setJames] = useState(true);
    const [maria, setMaria] = useState(false);
    const [search, setSearch] = useState("");

    const [addBeneficiariesModalOpen, setBeneficiariesModalOpen] = useState(false);
    const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
    const [addProvisionModalOpen, setAddProvisionModalOpen] = useState(false);

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

        setProvisions([
            {
                provision: 'Robert Jhonson',
                associates: ['Bob Jhonson', 'Julia Jhonson'],
                purpose: 'Conditional Allocation',
                description: 'Robert Morgan share is to be distributed equally among her children if she is not alive at the time of inheritance.'
            },
            {
                provision: 'All',
                associates: ['American Heart Association'],
                purpose: 'Charitable Donation',
                description: 'In the event that no primary beneficiaries are able to inherit, the remaining estate is to be donated to the American Heart Association.'
            },
            {
                provision: 'Julia Jhonson',
                associates: ['Bob Jhonson'],
                purpose: 'Trust Contingency',
                description: 'Should Julia Morgan be unable to fulfill her role as a beneficiary of the Family Trust, the benefits will pass to her brother, Bob Morgan.'
            }
        ])

        setNotes([
            {
                name: 'Advisor Adriano Macheti',
                createdAt: '26.02.24 19:28',
                description: 'Should Julia Jhonson be unable to fulfill her role as a beneficiary of the Family Trust, the benefits will pass to her brother, Bob Jhonson.'
            }
        ])
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


    const beneficiariesContent = (ben) => <div className='bg-[#F5F5F5] col-span-6 p-4 rounded-xl mt-4' style={{
        height: 'fit-content'
    }}>

        <div className='flex justify-between mb-1'>
            <p className='text-gray-400'>{ben.type}</p>
            <svg className='cursor-pointer mt-2' width="30" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" r="4" fill="#B9B9B9" />
                <circle cx="20" cy="4" r="4" fill="#B9B9B9" />
                <circle cx="36" cy="4" r="4" fill="#B9B9B9" />
            </svg>
        </div>

        <div className='flex justify-between pb-5'>

            <div>
                <h5 className="font-medium">{ben.name}</h5>
                <p>{ben.money}</p>
            </div>

            <div className='flex pr-14'>
                <div className='items flex pr-2'>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(11,11,11,0.1)',
                    }} className='ml-2 mr-3 mt-1'>
                    </div>
                    <p className='font-semibold'>{ben.email}</p>
                </div>

                <div className='items flex'>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(11,11,11,0.1)',
                    }} className='ml-2 mr-3 mt-1'>
                    </div>
                    <p className='font-semibold'>{ben.phone}</p>
                </div>

            </div>

        </div>

        <div>

            <div className='flex justify-between mb-5 pb-3 border-b-2 border-[lightgray]'>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400'>Real Estate:</p>
                    <p className='text-sm font-semibold'>{ben.realState}</p>
                </div>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400'>Fixed Amount:</p>
                    <p className='text-sm font-semibold'>{ben.fixedAmount}</p>
                </div>

            </div>

            <div className='flex justify-between mb-5 pb-3 border-b-2 border-[lightgray]'>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400'>Cash and Equivalents:</p>
                    <p className='text-sm font-semibold'>{ben.cashAndEquivalents}</p>
                </div>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400'>Percentage of Estate:</p>
                    <p className='text-sm font-semibold'>{ben.percentageOfEstate}</p>
                </div>

            </div>

            <div className='flex justify-between mb-5 pb-3 border-b-2 border-[lightgray]'>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400'>Liabilities:</p>
                    <p className='text-sm font-semibold'>{ben.liabilities}</p>
                </div>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400'>Percentage of Estate:</p>
                    <p className='text-sm font-semibold'>{ben.percentageOfEstate}</p>
                </div>

            </div>

            <div className='flex justify-between pb-3'>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400'>Cash and Equivalents:</p>
                    <p className='text-sm font-semibold'>{ben.specificAsset}</p>
                </div>

                <div className='flex'>
                    <p className='text-sm mr-1 text-gray-400'>Specific Asset</p>
                </div>

            </div>

        </div>

    </div>

    const notesContent = (note) => <div className='bg-[#F5F5F5] col-span-6 p-4 rounded-xl mt-4' style={{
        height: 'fit-content'
    }
    }>

        <div className='flex flex-col pb-1'>

            <div className='flex justify-between'>
                <div className='flex'>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(11,11,11,0.1)',
                    }} className='ml-2 mr-3 mt-1'>
                    </div>
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

            <p className='mt-4 ml-3'>{note.description}</p>

        </div>

    </div>

    const provinceContent = (province) => <div className='bg-[#F5F5F5] col-span-6 p-4 rounded-xl mt-4' style={{
        height: 'fit-content'
    }
    }>

        <div className='flex flex-col pb-1'>

            <div className='flex justify-between'>

                <div className='flex'>
                    <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl w-[max-content] mt-2 mb-2 text-sm font-semibold pl-3 pr-3'>
                        {province.provision}
                    </div>
                    <svg className='ml-2 mr-2 mt-4' width="20" height="16" viewBox="0 0 29 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28.7071 8.70711C29.0976 8.31658 29.0976 7.68342 28.7071 7.29289L22.3431 0.928932C21.9526 0.538408 21.3195 0.538408 20.9289 0.928932C20.5384 1.31946 20.5384 1.95262 20.9289 2.34315L26.5858 8L20.9289 13.6569C20.5384 14.0474 20.5384 14.6805 20.9289 15.0711C21.3195 15.4616 21.9526 15.4616 22.3431 15.0711L28.7071 8.70711ZM0 9H28V7H0V9Z" fill="black" />
                    </svg>
                    {province.associates.map((associate) => <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl w-[max-content] mt-2 mb-2 mr-3 text-sm font-semibold pl-3 pr-3'>
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
                    <svg className='mt-3' width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_410_23660)">
                            <circle cx="10" cy="10.5" r="10" fill="#D9D9D9" />
                            <path opacity="0.5" d="M9.22816 14.5V7.95455H10.7708V14.5H9.22816ZM10.0037 7.02557C9.75941 7.02557 9.54918 6.9446 9.37305 6.78267C9.19691 6.6179 9.10884 6.42045 9.10884 6.19034C9.10884 5.95739 9.19691 5.75994 9.37305 5.59801C9.54918 5.43324 9.75941 5.35085 10.0037 5.35085C10.2509 5.35085 10.4611 5.43324 10.6344 5.59801C10.8105 5.75994 10.8986 5.95739 10.8986 6.19034C10.8986 6.42045 10.8105 6.6179 10.6344 6.78267C10.4611 6.9446 10.2509 7.02557 10.0037 7.02557Z" fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_410_23660">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                <p className='text-gray-400 text-sm pb-5'>Last Updated 10/17/23 2:39:42 PM</p>
            </div>

            <div>

                <label className='pr-3 mt-3 mr-5'>First Death</label>
                <div className="tri-state-toggle mr-14">
                    <button
                        className={`tri-state-toggle-button${james ? '-active' : ''}`}
                        id="toggle-button1"
                        onClick={() => {
                            setJames(true);
                            setMaria(false);
                        }}
                    >
                        James
                    </button>
                    <button
                        className={`tri-state-toggle-button${maria ? '-active' : ''}`}
                        id="toggle-button2"
                        onClick={() => {
                            setJames(false);
                            setMaria(true);
                        }}
                    >
                        Maria
                    </button>
                </div>

                <button className='bg-[lightgray] rounded-xl border-2 h-[35px]' onClick={() => setBeneficiariesModalOpen(true)}> <small className='mx-2 text-black' >Add Beneficiary</small></button>

            </div>

        </div>

        <div className='flex justify-between'>
            <div className='w-[93%]'>
                <div style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(11,11,11,0.1)',
                    marginLeft: "10px",
                    position: "absolute"
                }} className=' mr-2 mt-[10px]'>
                </div>
                <input style={{
                    paddingLeft: "40px"
                }} type="text" placeholder='Search Beneficiaries' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' onChange={(e) => setSearch(e.target.value)} value={search} />
            </div>

            <div className='w-[7%] ml-3'>
                <button className='bg-[lightgray] rounded-xl border-2 h-[35px] w-full'>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(11,11,11,0.1)',
                        marginLeft: "10px",
                        position: "absolute"
                    }} className=' mr-2 mt-1'>
                    </div> <small className='mx-2 text-black ml-5'>Filter</small></button>
            </div>

        </div>

        <div style={{
            display: 'flex'
        }}>

            <div className='w-[100%] ml-4'>
                {
                    beneficiaries.map((ben, index) => {
                        return beneficiariesContent(ben, index);
                    })
                }
            </div>

        </div>

        <div className='flex justify-between mt-8'>

            <div className='flex flex-col'>

                <div className='flex'>
                    <h4 className="pb-3 font-medium pr-2">Alternate provisions</h4>
                </div>
            </div>

            <div>
                <button className='bg-[lightgray] rounded-xl border-2 h-[35px]' onClick={() => setAddProvisionModalOpen(true)}> <small className='mx-2 text-black' >Add Provisions</small></button>
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

        <div className='flex justify-between mt-8'>

            <div className='flex flex-col'>

                <div className='flex'>
                    <h4 className="pb-3 font-medium pr-2">Notes</h4>
                </div>
            </div>

            <div>
                <button className='bg-[lightgray] rounded-xl border-2 h-[35px]' onClick={() => setAddNoteModalOpen(true)}> <small className='mx-2 text-black' >Add Notes</small></button>
            </div>

        </div>

        <div style={{
            display: 'flex'
        }}>

            <div className='w-[100%] ml-4'>
                {
                    notes.map((note, index) => {
                        return notesContent(note, index);
                    })
                }
            </div>

        </div>

        <Modal isOpen={addBeneficiariesModalOpen} onClose={closeBeneficiariesModal}>
            <div className='flex'>

                <div>
                    <div>
                        <h4 className='text-center font-medium mb-1'>Add Beneficiaries</h4>
                        <br />
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
                        <label className=' text-gray-400 text-sm'>Type</label>
                        <div className='flex flex-row'>
                            <select id="depart" className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100'>
                                <option value="advisor">Advisor</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="12" fill="#D9D9D9" />
                            <path opacity="0.25" d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="black" stroke-width="2" />
                        </svg>
                        <p>Add another Allocation</p>
                    </div>
                </div>
                <br />
                <div className='cursor-pointer' onClick={closeBeneficiariesModal}>
                    <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.25" d="M1.5 1.5L10.75 10.75M20 20L10.75 10.75M10.75 10.75L20 1.5L1.5 20" stroke="black" stroke-width="2" />
                    </svg>
                </div>
            </div>
            <button className='bg-[#D0D0D0] px-[5px] py-[5px] rounded-xl border-2 w-full' onClick={closeBeneficiariesModal}> <small className='mx-2 text-black' >Close</small></button>
        </Modal>

        <Modal isOpen={addNoteModalOpen} onClose={closeNoteModal}>
            <div className='flex'>
                <div>
                    <h4 className='text-center font-medium mb-1'>Add Note</h4>
                    <br />
                    <label className=' text-gray-400 text-sm'>Name</label>
                    <div className='flex flex-row'>
                        <input style={{
                            paddingRight: "50px"
                        }} type="text" placeholder='Enter your name' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' />
                    </div>
                    <br />
                    <label className=' text-gray-400 text-sm'>Note</label>
                    <div className='flex flex-row'>
                        <input style={{
                            paddingRight: "50px"
                        }} type="text" placeholder='Enter your note' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' />
                    </div>
                </div>
                <div className='cursor-pointer' onClick={closeNoteModal}>
                    <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.25" d="M1.5 1.5L10.75 10.75M20 20L10.75 10.75M10.75 10.75L20 1.5L1.5 20" stroke="black" stroke-width="2" />
                    </svg>
                </div>
            </div>
            <button className='bg-[#D0D0D0] px-[5px] py-[5px] rounded-xl border-2 w-full' onClick={closeNoteModal}> <small className='mx-2 text-black' >Close</small></button>
        </Modal>

        <Modal isOpen={addProvisionModalOpen} onClose={closeProvisionModal}>
            <div className='flex'>
                <div>
                    <h4 className='text-center font-medium mb-1'>Add Provisions</h4>
                    <p className='text-center text-sm text-gray-400'>Alternate provisions if the primary beneficiary is unable to inherit</p>
                    <br />
                    <label className=' text-gray-400 text-sm'>Type Provisions</label>
                    <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                        <select className='bg-[rgba(244,241,241,0.1)] w-full' name="client" id="client">
                            <option value={"Conditional Allocation:"}>Conditional Allocation:</option>
                        </select>
                    </div>
                    <hr />
                    <br />
                    <label className=' text-gray-400 text-sm'>Primary beneficiary (From whom)</label>
                    <div className='bg-[rgba(11,11,11,0.1)] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                        <select className='bg-[rgba(244,241,241,0.1)] w-full' name="client" id="client">
                            <option value={"Robert Jhonson"}>Robert Jhonson</option>
                        </select>
                    </div>
                    <br />
                    <label className=' text-gray-400 text-sm'>Will be distributed between</label>
                    <div className='flex'>{["Maria Jhonson", "Bob Jhonson", "Julia Jhonson"].map((distributed) => <span className={`${distributed === "Maria Jhonson" ? "bg-gray-100" : "bg-[rgba(11,11,11,0.1)]"} p-2 rounded-2xl w-[max-content] mt-2 mb-2 text-sm flex mr-3 cursor-pointer`}>{distributed}</span>)}</div>
                    <hr />
                    <br />
                    <label className=' text-gray-400 text-sm'>Basic provisions of inheritance</label>
                    <div className='p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                        <textarea rows={"10"} type="text" placeholder='Enter provisions of inheritance' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' />
                    </div>
                </div>
                <div className='cursor-pointer' onClick={closeProvisionModal}>
                    <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.25" d="M1.5 1.5L10.75 10.75M20 20L10.75 10.75M10.75 10.75L20 1.5L1.5 20" stroke="black" stroke-width="2" />
                    </svg>
                </div>
            </div>
            <button className='bg-[#D0D0D0] px-[5px] py-[5px] rounded-xl border-2 w-full mt-2' onClick={closeProvisionModal}> <small className='mx-2 text-black' >Add Provision</small></button>
        </Modal>

    </div>

    return tab4Content;

}

export default Beneficiaries;