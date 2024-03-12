import { FaEllipsisH , FaCheck , FaChevronUp , FaChevronDown } from "react-icons/fa";
import DateImg from '../../../assets/images/calendar.svg'
import { useState } from "react";

const GoalPlanning = () => {

    const [moreInfo , setMoreInfo] = useState(true);
    const [dropdown , setDropdown] = useState(false);

    const handleMoreInfo = (id) => {
        setMoreInfo(!moreInfo);
    }

    const handleDropdown = (id) => {
        setDropdown(!dropdown)
    }
  return (
    <>
    <section className="client-goal-plan">
        <div className="flex items-center justify-between" >
            <div>
            <h4>Goal Planning <small>i</small> </h4>
            <small className="tetx-[##9ca3af]" >Last Updated 10/17/23 2:39:42 PM I</small>
            </div>
            <button className="rounded-[50px] bg-[#FBF5FC] border-2 border-[#EAE0EC] px-5 py-2 font-semibold hover:bg-[#4E2357] hover:text-white hover:border-[#FBF5FC]">Add Goal</button>
        </div>

        <div className="goal-plan-body bg-white rounded-3xl  px-5 py-8" >

        <div className="flex items-center justify-between">
        <div className="w-[48%] border border-[#FBF5FC] rounded-3xl bg-[#FFFDFF] p-4 my-4" >
            <div className="flex items-center justify-between" >
                <div className="flex items-center" >
                {/* <img src={avatar will come} alt="" /> */}
                <p>Faizan</p>
                </div>
                <div className="relative" >
                <FaEllipsisH onClick={handleDropdown} className="text-[#E3E3E3] text-[18px] cursor-pointer" />
                {
                    dropdown &&
                    <div className="absolute left-[-30px] top-[20px] bg-white px-2 py-4 rounded-2xl border-2" >
                <ul>
                    <li className="mt-2 mx-2  pb-2 border-b" >Edit</li>
                    <li className="mt-2 mx-2 pb-2" >Download</li>
                </ul>
                </div>
                }
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between pb-3 border-b-2 border-[#FBF5FC]">
            <div className="flex flex-col">
            <div className="flex items-center" >
            <div className="mr-3 border-2 border-[#EAE0EC] p-2 bg-[#FBF5FC] text-[22px] rounded-[50%] text-[#000]" >
            <FaCheck/>
            </div>
            <h5>Asset Update</h5>
            </div>
            <small className="text-[#8A8A8A] mt-5 ms-3" >AI-Based Recommendation</small>
            </div>
            <p className="px-6 py-1 bg-[#FFF7F3] text-[#A4562A] rounded-[40px]" >priority</p>
            </div>

            <div className="flex items-center justify-between goal-plan-date mt-6 pb-3 border-b-2 border-[#FBF5FC]" >
            <p className="text-[#8A8A8A]" >Discuss by Date:</p>
            <p className="flex items-center"> <img src={DateImg} className="mr-3" alt="calendar" /> 24.02.2024</p>
            </div>

            <div className="goal-plan-desc mt-6 pb-3 border-b-2 border-[#FBF5FC]" >
            <p className="text-[#8A8A8A]" >Description</p>
            <small>Sale or liquidation of major assets. Consider updating advisor.</small>
            </div>

            {
                moreInfo && 
                <div className="goal-plan-notes mt-6 pb-3 border-b-2 border-[#FBF5FC]">
                <p className="text-[#8A8A8A]" >Notes</p>
                <small>-</small>
                </div>
            }
            {
                moreInfo ? 
                <button className="mt-4 font-semibold flex items-center text-[#4E2357]" onClick={handleMoreInfo}> Hide <FaChevronUp className="ms-3" /> </button>
                :
                <button className="mt-4 font-semibold flex items-center text-[#4E2357]" onClick={handleMoreInfo}> view more information <FaChevronDown className="ms-3" /> </button>
            }
        </div>


        <div className="w-[48%] border border-[#FBF5FC] rounded-3xl bg-[#FFFDFF] p-4 my-4" >
            <div className="flex items-center justify-between" >
                <div className="flex items-center" >
                {/* <img src={avatar will come} alt="" /> */}
                <p>Faizan</p>
                </div>
                <FaEllipsisH className="text-[#E3E3E3] text-[18px]" />
            </div>

            <div className="mt-6 flex items-center justify-between pb-3 border-b-2 border-[#FBF5FC]">
            <div className="flex flex-col">
            <div className="flex items-center" >
            <div className="mr-3 border-2 border-[#EAE0EC] p-2 bg-[#FBF5FC] text-[22px] rounded-[50%] text-[#000]" >
            <FaCheck/>
            </div>
            <h5>Asset Update</h5>
            </div>
            <small className="text-[#8A8A8A] mt-5 ms-3" >AI-Based Recommendation</small>
            </div>
            <p className="px-6 py-1 bg-[#FFF7F3] text-[#A4562A] rounded-[40px]" >priority</p>
            </div>

            <div className="flex items-center justify-between goal-plan-date mt-6 pb-3 border-b-2 border-[#FBF5FC]" >
            <p className="text-[#8A8A8A]" >Discuss by Date:</p>
            <p className="flex items-center"> <img src={DateImg} className="mr-3" alt="calendar" /> 24.02.2024</p>
            </div>

            <div className="goal-plan-notes mt-6 pb-3 border-b-2 border-[#FBF5FC]">
            <p className="text-[#8A8A8A]" >Description</p>
            <small>-</small>
            </div>

            {
                moreInfo && 
                <div className="goal-plan-notes mt-6 pb-3 border-b-2 border-[#FBF5FC]">
                <p className="text-[#8A8A8A]" >Notes</p>
                <small>-</small>
                </div>
            }
            {
                moreInfo ? 
                <button className="mt-4 font-semibold flex items-center text-[#4E2357]" onClick={handleMoreInfo}> Hide <FaChevronUp className="ms-3" /> </button>
                :
                <button className="mt-4 font-semibold flex items-center text-[#4E2357]" onClick={handleMoreInfo}> view more information <FaChevronDown className="ms-3" /> </button>
            }
        </div>
        </div>

        <div className="flex items-center justify-between" >
        <div className="w-[48%] border border-[#FBF5FC] rounded-3xl bg-[#FFFDFF] p-4 my-4" >
            <div className="flex items-center justify-between" >
                <div className="flex items-center" >
                {/* <img src={avatar will come} alt="" /> */}
                <p>Faizan</p>
                </div>
                <FaEllipsisH className="text-[#E3E3E3] text-[18px]" />
            </div>

            <div className="mt-6 flex items-center justify-between pb-3 border-b-2 border-[#FBF5FC]">
            <div className="flex flex-col">
            <div className="flex items-center" >
            <div className="mr-3 border-2 border-[#EAE0EC] p-2 bg-[#FBF5FC] text-[22px] rounded-[50%] text-[#000]" >
            <FaCheck/>
            </div>
            <h5>Asset Update</h5>
            </div>
            <small className="text-[#8A8A8A] mt-5 ms-3" >AI-Based Recommendation</small>
            </div>
            <p className="px-6 py-1 bg-[#FFF7F3] text-[#A4562A] rounded-[40px]" >priority</p>
            </div>

            <div className="flex items-center justify-between goal-plan-date mt-6 pb-3 border-b-2 border-[#FBF5FC]" >
            <p className="text-[#8A8A8A]" >Discuss by Date:</p>
            <p className="flex items-center"> <img src={DateImg} className="mr-3" alt="calendar" /> 24.02.2024</p>
            </div>
            
            <div className="goal-plan-notes mt-6 pb-3 border-b-2 border-[#FBF5FC]">
            <p className="text-[#8A8A8A]" >Description</p>
            <small>-</small>
            </div>

            {
                moreInfo && 
                <div className="goal-plan-notes mt-6 pb-3 border-b-2 border-[#FBF5FC]">
                <p className="text-[#8A8A8A]" >Notes</p>
                <small>-</small>
                </div>
            }
            {
                moreInfo ? 
                <button className="mt-4 font-semibold flex items-center text-[#4E2357]" onClick={handleMoreInfo}> Hide <FaChevronUp className="ms-3" /> </button>
                :
                <button className="mt-4 font-semibold flex items-center text-[#4E2357]" onClick={handleMoreInfo}> view more information <FaChevronDown className="ms-3" /> </button>
            }
        </div>



        <div className="w-[48%] border border-[#FBF5FC] rounded-3xl bg-[#FFFDFF] p-4 my-4" >
            <div className="flex items-center justify-between" >
                <div className="flex items-center" >
                {/* <img src={avatar will come} alt="" /> */}
                <p>Faizan</p>
                </div>
                <FaEllipsisH className="text-[#E3E3E3] text-[18px]" />
            </div>

            <div className="mt-6 flex items-center justify-between pb-3 border-b-2 border-[#FBF5FC]">
            <div className="flex flex-col">
            <div className="flex items-center" >
            <div className="mr-3 border-2 border-[#EAE0EC] p-2 bg-[#FBF5FC] text-[22px] rounded-[50%] text-[#000]" >
            <FaCheck/>
            </div>
            <h5>Asset Update</h5>
            </div>
            <small className="text-[#8A8A8A] mt-5 ms-3" >AI-Based Recommendation</small>
            </div>
            <p className="px-6 py-1 bg-[#FFF7F3] text-[#A4562A] rounded-[40px]" >priority</p>
            </div>

            <div className="flex items-center justify-between goal-plan-date mt-6 pb-3 border-b-2 border-[#FBF5FC]" >
            <p className="text-[#8A8A8A]" >Discuss by Date:</p>
            <p className="flex items-center"> <img src={DateImg} className="mr-3" alt="calendar" /> 24.02.2024</p>
            </div>

            <div className="goal-plan-desc mt-6 pb-3 border-b-2 border-[#FBF5FC]" >
            <p className="text-[#8A8A8A]" >Description</p>
            <small>Sale or liquidation of major assets. Consider updating advisor.</small>
            </div>

            {
                moreInfo && 
                <div className="goal-plan-notes mt-6 pb-3 border-b-2 border-[#FBF5FC]">
                <p className="text-[#8A8A8A]" >Notes</p>
                <small>-</small>
                </div>
            }
            {
                moreInfo ? 
                <button className="mt-4 font-semibold flex items-center text-[#4E2357]" onClick={handleMoreInfo}> Hide <FaChevronUp className="ms-3" /> </button>
                :
                <button className="mt-4 font-semibold flex items-center text-[#4E2357]" onClick={handleMoreInfo}> view more information <FaChevronDown className="ms-3" /> </button>
            }
        </div>
        </div>
        </div>
    </section>
    </>
  )
}

export default GoalPlanning