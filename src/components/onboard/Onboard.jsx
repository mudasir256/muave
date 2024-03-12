import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import WealthBox from '../../assets/images/wealthbox.svg';
import SalesForce from '../../assets/images/Salesforce.svg';
import { inviteTeam } from "../../redux/user/user-actions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Onboard = ({setOnboardScreen}) => {

    const [tabMenu , setTabMenu] = useState("email");
    const [importChecked , setImportChecked] = useState(false);
    // fullName, email, description, willBased, trustBased,
    const [fullName , setFullname] = useState("");
    const [email , setEmail] = useState("");
    const [description , setDescription] = useState("");
    const [contactNo , setContactNo] = useState("");
    const [willBased , setWillBased] = useState(false);
    const [trustBased , setTrustBased] = useState(false);


    const dispatch = useDispatch();
    const myState = useSelector((state) => state.user);

    const handleInvite = async (type) => {
      try {
        await dispatch(inviteTeam({fullName, email, description, willBased, trustBased, type, contactNo}));
        setOnboardScreen(false);
      } catch (error) {
        console.error('Error in handleInvite:', error);
      }
    }

  return (
    <div className=" w-[46vw] bg-white rounded-3xl p-5" >
    <div className="flex justify-end mt-2" >
    <FaTimes className="text-xl text-[#cdcdcd] cursor-pointer" onClick={() => setOnboardScreen(false)} />
    </div>

    <h4 className="font-medium text-center" >Onboard Client</h4>

    <div className="onboard-tabs w-full rounded-[30px] py-[5px] bg-[#fff] border-2 border-[#F9F6F9] px-[6px] mt-4 flex justify-between items-center">
        <button className={`${tabMenu === "email" ? "bg-[#F9F6F9]" : "" } ${tabMenu === "email" ? "text-[#4E2357]" : "" } font-medium rounded-3xl px-16 py-2`} onClick={() => {setTabMenu("email"); setFullname(""); setDescription(""); setEmail(""); setWillBased(""); setTrustBased(""); }}>Email</button>
        <button className={`${tabMenu === "manually" ? "bg-[#F9F6F9]" : "" } ${tabMenu === "manually" ? "text-[#4E2357]" : "" } font-medium rounded-3xl px-16 py-2`} onClick={() => {setTabMenu("manually"); setFullname(""); setDescription(""); setEmail(""); setWillBased(""); setTrustBased("");} }>Manually</button>
        <button className={`${tabMenu === "import" ? "bg-[#F9F6F9]" : "" } ${tabMenu === "import" ? "text-[#4E2357]" : "" } font-medium rounded-3xl px-16 py-2`} onClick={() => {setTabMenu("import")} }>Import</button>

    </div>
    {/* Onboard By Email */}
    {
    tabMenu === "email" ? 
    <>
    <div className="onboard-by-email">
    <div className="onboard-by-email">
    <p className="text-center my-10 px-5 text-[#8A8A8A]">Mauve can send an invite for the client to onboard and provide their information. This includes: family history, assets and life plans & goals. You can preview a message before inviting.</p>
    <div className="flex flex-col my-5" >
    <label className="text-sm ms-2 my-2" >Client’s  Name (this is how the client will be referred to):</label>
    <input className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none" type="text" name="fullName" value={fullName} onChange={(e) => setFullname(e.target.value)}  placeholder="Enter full name client"/>
    </div>
    
    <div className="flex flex-col my-5" >
    <label className="text-sm ms-2 my-2" >Client’s email address</label>
    <input className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none" type="text" name="clientEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter client email"/>
    </div>
    
    <div className="flex flex-col my-5" >
    <label className="text-sm ms-2 my-2">Introduction to client</label>
    <textarea className="px-5 py-2 bg-[#F5F5F5] rounded-3xl outline-none" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter introduction to client" cols="30" rows="4"></textarea>
    <small className="text-end my-1 text-[#4E2357] text-[14px]">Generate body text</small>
    </div>

    <div className="onboard-email-checks flex">
        <div className="flex " >
        <input type="checkbox" checked={willBased} onChange={(e) => setWillBased(e.target.checked)} />
        <p className="mx-1" >Will-Based Estate Plan</p>
        </div>
        <div className="flex mx-3" >
        <input type="checkbox" checked={trustBased} onChange={(e) => setTrustBased(e.target.checked)}  />
        <p className="mx-1" >Trust-Based Estate Plan</p>
        </div>
    </div>
    {
      myState.loading ? 
      <button className="px-5 py-3 mt-5 bg-[#4E2357] text-white w-full rounded-3xl outline-none">
        <svg className='relative  left-[50%]' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 200 200"><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
      </button>
      :
      <button className="px-5 py-3 mt-5 bg-[#4E2357] text-white w-full rounded-3xl outline-none" onClick={() => handleInvite(tabMenu)} >Send Invite</button>
    }
   </div>
    </div>
    </>
    :""
    }

    {/* Onboard Manually */}
    {
    tabMenu === "manually" ? 
    <>
    <div className="onboard-manually">
    <div className="onboard-manually">
    <p className="text-center my-7 px-5 text-[#8A8A8A]" >This will onboard a client to Mauve in private. Use this if you want to add beneficiaries, family, or estate details separately. You can request a client to onboard at any time with the inputted information saved and reflected in their onboarding.</p>
    <div className="flex flex-col my-3" >
    <label className="text-sm ms-2 my-2" >Client’s Name</label>
    <input className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" value={fullName} onChange={(e) => setFullname(e.target.value)} type="text" placeholder="Enter client name" />
    </div>
{/*     
    <div className="flex flex-col my-3" >
    <label className="text-sm ms-2 my-2" >Estate Name</label>
    <input className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" type="text" placeholder="Enter estate name " />
    </div> */}

    <div className="flex items-center justify-between" >
    <div className="flex flex-col my-3 w-full" >
    <label className="text-sm ms-2 my-2" >Email address (optional)</label>
    <input className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Enter email here" />
    </div>
    
    <div className="flex flex-col my-3 mx-3 w-full" >
    <label className="text-sm ms-2 my-2" >Phone Number (optional)</label>
    <input className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" type="text" value={contactNo} onChange={(e) => setContactNo(e.target.value)} placeholder="Enter phone number" />
    </div>
    </div>
    {
      myState.loading ? 
      <button className="px-5 py-3 mt-5 bg-[#4E2357] text-white w-full rounded-3xl outline-none">
        <svg className='relative  left-[50%]' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 200 200"><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
      </button>
      :
      <button className="px-5 py-3 mt-5 bg-[#4E2357] text-white w-full rounded-3xl outline-none" onClick={() => handleInvite(tabMenu)} >Send Invite</button>
    }
    </div>
    </div>
    </>
    :""
    }

    {/* Onboard by Import */}
    {tabMenu === "import" ? (
        <>
          <div className="onboard-by-import">
            <p className="text-center my-7 px-5 text-[#8A8A8A]">
              Import your client accounts through the supported CRMs. If you
              would like to integrate your CRM to Mauve, please contact us.
            </p>
            <div className="flex justify-between items-start my-6">
              <div
                className={`rounded-3xl border-2 ${
                  importChecked ? "bg-[#FBF5FC]" : ""
                } border-[#EEECEC] p-6 w-full flex flex-col justify-evenly ms-5 min-h-[150px]`}
              >
                <div className="flex">
                  <input
                    type="radio"
                    onClick={() => setImportChecked(true)}
                    checked={importChecked}
                    name="onboard-import"
                    id=""
                    className="w-[17px] h-[17px]"
                  />
                </div>
                <div className="flex justify-center items-center">
                  <img
                    className="min-h-[90px]"
                    src={WealthBox}
                    alt=""
                  />
                </div>
              </div>

              <div
                className={`rounded-3xl border-2 ${
                  !importChecked ? "bg-[#FBF5FC]" : ""
                } border-[#EEECEC] p-6 w-full flex flex-col justify-evenly ms-5 min-h-[150px]`}
              >
                <div className="flex">
                  <input
                    type="radio"
                    onClick={() => setImportChecked(false)}
                    checked={!importChecked}
                    name="onboard-import"
                    id=""
                    className="w-[17px] h-[17px]"
                  />
                </div>
                <div className="flex justify-center">
                  <img
                    className="min-h-[90px]"
                    src={SalesForce}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <button className="px-5 py-3 mt-5 bg-[#4E2357] text-white w-full rounded-3xl outline-none">
              Send Invite
            </button>
          </div>
        </>
      ) : (
        ""
      )}


    </div>
  )
}

export default Onboard