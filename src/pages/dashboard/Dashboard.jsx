import React, { useEffect } from 'react';
import Dots from '../../assets/images/dots.png';
import Onboard from '../../components/onboard/Onboard';
import { useState } from 'react';
import AddReminder from '../../components/reminder/AddReminder';
import AddDocument from '../../components/add-document/AddDocument';
import { useDispatch , useSelector } from 'react-redux';
import { getOrganizationUsers, userDetails } from '../../redux/user/user-actions';
import NewClientLogo from '../../assets/images/add-new-client.svg';
import AddNewDocLogo from '../../assets/images/add-new-doc.svg';
import ClientOnboardLogo from '../../assets/images/client-onboarding.svg'; 
import ClientsIconLogo from '../../assets/images/clients-icon.svg'; 
import ReportsIconLogo from '../../assets/images/reports-icon.svg'; 
import StarIconLogo from '../../assets/images/star-icon.svg'; 
import GoalIconLogo from '../../assets/images/goals-icon.svg'; 
import NotificationsLogo from '../../assets/images/notifications-icon.svg'; 
import ClockIconLogo from '../../assets/images/clock-icon.svg'; 
import DocIconLogo from '../../assets/images/doc-icon.svg'; 
import DocLogo from '../../assets/images/doc-logo.svg'; 


const Dashboard = () => {
  const[onBoardScreen , setOnboardScreen] = useState(false);
  const[reminderScreen , setReminderScreen] = useState(false);
  const[addDocScreen , setAddDocScreen] = useState(false);
  
  const myState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userDetails());
  },[])

  useEffect(() => {
    const orgID = myState.userData?.OrganizationId;
    if(orgID){
      dispatch(getOrganizationUsers(orgID));
    }
  },[myState.userData])

  return (
    <>
    <section className="dashboard h-full my-14">
    {onBoardScreen &&
    <div className='h-full w-full flex items-center justify-center bg-[#cdcdcd8f] absolute left-0 top-0' >
    <Onboard setOnboardScreen={setOnboardScreen} />
    </div> 
    }
    {
    reminderScreen &&
    <div className='h-full w-full flex items-center justify-center bg-[#cdcdcd8f] absolute left-0 top-0' >
    <AddReminder setReminderScreen={setReminderScreen} />
    </div>
    }
    {
    addDocScreen &&
    <div className='h-full w-full flex items-center justify-center bg-[#cdcdcd8f] absolute left-0 top-0' >
    <AddDocument setAddDocScreen={setAddDocScreen} />
    </div>
    }

      {/* dashboard header */}
      <div className="dashboard-header flex justify-between items-center">
        <div className="dashboard-greetings">
          <h2>Good Morning, Faizan</h2>
        </div>
        <div className="dashboard-header-actions flex">
          <button className='bg-[#4E2357] border border-[#EAE0EC] text-[#fff] font-medium px-6 py-3 mx-3 rounded-3xl flex items-center' onClick={() => setOnboardScreen(true)} ><img src={NewClientLogo} alt='new client logo' className='mr-2' />Add New Client</button>
          <button className='bg-[#FBF5FC] border border-[#EAE0EC] text-[#4E2357] font-medium px-6 py-3 mx-3 rounded-3xl flex items-center' onClick={() => setAddDocScreen(true)} ><img src={AddNewDocLogo} alt='new client logo' className='mr-2' />Add New Document</button>
          <button className='bg-[#F9F6F9] border border-[#EAE0EC] text-[#4E2357] font-medium px-6 py-3 mx-3 rounded-3xl flex items-center' onClick={() => setAddDocScreen(true)} ><img src={ClientOnboardLogo} alt='new client logo' className='mr-2' />Client Onboarding View </button>
        </div>
      </div>

      {/* dashboard stats */}
      <div className="dashboard-stats flex items-center my-10">
        <div className='stat w-[19%] bg-[#fff] rounded-3xl flex flex-col items-start p-8' >
          <div className='flex justify-between w-full items-center' >
          <h1 className='font-bold' >23</h1>
          <img src={ClientsIconLogo} className='bg-[#FBF5FC] p-4 rounded-[50%]' alt="client-icon-logo" />
          </div>
          <p className='text-[#767676]' >Clients</p>
        </div>
        <div className='stat w-[19%] bg-[#fff] rounded-3xl flex flex-col items-start p-8 mx-4' >
          <div className='flex justify-between w-full items-center' >
          <h1 className='font-bold' >23</h1>
          <img src={ReportsIconLogo} className='bg-[#FBF5FC] p-4 rounded-[50%]' alt="client-icon-logo" />
          </div>
          <p className='text-[#767676]' >Reports</p>
        </div>
        <div className='stat w-[19%] bg-[#fff] rounded-3xl flex flex-col items-start p-8' >
          <div className='flex justify-between w-full items-center' >
          <h1 className='font-bold' >23</h1>
          <img src={StarIconLogo} className='bg-[#FBF5FC] p-4 rounded-[50%]' alt="client-icon-logo" />
          </div>
          <p className='text-[#767676]' >Action Items</p>
        </div>
        <div className='stat w-[19%] bg-[#fff] rounded-3xl flex flex-col items-start p-8 mx-4' >
          <div className='flex justify-between w-full items-center' >
          <h1 className='font-bold' >23</h1>
          <img src={GoalIconLogo} className='bg-[#FBF5FC] p-4 rounded-[50%]' alt="client-icon-logo" />
          </div>
          <p className='text-[#767676]' >Goals to Review</p>
        </div>
        <div className='stat w-[19%] bg-[#fff] rounded-3xl flex flex-col items-start p-8' >
          <div className='flex justify-between w-full items-center' >
          <h1 className='font-bold' >23</h1>
          <img src={DocIconLogo} className='bg-[#FBF5FC] p-4 rounded-[50%]' alt="client-icon-logo" />
          </div>
          <p className='text-[#767676]' >Documents</p>
        </div>
      </div>
      {/* dashboard body */}
      <div className="dashboard-body flex mt-4">
        <div className="left w-[50%] bg-[#fff] rounded-3xl font-medium">
          
          {/* <div className='bg-[#EEEEEE] rounded-3xl p-5' >
          <h5>Clients</h5>
          <div className="counters flex justify-between items-center">
          <h2>23 Clients</h2>
          <div className='flex' >
            <div className="reminders me-5">
              <h3>5</h3>
              <p>Reminders</p>
            </div>
            <div className="opportunities ms-5">
            <h3>23</h3>
            <p>Opportunities</p>
            </div>
          </div>
          </div>
          </div> */}

          <div className='h-[97vh] left-inner overflow-y-scroll' >
          <div className="action-items flex items-center justify-between m-4 py-4">
          <div className='flex items-center' >
          <img src={NotificationsLogo} className='p-3 rounded-[50%] bg-[#FBF5FC]' alt="" />
          <h5 className='mx-2' >Notifications</h5>
          </div>
          <div>
            <ul className='flex text-[14px] text-[#4E2357] bg-[#fff] border-2 border-[#F6F6F6] rounded-3xl py-1' >
              <li className='mx-1 bg-[#F9F6F9] px-5 py-2 rounded-3xl' >Action Items</li>
              <li className='mx-2 px-5 py-2 rounded-3xl' >Goals</li>
            </ul>
          </div>
          </div>

          {/* new item added manually untill api is integrated! */}
          <div className='details mx-5 p-5 rounded-3xl border border-[#F6F6F6] my-3' >
          <div className="detail flex items-start justify-between">
            <div className='' >
              <h4>Name</h4>
              <p className='text-[14px] font-bold' >Shalne Escalona has left a comment in question.</p>
              <small className='my-3 block text-[12px]' >Jill Sanders has left a comment in "Question "Do you expect any big changes this year"?</small>
            </div>
            <div className='flex flex-col items-end' >
            <p className='bg-[#FFF8F3] text-[#A4562A] rounded-3xl px-3 py-1 font-medium text-[13px]' >High Priority</p>
            <p className='my-2 text-[12px] font-bold text-[#8A8A8A] flex items-center' > <img src={ClockIconLogo} alt="clockicon" className='mr-1' /> 24.02.2024</p>
            </div>
          </div>
          </div>
          
          {/* new item added manually untill api is integrated! */}
          <div className='details mx-5 p-5 rounded-3xl border border-[#F6F6F6] my-3' >
          <div className="detail flex items-start justify-between">
            <div className='' >
              <h4>Name</h4>
              <p className='text-[14px] font-bold' >Shalne Escalona has left a comment in question.</p>
              <small className='my-3 block text-[12px]' >Jill Sanders has left a comment in "Question "Do you expect any big changes this year"?</small>
            </div>
            <div className='flex flex-col items-end' >
            <p className='bg-[#FFF8F3] text-[#A4562A] rounded-3xl px-3 py-1 font-medium text-[13px]' >High Priority</p>
            <p className='my-2 text-[12px] font-bold text-[#8A8A8A] flex items-center' > <img src={ClockIconLogo} alt="clockicon" className='mr-1' /> 24.02.2024</p>
            </div>
          </div>
          </div>
          
          {/* new item added manually untill api is integrated! */}
          <div className='details mx-5 p-5 rounded-3xl border border-[#F6F6F6] my-3' >
          <div className="detail flex items-start justify-between">
            <div className='' >
              <h4>Name</h4>
              <p className='text-[14px] font-bold' >Shalne Escalona has left a comment in question.</p>
              <small className='my-3 block text-[12px]' >Jill Sanders has left a comment in "Question "Do you expect any big changes this year"?</small>
            </div>
            <div className='flex flex-col items-end' >
            <p className='bg-[#FFF8F3] text-[#A4562A] rounded-3xl px-3 py-1 font-medium text-[13px]' >High Priority</p>
            <p className='my-2 text-[12px] font-bold text-[#8A8A8A] flex items-center' > <img src={ClockIconLogo} alt="clockicon" className='mr-1'/> 24.02.2024</p>
            </div>
          </div>
          </div>
          
          {/* new item added manually untill api is integrated! */}
          <div className='details mx-5 my-2 rounded-3xl p-5 border border-[#F6F6F6] my-3' >
          <div className="detail flex items-start justify-between">
            <div className='' >
              <h4>Name</h4>
              <p className='text-[14px] font-bold' >Shalne Escalona has left a comment in question.</p>
              <small className='my-3 block text-[12px]' >Jill Sanders has left a comment in "Question "Do you expect any big changes this year"?</small>
            </div>
            <div className='flex flex-col items-end' >
            <p className='bg-[#FFF8F3] text-[#A4562A] rounded-3xl px-3 py-1 font-medium text-[13px]' >High Priority</p>
            <p className='my-2 text-[12px] font-bold text-[#8A8A8A] flex items-center' > <img src={ClockIconLogo} alt="clockicon" className='mr-1'/> 24.02.2024</p>
            </div>
          </div>
          </div>
          
          {/* new item added manually untill api is integrated! */}
          <div className='details mx-5 p-5 rounded-3xl border border-[#F6F6F6] my-3' >
          <div className="detail flex items-start justify-between">
            <div className='' >
              <h4>Name</h4>
              <p className='text-[14px] font-bold' >Shalne Escalona has left a comment in question.</p>
              <small className='my-3 block text-[12px]' >Jill Sanders has left a comment in "Question "Do you expect any big changes this year"?</small>
            </div>
            <div className='flex flex-col items-end' >
            <p className='bg-[#FFF8F3] text-[#A4562A] rounded-3xl px-3 py-1 font-medium text-[13px]' >High Priority</p>
            <p className=' my-2 text-[12px] font-bold text-[#8A8A8A] flex items-center' > <img src={ClockIconLogo} alt="clockicon" className='mr-1' /> 24.02.2024</p>
            </div>
          </div>
          </div>
          </div>

          <div className='border-t-[2px] py-3 bg-[#fff] rounded-b-3xl' > 
            <div className='flex items-center justify-center px-5 my-3' >
            <button className='text-[#4E2357] font-medium' > View All</button>
            </div>
          </div>
        </div>

        {/* right section */}
        <div className="right w-[50%] flex flex-col justify-between ml-5">
          <div className="top bg-[#fff] rounded-3xl p-5">
            <div className="clients">
              <div className="clients-reports-tabs px-2 py-2 flex justify-between items-center border-2 border-[#fafafa] rounded-[40px]">
              <button className='w-[50%] bg-[#F9F6F9] py-3 text-[#4E2357] font-medium rounded-3xl' >Clients (3)</button>
              <button className='w-[50%] py-2 rounded-3xl font-medium' >Reports (4)</button>
              </div>

              <div className="clients-and-reports-table px-2 mt-5 pb-4 flex items-center">
                <img src={ClientsIconLogo} alt="clients logo" className='p-3 rounded-[50%] bg-[#FBF5FC]' />
                <h5 className='font-medium mx-3' >Recently Updated Clients</h5>
              </div>

              <table className='w-full border-separate border-spacing-y-[20px] border-spacing-x-[10px]' >
              <thead className='border-2 border' >
                <tr className='text-[14px] text-[#A6A4A4]' >
                  <th className='text-start'>Clients</th>
                  <th className='text-start'>Invation Status</th>
                  <th className='text-start'>Last Updated</th>
                  <th className='text-start'></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='flex flex-col' >
                  <p className='font-medium' >Grasso Family</p>
                  <small className='text-[#A6A4A4]' >marymccandlish@gmail.com</small>
                  </td>
                  <td> <p className='bg-[#F7F4FF] px-3 py-2 text-[#495DC5] font-medium inline rounded-3xl' >Pending</p></td>
                  <td>2 days ago</td>
                  <td><img className='w-[50%]' src={Dots} alt="" /></td>
                </tr>
                
                <tr>
                  <td className='flex flex-col' >
                  <p className='font-medium' >Grasso Family</p>
                  <small className='text-[#A6A4A4]' >marymccandlish@gmail.com</small>
                  </td>
                  <td> <p className='bg-[#F7F4FF] px-3 py-2 text-[#495DC5] font-medium inline rounded-3xl' >Pending</p></td>
                  <td>2 days ago</td>
                  <td><img className='w-[50%]' src={Dots} alt="" /></td>
                </tr>

                <tr>
                  <td className='flex flex-col' >
                  <p className='font-medium' >Grasso Family</p>
                  <small className='text-[#A6A4A4]' >marymccandlish@gmail.com</small>
                  </td>
                  <td> <p className='bg-[#FBF4E8] px-3 py-2 text-[#CC8700] font-medium inline rounded-3xl' >In Progress</p></td>
                  <td>2 days ago</td>
                  <td><img className='w-[50%]' src={Dots} alt="" /></td>
                </tr>
                
              </tbody>
              </table>  

              <div className='view-all flex justify-center items-center border-t-2 mx-[-17px] pt-4'>
                <button className='text-[#4E2357] font-medium' > View all</button>
              </div>
            </div>
          </div>

          <div className="bottom bg-[#fff] rounded-3xl p-5">
          <div className="documents">
              

              <div className="doc-and-btn flex items-center justify-between font-medium px-5 mt-3 pb-1">
                <div className='flex items-center' >
                <img src={DocIconLogo} alt="clients logo" className='p-3 rounded-[50%] bg-[#FBF5FC]' />
                <h5 className='font-medium mx-3' >Documents</h5>
                </div>
                <button className='text-[#4E2357]' >View all</button>
              </div>

              <table className='w-full border-separate border-spacing-y-[20px] border-spacing-x-[10px]' >
              <thead className='border-2 border' >
                <tr className='text-[14px] text-[#A6A4A4] '>
                  <th className='text-start'>Documnet</th>
                  <th className='text-start'>Client Name</th>
                  <th className='text-end'>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='flex flex-col' >
                  <p className='flex items-center' ><img src={DocLogo} className='mr-2' />Document Name</p>
                  </td>
                  <td>James Jhonson</td>
                  <td className='text-end' ><p className='px-4 py-1 rounded-3xl inline border-2' >Trust</p></td>
                </tr>
                
                <tr>
                  <td className='flex flex-col' >
                  <p className='flex items-center' ><img src={DocLogo} className='mr-2' />Document Name</p>
                  </td>
                  <td>James Jhonson</td>
                  <td className='text-end' ><p className='px-4 py-1 rounded-3xl inline border-2' >Trust</p></td>
                </tr>
                
              </tbody>
              </table>  

              <div className='view-all flex justify-center items-center border-t-2 mx-[-17px] pt-4'>
                <button className='text-[#4E2357] font-medium' >View all</button>
              </div>
            </div>
          </div>
        </div>

      </div>



    </section>  
    </>
)}

export default Dashboard