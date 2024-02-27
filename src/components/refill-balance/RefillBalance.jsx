import { FaTimes } from "react-icons/fa";

const RefillBalance = ({setRefillBal}) => {
  return (
    <div className=" w-[65vw] bg-white rounded-3xl p-5" >
    <div className="flex justify-end mt-2" >
    <FaTimes className="text-xl text-[#cdcdcd] cursor-pointer" onClick={() => setRefillBal(false)} />
    </div>
    <h4 className="font-medium text-center" >Refill balance</h4>
    <div className="flex items-start justify-between refill-parent my-3" >
    <div className="active-licenses w-[68%] flex flex-col">
        <div className="active-license p-6 border-2 border-[#cscscs] rounded-3xl my-3">
            <div className="flex justify-between items-center font-medium" >
            <div className="flex" >
            <input type="radio" name="license" id="" />
            <div className="mx-4" >
            <h6>Active License</h6>
            <small className="text-[#cdcdcd]" >Annual payment</small>
            </div>
            </div>
            <p className="font-bold" >6 credits (2.400$)</p>
            </div>
        </div>
        <div className="active-license p-6 border-2 border-[#cscscs] rounded-3xl my-3">
            <div className="flex justify-between items-center font-medium" >
            <div className="flex" >
            <input type="radio" name="license" id="" />
            <div className="mx-4" >
            <h6>Active License</h6>
            <small className="text-[#cdcdcd]" >Annual payment</small>
            </div>
            </div>
            <p className="font-bold" >6 credits (2.400$)</p>
            </div>
        </div>
        <div className="active-license p-6 border-2 border-[#cscscs] rounded-3xl my-3">
            <div className="flex justify-between items-center font-medium" >
            <div className="flex" >
            <input type="radio" name="license" id="" />
            <div className="mx-4" >
            <h6>Active License</h6>
            <small className="text-[#cdcdcd]" >Annual payment</small>
            </div>
            </div>
            <p className="font-bold" >6 credits (2.400$)</p>
            </div>
        </div>
        <div className="active-license p-6 border-2 border-[#cscscs] rounded-3xl my-3">
            <div className="flex justify-between items-center font-medium" >
            <div className="flex" >
            <input type="radio" name="license" id="" />
            <div className="mx-4" >
            <h6>Active License</h6>
            <small className="text-[#cdcdcd]" >Annual payment</small>
            </div>
            </div>
            <p className="font-bold" >6 credits (2.400$)</p>
            </div>
        </div>
    </div>
    <div className="checkout w-[30%] px-4 py-6 bg-[#F4F4F4] rounded-3xl flex flex-col" >
    <button className="text-[19px] font-bold bg-white px-5 py-3 rounded-3xl"  >Checkout for 2.400$</button>
    <p className="flex items-center my-3" >
        <small className="inline-block w-[45%] h-[1px] bg-[#cdcdcd]"></small>
        <span className="mx-2" >OR</span>
        <small className="inline-block w-[45%] h-[1px] bg-[#cdcdcd]"></small>
    </p>
    <button className="text-[19px] font-bold bg-white px-5 py-3 rounded-3xl" >Subscription</button>
    </div>
    </div>
    </div>
  )
}

export default RefillBalance