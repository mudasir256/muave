import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { userDetails , getOrganizationUsers, clientSettings } from '../../../redux/user/user-actions';
import { AiOutlinePlus } from "react-icons/ai";
import Modal from '../../../components/Modal';


function ClientAndTeam() {
    
    const dispatch = useDispatch();
    const myState = useSelector((state) => state.user);

    const [data , setData] = useState(null);
    const [isEdit , setIsEdit] = useState(false);
    const [addClientAccessModalOpen, setAddClientAccessModalOpen] = useState(false);
    const [clientId , setClientId] = useState(null);
    const [access , setAccess] = useState([]);
    const [permission , setPermission] = useState("read only");

    const closeClientAccessMemberModal = () => {
        setAddClientAccessModalOpen(false);
    };

    const handleEdit = (id) => {
        if(isEdit === false){
            setIsEdit(true)
        }
        if(isEdit){
            dispatch(clientSettings({clientId , access , permission})); 
        }
    }

    const handleAccessClick = (val) => {
        if (!access.includes(val)) {
          setAccess([...access, val]);
        } else {
          setAccess(access.filter((p) => p !== val));
        } 
      };

    useEffect(() => {
        dispatch(userDetails());
    },[])

    useEffect(() => {
        const orgID = myState.userData?.OrganizationId;
        if(orgID){
        dispatch(getOrganizationUsers(orgID));
        }
    },[myState.userData])

    useEffect(() => {
        setData(myState.organization?.organization);
    },[myState])
  return (
    <>
    <div className='px-3 py-2 border-2 border-[#F9F6F9] rounded-[35px]' >
        <h5 className='font-semibold mx-3 mt-4' >Client Permissions</h5>
    <table class="table-auto w-full border-separate border-spacing-y-[20px] border-spacing-x-[10px] text-[12px]">
        <thead>
            <tr className="border text-[#8A8A8A]" >
            <th className="text-start font-normal" >Client name </th>
            <th className="text-start font-normal" >Role </th>
            <th className="text-start font-normal" >Access</th>
            </tr>
        </thead>
        <tbody className="docuemnt-tbody" >
           {
            data?.map((item) => {
                if(item.role === "client"){
                    return(
                        <>
                        <tr>
                            <td>
                                <div className='flex items-center font-bold' >
                                    <img className='rounded-[50%] w-[43px] h-[43px] mr-5 object-cover' src={item.Avatar} alt="" />
                                    {item.fullName}
                                </div>
                            </td>
                            <td className='font-semibold' >
                                {
                                    item?.UserPermissions?.map((items) => {
                                        return(
                                            <>
                                            {
                                                isEdit? 
                                                <>
                                                <select onChange={(e) => setPermission(e.target.value)} >
                                                    <option value="read only">read only</option>
                                                    <option value="edit">edit</option>
                                                    <option value="delete">delete</option>
                                                    <option value="all">all</option>
                                                </select>
                                                </>
                                                :
                                                <span className='border-2 border-[#f6f6f6] rounded-3xl px-2 py-1' >{items.permissions}</span>
                                            }
                                            </>
                                        )
                                    })
                                }
                            </td>
                            <td>
                            {item?.UserPermissions?.map((permission) => (
                                <div className='flex'>
                                {permission.access.map((access, index) => (
                                    <span className='bg-[#FBF5FC] text-[#4E2357] mx-2 font-semibold p-2 rounded-2xl w-[max-content] mt-2 mb-2 text-sm flex items-center' key={index}>
                                    {access}
                                    </span>
                                ))}
                                {
                                    isEdit ? 
                                        <button onClick={() => setAddClientAccessModalOpen(true)} className='text-[13px] flex items-center font-semibold ml-10' > <AiOutlinePlus className="mr-1 text-[18px] p-1 bg-[#FBF5FC] rounded-[50%]" /> add access</button>
                                        : ""
                                }
                                </div>
                            ))}
                            </td>
                            <td>
                            {
                                isEdit?
                                <div className='flex justify-end' >
                                <button onClick={() => handleEdit(item.id)} className="bg-[#FBF5FC] px-8 font-semibold flex items-center  py-[4px] rounded-3xl border-2 border-[#EAE0EC]" >{isEdit ? "Save" : "Edit"}</button>
                                <button onClick={() => setIsEdit(false)} className="bg-[#FBF5FC] px-8 font-semibold flex items-center  py-[4px] mx-2 rounded-3xl border-2 border-[#EAE0EC]" >Cancel</button>
                                </div>
                                :
                                <div className='flex justify-end' >
                                    <button onClick={() => setIsEdit(true)} className="bg-[#FBF5FC] px-8 font-semibold flex items-center  py-[4px] rounded-3xl border-2 border-[#EAE0EC]" >Edit</button>
                                </div>
                            }
                            </td>
                        </tr>
                        </>
                    )
                }
            })
           }
        </tbody>
    </table>

    <Modal isOpen={addClientAccessModalOpen}  onClose={closeClientAccessMemberModal}>
                <div className='flex'>
                    <div>
                        <h4 className='text-center font-medium mb-1'>Add client access</h4>
                        <p className='text-center text-sm text-gray-400'>Here you can specify the client's access level</p>
                        <br />
                        <label className=' text-gray-400 text-sm'>Client</label>
                        <div className='bg-[#F9F9F9] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                            <select onChange={(e) => setClientId(e.target.value)} value={clientId} className='bg-[#F9F9F9] outline-none w-full' name="client" id="client">
                                <option value="">Add Client</option>
                                {
                                    data?.map((item) => {
                                        return(
                                            <>
                                            <option value={item.supabseUserId}>{item.fullName}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <br />
                        <label className=' text-gray-400 text-sm '>Access</label>
                        <div className='flex items-center mt-2 mb-3' >
                        <span
                        className={`bg-[#FBF5FC] cursor-pointer rounded-3xl px-2 py-1 mx-2 text-[12px] font-semibold ${
                            access.includes('DOCUMENTS') ? 'bg-gray-300 ' : ''
                        }`}
                        onClick={() => handleAccessClick('DOCUMENTS')}
                        >
                        DOCUMENTS
                        </span>
                       
                        <span
                        className={`bg-[#FBF5FC] cursor-pointer rounded-3xl px-2 py-1 mx-2 text-[12px] font-semibold ${
                            access.includes('DASHBOARD') ? 'bg-gray-300 ' : ''
                        }`}
                        onClick={() => handleAccessClick('DASHBOARD')}
                        >
                        DASHBOARD
                        </span>
                       
                        <span
                        className={`bg-[#FBF5FC] cursor-pointer rounded-3xl px-2 py-1 mx-2 text-[12px] font-semibold ${
                            access.includes('ACTION_ITEMS') ? 'bg-gray-300 ' : ''
                        }`}
                        onClick={() => handleAccessClick('ACTION_ITEMS')}
                        >
                        ACTION_ITEMS
                        </span>
                        
                        <span
                        className={`bg-[#FBF5FC] cursor-pointer rounded-3xl px-2 py-1 mx-2 text-[12px] font-semibold ${
                            access.includes('GOAL_PLANNING') ? 'bg-gray-300 ' : ''
                        }`}
                        onClick={() => handleAccessClick('GOAL_PLANNING')}
                        >
                        GOAL_PLANNING
                        </span>
                        
                        <span
                        className={`bg-[#FBF5FC] cursor-pointer rounded-3xl px-2 py-1 mx-2 text-[12px] font-semibold ${
                            access.includes('ALL') ? 'bg-gray-300 ' : ''
                        }`}
                        onClick={() => handleAccessClick('ALL')}
                        >
                        ALL
                        </span>
                        </div>
                        {/* <div className='flex'>{access.map((access) => <span className={`${access === "Documents" ? "bg-gray-100" : "bg-[#F9F9F9]"} p-2 rounded-2xl w-[max-content] mt-2 mb-2 text-sm flex mr-3 cursor-pointer bg-[#F9F9F9]`}>{access}</span>)}</div> */}
                    </div>
                    <div className='cursor-pointer' onClick={closeClientAccessMemberModal}>
                        <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.25" d="M1.5 1.5L10.75 10.75M20 20L10.75 10.75M10.75 10.75L20 1.5L1.5 20" stroke="black" stroke-width="2" />
                        </svg>
                    </div>
                </div>
                <button className='bg-[#4E2357] text-white px-[5px] py-[5px] rounded-xl border-2 w-full mt-2' onClick={closeClientAccessMemberModal}> <small className='mx-2' >Add Access</small></button>
            </Modal>
    </div>


    <div className='px-3 py-2 border-2 border-[#F9F6F9] rounded-[35px] mt-10' >
        <h5 className='font-semibold mx-3 mt-4' >Team Settings</h5>
    <table class="table-auto w-full border-separate border-spacing-y-[20px] border-spacing-x-[10px] text-[12px]">
        <thead>
            <tr className="border text-[#8A8A8A]" >
            <th className="text-start font-normal" >Client name </th>
            <th className="text-start font-normal" >Role </th>
            <th className="text-start font-normal" >Access</th>
            </tr>
        </thead>
        <tbody className="docuemnt-tbody" >
           {
            data?.map((item) => {
                if(item.role === "owner" || item.role === "member"){
                    return(
                        <>
                        <tr>
                            <td>
                                <div className='flex items-center font-bold' >
                                    <img className='rounded-[50%] w-[43px] h-[43px] mr-5 object-cover' src={item.Avatar} alt="" />
                                    {item.fullName}
                                </div>
                            </td>
                            <td className='font-semibold' >
                                {
                                    item?.UserPermissions?.map((items) => {
                                        return(
                                            <>
                                            {
                                                isEdit? 
                                                <>
                                                <select onChange={(e) => setPermission(e.target.value)} >
                                                    <option value="read only">read only</option>
                                                    <option value="edit">edit</option>
                                                    <option value="delete">delete</option>
                                                    <option value="all">all</option>
                                                </select>
                                                </>
                                                :
                                                <span className='border-2 border-[#f6f6f6] rounded-3xl px-2 py-1' >{items.permissions}</span>
                                            }
                                            </>
                                        )
                                    })
                                }
                            </td>
                            <td>
                            {item?.UserPermissions?.map((permission) => (
                                <div className='flex'>
                                {permission.access.map((access, index) => (
                                    <span className='bg-[#FBF5FC] text-[#4E2357] mx-2 font-semibold p-2 rounded-2xl w-[max-content] mt-2 mb-2 text-sm flex items-center' key={index}>
                                    {access}
                                    </span>
                                ))}
                                {
                                    isEdit ? 
                                        <button onClick={() => setAddClientAccessModalOpen(true)} className='text-[13px] flex items-center font-semibold ml-10' > <AiOutlinePlus className="mr-1 text-[18px] p-1 bg-[#FBF5FC] rounded-[50%]" /> add access</button>
                                        : ""
                                }
                                </div>
                            ))}
                            </td>
                            <td>
                            {
                                isEdit?
                                <div className='flex justify-end' >
                                <button onClick={() => handleEdit(item.id)} className="bg-[#FBF5FC] px-8 font-semibold flex items-center  py-[4px] rounded-3xl border-2 border-[#EAE0EC]" >{isEdit ? "Save" : "Edit"}</button>
                                <button onClick={() => setIsEdit(false)} className="bg-[#FBF5FC] px-8 font-semibold flex items-center  py-[4px] mx-2 rounded-3xl border-2 border-[#EAE0EC]" >Cancel</button>
                                </div>
                                :
                                <div className='flex justify-end' >
                                    <button onClick={() => setIsEdit(true)} className="bg-[#FBF5FC] px-8 font-semibold flex items-center  py-[4px] rounded-3xl border-2 border-[#EAE0EC]" >Edit</button>
                                </div>
                            }
                            </td>
                        </tr>
                        </>
                    )
                }
            })
           }
        </tbody>
    </table>

    <Modal isOpen={addClientAccessModalOpen}  onClose={closeClientAccessMemberModal}>
                <div className='flex'>
                    <div>
                        <h4 className='text-center font-medium mb-1'>Add client access</h4>
                        <p className='text-center text-sm text-gray-400'>Here you can specify the client's access level</p>
                        <br />
                        <label className=' text-gray-400 text-sm'>Client</label>
                        <div className='bg-[#F9F9F9] p-2 rounded-2xl mt-2 mb-2 text-sm w-full'>
                            <select onChange={(e) => setClientId(e.target.value)} value={clientId} className='bg-[#F9F9F9] outline-none w-full' name="client" id="client">
                                <option value="">Add Client</option>
                                {
                                    data?.map((item) => {
                                        return(
                                            <>
                                            <option value={item.supabseUserId}>{item.fullName}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <br />
                        <label className=' text-gray-400 text-sm '>Access</label>
                        <div className='flex items-center mt-2 mb-3' >
                        <span
                        className={`bg-[#FBF5FC] cursor-pointer rounded-3xl px-2 py-1 mx-2 text-[12px] font-semibold ${
                            access.includes('DOCUMENTS') ? 'bg-gray-300 ' : ''
                        }`}
                        onClick={() => handleAccessClick('DOCUMENTS')}
                        >
                        DOCUMENTS
                        </span>
                       
                        <span
                        className={`bg-[#FBF5FC] cursor-pointer rounded-3xl px-2 py-1 mx-2 text-[12px] font-semibold ${
                            access.includes('DASHBOARD') ? 'bg-gray-300 ' : ''
                        }`}
                        onClick={() => handleAccessClick('DASHBOARD')}
                        >
                        DASHBOARD
                        </span>
                       
                        <span
                        className={`bg-[#FBF5FC] cursor-pointer rounded-3xl px-2 py-1 mx-2 text-[12px] font-semibold ${
                            access.includes('ACTION_ITEMS') ? 'bg-gray-300 ' : ''
                        }`}
                        onClick={() => handleAccessClick('ACTION_ITEMS')}
                        >
                        ACTION_ITEMS
                        </span>
                        
                        <span
                        className={`bg-[#FBF5FC] cursor-pointer rounded-3xl px-2 py-1 mx-2 text-[12px] font-semibold ${
                            access.includes('GOAL_PLANNING') ? 'bg-gray-300 ' : ''
                        }`}
                        onClick={() => handleAccessClick('GOAL_PLANNING')}
                        >
                        GOAL_PLANNING
                        </span>
                        
                        <span
                        className={`bg-[#FBF5FC] cursor-pointer rounded-3xl px-2 py-1 mx-2 text-[12px] font-semibold ${
                            access.includes('ALL') ? 'bg-gray-300 ' : ''
                        }`}
                        onClick={() => handleAccessClick('ALL')}
                        >
                        ALL
                        </span>
                        </div>
                        {/* <div className='flex'>{access.map((access) => <span className={`${access === "Documents" ? "bg-gray-100" : "bg-[#F9F9F9]"} p-2 rounded-2xl w-[max-content] mt-2 mb-2 text-sm flex mr-3 cursor-pointer bg-[#F9F9F9]`}>{access}</span>)}</div> */}
                    </div>
                    <div className='cursor-pointer' onClick={closeClientAccessMemberModal}>
                        <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.25" d="M1.5 1.5L10.75 10.75M20 20L10.75 10.75M10.75 10.75L20 1.5L1.5 20" stroke="black" stroke-width="2" />
                        </svg>
                    </div>
                </div>
                <button className='bg-[#4E2357] text-white px-[5px] py-[5px] rounded-xl border-2 w-full mt-2' onClick={closeClientAccessMemberModal}> <small className='mx-2' >Add Access</small></button>
            </Modal>
    </div>
    </>
  )
}

export default ClientAndTeam