import React, { useEffect, useState } from 'react';
import { Popover } from 'antd';
import Modal from '../../../components/Modal';

const Fiduciaries = () => {
    const [fiducuaries, setFiducuaries] = useState([]);
    const [detailKey, setDetailKey] = useState(-1);
    const [editKey, setEditKey] = useState(-1);

    // Edit Operation States
    const [fiducuarieName, setFiducuarieName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [fiducuarieDuties, setFiducuarieDuties] = useState(null);
    const [assetsManaged, setAssetsManaged] = useState(null);
    const [complianceObligations, setComplianceObligations] = useState(null);
    const [notes, setNotes] = useState(null);
    const [successorName, setSuccessorName] = useState(null);
    const [successorEmail, setSuccessorEmail] = useState(null);
    const [successorPhone, setSuccessorPhone] = useState(null);

    const [addFiducuarieModalOpen, setFiducuarieModalOpen] = useState(false);

    useEffect(() => {
        setFiducuarieName(null);
        setEmail(null);
        setPhone(null);
        setFiducuarieDuties(null);
        setAssetsManaged(null);
        setComplianceObligations(null);
        setNotes(null);
        setSuccessorName(null);
        setSuccessorEmail(null);
        setSuccessorPhone(null);
    }, [editKey]);

    useEffect(() => {
        setFiducuaries([
            {
                id: 0,
                name: "Alexander Jhonson",
                role: "Executor",
                relationship: "Spouse",
                email: "douglasleonard@gmail.com",
                phone: "+1 (123) 456-7891",
                details: {
                    duties: "Managing specific assets, ensuring tax compliance, distributing assets to ben",
                    assets: "Real estate properties, investment accounts, family businesses, specific trust funds.",
                    compliance: "Annual tax filings, updating trust documents, notifying beneficiaries, filing legal documents related to probate.",
                    successor: {
                        name: "Michael Jackson",
                        role: "Executor",
                        relationship: "Spouse",
                        email: "douglasleonard@gmail.com",
                        phone: "+1 (123) 456-7891",
                        associated: ["HIPAA Authorization", "Revocable Trust", "Revocable Living Trust"]
                    },
                    notes: "Lorem ipsum dolor sit amet consectetur. In lobortis blandit orci porttitor sit. Diam urna molestie lorem eget tellus molestie morbi. Egestas tortor quam commodo sit ipsum in dignissim. Elit eu purus accumsan lorem urna non purus pellentesque. (Recommended X Attorney to manage the affairs to client)",

                }
            },
            {
                id: 1,
                name: "Erl Veshedsky",
                role: "Executor",
                relationship: "Spouse",
                email: "douglasleonard@gmail.com",
                phone: "+1 (123) 456-7891"
            },
            {
                id: 2,
                name: "Marci Zweifel",
                role: "Executor",
                relationship: "Spouse",
                email: "douglasleonard@gmail.com",
                phone: "+1 (123) 456-7891"
            },
            {
                id: 3,
                name: "Bill Carleton",
                role: "Executor",
                relationship: "Spouse",
                email: "douglasleonard@gmail.com",
                phone: "+1 (123) 456-7891"
            },
            {
                id: 4,
                name: "Audrie Harting",
                role: "Executor",
                relationship: "Spouse",
                email: "douglasleonard@gmail.com",
                phone: "+1 (123) 456-7891"
            },
            {
                id: 5,
                name: "Ceciley Putty",
                role: "Executor",
                relationship: "Spouse",
                email: "douglasleonard@gmail.com",
                phone: "+1 (123) 456-7891"
            },
            {
                id: 6,
                name: "Ishmael Miyamura",
                role: "Executor",
                relationship: "Spouse",
                email: "douglasleonard@gmail.com",
                phone: "+1 (123) 456-7891"
            },
            {
                id: 7,
                name: "Debbi Kiely",
                role: "Executor",
                relationship: "Spouse",
                email: "douglasleonard@gmail.com",
                phone: "+1 (123) 456-7891"
            },
            {
                id: 8,
                name: "Katherine Fernstrom",
                role: "Executor",
                relationship: "Spouse",
                email: "douglasleonard@gmail.com",
                phone: "+1 (123) 456-7891"
            },
            {
                id: 9,
                name: "Renell Handing",
                role: "Executor",
                relationship: "Spouse",
                email: "douglasleonard@gmail.com",
                phone: "+1 (123) 456-7891"
            }
        ]
        );
    }, []);

    const closeFiducuarieModal = () => {
        setFiducuarieModalOpen(false);
    };

    const calculateInputHeight = (value) => {
        const lineHeight = 16; // You can adjust this value based on your design
        const minRows = 2; // Minimum number of rows

        let currentRows;
        if (value?.length) {
            currentRows = Math.max(minRows, Math.ceil(value?.length / 50)); // Adjust the division factor based on your design
        } else {
            currentRows = 2;
        }
        return `${lineHeight * currentRows}px`;
    };

    const content = (index) => <div>
        <button className='bg-[lightgray] rounded-xl border-2 h-[35px]'
            onClick={() => {
                fiducuaries.splice(index, 1);
                setFiducuaries([...fiducuaries]);
            }}> <small className='mx-2 text-black' >Yes</small></button>
    </div>

    const fidContent = (fid, index) => <div className='bg-[#F5F5F5] col-span-6 p-4 rounded-xl mt-4' style={{
        height: 'fit-content'
    }}>

        <div className='flex justify-between pb-5'>
            {editKey != fid.id && <h5 className="font-medium">{fid.name}</h5>}
            {editKey === fid.id && <div className='pb-3 grid grid-cols-12'>
                <p className='font-semibold text-sm col-span-12'>Fiducuarie name</p>
            </div>
            }

            <div className='flex'>
                <div className='items flex cursor-pointer pr-2' onClick={() => {
                    if (editKey === -1) { setDetailKey(fid.id); setEditKey(fid.id) }
                    else setEditKey(-1);
                }}>
                    {editKey === fid.id ? <p>Save</p> : <p>Edit</p>}
                    <div style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(11,11,11,0.1)',
                    }} className='ml-2 mr-3 mt-1'>
                    </div>
                </div>
                {
                    editKey != fid.id && <Popover content={content(index)} title="Are you sure?" trigger="click">
                        <div className='items flex cursor-pointer'>
                            <p>Delete</p>
                            <div style={{
                                width: '15px',
                                height: '15px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(11,11,11,0.1)',
                            }} className='ml-2 mt-1'>
                            </div>
                        </div>
                    </Popover>
                }
                {
                    editKey === fid.id && <div className='items flex cursor-pointer' onClick={() => {
                        if (editKey > -1) setEditKey(-1);
                    }}
                    >
                        <p>Cancel</p>
                        <div style={{
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(11,11,11,0.1)',
                        }} className='ml-2 mt-1'>
                        </div>
                    </div>
                }
            </div>
        </div>

        {
            editKey === fid.id && <div className='pb-3 grid grid-cols-12'>
                <input type="text" placeholder='Enter fiducuarie name' className='mt-[-20px] border-b-2 border-[#cdcdcd] text-black outline-none mb-4 bg-[#F5F5F5] w-full col-span-12' value={fiducuarieName != null ? fiducuarieName : fid?.name} onChange={(e) => setFiducuarieName(e.target.value)} />
            </div>
        }

        {
            editKey !== fid.id && <div>
                <div className='grid grid-cols-12 grid-row pb-3'>
                    <p className='font-semibold text-sm col-span-2'>Role</p>
                    <p className='font-semibold text-sm col-span-3'>Relationship</p>
                    <p className='font-semibold text-sm col-span-4'>Email</p>
                    <p className='font-semibold text-sm col-span-3'>Phone Number</p>
                </div>

                <div className='grid grid-cols-12 border-b-2 border-[lightgray] pb-3'>
                    <p className='font-semibold text-sm col-span-2'>{fid.role}</p>
                    <p className='font-semibold text-sm col-span-3'>{fid.relationship}</p>
                    <p className='text-sm break-words col-span-4'>{fid.email}</p>
                    <p className='text-sm col-span-3'>{fid.phone}</p>
                </div>
            </div>
        }

        {
            editKey === fid.id && <div>
                <div className='grid grid-cols-12 grid-row pb-3'>
                    <p className='font-semibold text-sm col-span-6'>Roles</p>
                    <p className='font-semibold text-sm col-span-6'>Relationship</p>
                </div>

                <div className='grid grid-cols-12 pb-3'>
                    <div className='bg-[#F5F5F5] col-span-6 border-b-2 border-[#cdcdcd] text-black w-[90%]'>
                        <select className='bg-[#F5F5F5] w-full ml-[-5px]' name="role" id="role" value={fid?.role}>
                            <option value={fid?.role}>{fid?.role}</option>)
                        </select>
                    </div>
                    <div className='bg-[#F5F5F5] col-span-6 border-b-2 border-[#cdcdcd] text-black'>
                        <select className='bg-[#F5F5F5] w-full ml-[-5px]' name="relationship" id="relationship" value={fid?.relationship}>
                            <option value={fid?.relationship}>{fid?.relationship}</option>)
                        </select>
                    </div>
                </div>

                <div className='grid grid-cols-12 grid-row pb-3 pt-3'>
                    <p className='font-semibold text-sm col-span-6'>Email</p>
                    <p className='font-semibold text-sm col-span-6'>Phone Number</p>
                </div>

                <div className='grid grid-cols-12 pb-3'>
                    <input type="text" placeholder='Enter your email' className='border-b-2 border-[#cdcdcd] text-black outline-none mb-4 bg-[#F5F5F5] w-[90%] col-span-6' value={email != null ? email : fid?.email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder='Enter your phone' className='border-b-2 border-[#cdcdcd] text-black outline-none mb-4 bg-[#F5F5F5] w-full col-span-6' value={phone != null ? phone : fid?.phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
            </div>
        }

        {
            detailKey === fid.id && editKey === -1 && <div id="view-more-information">

                <div className='grid grid-cols-12 grid-row pb-3 pt-3 border-b-2 border-[lightgray]'>
                    <p className='font-semibold text-sm col-span-12 mb-2'>Fiduciary Duties</p>
                    <p className='text-sm break-words col-span-12 mb-2'>{fid?.details?.duties}</p>
                </div>

                <div className='grid grid-cols-12 grid-row pb-3 pt-3 border-b-2 border-[lightgray]'>
                    <p className='font-semibold text-sm col-span-12 mb-2'>Assets Managed</p>
                    <p className='text-sm break-words col-span-12 mb-2'>{fid?.details?.assets}</p>
                </div>


                <div className='grid grid-cols-12 grid-row pb-3 pt-3 border-b-2 border-[lightgray]'>
                    <p className='font-semibold text-sm col-span-12 mb-2'>Compliance obligations</p>
                    <p className='text-sm break-words col-span-12 mb-2'>{fid?.details?.compliance}</p>
                </div>

                <div className='grid grid-cols-12 grid-row pb-3 pt-3 border-b-2 border-[lightgray]'>
                    <p className='font-semibold text-sm col-span-12 mb-2'>Successor</p>
                    <div className='text-sm col-span-12 mb-2'>

                        <div className='p-5 bg-[white] rounded-xl'>

                            <h5 className="font-medium mb-5">{fid?.details?.successor?.name}</h5>

                            <div>

                                <div className='grid grid-cols-12 grid-row pb-3'>
                                    <p className='font-semibold text-sm col-span-2'>Role</p>
                                    <p className='font-semibold text-sm col-span-3'>Relationship</p>
                                    <p className='font-semibold text-sm col-span-4'>Email</p>
                                    <p className='font-semibold text-sm col-span-3'>Phone Number</p>
                                </div>

                                <div className='grid grid-cols-12 border-b-2 border-[lightgray] pb-3'>
                                    <p className='font-semibold text-sm col-span-2'>{fid?.details?.successor?.role}</p>
                                    <p className='font-semibold text-sm col-span-3'>{fid?.details?.successor?.relationship}</p>
                                    <p className='text-sm break-words col-span-4'>{fid?.details?.successor?.email}</p>
                                    <p className='text-sm col-span-3'>{fid?.details?.successor?.phone}</p>
                                </div>

                                <div className='grid grid-cols-12 grid-row pb-3 pt-3'>
                                    <p className='font-semibold text-sm col-span-12'>Associated with</p>
                                    {fid?.details?.successor?.associated.map((name) => <p className='text-sm col-span-12 mt-3'>{name}</p>)}
                                </div>

                            </div>

                        </div>


                    </div>

                </div>

                <div className='grid grid-cols-12 grid-row pb-3 pt-3 border-b-2 border-[lightgray]'>
                    <p className='font-semibold text-sm col-span-12 mb-2'>Notes</p>
                    <p className='text-sm break-words col-span-12 mb-2'>{fid?.details?.notes}</p>
                </div>

            </div>
        }

        {
            editKey === fid.id && <div id="view-more-information-edit">

                <div className='grid grid-cols-12 grid-row pb-3 pt-3'>
                    <p className='font-semibold text-sm col-span-12 mb-2'>Fiduciary Duties</p>
                    <textarea type="text" style={{ height: calculateInputHeight(fiducuarieDuties != null ? fiducuarieDuties : fid?.details?.duties) }} placeholder='Enter your fiducuarie duties' className='resize-none border-b-2 border-[#cdcdcd] text-black outline-none mb-4 bg-[#F5F5F5] w-full col-span-12' value={fiducuarieDuties != null ? fiducuarieDuties : fid?.details?.duties} onChange={(e) => setFiducuarieDuties(e.target.value)} />
                </div>

                <div className='grid grid-cols-12 grid-row pb-3 pt-3'>
                    <p className='font-semibold text-sm col-span-12 mb-2'>Assets Managed</p>
                    <textarea type="text" style={{ height: calculateInputHeight(assetsManaged != null ? assetsManaged : fid?.details?.assets) }} placeholder='Enter your managed assets' className='resize-none border-b-2 border-[#cdcdcd] text-black outline-none mb-4 bg-[#F5F5F5] w-full col-span-12' value={assetsManaged != null ? assetsManaged : fid?.details?.assets} onChange={(e) => setAssetsManaged(e.target.value)} />
                </div>


                <div className='grid grid-cols-12 grid-row pb-3 pt-3'>
                    <p className='font-semibold text-sm col-span-12 mb-2'>Compliance obligations</p>
                    <textarea type="text" style={{ height: calculateInputHeight(complianceObligations != null ? complianceObligations : fid?.details?.compliance) }} placeholder='Enter your compliance obligations' className='resize-none border-b-2 border-[#cdcdcd] text-black outline-none mb-4 bg-[#F5F5F5] w-full col-span-12' value={complianceObligations != null ? complianceObligations : fid?.details?.compliance} onChange={(e) => setComplianceObligations(e.target.value)} />
                </div>

                <div className='grid grid-cols-12 grid-row pb-3 pt-3'>
                    <p className='font-semibold text-sm col-span-12 mb-2'>Successor</p>
                    <div className='text-sm col-span-12 mb-2'>

                        <div className='p-5 bg-[#FBFBFB] rounded-xl'>

                            <div className='pb-3 grid grid-cols-12'>
                                <p className='font-semibold text-sm col-span-12 pb-3'>Fiducuarie name</p>
                                <input type="text" placeholder='Enter successor name' className='border-b-2 border-[#cdcdcd] text-black outline-none mb-4 bg-[#FBFBFB] w-full col-span-12' value={successorName != null ? successorName : fid?.details?.successor?.name} onChange={(e) => setSuccessorName(e.target.value)} />
                            </div>

                            <div>

                                <div className='grid grid-cols-12 grid-row pb-3'>
                                    <p className='font-semibold text-sm col-span-6'>Roles</p>
                                    <p className='font-semibold text-sm col-span-6'>Relationship</p>
                                </div>

                                <div className='grid grid-cols-12 pb-3'>
                                    <div className='bg-[#FBFBFB] col-span-6 border-b-2 border-[#cdcdcd] text-black w-[90%]'>
                                        <select className='bg-[#FBFBFB] w-full ml-[-5px]' name="role" id="role" value={fid?.details?.successor?.role}>
                                            <option value={fid?.details?.successor?.role}>{fid?.details?.successor?.role}</option>)
                                        </select>
                                    </div>
                                    <div className='bg-[#FBFBFB] col-span-6 border-b-2 border-[#cdcdcd] text-black'>
                                        <select className='bg-[#FBFBFB] w-full ml-[-5px]' name="relationship" id="relationship" value={fid?.details?.successor?.relationship}>
                                            <option value={fid?.details?.successor?.relationship}>{fid?.details?.successor?.relationship}</option>)
                                        </select>
                                    </div>
                                </div>

                                <div className='grid grid-cols-12 grid-row pb-3 pt-3'>
                                    <p className='font-semibold text-sm col-span-6'>Email</p>
                                    <p className='font-semibold text-sm col-span-6'>Phone Number</p>
                                </div>

                                <div className='grid grid-cols-12 pb-3'>
                                    <input type="text" placeholder='Enter your successor email' className='border-b-2 border-[#cdcdcd] text-black outline-none mb-4 bg-[#FBFBFB] w-[90%] col-span-6' value={successorEmail != null ? successorEmail : fid?.details?.successor?.email} onChange={(e) => setSuccessorEmail(e.target.value)} />
                                    <input type="text" placeholder='Enter your successor phone' className='border-b-2 border-[#cdcdcd] text-black outline-none mb-4 bg-[#FBFBFB] w-full col-span-6' value={successorPhone != null ? successorPhone : fid?.details?.successor?.phone} onChange={(e) => setSuccessorPhone(e.target.value)} />
                                </div>

                                <div className='grid grid-cols-12 grid-row pb-3 pt-3'>
                                    <p className='font-semibold text-sm col-span-12'>Associated with</p>
                                    {fid?.details?.successor?.associated.map((name, index) => <div className={`col-span-12 ${index === 0 ? '' : "flex"}`}>
                                        <div className={`bg-[#FBFBFB] border-b-2 border-[#cdcdcd] text-black w-[${index === 0 ? "100%" : "95%"}] mt-6 col-span-8`}>
                                            <select className='bg-[#FBFBFB] w-full ml-[-5px]' name="associate" id="associate" value={name}>
                                                <option value={name}>{name}</option>)
                                            </select>
                                        </div>
                                        {
                                            index > 0 && <svg className='cursor-pointer col-span-2 mt-6 ml-2' width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="12" fill="#D9D9D9" />
                                                <path opacity="0.25" d="M7.5 6.75L12.375 12M17.25 17.25L12.375 12M12.375 12L17.25 6.75L7.5 17.25" stroke="black" stroke-width="1.5" />
                                            </svg>
                                        }
                                    </div>
                                    )}
                                </div>

                            </div>

                        </div>


                    </div>

                </div>

                <div className='grid grid-cols-12 grid-row pb-3 pt-3'>
                    <p className='font-semibold text-sm col-span-12 mb-2'>Notes</p>
                    <textarea type="text" style={{ height: calculateInputHeight(notes != null ? notes : fid?.details?.notes) }} placeholder='Enter your notes' className='resize-none border-b-2 border-[#cdcdcd] text-black outline-none mb-4 bg-[#F5F5F5] w-full col-span-12' value={notes != null ? notes : fid?.details?.notes} onChange={(e) => setNotes(e.target.value)} />
                </div>

            </div>
        }

        {
            detailKey === fid.id && editKey === -1 && <div className='flex pt-3 cursor-pointer' onClick={() => setDetailKey(-1)}>
                <p className='text-sm mr-2'>Hide</p>
                <svg className='mt-[5px]' width="10" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7L6.5 1L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </div>
        }

        {
            detailKey != fid.id && <div div className='flex pt-3 cursor-pointer' onClick={() => setDetailKey(fid.id)}>
                <p className='text-sm mr-2'>View more information</p>
                <svg className='mt-[5px]' width="10" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6.5 7L12 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        }

    </div >

    const tab5Content = <div>

        <div className='flex justify-between'>

            <div className='flex flex-col'>

                <div className='flex'>
                    <h4 className="pb-3 font-medium pr-2">Fiducuaries</h4>
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

            <button className='bg-[lightgray] rounded-xl border-2 h-[35px]' onClick={() => setFiducuarieModalOpen(true)}> <small className='mx-2 text-black' >Add Fiducuarie</small></button>

        </div>

        <div style={{
            display: 'flex'
        }}>

            <div className='w-[50%] ml-4'>
                {
                    fiducuaries.slice(0, Math.floor((fiducuaries.length - 1) / 2)).map((fid, index) => {
                        return fidContent(fid, index);
                    })
                }
            </div>

            <div className='w-[50%] ml-4'>
                {
                    fiducuaries.slice(Math.floor((fiducuaries.length - 1) / 2)).map((fid, index) => {
                        return fidContent(fid, index);
                    })
                }
            </div>

        </div>

        <Modal isOpen={addFiducuarieModalOpen} onClose={closeFiducuarieModal}>
            <div className='flex'>
                <div>
                    <h4 className='text-center font-medium mb-1'>Add Fiducuarie</h4>
                    <br />
                    <label className=' text-gray-400 text-sm'>Fiducuarie Name</label>
                    <div className='flex flex-row'>
                        <input style={{
                            paddingRight: "50px"
                        }} type="text" placeholder='Enter your fiducuarie name' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' value={fiducuarieName} />
                    </div>
                </div>
                <div className='cursor-pointer' onClick={closeFiducuarieModal}>
                    <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.25" d="M1.5 1.5L10.75 10.75M20 20L10.75 10.75M10.75 10.75L20 1.5L1.5 20" stroke="black" stroke-width="2" />
                    </svg>
                </div>
            </div>
            <button className='bg-[#D0D0D0] px-[5px] py-[5px] rounded-xl border-2 w-full' onClick={closeFiducuarieModal}> <small className='mx-2 text-black' >Close</small></button>
        </Modal>

    </div>

    return tab5Content;

}

export default Fiduciaries;