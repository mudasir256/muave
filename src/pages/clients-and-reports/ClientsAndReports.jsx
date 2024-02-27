import TableIcon from '../../assets/images/table-icon.svg';
import Dots from '../../assets/images/dots.svg'
import NewClientReport from '../../components/NewClientReport';
import Onboard from '../../components/onboard/Onboard';
import NewClientLogo from '../../assets/images/add-new-client.svg';
import ReportsIconLogo from '../../assets/images/create-client-report.svg'; 
import { FaMagnifyingGlass } from "react-icons/fa6";



import { useState } from 'react';
const ClientsAndReports = () => {
    const[allClients , setAllClients] = useState(true)
    const[allReports , setAllReports] = useState(false)
    const[onBoardScreen , setOnboardScreen] = useState(false)
    const [NewClientReportt , setNewClientReport] = useState(false);
    return (
    <>
    <section className="client-and-reports h-full">
    {onBoardScreen &&
    <div className='h-full w-full flex items-center justify-center bg-[#cdcdcd8f] absolute left-0 top-0' >
    <Onboard setOnboardScreen={setOnboardScreen} />
    </div> 
    }
    {NewClientReportt &&
    <div className='h-full w-full flex items-center justify-center bg-[#cdcdcd8f] absolute left-0 top-0' >
    <NewClientReport setNewClientReport={setNewClientReport} />
    </div> 
    }
    <div className="client-and-reports-header flex justify-between items-center">
        <div>
          <h2>Clients & Reports</h2>
        </div>
      </div>

    <div className='p-5 rounded-3xl bg-white my-10' >
    <div className='flex items-center justify-between' >
    <div className="inline-flex items-start py-[7px] px-2 client-and-reports-tabs  rounded-[40px] border-2  font-medium my-[20px]">
        <button onClick={() => {setAllClients(true); setAllReports(false)}} className={`flex flex-col ${allClients ? "text-[#4E2357]" : "text-[#828282]"} ${allClients ? "bg-[#F9F6F9]" : ""} px-6 py-2 rounded-3xl`} >All clients</button>
        <button onClick={() => {setAllReports(true); setAllClients(false)}} className={`flex flex-col ${allReports ? "text-[#4E2357]" : "text-[#828282]"} ${allReports ? "bg-[#F9F6F9]" : ""} px-6 py-2 rounded-3xl`} >Reports </button>
    </div>
    <div>
    {
        allClients ? 
        <button className='bg-[#4E2357] text-white px-5 py-3 mx-3 rounded-3xl font-medium flex items-center ' onClick={() => setOnboardScreen(true)} > <img src={NewClientLogo} alt="" className='mr-3' /> Add New Client</button>
        :
        <button className='bg-[#4E2357] text-white px-5 py-3 mx-3 rounded-3xl font-medium flex items-center' onClick={() => setNewClientReport(true)}>  <img src={ReportsIconLogo} alt="" className='mr-3' />Create a client report </button>
    }
    </div>
    </div>

      <div className='' >
        <FaMagnifyingGlass className='relative top-[28px] left-[20px]' />
        <input type="text" placeholder="Search clients" className=" py-3 px-12 bg-[#F9F9F9] rounded-3xl w-full outline-none"  />
      </div>

    {/* for clients */}
    {
        allClients ? 
        <table class="table-auto w-full border-separate border-spacing-y-[30px] border-spacing-x-[10px] text-[12px]">
        <thead>
            <tr className="border text-[#8A8A8A]" >
            <th className="text-start font-normal" >Client name </th>
            <th className="text-start font-normal" >Estate Name </th>
            <th className="text-start font-normal" >Est. Net Worth </th>
            <th className="text-start font-normal" >E-Mail</th>
            <th className="text-start font-normal" >Phone Number</th>
            <th className="text-start font-normal">Last Updated </th>
            <th className="text-start font-normal">Invation Status</th>
            </tr>
        </thead>
        <tbody className="docuemnt-tbody" >
            <tr className='' >
            <td>Daniel Grasso</td>
            <td>Grasso Family</td>
            <td>$117,050,000</td>
            <td>danielgrasso@gmail.com</td>
            <td>+1 (123) 456-7891</td>
            <td>15.01.2024</td>
            <td><p className='bg-[#F7F4FF] text-[#495DC5] px-4 py-2 font-medium  rounded-3xl inline' >Pending</p></td>
            <td><img src={Dots} alt="" /></td>
            </tr>
            <tr className='' >
            <td>Daniel Grasso</td>
            <td>Grasso Family</td>
            <td>$117,050,000</td>
            <td>danielgrasso@gmail.com</td>
            <td>+1 (123) 456-7891</td>
            <td>15.01.2024</td>
            <td><p className='bg-[#F5FFF4] text-[#5E861F] px-4 py-2 font-medium  rounded-3xl inline' >Active</p></td>
            <td><img src={Dots} alt="" /></td>
            </tr>
            <tr className='' >
            <td>Daniel Grasso</td>
            <td>Grasso Family</td>
            <td>$117,050,000</td>
            <td>danielgrasso@gmail.com</td>
            <td>+1 (123) 456-7891</td>
            <td>15.01.2024</td>
            <td><p className='bg-[#F0FBFD] text-[#2688B1] px-4 py-2 font-medium  rounded-3xl inline' >Archive</p></td>
            <td><img src={Dots} alt="" /></td>
            </tr>
            <tr className='' >
            <td>Daniel Grasso</td>
            <td>Grasso Family</td>
            <td>$117,050,000</td>
            <td>danielgrasso@gmail.com</td>
            <td>+1 (123) 456-7891</td>
            <td>15.01.2024</td>
            <td><p className='bg-[#FAF4E9] text-[#CC8700] px-4 py-2 font-medium  rounded-3xl inline' >In progress</p></td>
            <td><img src={Dots} alt="" /></td>
            </tr>
            <tr className='' >
            <td>Daniel Grasso</td>
            <td>Grasso Family</td>
            <td>$117,050,000</td>
            <td>danielgrasso@gmail.com</td>
            <td>+1 (123) 456-7891</td>
            <td>15.01.2024</td>
            <td><p className='bg-[#F7F4FF] text-[#495DC5] px-4 py-2 font-medium  rounded-3xl inline' >Pending</p></td>
            <td><img src={Dots} alt="" /></td>
            </tr>
            <tr className='' >
            <td>Daniel Grasso</td>
            <td>Grasso Family</td>
            <td>$117,050,000</td>
            <td>danielgrasso@gmail.com</td>
            <td>+1 (123) 456-7891</td>
            <td>15.01.2024</td>
            <td><p className='bg-[#F0FBFD] text-[#2688B1] px-4 py-2 font-medium  rounded-3xl inline' >Archive</p></td>
            <td><img src={Dots} alt="" /></td>
            </tr>
            <tr className='' >
            <td>Daniel Grasso</td>
            <td>Grasso Family</td>
            <td>$117,050,000</td>
            <td>danielgrasso@gmail.com</td>
            <td>+1 (123) 456-7891</td>
            <td>15.01.2024</td>
            <td><p className='bg-[#FAF4E9] text-[#CC8700] px-4 py-2 font-medium  rounded-3xl inline' >In progress</p></td>
            <td><img src={Dots} alt="" /></td>
            </tr>
            <tr className='' >
            <td>Daniel Grasso</td>
            <td>Grasso Family</td>
            <td>$117,050,000</td>
            <td>danielgrasso@gmail.com</td>
            <td>+1 (123) 456-7891</td>
            <td>15.01.2024</td>
            <td><p className='bg-[#F5FFF4] text-[#5E861F] px-4 py-2 font-medium  rounded-3xl inline' >Active</p></td>
            <td><img src={Dots} alt="" /></td>
            </tr>
           
        </tbody>
        </table> : ""
    }


      {/* for reports */}
      {
        allReports ? 
        <table class="table-auto w-full border-separate border-spacing-y-[30px] border-spacing-x-[30px]">
        <thead>
            <tr className="border text-[#828282]" >
            <th className="text-start font-normal" >Client name  </th>
            <th className="text-start font-normal" >Report Name </th>
            <th className="text-start font-normal" >Creation Date </th>
            <th className="text-start font-normal" >Last Updated Date</th>
            <th className="text-start font-normal" >Sections Included </th>
            </tr>
        </thead>
        <tbody className="docuemnt-tbody" >
            <tr className='' >
            <td>Daniel Grasso & Jane Grasso</td>
            <td>Annual Report</td>
            <td>15.01.2024</td>
            <td className='text-center' >-</td>
            <td className='text-[#4E2357] font-medium' >
                <div className="flex" >
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2'>Goal Planning</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Asset Overview</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Estate Diagram</p>
                </div>
            </td>
            <td><img src={Dots} alt="" /></td>
            </tr>

            <tr className='' >
            <td>Daniel Grasso & Jane Grasso</td>
            <td>Annual Report</td>
            <td>15.01.2024</td>
            <td className='text-center' >12.01.2024</td>
            <td className='text-[#4E2357] font-medium' >
                <div className="flex" >
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2'>Goal Planning</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Asset Overview</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Estate Diagram</p>
                </div>
            </td>
            <td><img src={Dots} alt="" /></td>
            </tr>

            <tr className='' >
            <td>Daniel Grasso & Jane Grasso</td>
            <td>Annual Report</td>
            <td>15.01.2024</td>
            <td className='text-center' >12.01.2024</td>
            <td className='text-[#4E2357] font-medium' >
                <div className="flex" >
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2'>Goal Planning</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Asset Overview</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Estate Diagram</p>
                </div>
            </td>
            <td><img src={Dots} alt="" /></td>
            </tr>

            <tr className='' >
            <td>Daniel Grasso & Jane Grasso</td>
            <td>Annual Report</td>
            <td>15.01.2024</td>
            <td className='text-center' >12.01.2024</td>
            <td className='text-[#4E2357] font-medium' >
                <div className="flex" >
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2'>Goal Planning</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Asset Overview</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Estate Diagram</p>
                </div>
            </td>
            <td><img src={Dots} alt="" /></td>
            </tr>

            <tr className='' >
            <td>Daniel Grasso & Jane Grasso</td>
            <td>Annual Report</td>
            <td>15.01.2024</td>
            <td className='text-center' >12.01.2024</td>
            <td className='text-[#4E2357] font-medium' >
                <div className="flex" >
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2'>Goal Planning</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Asset Overview</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Estate Diagram</p>
                </div>
            </td>
            <td><img src={Dots} alt="" /></td>
            </tr>


            <tr className='' >
            <td>Daniel Grasso & Jane Grasso</td>
            <td>Annual Report</td>
            <td>15.01.2024</td>
            <td className='text-center' >12.01.2024 </td>
            <td className='text-[#4E2357] font-medium' >
                <div className="flex" >
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2'>Goal Planning</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Asset Overview</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Estate Diagram</p>
                </div>
            </td>
            <td><img src={Dots} alt="" /></td>
            </tr>


            <tr className='' >
            <td>Daniel Grasso & Jane Grasso</td>
            <td>Annual Report</td>
            <td>15.01.2024</td>
            <td className='text-center' >12.01.2024</td>
            <td className='text-[#4E2357] font-medium' >
                <div className="flex" >
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2'>Goal Planning</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Asset Overview</p>
                <p className='bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2' >Estate Diagram</p>
                </div>
            </td>
            <td><img src={Dots} alt="" /></td>
            </tr>
            
            
           
        </tbody>
        </table> : ""
    }
      </div>

    </section>
    </>
  )
}

export default ClientsAndReports