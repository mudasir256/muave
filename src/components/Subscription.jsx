import { useState } from "react"
import { FaCircleCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setSubscription , getPlans} from "../redux/user/user-actions";
import { FaAngleLeft } from "react-icons/fa6";
import { useEffect } from "react";
const Subscription = ({setStep , setDisabled}) => {
   
    

    const [subsActive , setSubsActive] = useState("");

    useEffect(() => {
        setSubsActive("month");
    },[])
   
  return (
    <section className="subscription w-screen h-screen bg-[#4E2357] pt-16 px-14 absolute top-0 left-0 z-[9999]">
    
    <div className="flex items-center justify-between relative" >
    <button className="absolute top-[5px] bg-white rounded-[30px] px-3 py-2 font-bold flex items-center" onClick={() => setStep(1)} > <FaAngleLeft className="mr-1 mt-[2px]" /> Back</button>
    <div></div>
    </div>
    <stripe-pricing-table
    pricing-table-id="prctbl_1OrkMIHul8zrVwWFWZA6Aune"
    publishable-key="pk_test_51OXgQcHul8zrVwWFbmkvMabv35GRshWGTe0TaLMQyyCpBRrr6lT9mQkMXvq2uF2NJH8HFzCuDFGuGa6RnzjP0A5400Rz1TCFHk">
    </stripe-pricing-table>

    </section>
    

  )
}

export default Subscription