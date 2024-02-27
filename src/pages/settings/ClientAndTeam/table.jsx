import React, { useState, useEffect } from 'react';
import { FaRegTimesCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import EditIcon from '../../../assets/images/edit-icon.svg';


const TableComponent = ({ data, onEdit, onDelete, type, editClient, setEditClient , editTeam, setAddClientAccessModalOpen, setAddTeamAccessModalOpen }) => {
    
    const myState = useSelector((state) => state.user);
    
    const [clientRoles, setClientRoles] = useState([]);
    const [teamRoles, setTeamRoles] = useState([]);

    useEffect(() => {
        setClientRoles(["Can edit", "Read only"]);
        setTeamRoles(["Advisor", "Legal", "	Paraplanner"]);
    }, [])
    return (
        <table className="min-w-full text-left border-separate border-spacing-3">
            <thead className='border-b-2 text-gray-400'>
                <tr>
                    <th className='text-sm font-light'>{type === 'client' ? 'Client name' : 'Team member'}</th>
                    <th className='text-sm font-light'>Role</th>
                    <th className='text-sm font-light'>Access</th>
                </tr>
            </thead>
            <tbody>
                {myState.organization?.organization?.map((item, index) => (
                    <tr key={item.id} className={index === data.length - 1 ? "" : `border-b-2`}>
                        <td>
                            <div className='flex'>
                                {editTeam && type === "team" && <svg className='bg-[rgba(11,11,11,0.1)] rounded-2xl mr-6 cursor-pointer' width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.64258 3.33317C7.98578 2.36218 8.91181 1.6665 10.0003 1.6665C11.0888 1.6665 12.0149 2.36218 12.3581 3.33317" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M17.0837 5H2.91699" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M15.6946 7.08325L15.3113 12.8325C15.1638 15.0449 15.09 16.1511 14.3692 16.8255C13.6483 17.4999 12.5397 17.4999 10.3223 17.4999H9.67787C7.46054 17.4999 6.35187 17.4999 5.63103 16.8255C4.91019 16.1511 4.83644 15.0449 4.68895 12.8325L4.30566 7.08325" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M7.91699 9.1665L8.33366 13.3332" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M12.0837 9.1665L11.667 13.3332" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                                </svg>}
                                <p className='text-sm font-semibold'>{item.fullName}</p>
                            </div>
                        </td>
                        <td>
                            {editClient && type === "client" ? <div className='border border-[rgba(11,11,11,0.1)] px-3 py-1 p-2 rounded-2xl w-[max-content] mt-2 mb-2 text-sm'>
                                <select className='bg-[rgba(244,241,241,0.1)]' name="role" id="role" value={item.role}>
                                    {clientRoles.map((role) => <option value={role}>{role}</option>)}
                                </select> </div> : type === "client" && <div className='border border-[rgba(11,11,11,0.1)] px-3 py-1 rounded-3xl w-[max-content] mt-2 mb-2 text-sm'>
                                    {item.role}
                                </div>
                            }
                            {editTeam && type === "team" ? <div className='border border-[rgba(11,11,11,0.1)] px-3 py-1 p-2 rounded-2xl w-[max-content] mt-2 mb-2 text-sm'>
                                <select className='bg-[rgba(244,241,241,0.1)]' name="role" id="role" value={item.role}>
                                    {teamRoles.map((role) => <option value={role}>{role}</option>)}
                                </select> </div> : type === "team" && <div className='border border-[rgba(11,11,11,0.1)] px-3 py-1 rounded-3xl w-[max-content] mt-2 mb-2 text-sm'>
                                    {item.role}
                                </div>
                            }
                        </td>
                        <td><div className='flex flex-row items-center'>{item.access.map((access, index) => <div className='pr-4 flex'>
                            <span className=' bg-[#FBF5FC] text-[#4E2357] font-semibold p-2 rounded-2xl w-[max-content] mt-2 mb-2 text-sm flex items-center'>{access + ' '}
                                {
                                    editClient && type === 'client' &&
                                    <div>
                                        <FaRegTimesCircle className='bg-white p-1 text-[20px] rounded-3xl ms-2'  />
                                    </div>
                                }
                                {
                                    editTeam && type === 'team' &&
                                    // <svg className='ml-1 cursor-pointer' width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    //     <circle cx="8" cy="8.5" r="8" fill="#D9D9D9" />
                                    //     <path opacity="0.25" d="M5 5L8.25 8.5M11.5 12L8.25 8.5M8.25 8.5L11.5 5L5 12" stroke="black" />
                                    // </svg>
                                    <div>
                                        <FaRegTimesCircle className='bg-white p-1 text-[20px] rounded-3xl ms-2'  />
                                    </div>
                                }
                            </span>
                            {/* {
                                editClient && type === 'client' && item.access.length - 1 === index && <div className='flex pt-4 pl-7 cursor-pointer' onClick={() => setAddClientAccessModalOpen(true)}>
                                    <svg width="15" height="15" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12.5" r="12" fill="#D9D9D9" />
                                        <path d="M18 12.5L12 12.5M12 12.5L6 12.5001M12 12.5L12 6.5M12 12.5L12 18.5" stroke="black" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                    <p className='text-sm pl-2 font-semibold'>Add Access</p>
                                </div>
                            }
                            {
                                editTeam && type === 'team' && item.access.length - 1 === index && <div className='flex pt-4 pl-7 cursor-pointer' onClick={() => setAddTeamAccessModalOpen(true)}>
                                    <svg width="15" height="15" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12.5" r="12" fill="#D9D9D9" />
                                        <path d="M18 12.5L12 12.5M12 12.5L6 12.5001M12 12.5L12 6.5M12 12.5L12 18.5" stroke="black" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                    <p className='text-sm pl-2 font-semibold'>Add Access</p>
                                </div>
                            } */}
                        </div>)}
                        </div></td>
                        <td>
                        <button disabled={editTeam} className={`${editTeam ? "bg-gray-100" : "bg-[#FBF5FC]"} pr-5 ps-5 font-semibold flex items-center  py-[5px] rounded-3xl border-2 border-[#EAE0EC]`} onClick={() => setEditClient(!editClient)}> <img src={EditIcon} className='mr-1' alt="" /> {editClient ? "Save" : "Edit"}</button>
                        </td>
                        <hr />
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


export default TableComponent;
