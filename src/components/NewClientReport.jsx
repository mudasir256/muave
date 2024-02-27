import { FaTimes } from "react-icons/fa";

const NewClientReport = ({setNewClientReport}) =>  {
  return (
    <div className=" w-[38vw] bg-white rounded-3xl p-5" >
    <div className="flex justify-end mt-2" >
    <FaTimes className="text-xl text-[#cdcdcd] cursor-pointer" onClick={() => setNewClientReport(false)} />
    </div>
    <h4 className="font-medium text-center" >Create a new client report</h4>

    <div className="onboard-by-email">
    <p className="text-center my-10 px-5 text-[#8A8A8A]">Mauve can send an invite for the client to onboard and provide their information. This includes: family history, assets and life plans & goals. You can preview a message before inviting.</p>
    <div className="flex flex-col my-5" >
    <label className="text-sm ms-2 my-2" >Report name</label>
    <input className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none" type="text" placeholder="Enter full name client" />
    </div>
    
    <div className="flex flex-col my-5" >
    <label className="text-sm ms-2 my-2" >Select Client</label>
    <select className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none" type="text" placeholder="Enter report name">
        <option value="">Select Client</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select>
    </div>

    <div className="flex flex-col my-5">
    <label className="text-sm ms-2 my-2" >Section</label>
    <div className="my-2 flex flex-wrap" >
        <span className="py-2 px-5 m-2 bg-[#F9F6F9] rounded-3xl" >Goal Planning</span>
        <span className="py-2 px-5 m-2 bg-[#F9F6F9] rounded-3xl" >Asset Overview</span>
        <span className="py-2 px-5 m-2 bg-[#F9F6F9] rounded-3xl" >Estate Diagram</span>
        <span className="py-2 px-5 m-2 bg-[#F9F6F9] rounded-3xl" >Beneficiaries</span>
        <span className="py-2 px-5 m-2 bg-[#F9F6F9] rounded-3xl" >Family Tree</span>
        <span className="py-2 px-5 m-2 bg-[#F9F6F9] rounded-3xl" >Action Items</span>
        <span className="py-2 px-5 m-2 bg-[#F9F6F9] rounded-3xl" >Documents</span>
    </div>
    </div>


    <button className="px-5 py-3 mt-5 bg-[#4E2357] text-white w-full rounded-3xl outline-none" >Send Invite</button>
    </div>
    </div>
  )
}

export default NewClientReport