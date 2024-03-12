import React, { useEffect, useState } from 'react';
import { Popover } from 'antd';
import Modal from '../../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
    getFidAction,
    postFidAction,
    deleteFidAction,
    editFidAction
} from '../../../redux/dashboard/action';
import CONSTANT from '../../../data/constant';

const Fiduciaries = () => {
    const myState = useSelector((state) => state.dashboard);
    const dispatch = useDispatch();

    const [fiducuaries, setFiducuaries] = useState([]);
    const [detailKey, setDetailKey] = useState(-1);
    const [editKey, setEditKey] = useState(null);

    // Edit Operation States
    const [fiducuarieName, setFiducuarieName] = useState(null);
    const [role, setRole] = useState("role");
    const [relationship, setRelationship] = useState(CONSTANT.relationship[0]);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [fiducuarieDuties, setFiducuarieDuties] = useState(null);
    const [assetsManaged, setAssetsManaged] = useState(null);
    const [complianceObligations, setComplianceObligations] = useState(null);
    const [notes, setNotes] = useState(null);
    const [successorName, setSuccessorName] = useState(null);
    const [successorEmail, setSuccessorEmail] = useState(null);
    const [successorPhone, setSuccessorPhone] = useState(null);
    const [successorRole, setSuccessorRole] = useState("role");
    const [successorRelationship, setSuccessorRelationship] = useState("relationship");
    const [successorAssociates, setSuccessorAssociates] = useState(["abc"]);
    const [fiduciarieButton, setFiducuarieButton] = useState(true);
    const [successorButton, setSuccessorButton] = useState(true);
    const [addFiducuarieModalOpen, setFiducuarieModalOpen] = useState(false);
    const [addSuccessorModalOpen, setAddSuccessorModalOpen] = useState(false);
    const [viewMoreSuccessor, setViewMoreSuccessor] = useState(false);
    const [viewMoreSuccessorInternal, setViewMoreSuccessorInternal] = useState(false);

    // useEffect(() => {
    //     setFiducuarieName(null);
    //     setEmail(null);
    //     setPhone(null);
    //     setFiducuarieDuties(null);
    //     setAssetsManaged(null);
    //     setComplianceObligations(null);
    //     setNotes(null);
    //     setSuccessorName(null);
    //     setSuccessorEmail(null);
    //     setSuccessorPhone(null);
    // }, [editKey]);

    useEffect(() => {

        if (fiducuarieName &&
            role &&
            relationship &&
            email &&
            phone &&
            fiducuarieDuties &&
            assetsManaged &&
            complianceObligations &&
            notes &&
            !successorButton) {
            setFiducuarieButton(false);
        }
        else {
            setFiducuarieButton(true);
        }
    }, [fiducuarieName,
        role,
        relationship,
        email,
        phone,
        fiducuarieDuties,
        assetsManaged,
        complianceObligations,
        notes,
        successorButton])

    useEffect(() => {
        if (successorName &&
            successorEmail &&
            successorPhone &&
            successorRelationship &&
            successorRole) {
            setSuccessorButton(false);
        }
        else {
            setSuccessorButton(true);
        }
    }, [
        successorName,
        successorEmail,
        successorPhone,
        successorRelationship,
        successorRole
    ])

    useEffect(() => {
        console.log(myState);
        if (myState.fiduciaries) {
            const fid = myState.fiduciaries.map(function (fid, index) {
                return {
                    id: fid.id,
                    name: fid.name,
                    role: fid.role,
                    relationship: fid.relationship,
                    email: fid.email,
                    phone: fid.phoneNumber,
                    successorId: fid.successorId,
                    details: {
                        duties: fid.duties,
                        assets: fid.assetManaged,
                        compliance: fid.complianceObligation,
                        successor: {
                            name: fid.successor.name,
                            role: fid.successor.role,
                            relationship: fid.successor.relationship,
                            email: fid.successor.email,
                            phone: fid.successor.phoneNumber,
                            associated: fid.successor.associate
                        },
                        notes: fid.notes,

                    },

                    createdAt: moment(fid.createdAt).format('YY.MM.DD HH:mm'),
                }
            })
            setFiducuaries([...fid]);
        }
    }, [myState])

    useEffect(() => {
        dispatch(getFidAction())
    }, []);

    const closeFiducuarieModal = () => {
        setFiducuarieModalOpen(false);
    };

    const closeSuccessorModal = () => {
        setAddSuccessorModalOpen(false);
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

    const content = (fid, index) => <div>
        <button className='bg-[lightgray] rounded-xl border-2 h-[35px]'
            onClick={() => {
                dispatch(deleteFidAction({
                    fidId: fid.id
                }))
                fiducuaries.splice(index, 1);
                setFiducuaries([...fiducuaries]);
            }}> <small className='mx-2 text-black' >Yes</small></button>
    </div>

    const editDeleteContent = (fid, index) => <div>
        <div className='items flex cursor-pointer pr-2 p-2' onClick={() => {
            if (!editKey) {

                setDetailKey(fid.id);
                setEditKey(fid.id);
                setFiducuarieName(fid.name);
                setRole(fid.role);
                setEmail(fid.email);
                setPhone(fid.phone);
                setFiducuarieDuties(fid.details.duties);
                setAssetsManaged(fid.details.assets);
                setComplianceObligations(fid.details.compliance);
                setSuccessorName(fid.details.successor.name);
                setSuccessorEmail(fid.details.successor.email);
                setSuccessorRole(fid.details.successor.role);
                setSuccessorRelationship(fid.details.successor.relationship);
                setSuccessorPhone(fid.details.successor.phone);
                setSuccessorAssociates(fid.details.successor.associated);
                setNotes(fid.details.notes);

            }
            else {
                dispatch(editFidAction({
                    name: fiducuarieName,
                    role: role,
                    relationship: relationship,
                    email: email,
                    phoneNumber: phone,
                    duties: fiducuarieDuties,
                    assetManaged: assetsManaged,
                    complianceObligation: complianceObligations,
                    notes: notes,
                    fidId: fid.id,
                    successorId: fid.successorId,
                    successor: !successorButton ? {
                        name: successorName,
                        email: successorEmail,
                        phone: successorPhone,
                        role: successorRole,
                        relationship: successorRelationship,
                        associates: successorAssociates
                    } : null
                }))

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

                setEditKey(null);
            }
        }}>
            <div style={{
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                backgroundColor: 'rgba(11,11,11,0.1)',
            }} className='mt-2'>
                {editKey === fid.id ? <p className='ml-6 mt-[-3px]'>Save</p> : <p className='ml-6 mt-[-3px]'>Edit</p>}
            </div>
        </div>
        {
            editKey != fid.id && <Popover content={content(fid, index)} title="Are you sure?" trigger="click">
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
        {
            editKey === fid.id && <div className='items flex cursor-pointer p-2' onClick={() => {
                if (editKey) setEditKey(null);
            }}
            >
                <div style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(11,11,11,0.1)',
                }} className='mt-2'>
                    <p className='ml-6 mt-[-3px]'>Cancel</p>
                </div>
            </div>
        }
    </div>

    const fidContent = (fid, index) => <div className='bg-[#FFFDFF] col-span-6 p-4 rounded-xl mt-4 border-[1px] border-color-[lightgray]' style={{
        height: 'fit-content'
    }}>

        <div className='flex justify-between pb-5 border-b-[1px] border-[lightgray]'>
            {editKey != fid.id && <h5 className="font-medium">{fid.name}</h5>}
            {editKey === fid.id && <div className='pb-3 grid grid-cols-12'>
                <p className='font-semibold text-sm col-span-12'>Fiducuarie name</p>
            </div>
            }

            <div className='flex'>
                <Popover content={editDeleteContent(fid, index)} title="Options" trigger="click">
                    <svg className='cursor-pointer mt-2' width="30" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="4" fill="#B9B9B9" />
                        <circle cx="20" cy="4" r="4" fill="#B9B9B9" />
                        <circle cx="36" cy="4" r="4" fill="#B9B9B9" />
                    </svg>
                </Popover>
            </div>
        </div>

        {
            editKey === fid.id && <div className='pb-3 grid grid-cols-12'>
                <input type="text" placeholder='Enter fiducuarie name' className='mt-[-20px] border-b-2 border-[#cdcdcd] text-black outline-none mb-4 bg-[#F5F5F5] w-full col-span-12' value={fiducuarieName != null ? fiducuarieName : fid?.name} onChange={(e) => setFiducuarieName(e.target.value)} />
            </div>
        }

        {
            editKey !== fid.id && <div className='mt-3 mb-3'>
                <div className='grid grid-cols-12 grid-row pb-3'>
                    <p className='font-bold text-sm col-span-2 text-[#8A8A8A]'>Role</p>
                    <p className='font-bold text-sm col-span-3 text-[#8A8A8A]'>Relationship</p>
                    <p className='font-bold text-sm col-span-4 text-[#8A8A8A]'>Email</p>
                    <p className='font-bold text-sm col-span-3 text-[#8A8A8A]'>Phone Number</p>
                </div>

                <div className='grid grid-cols-12 border-b-[1px] border-[lightgray] pb-3'>
                    <p className='font-semibold text-sm col-span-2'>{fid.role}</p>
                    <p className='font-semibold text-sm col-span-3'>{fid.relationship}</p>
                    <p className='font-semibold text-sm break-words col-span-4'>{fid.email}</p>
                    <p className='font-semibold text-sm col-span-3'>{fid.phone}</p>
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
                        <select className='bg-[#F5F5F5] w-full ml-[-5px]' name="role" id="role" value={fid?.role} onChange={(e) => setRole(e.target.value)}>
                            <option value={fid?.role}>{fid?.role}</option>)
                        </select>
                    </div>
                    <div className='bg-[#F5F5F5] col-span-6 border-b-2 border-[#cdcdcd] text-black'>
                        <select className='bg-[#F5F5F5] w-full ml-[-5px]' name="relationship" id="relationship" value={fid?.relationship} onChange={(e) => setRelationship(e.target.value)}>
                            {CONSTANT.relationship.map((rel, index) => <option value={rel} key={index}>{rel}</option>)}
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
            detailKey === fid.id && !editKey && <div id="view-more-information">

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

                        <div className='p-5 bg-[#F9F9F9] rounded-xl'>

                            <h5 className="font-medium mb-5">{fid?.details?.successor?.name}</h5>

                            <div>

                                <div className='grid grid-cols-12 grid-row pb-3'>
                                    <p className='font-bold text-sm col-span-2 text-[#8A8A8A]'>Role</p>
                                    <p className='font-bold text-sm col-span-3 text-[#8A8A8A]'>Relationship</p>
                                    <p className='font-bold text-sm col-span-4 text-[#8A8A8A]'>Email</p>
                                    <p className='font-bold text-sm col-span-3 text-[#8A8A8A]'>Phone Number</p>
                                </div>

                                <div className='grid grid-cols-12 border-b-2 border-[lightgray] pb-3'>
                                    <p className='font-semibold text-sm col-span-2'>{fid?.details?.successor?.role}</p>
                                    <p className='font-semibold text-sm col-span-3'>{fid?.details?.successor?.relationship}</p>
                                    <p className='font-semibold text-sm break-words col-span-4'>{fid?.details?.successor?.email}</p>
                                    <p className='font-semibold text-sm col-span-3'>{fid?.details?.successor?.phone}</p>
                                </div>

                                {
                                    viewMoreSuccessor == fid.id && <div className='grid grid-cols-12 grid-row pb-3 pt-3'>
                                        <p className='font-semibold text-sm col-span-12'>Associated with</p>
                                        {fid?.details?.successor?.associated.map((name) => <p className='text-sm col-span-12 mt-3'>{name}</p>)}
                                    </div>
                                }

                                {
                                    !viewMoreSuccessor && <div div className='flex pt-3 cursor-pointer' onClick={() => setViewMoreSuccessor(fid.id)}>
                                        <p className='text-sm mr-2'>View more information</p>
                                        <svg className='mt-[5px]' width="10" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L6.5 7L12 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                }

                                {
                                    viewMoreSuccessor == fid.id && <div className='flex pt-3 cursor-pointer' onClick={() => setViewMoreSuccessor(false)}>
                                        <p className='text-sm mr-2'>Hide</p>
                                        <svg className='mt-[5px]' width="10" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 7L6.5 1L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                }

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
                                        <select className='bg-[#FBFBFB] w-full ml-[-5px]' name="role" id="role" value={successorRole != null ? successorRole : fid?.details?.successor?.role} onChange={(e) => setSuccessorRole(e.target.value)}>
                                            <option value={fid?.details?.successor?.role}>{fid?.details?.successor?.role}</option>)
                                        </select>
                                    </div>
                                    <div className='bg-[#FBFBFB] col-span-6 border-b-2 border-[#cdcdcd] text-black'>
                                        <select className='bg-[#FBFBFB] w-full ml-[-5px]' name="relationship" id="relationship" value={successorRelationship != null ? successorRelationship : fid?.details?.successor?.relationship} onChange={(e) => setSuccessorRelationship(e.target.value)}>
                                            {CONSTANT.relationship.map((rel, index) => <option value={rel} key={index}>{rel}</option>)}
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
            detailKey === fid.id && !editKey && <div className='flex pt-3 cursor-pointer' onClick={() => setDetailKey(null)}>
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
                    <svg className='mt-3 ml-1' width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="white" />
                        <path d="M11.7109 10.1562H12.4984V17.2432H13.2858" stroke="black" stroke-width="1.3999" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.2858 6.61557C13.2858 6.82441 13.2029 7.0247 13.0552 7.17237C12.9075 7.32005 12.7072 7.40301 12.4984 7.40301C12.2895 7.40301 12.0892 7.32005 11.9416 7.17237C11.7939 7.0247 11.7109 6.82441 11.7109 6.61557C11.7109 6.40672 11.7939 6.20644 11.9416 6.05876C12.0892 5.91109 12.2895 5.82812 12.4984 5.82812C12.7072 5.82812 12.9075 5.91109 13.0552 6.05876C13.2029 6.20644 13.2858 6.40672 13.2858 6.61557Z" fill="black" stroke="black" stroke-width="0.699948" />
                    </svg>
                </div>

                <p className='text-gray-400 text-sm pb-5'>Last Updated 10/17/23 2:39:42 PM</p>
            </div>

            <button className='bg-[#4e2357] rounded-2xl border-2 h-[35px]' onClick={() => setFiducuarieModalOpen(true)}>
                <div className='flex p-3 mt-[-5px]'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12C3 15.7712 3 19.6569 4.31802 20.8284C5.63604 22 7.75736 22 12 22C16.2426 22 18.364 22 19.682 20.8284C21 19.6569 21 15.7712 21 12" stroke="white" stroke-width="1.5" />
                        <path d="M14.6603 14.2019L20.8579 12.3426C21.2688 12.2194 21.4743 12.1577 21.6264 12.0355C21.7592 11.9288 21.8626 11.7898 21.9266 11.6319C22 11.4511 22 11.2366 22 10.8077C22 9.12027 22 8.27658 21.6703 7.63268C21.3834 7.07242 20.9276 6.61659 20.3673 6.32971C19.7234 6 18.8797 6 17.1923 6H6.80765C5.12027 6 4.27658 6 3.63268 6.32971C3.07242 6.61659 2.61659 7.07242 2.32971 7.63268C2 8.27658 2 9.12027 2 10.8077C2 11.2366 2 11.4511 2.07336 11.6319C2.13743 11.7898 2.24079 11.9288 2.37363 12.0355C2.52574 12.1577 2.73118 12.2194 3.14206 12.3426L9.33968 14.2019" stroke="white" stroke-width="1.5" />
                        <path d="M14 12.5H10C9.72386 12.5 9.5 12.7239 9.5 13V15.1615C9.5 15.3659 9.62448 15.5498 9.8143 15.6257L10.5144 15.9058C11.4681 16.2872 12.5319 16.2872 13.4856 15.9058L14.1857 15.6257C14.3755 15.5498 14.5 15.3659 14.5 15.1615V13C14.5 12.7239 14.2761 12.5 14 12.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M9.17188 4C9.58371 2.83481 10.695 2 12.0012 2C13.3074 2 14.4186 2.83481 14.8305 4" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                    <small className='mx-2 mt-[2px] text-[white]' >Add Fiducuarie</small>
                </div>
            </button>

        </div>

        <div style={{
            display: 'flex',
            background: 'white',
            padding: 15,
            borderRadius: '10px',
        }}>


            <div className='w-[50%] ml-4'>
                {
                    fiducuaries.slice(Math.floor((fiducuaries.length - 1) / 2)).map((fid, index) => {
                        return fidContent(fid, index);
                    })
                }
            </div>

            <div className='w-[50%] ml-4'>
                {
                    fiducuaries.slice(0, Math.floor((fiducuaries.length - 1) / 2)).map((fid, index) => {
                        return fidContent(fid, index);
                    })
                }
            </div>

        </div>

        <Modal isOpen={addFiducuarieModalOpen} onClose={closeFiducuarieModal} title={"Add Fiducuarie"} description={"Here you can create a Fiducuarie"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    maxHeight: '450px',
                    paddingRight: '20px',
                    overflowY: 'auto'
                }}>
                    <label className=' text-gray-400 text-sm'>Fiducuarie Name</label>
                    <div className='flex flex-row'>
                        <input type="text" placeholder='Enter your fiducuarie name' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' value={fiducuarieName} onChange={(e) => setFiducuarieName(e.target.value)} />
                    </div>
                    <div className='flex justify-between space-x-2'>
                        <div className='w-full'>
                            <label className=' text-gray-400 text-sm'>Role</label>
                            <div className={`bg-gray-100 border-b-2 border-[#cdcdcd] text-black rounded-2xl w-full p-2`}>
                                <select className='bg-gray-100 w-full ml-[-5px]' name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value={"role"}>role</option>
                                </select>
                            </div>
                        </div>
                        <div className='w-full'>
                            <label className=' text-gray-400 text-sm'>Relationship</label>
                            <div className={`bg-gray-100 border-b-2 border-[#cdcdcd] text-black rounded-2xl w-full p-2`}>
                                <select className='bg-gray-100 w-full ml-[-5px]' name="associate" id="associate" value={relationship} onChange={(e) => setRelationship(e.target.value)}>
                                    {CONSTANT.relationship.map((rel, index) => <option value={rel} key={index}>{rel}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between space-x-2 mt-2'>
                        <div className='w-full'>
                            <label className=' text-gray-400 text-sm'>Email</label>
                            <div className='flex flex-row'>
                                <input type="text" placeholder='Enter email' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className='w-full'>
                            <label className=' text-gray-400 text-sm'>Phone Number</label>
                            <div className='flex flex-row'>
                                <input type="text" placeholder='Enter phone number' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <label className=' text-gray-400 text-sm'>Fiduciary Duties</label>
                    <div className='flex flex-row'>
                        <input type="text" placeholder='Enter fiduciary duties' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' value={fiducuarieDuties} onChange={(e) => setFiducuarieDuties(e.target.value)} />
                    </div>
                    <label className=' text-gray-400 text-sm'>Assets Managed</label>
                    <div className='flex flex-row'>
                        <input type="text" placeholder='Enter assets managed' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' value={assetsManaged} onChange={(e) => setAssetsManaged(e.target.value)} />
                    </div>
                    <label className=' text-gray-400 text-sm'>Compliance obligations</label>
                    <div className='flex flex-row'>
                        <input type="text" placeholder='Enter compliance obligations' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' value={complianceObligations} onChange={(e) => setComplianceObligations(e.target.value)} />
                    </div>
                    <label className=' text-gray-400 text-sm'>Successor</label>
                    <br />
                    {!successorButton && <div className='grid grid-cols-12 grid-row pb-3 pt-3'>
                        <div className='text-sm col-span-12 mb-2'>

                            <div className='p-5 bg-[#F9F9F9] rounded-xl'>

                                <h5 className="font-medium mb-5">{successorName}</h5>

                                <div>

                                    <div className='grid grid-cols-12 grid-row pb-3'>
                                        <p className='font-bold text-sm col-span-2 text-[#8A8A8A]'>Role</p>
                                        <p className='font-bold text-sm col-span-3 text-[#8A8A8A]'>Relationship</p>
                                        <p className='font-bold text-sm col-span-4 text-[#8A8A8A]'>Email</p>
                                        <p className='font-bold text-sm col-span-3 text-[#8A8A8A]'>Phone Number</p>
                                    </div>

                                    <div className='grid grid-cols-12 border-b-2 border-[lightgray] pb-3'>
                                        <p className='font-semibold text-sm col-span-2'>{successorRole}</p>
                                        <p className='font-semibold text-sm col-span-3'>{successorRelationship}</p>
                                        <p className='font-semibold text-sm break-words col-span-4'>{successorEmail}</p>
                                        <p className='font-semibold text-sm col-span-3'>{successorPhone}</p>
                                    </div>

                                    {
                                        viewMoreSuccessorInternal && <div className='grid grid-cols-12 grid-row pb-3 pt-3'>
                                            <p className='font-semibold text-sm col-span-12'>Associated with</p>
                                            {successorAssociates.map((name) => <p className='text-sm col-span-12 mt-3'>{name}</p>)}
                                        </div>
                                    }

                                    {
                                        !viewMoreSuccessorInternal && <div div className='flex pt-3 cursor-pointer' onClick={() => setViewMoreSuccessorInternal(true)}>
                                            <p className='text-sm mr-2'>View more information</p>
                                            <svg className='mt-[5px]' width="10" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L6.5 7L12 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    }

                                    {
                                        viewMoreSuccessorInternal && <div className='flex pt-3 cursor-pointer' onClick={() => setViewMoreSuccessorInternal(false)}>
                                            <p className='text-sm mr-2'>Hide</p>
                                            <svg className='mt-[5px]' width="10" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 7L6.5 1L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>}

                    <button className=' rounded-2xl h-[35px]' onClick={() => setAddSuccessorModalOpen(true)}>
                        <div className='flex p-3 mt-[-5px]'>
                            <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y="0.5" width="24" height="24" rx="12" fill="#4E2357" />
                                <path d="M12 7.5V12.5M12 12.5V17.5M12 12.5H17M12 12.5H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <small className='mx-2 mt-[2px] text-[#4e2357]' >Add Successor</small>
                        </div>
                    </button>
                    <br />
                    <label className=' text-gray-400 text-sm'>Notes</label>
                    <div className='flex flex-row'>
                        <input type="text" placeholder='Enter notes' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </div>
                </div>
            </div>
            <button className={`bg-[#4E2357] text-white px-[5px] py-[5px] rounded-xl border-2 w-full mt-2 ${fiduciarieButton ? "opacity-30" : ""}`} onClick={() => {
                dispatch(postFidAction({
                    name: fiducuarieName,
                    role: role,
                    relationship: relationship,
                    email: email,
                    phoneNumber: phone,
                    duties: fiducuarieDuties,
                    assetManaged: assetsManaged,
                    complianceObligation: complianceObligations,
                    notes: notes,
                    successor: !successorButton ? {
                        name: successorName,
                        email: successorEmail,
                        phone: successorPhone,
                        role: successorRole,
                        relationship: successorRelationship,
                        associates: successorAssociates
                    } : null
                }))

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

                closeFiducuarieModal();
            }} disabled={fiduciarieButton}> <small className='mx-2' >Add Fiducuarie</small></button>
        </Modal>

        <Modal isOpen={addSuccessorModalOpen} onClose={closeSuccessorModal} title={"Add Successor"} description={"Here you can create a Fiducuarie"}>
            <div className='flex w-full justify-between'>
                <div id="modalScroll" className='w-full' style={{
                    paddingRight: '20px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    <label className=' text-gray-400 text-sm'>Successor name</label>
                    <div className='flex flex-row'>
                        <input type="text" placeholder='Enter your successor name' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' value={successorName} onChange={(e) => setSuccessorName(e.target.value)} />
                    </div>
                    <div className='flex justify-between space-x-2'>
                        <div className='w-full'>
                            <label className=' text-gray-400 text-sm'>Role</label>
                            <div className={`bg-gray-100 border-b-2 border-[#cdcdcd] text-black rounded-2xl w-full p-2`}>
                                <select className='bg-gray-100 w-full ml-[-5px]' name="role" id="role" value={successorRole} onChange={(e) => setSuccessorRole(e.target.value)}>
                                    <option value={"role"}>role</option>
                                </select>
                            </div>
                        </div>
                        <div className='w-full'>
                            <label className=' text-gray-400 text-sm'>Relationship</label>
                            <div className={`bg-gray-100 border-b-2 border-[#cdcdcd] text-black rounded-2xl w-full p-2`}>
                                <select className='bg-gray-100 w-full ml-[-5px]' name="associate" id="associate" value={successorRelationship} onChange={(e) => setSuccessorRelationship(e.target.value)}>
                                    {CONSTANT.relationship.map((rel, index) => <option value={rel} key={index}>{rel}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between space-x-2 mt-2'>
                        <div className='w-full'>
                            <label className=' text-gray-400 text-sm'>Email</label>
                            <div className='flex flex-row'>
                                <input type="text" placeholder='Enter email' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' value={successorEmail} onChange={(e) => setSuccessorEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className='w-full'>
                            <label className=' text-gray-400 text-sm'>Phone Number</label>
                            <div className='flex flex-row'>
                                <input type="text" placeholder='Enter phone number' className='border border-[#cdcdcd] px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-gray-100' value={successorPhone} onChange={(e) => setSuccessorPhone(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <label className=' text-gray-400 text-sm'>Associated with</label>
                    <div className='grid grid-cols-12 grid-row'>
                        {successorAssociates.map((name, index) => <div className={`col-span-12 ${index === 0 ? '' : "flex"} space-x-2`}>
                            <div className={`bg-[#FBFBFB] border-b-2 rounded-2xl border-[#cdcdcd] text-black w-[${index === 0 ? "100%" : "90%"}] mt-6 col-span-8 p-2`}>
                                <select className='bg-[#FBFBFB] w-full ml-[-5px]' name="associate" id="associate" value={name}>
                                    <option value={name}>{name}</option>)
                                </select>
                            </div>
                            {
                                index > 0 && <svg className='mt-10 cursor-pointer' width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.64062 3.33464C7.98382 2.36364 8.90985 1.66797 9.99837 1.66797C11.0869 1.66797 12.0129 2.36364 12.3561 3.33464" stroke="#4E2357" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M17.0847 5H2.91797" stroke="#4E2357" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M15.6936 7.08203L15.3103 12.8313C15.1628 15.0437 15.089 16.1499 14.3682 16.8243C13.6474 17.4987 12.5387 17.4987 10.3214 17.4987H9.6769C7.45956 17.4987 6.35089 17.4987 5.63005 16.8243C4.90921 16.1499 4.83547 15.0437 4.68797 12.8313L4.30469 7.08203" stroke="#4E2357" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M7.91797 9.16797L8.33464 13.3346" stroke="#4E2357" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M12.0846 9.16797L11.668 13.3346" stroke="#4E2357" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                            }
                        </div>
                        )}
                    </div>
                    <br />
                    <button className=' rounded-2xl h-[35px]' onClick={() => {
                        successorAssociates.push("");
                        setSuccessorAssociates([...successorAssociates]);
                    }}>
                        <div className='flex p-3 mt-[-10px]'>
                            <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y="0.5" width="24" height="24" rx="12" fill="#4E2357" />
                                <path d="M12 7.5V12.5M12 12.5V17.5M12 12.5H17M12 12.5H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <small className='mx-2 mt-[2px] text-[#4e2357]' >Add associated</small>
                        </div>
                    </button>
                </div>
            </div>
            <button className={`bg-[#4E2357] text-white px-[5px] py-[5px] rounded-xl border-2 w-full mt-2 ${successorButton ? "opacity-30" : ""}`} onClick={closeSuccessorModal} disabled={successorButton}> <small className='mx-2' >Add Successor</small></button>
        </Modal>

    </div >

    return tab5Content;

}

export default Fiduciaries;