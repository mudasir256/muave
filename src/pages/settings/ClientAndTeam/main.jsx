// MainComponent.jsx

import React, { useState, useEffect } from 'react';
import TableComponent from './table';
import _ from 'lodash';
import Modal from '../../../components/Modal';
import EditIcon from '../../../assets/images/edit-icon.svg';
import { FaMagnifyingGlass } from "react-icons/fa6";

const MainComponent = () => {
    const [clientData, setClientData] = useState([]);
    const [teamData, setTeamData] = useState([]);
    const [search, setSearch] = useState('');
    const [editClient, setEditClient] = useState(false);
    const [editTeam, setEditTeam] = useState(false);
    const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
    const [addClientAccessModalOpen, setAddClientAccessModalOpen] = useState(false);
    const [addTeamAccessModalOpen, setAddTeamAccessModalOpen] = useState(false);
    const [link, setLink] = useState("http://127.0.0.1:5173/settings/clientAndTeam");
    const [access, setAccess] = useState(["Documents", "Dashboard", "Action Items", "Goal planing"]);

    const init = () => {
        // set client data
        setClientData([
            {
                name: 'Fahad Hossain',
                role: 'Can edit',
                access: ['Dashboard', 'Documents', 'Action Items', 'Goal planing']
            },
            {
                name: 'Shane Abarca',
                role: 'Read only',
                access: ['Dashboard']
            },
            {
                name: 'Hope Albu',
                role: 'Read only',
                access: ['Dashboard', 'Action Items']
            }
        ]);

        // set team data
        setTeamData([
            {
                name: 'Hope Albu',
                role: 'Advisor',
                access: ['Dashboard', 'Documents', 'Client Reports']
            },
            {
                name: 'Shane Abarca',
                role: 'Legal',
                access: ['Documents']
            },
            {
                name: 'Fahad Hossain',
                role: 'Paraplanner',
                access: ['Dashboard', 'Estate Plan', 'Documents', 'Action Items']
            }
        ]);
    }

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {

        if (search === "") {

            init();

        } else {

            const filteredData = _.filter(clientData, (item) =>
                _.includes(_.toLower(item.name), _.toLower(search))
            );

            setClientData([...filteredData]);

        }
    }, [search])

    const handleEdit = (id) => {
        // Implement logic to handle edit action
        console.log(`Edit clicked for item with id ${id}`);
    };

    const handleDelete = (id) => {
        // Implement logic to handle delete action
        console.log(`Delete clicked for item with id ${id}`);
    };

    const closeAddMemberModal = () => {
        setAddMemberModalOpen(false);
    };

    const closeClientAccessMemberModal = () => {
        setAddClientAccessModalOpen(false);
    };

    const closeTeamAccessMemberModal = () => {
        setAddTeamAccessModalOpen(false);
    };

    return (
        <div>

            <div>
                <div className='p-6 pb-1 border-2 border-[#F9F6F9] rounded-3xl' style={{
                    pointerEvents: editTeam ? "none" : "",
                    color: editTeam ? "lightgray" : ""
                }}>
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap"
                    }}>
                        <div>
                            <h4 className=" font-semibold">Client Permissions</h4>
                        </div>
                    </div>
                    <br />
                    <div className='flex flex-row relative ms-[-14px]'>
                    <FaMagnifyingGlass className='relative top-[14px] left-[30px]' />
                        <input style={{
                            paddingLeft: "40px"
                        }} type="text" placeholder='Search' className='px-3 py-[10px] rounded-3xl w-full text-black outline-none mb-4 bg-[#F9F6F9]' onChange={(e) => setSearch(e.target.value)} value={search} />
                    </div>
                    <br />
                    <TableComponent data={clientData} onEdit={handleEdit} onDelete={handleDelete} type={'client'} editClient={editClient} setEditClient={setEditClient} editTeam={editTeam} setAddClientAccessModalOpen={setAddClientAccessModalOpen} />
                </div>
            </div>

            <div className='my-5' >
                <div className='p-5 pb-1 border-2 border-[#F9F6F9] rounded-3xl' style={{
                    pointerEvents: editClient ? "none" : "",
                    color: editClient ? "lightgray" : ""
                }}>
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap"
                    }}>
                        <div>
                            <p className="text-[15px] font-semibold">Team Permissions</p>
                        </div>
                    </div>
                    <br />
                    <TableComponent data={teamData} onEdit={handleEdit} onDelete={handleDelete} type={'team'} editClient={editClient} editTeam={editTeam} setAddTeamAccessModalOpen={setAddTeamAccessModalOpen} />
                </div>
                <br />
                <br />
                <button disabled={editClient || editTeam} className={`${editClient || editTeam ? "bg-[#FBF5FC]" : "bg-[#FBF5FC]"} px-[5px] py-[5px] rounded-3xl flex items-center border-2 border-[#EAE0EC]  mr-[83%] flex pt-2 pb-2 pl-4`} onClick={() => setAddMemberModalOpen(true)}>
                    <svg className='mt-[0.5px]' width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="#D9D9D9" />
                        <path opacity={editClient || editTeam ? "0.09" : "0.25"} d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="black" stroke-width="2" />
                    </svg>
                    <small className={` ms-1 mr-2 text-[13px] font-semibold ${editClient || editTeam ? "text-[#4E2357]" : "text-[#4E2357]"}`} >Add Team Member</small>
                </button>
            </div>

            <Modal isOpen={addMemberModalOpen} onClose={closeAddMemberModal}>
                <div className='flex'>
                    <div>
                        <h4 className='text-center font-medium mb-1'>Add team member</h4>
                        <p className='text-center text-sm text-gray-400'>To invite a member of your team - you need to send them a referral link. </p>
                        <br />
                        <label className=' text-gray-400 text-sm'>Referral Link</label>
                        <div className='flex flex-row'>
                            <input style={{
                                paddingRight: "50px"
                            }} type="text" placeholder='Enter your referral link' className=' px-3 py-[7px] rounded-2xl w-full text-black outline-none mb-4 bg-[#F9F6F9]' value={link} disabled={true} />
                            <div className='ml-[-45px] mt-[10px] cursor-pointer font-semibold' onClick={() => navigator.clipboard.writeText(link)}>
                                <p className='text-sm'>Copy</p>
                            </div>
                        </div>
                    </div>
                    <div className='cursor-pointer' onClick={closeAddMemberModal}>
                        <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.25" d="M1.5 1.5L10.75 10.75M20 20L10.75 10.75M10.75 10.75L20 1.5L1.5 20" stroke="black" stroke-width="2" />
                        </svg>
                    </div>
                </div>
                <button className='bg-[#4E2357] px-[5px] py-[5px] rounded-3xl border-2 w-full' onClick={closeAddMemberModal}> <small className='mx-2 text-white' >Close</small></button>
            </Modal>

            <Modal isOpen={addClientAccessModalOpen}  onClose={closeClientAccessMemberModal}>
                <div className='flex'>
                    <div>
                        <h4 className='text-center font-medium mb-1'>Add client access</h4>
                        <p className='text-center text-sm text-gray-400'>Here you can specify the client's access level</p>
                        <br />
                        <label className=' text-gray-400 text-sm'>Client</label>
                        <div className='bg-[#F9F9F9] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                            <select className='bg-[#F9F9F9] outline-none w-full' name="client" id="client">
                                <option value={"Shane Abarca"}>Shane Abarca</option>
                            </select>
                        </div>
                        <br />
                        <label className=' text-gray-400 text-sm'>Access</label>
                        <div className='flex'>{access.map((access) => <span className={`${access === "Documents" ? "bg-gray-100" : "bg-[#F9F9F9]"} p-2 rounded-2xl w-[max-content] mt-2 mb-2 text-sm flex mr-3 cursor-pointer bg-[#F9F9F9]`}>{access}</span>)}</div>
                    </div>
                    <div className='cursor-pointer' onClick={closeClientAccessMemberModal}>
                        <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.25" d="M1.5 1.5L10.75 10.75M20 20L10.75 10.75M10.75 10.75L20 1.5L1.5 20" stroke="black" stroke-width="2" />
                        </svg>
                    </div>
                </div>
                <button className='bg-[#4E2357] text-white px-[5px] py-[5px] rounded-xl border-2 w-full mt-2' onClick={closeClientAccessMemberModal}> <small className='mx-2' >Add Access</small></button>
            </Modal>

            <Modal isOpen={addTeamAccessModalOpen} onClose={closeTeamAccessMemberModal}>
                <div className='flex'>
                    <div>
                        <h4 className='text-center font-medium mb-1'>Add Team access</h4>
                        <p className='text-center text-sm text-gray-400'>Here you can specify the team's access level</p>
                        <br />
                        <label className=' text-gray-400 text-sm'>Team</label>
                        <div className='bg-[#F9F9F9] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                            <select className='bg-[#F9F9F9] w-full' name="client" id="client">
                                <option value={"Shane Abarca"}>Shane Abarca</option>
                            </select>
                        </div>
                        <br />
                        <label className=' text-gray-400 text-sm'>Access</label>
                        <div className='flex'>{access.map((access) => <span className={`${access === "Documents" ? "bg-gray-100" : "bg-[#F9F9F9]"} p-2 rounded-2xl w-[max-content] mt-2 mb-2 text-sm flex mr-3 cursor-pointer`}>{access}</span>)}</div>
                    </div>
                    <div className='cursor-pointer' onClick={closeTeamAccessMemberModal}>
                        <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.25" d="M1.5 1.5L10.75 10.75M20 20L10.75 10.75M10.75 10.75L20 1.5L1.5 20" stroke="black" stroke-width="2" />
                        </svg>
                    </div>
                </div>
                <button className='bg-[#4E2357] px-[5px] py-[5px] text-white rounded-xl border-2 w-full mt-2' onClick={closeTeamAccessMemberModal}> <small className='mx-2' >Add Access</small></button>
            </Modal>

        </div>
    );
};

export default MainComponent;
