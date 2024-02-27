import { useState } from "react"
import { FaCircleCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setSubscription , getPlans} from "../redux/user/user-actions";
import { useEffect } from "react";
const Subscription = ({setStep , setDisabled}) => {
   
    const dispatch = useDispatch();
    const myState = useSelector((state) => state.user);

    const [subsActive , setSubsActive] = useState(true);

    const handleSubscribeClick = (plan) => {
        dispatch(setSubscription(plan));
        setDisabled(true);
        setStep(2);
      };

      useEffect(() => {
        dispatch(getPlans());
      },[])
  return (
    <section className="subscription w-screen h-screen bg-[#4E2357] pt-5 px-14 absolute top-0 left-0 z-[9999]">
    
    <div className="flex items-center justify-center" >
    <div className="subs-tab-menu inline-flex item-center bg-[#60386a] rounded-[7px] py-[5px] border-2 border-[#7a5682]" >
    <button className={`mx-2 px-10 py-2 rounded-[7px] text-[17px] ${subsActive ? "bg-[#fff] text-[#000] font-medium" : "text-[#fff]"} `} >Every 6 months</button>
    <button className={`mx-2 px-5 py-2 rounded-[7px] text-[17px] ${subsActive ? " font-medium text-[#fff]" : "text-[#fff]"}` } >Yearly</button>
    </div>
    </div>

    <div className="subscription-cards bg-[#4E2357] w-full flex mt-[50px]">
    {
        myState.plans?.map((elem) => {
            return(
                <>
                <div className="card w-[25%] bg-[#4E2357] text-[#fff] py-8 mx-2 px-5 border-2 border-[#4E2357] rounded-2xl hover:bg-[#60386a] hover:border-2 hover:border-[#7a5682] hover:rounded-2xl">
    
    <div className="head min-h-[130px]">
    <h4 className="font-medium pr-4" style={{lineHeight:"30px"}} >Secure Document Storage</h4>
    <p className="text-[#dcdcdc] mt-2 pr-20" >For those looking for simple, safe storage</p>
    </div>
    
    <div className="price mt-6">
    <h1 className="font-bold flex items-center" >$0 <span className="font-normal mx-2 w-[10%]" >per year</span></h1>
    </div>

    <button className="mt-8 bg-white text-black font-medium px-24 py-2 text-[17px] rounded-[6px]" onClick={() => handleSubscribeClick(elem)} >Subscribe</button>


    <div className="subs-includes my-8 text-[#dcdcdc]">
    <p>This includes:</p>
    <ul>
        <li className="my-2 flex items-start">
        <FaCircleCheck className="mr-2 text-[19px]" />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </li>
        <li className="my-2 flex items-start" >
        <FaCircleCheck className="mr-2 text-[19px]" />
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </li>
    </ul>
    </div>
    </div>
                </>
            )
        })
    }
    {/* <div className="card w-[25%] bg-[#4E2357] text-[#fff] py-8 mx-2 px-5 border-2 border-[#4E2357] rounded-2xl hover:bg-[#60386a] hover:border-2 hover:border-[#7a5682] hover:rounded-2xl">
    
    <div className="head min-h-[130px]">
    <h4 className="font-medium pr-4" style={{lineHeight:"30px"}} >Secure Document Storage</h4>
    <p className="text-[#dcdcdc] mt-2 pr-20" >For those looking for simple, safe storage</p>
    </div>
    
    <div className="price mt-6">
    <h1 className="font-bold flex items-center" >$0 <span className="font-normal mx-2 w-[10%]" >per year</span></h1>
    </div>

    <button className="mt-8 bg-white text-black font-medium px-24 py-2 text-[17px] rounded-[6px]" onClick={() => handleSubscribeClick("Secure Document Storage")} >Subscribe</button>


    <div className="subs-includes my-8 text-[#dcdcdc]">
    <p>This includes:</p>
    <ul>
        <li className="my-2 flex items-start">
        <FaCircleCheck className="mr-2 text-[19px]" />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </li>
        <li className="my-2 flex items-start" >
        <FaCircleCheck className="mr-2 text-[19px]" />
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </li>
    </ul>
    </div>
    </div>
    <div className="card w-[25%] bg-[#4E2357] text-[#fff] py-8 px-5 border-2 border-[#4E2357] rounded-2xl hover:bg-[#60386a] hover:border-2 hover:border-[#7a5682] hover:rounded-2xl">
    
    <div className="head min-h-[130px]">
    <h4 className="font-medium mr-2" style={{lineHeight:"30px"}} >Teammate Membership</h4>
    <p className="text-[#dcdcdc] mt-2 pr-20" >An addiional team member to administer estate plans in Mauve.</p>
    </div>
    
    <div className="price mt-6">
    <h1 className="font-bold flex items-center" >$240 <span className="font-normal mx-2 w-[10%]" >per year</span></h1>
    </div>

    <button className="mt-8 bg-white text-black font-medium px-24 py-2 text-[17px] rounded-[6px]"  onClick={() => handleSubscribeClick("Teammate Membership")} >Subscribe</button>

    <div className="subs-includes my-8 text-[#dcdcdc]">
    <p>This includes:</p>
    <ul>
        <li className="my-2 flex items-start">
        <FaCircleCheck className="mr-2 text-[19px]" />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </li>
        <li className="my-2 flex items-start" >
        <FaCircleCheck className="mr-2 text-[19px]" />
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </li>
        <li className="my-2 flex items-start" >
        <FaCircleCheck className="mr-2 text-[19px]" />
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </li>
    </ul>
    </div>
    </div>
    <div className="card w-[25%] bg-[#4E2357] mx-2 text-[#fff] py-8 px-5 border-2 border-[#4E2357] rounded-2xl hover:bg-[#60386a] hover:border-2 hover:border-[#7a5682] hover:rounded-2xl">
    
    <div className="head min-h-[130px]">
    <h4 className="font-medium pr-4" style={{lineHeight:"30px"}} >Mauve Estate Planning Subscription</h4>
    <p className="text-[#dcdcdc] mt-2 pr-20" >All the services you need to onboard clients and manage estates.</p>
    </div>
    
    <div className="price mt-6">
    <h1 className="font-bold flex items-center" >$2,400 <span className="font-normal mx-2 w-[10%]" >per year</span></h1>
    </div>

    <button className="mt-8 bg-white text-black font-medium px-24 py-2 text-[17px] rounded-[6px]" onClick={() => handleSubscribeClick("Mauve Estate Planning Subscription")}>Subscribe</button>

    <div className="subs-includes my-8 text-[#dcdcdc]">
    <p>This includes:</p>
    <ul>
        <li className="my-2 flex items-start">
        <FaCircleCheck className="mr-2 text-[19px]" />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </li>
        <li className="my-2 flex items-start" >
        <FaCircleCheck className="mr-2 text-[19px]" />
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </li>
        <li className="my-2 flex items-start" >
        <FaCircleCheck className="mr-2 text-[19px]" />
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </li>
        <li className="my-2 flex items-start" >
        <FaCircleCheck className="mr-2 text-[19px]" />
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </li>
    </ul>
    </div>
    </div>
    <div className="card w-[25%] bg-[#4E2357] mx-2 text-[#fff] py-8 px-5 border-2 border-[#4E2357] rounded-2xl hover:bg-[#60386a] hover:border-2 hover:border-[#7a5682] hover:rounded-2xl">
    
    <div className="head min-h-[130px]">
    <h4 className="font-medium pr-4" style={{lineHeight:"30px"}} >Enterprise Onboarding</h4>
    <p className="text-[#dcdcdc] mt-2 pr-20" >For sophisticated clients looking for volume discounts and priority service</p>
    </div>
    
    <div className="price mt-6">
    <h1 className="font-bold flex items-center min-h-[50px]" ></h1>
    </div>

    <button className="mt-8 bg-white text-black font-medium px-24 py-2 text-[17px] rounded-[6px]" onClick={() => handleSubscribeClick("Enterprise Onboarding")} >Subscribe</button>

    <div className="subs-includes my-8 text-[#dcdcdc]">
    <p>This includes:</p>
    <ul>
        <li className="my-2 flex items-start">
        <FaCircleCheck className="mr-2 text-[19px]" />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </li>
        <li className="my-2 flex items-start" >
        <FaCircleCheck className="mr-2 text-[19px]" />
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </li>
    </ul>
    </div>
    </div> */}
    </div>
    </section>
  )
}

export default Subscription