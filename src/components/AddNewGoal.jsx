import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector , useDispatch } from "react-redux";
import { addGoal } from "../redux/user/user-actions";
import toast from "react-hot-toast";

const AddNewGoal = ({setAddGoalScreen}) => {

    const dispatch = useDispatch();
    const myState = useSelector((state) => state.user);
    
    const [clientId , setClientId] = useState("");
    const [name , setName] = useState("");
    const [priority , setPriority] = useState("");
    const [notes , setNotes] = useState("");
    const [date , setDate] = useState("");
    const [description , setDescription] = useState("");

    const handleGoal = async () => {
        if(!name){
            toast.error("Please enter client name");
        }
        else{
            await dispatch(addGoal({name , priority , date , description , notes , clientId}));
            setAddGoalScreen(false);
        }
    }

  return (
    <div className="add-reminder w-[38vw] bg-white rounded-3xl p-5">
    <div className="flex justify-end mt-2" >
    <FaTimes className="text-xl text-[#cdcdcd] cursor-pointer" onClick={() => setAddGoalScreen(false)} />
    </div>

    <h3 className="font-medium text-center my-2" >Create Goal</h3>
    <p className="text-center my-3 px-5 text-[#8A8A8A]">
    Mauve can send an invite for the client to onboard and provide their information. This includes: family history, assets and life plans & goals. You can preview a message before inviting.
    </p>

    <div className="flex flex-col my-1 w-full" >
    <label className="text-sm ms-2 my-2" >Client</label>
    <select onChange={(e) => setClientId(e.target.value)} name="clientId" value={clientId} className="px-5 py-[15px] bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" >
    <option value="">Select Client Name</option>
    {myState.organization?.map((elem) => (
      <option key={elem.id} value={elem.id}>
        {elem.fullName}
      </option>
    ))}
    </select>
    </div>

    <div className="flex flex-col my-1 w-full" >
    <label className="text-sm ms-2 my-2" >Goal Name</label>
    <input className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter goal name"/>
    </div>

    <div className="flex items-center justify-between" >
    <div className="flex flex-col my-1 w-[49%]" >
    <label className="text-sm ms-2 my-2" >Priority</label>
    <select onChange={(e) => setPriority(e.target.value)} name="priority" value={priority} className="px-5 py-[11px] bg-[#F5F5F5] rounded-[40px] outline-none text-[13px]" >
    <option value="">Select Priority</option>
    <option value="High">High</option>
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    </select>
    </div>

    <div className="flex items-center justify-between my-1 w-[49%]" >
    <div className="flex flex-col my-1 w-full" >
    <label className="text-sm ms-2 my-2" >Set Date</label>
    <input type="date" onChange={(e) => setDate(e.target.value)} name="date" className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none text-[13px] w-full" />
    </div>
    </div>
    </div>

    <div className="flex flex-col my-1" >
    <label className="text-sm ms-2 my-2">Description</label>
    <textarea className="px-5 py-2 bg-[#F5F5F5] rounded-3xl outline-none" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter introduction to client" cols="30" rows="4"></textarea>
    </div>
   
    <div className="flex flex-col my-1" >
    <label className="text-sm ms-2 my-2">Notes(optional)</label>
    <textarea className="px-5 py-2 bg-[#F5F5F5] rounded-3xl outline-none" name="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Enter Notes" cols="30" rows="4"></textarea>
    </div>

    {
      myState.loading ? 
      <button className="px-5 py-3 mt-5 bg-[#4E2357] text-white w-full rounded-3xl outline-none">
        <svg className='relative  left-[50%]' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 200 200"><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
      </button>
      :
      <button className="px-5 py-3 mt-5 bg-[#4E2357] text-white w-full rounded-3xl outline-none" onClick={() => handleGoal()} >Create Goal</button>
    }
    

    </div>
  )
}

export default AddNewGoal