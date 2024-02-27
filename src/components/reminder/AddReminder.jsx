import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch , useSelector } from "react-redux";
import { addReminder } from "../../redux/user/user-actions";
import moment from "moment";

const AddReminder = ({setReminderScreen}) => {

  const myState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const[reminderObj , setReminderObj] = useState({
    clientName : "",
    Action : "",
    actionItem : "",
    targetDate : "",
    description : ""

  })

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'targetDate') {
      const parsedDate = moment(value, 'YYYY-MM-DD').toDate();
      const formattedDate = moment(parsedDate).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      
      setReminderObj({
        ...reminderObj,
        [name]: formattedDate,
      });
    } else {
      setReminderObj({
        ...reminderObj,
        [name]: value,
      });
    }
    // setReminderObj((data) => {
    //   return{
    //     ...data,
    //     [name] : value,
    //   }
    // })

    console.log(reminderObj);
  }
  const handleReminder = () => {
    const clientId = myState.organization?.organization[0].id
    dispatch(addReminder(reminderObj , clientId));
  }
  return (
    <div className="add-reminder w-[38vw] bg-white rounded-3xl p-5">
    <div className="flex justify-end mt-2" >
    <FaTimes className="text-xl text-[#cdcdcd] cursor-pointer" onClick={() => setReminderScreen(false)} />
    </div>
    <h3 className="font-medium text-center" >Add Reminder</h3>
    <p className="text-center" >Here you can add a reminder, to do so fill out the form below</p>

    <div className="flex items-center justify-between my-3" >
    <div className="flex flex-col my-3 w-full" >
    <label className="text-sm ms-2 my-2" >Client name</label>
    <select name="clientName" onChange={handleChange} className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" >
        <option value="">Select client</option>
        <option value="option-1">option-1</option>
        <option value="option-2">option-2</option>
    </select>
    </div>
    
    <div className="flex flex-col my-3 mx-3 w-full" >
    <label className="text-sm ms-2 my-2" >Action</label>
    <select name="Action" onChange={handleChange} className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" >
        <option value="">Select action</option>
        <option value="action-1">action-1</option>
        <option value="action-2">action-2</option>
    </select>
    </div>
    </div>

    <div className="flex flex-col my-3" >
    <label className="text-sm ms-2 my-2" >Action item</label>
    <select name="actionItem" onChange={handleChange} className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" >
        <option value="">Select action item</option>
        <option value="actionItem-1">actionItem-1</option>
        <option value="actionItem-2">actionItem-2</option>
    </select>
    </div>
    
    <div className="flex flex-col my-3" >
    <label className="text-sm ms-2 my-2" >Target date</label>
    <input type="text" name="targetDate" value={reminderObj.targetDate} onChange={handleChange} placeholder="Select Target date" onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")} className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" />
    </div>
    
    <div className="flex flex-col my-3" >
    <label className="text-sm ms-2 my-2" >Description</label>
    <textarea name="description" value={reminderObj.description} onChange={handleChange} cols="30" rows="5" placeholder="Enter reminder desription" className="px-5 py-2 bg-[#F5F5F5] rounded-3xl outline-none"></textarea>
    </div>

    <button onClick={handleReminder} className="px-5 py-4 mt-5 bg-[#D0D0D0] w-full rounded-xl outline-none font-medium">Add Reminder</button>

    </div>
  )
}

export default AddReminder