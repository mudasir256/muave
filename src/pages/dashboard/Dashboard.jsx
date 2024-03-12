import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Dots from "../../assets/images/dots.png";
import Onboard from "../../components/onboard/Onboard";
import { useState } from "react";
import AddReminder from "../../components/reminder/AddReminder";
import AddDocument from "../../components/add-document/AddDocument";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineFileText } from "react-icons/ai";
import { FaInfo } from "react-icons/fa";
import {
  getOrganizationUsers,
  userDetails,
  getClients,
  getReports,
  getActionItems,
  getGoals,
  getDocs,
} from "../../redux/user/user-actions";
import NewClientLogo from "../../assets/images/add-new-client.svg";
import AddNewDocLogo from "../../assets/images/add-new-doc.svg";
import ClientOnboardLogo from "../../assets/images/client-onboarding.svg";
import ClientsIconLogo from "../../assets/images/clients-icon.svg";
import ReportsIconLogo from "../../assets/images/reports-icon.svg";
import StarIconLogo from "../../assets/images/star-icon.svg";
import GoalIconLogo from "../../assets/images/goals-icon.svg";
import NotificationsLogo from "../../assets/images/notifications-icon.svg";
import ClockIconLogo from "../../assets/images/clock-icon.svg";
import DocIconLogo from "../../assets/images/doc-icon.svg";
import DocLogo from "../../assets/images/doc-logo.svg";
import RecentReportsLogo from "../../assets/images/recent-report-icon.svg";
import { FaUserTie } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";


import { drop, times } from "lodash";
import ToolTip from "../../components/ToolTip";


const Dashboard = () => {
  const [onBoardScreen, setOnboardScreen] = useState(false);
  const [reminderScreen, setReminderScreen] = useState(false);
  const [addDocScreen, setAddDocScreen] = useState(false);
  const [orgId, setOrgId] = useState("");
  const [notificationName, setNotificationName] = useState("action-items");
  const [menu, setMenu] = useState("client");
  const [clientDropdown, setClientDropdown] = useState(false);
  const [reportDropdown, setReportDropdown] = useState(false);

  const myState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userDetails());
  }, []);

  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = now - date;
    const seconds = Math.floor(diffTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days === 1 ? "one day" : `${days} days`} ago`;
    } else if (hours > 0) {
      return `${hours === 1 ? "one hour" : `${hours} hours`} ago`;
    } else if (minutes > 0) {
      return `${minutes === 1 ? "one minute" : `${minutes} minutes`} ago`;
    } else {
      return "today";
    }
  };

  const handleClientDropdown = (id) => {
    setClientDropdown((prevId) => (prevId === id ? null : id));
  };

  const handleReportDropdown = (id) => {
    setReportDropdown((prevId) => prevId === id ? null : id);
  }

  useEffect(() => {
    setOrgId(myState.userData?.OrganizationId);
    if (orgId) {
      dispatch(getOrganizationUsers(orgId));
      dispatch(getClients(orgId));
      dispatch(getReports(orgId));
      dispatch(getActionItems(orgId));
      dispatch(getDocs(orgId));
      dispatch(getGoals(orgId));
    }
  }, [myState.userData, onBoardScreen , addDocScreen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <Toaster
        toastOptions={{
          duration: 2000,
          position: 'bottom-right',
          style: {
            background: "#F6FCF5",
            color: "006B18",
            border: "2px solid #E4ECE0000",
          },
          success: {
            duration: 2000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 2000,
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
      <section className="dashboard h-full my-14">
        {onBoardScreen && (
          <div className="h-full w-full flex items-center justify-center bg-[#cdcdcd8f] absolute left-0 top-0 z-20">
            <Onboard setOnboardScreen={setOnboardScreen} />
          </div>
        )}
        {reminderScreen && (
          <div className="h-full w-full flex items-center justify-center bg-[#cdcdcd8f] absolute left-0 top-0">
            <AddReminder setReminderScreen={setReminderScreen} />
          </div>
        )}
        {addDocScreen && (
          <div className="h-full w-full flex items-center justify-center bg-[#cdcdcd8f] absolute left-0 top-0 z-20">
            <AddDocument setAddDocScreen={setAddDocScreen} />
          </div>
        )}

        {/* dashboard header */}
        <div className="dashboard-header flex justify-between items-center">
          <div className="dashboard-greetings flex items-center">
            <div className="rounded-[50%] bg-gray-200 w-[50px] h-[50px] mr-2" >
            <img className="w-[50px] h-[50px] rounded-[50%] object-contain" src={myState?.userData?.Avatar} alt="" />
            </div>
            <h2>Good Morning, {myState.userData?.fullName?.split(' ')[0]}</h2>
          </div>
          <div className="dashboard-header-actions flex">
            <button
              className="bg-[#4E2357]  border border-[#EAE0EC] text-[#fff] font-medium px-6 py-3 mx-3 rounded-3xl flex items-center"
              onClick={() => setOnboardScreen(true)}
            >
              <AiOutlineUser className="text-[20px] mr-3" />
              Add New Client
            </button>
            <button
              className="border border-[#EAE0EC] text-[#4E2357] font-medium px-6 py-3 mx-3 rounded-3xl flex items-center"
              onClick={() => setAddDocScreen(true)}
            >
              <AiOutlineFileText className="text-[20px] mr-3 " />
              Add New Document
            </button>
          </div>
        </div>

        {/* dashboard stats */}
        <div className="dashboard-stats flex items-center my-10">
          <div className="stat w-[19%] bg-[#fff] rounded-3xl flex flex-col items-start p-8">
            <div className="flex justify-between w-full items-center">
              <h1 className="font-bold">
                {myState.totalClients ? myState.totalClients : "0"}
              </h1>
              <img
                src={ClientsIconLogo}
                className="bg-[#FBF5FC] p-4 rounded-[50%]"
                alt="client-icon-logo"
              />
            </div>
            <p className="text-[#767676]">Clients</p>
          </div>
          <div className="stat w-[19%] bg-[#fff] rounded-3xl flex flex-col items-start p-8 mx-4">
            <div className="flex justify-between w-full items-center">
              <h1 className="font-bold">
                {myState.totalReports ? myState.totalReports : "0"}
              </h1>
              <img
                src={ReportsIconLogo}
                className="bg-[#FBF5FC] p-4 rounded-[50%]"
                alt="client-icon-logo"
              />
            </div>
            <p className="text-[#767676]">Reports</p>
          </div>
          <div className="stat w-[19%] bg-[#fff] rounded-3xl flex flex-col items-start p-8">
            <div className="flex justify-between w-full items-center">
              <h1 className="font-bold">
                {myState.totalActionItems ? myState.totalActionItems : "0"}
              </h1>
              <img
                src={StarIconLogo}
                className="bg-[#FBF5FC] p-4 rounded-[50%]"
                alt="client-icon-logo"
              />
            </div>
            
            <p className="text-[#767676] flex items-center"> Actions Items  <ToolTip text="Action Items are tasks from your client that may need your attention. You can check them off as you complete them" >  <FaInfo className="text-[#000] ms-3 text-[20px] cursor-pointer p-1 bg-[#F6F6F6] rounded-[50%]" /> </ToolTip> </p>
          </div>
          <div className="stat w-[19%] bg-[#fff] rounded-3xl flex flex-col items-start p-8 mx-4">
            <div className="flex justify-between w-full items-center">
              <h1 className="font-bold">
                {myState.totalGoals?.totalCount
                  ? myState.totalGoals?.totalCount
                  : "0"}
              </h1>
              <img
                src={GoalIconLogo}
                className="bg-[#FBF5FC] p-4 rounded-[50%]"
                alt="client-icon-logo"
              />
            </div>
            <p className="text-[#767676] flex items-center">Goals to Review <ToolTip text="Goals are touch points for you and your client to speak about. They are generated based on the client and document details, or added manually by the client." > <FaInfo className="text-[#000] ms-3 text-[20px] cursor-pointer p-1 bg-[#F6F6F6] rounded-[50%]" /></ToolTip> </p>
          </div>
          <div className="stat w-[19%] bg-[#fff] rounded-3xl flex flex-col items-start p-8">
            <div className="flex justify-between w-full items-center">
              <h1 className="font-bold">
                {myState.totalDocs ? myState.totalDocs : "0"}
              </h1>
              <img
                src={DocIconLogo}
                className="bg-[#FBF5FC] p-4 rounded-[50%]"
                alt="client-icon-logo"
              />
            </div>
            <p className="text-[#767676]">Documents</p>
          </div>
        </div>
      </section>
      {/* dashboard body */}
      <div className="dashboard-body flex mt-4">
        <div className="left w-[50%] bg-[#fff] flex flex-col justify-between rounded-3xl font-medium">
          <div className="left-inner overflow-y-scroll">
            <div className="action-items flex items-center justify-between m-4 py-4">
              <div className="flex items-center">
                <img
                  src={NotificationsLogo}
                  className="p-3 rounded-[50%] bg-[#FBF5FC]"
                  alt=""
                />
                <h5 className="mx-2">
                  {notificationName === "action-items"
                    ? "Notifications"
                    : "Goals"}
                </h5>
              </div>
              <div>
                <ul className="flex text-[14px] text-[#4E2357] bg-[#fff] border-2 border-[#F6F6F6] rounded-3xl py-1">
                  <li
                    className={`mx-1 ${
                      notificationName === "action-items" ? "bg-[#F9F6F9]" : ""
                    }  px-5 py-2 rounded-3xl cursor-pointer`}
                    onClick={() => setNotificationName("action-items")}
                  >
                    Action Items
                  </li>
                  <li
                    className={`mx-2 px-5 ${
                      notificationName === "goals" ? "bg-[#F9F6F9]" : ""
                    } py-2 rounded-3xl cursor-pointer`}
                    onClick={() => setNotificationName("goals")}
                  >
                    Goals
                  </li>
                </ul>
              </div>
            </div>
            {/* action item api add */}
            <div>
              {notificationName === "action-items"
                ? myState?.organization?.map((item, indexx) => (
                  indexx < 3 && (
                    <div key={item.id} className="my-3">
                      {item?.Reminder?.length > 0 ? (
                        item.Reminder.map((reminder, index) => (
                          index < 3 && reminder.userId === item.id ? (
                            <div
                              key={index}
                              className="details mx-5 p-5 rounded-3xl border border-[#F6F6F6] my-3"
                            >
                              <div className="detail flex items-start justify-between">
                                <div>
                                  <h4>{item.fullName}</h4>
                                  <p className="text-[14px] font-bold">{reminder.actionItem}</p>
                                  <small className="my-3 block text-[12px]">
                                    {reminder.description}
                                  </small>
                                </div>
                                <div className="flex flex-col items-end">
                                  <p className="bg-[#FFF8F3] text-[#A4562A] rounded-3xl px-3 py-1 font-medium text-[13px]">
                                    {reminder.priority || "high priority"}
                                  </p>
                                  <p className="my-2 text-[12px] font-bold text-[#8A8A8A] flex items-center">
                                    <img src={ClockIconLogo} alt="clockicon" className="mr-1" />
                                    {reminder.targetDate}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : null
                        ))
                      ) : (
                        // <div className="details mx-5 p-5 rounded-3xl border border-[#F6F6F6] my-3">
                        //   <div className="detail flex items-start justify-between">
                        //     <div>
                        //       <h4>{item.fullName}</h4>
                        //       <p className="text-[14px] font-bold">no data available</p>
                        //       <small className="my-3 block text-[12px]">no data available</small>
                        //     </div>
                        //     <div className="flex flex-col items-end">
                        //       <p className="bg-[#FFF8F3] text-[#A4562A] rounded-3xl px-3 py-1 font-medium text-[13px]">
                        //         {/* {reminder.priority || "high priority"} */}
                        //       </p>
                        //       <p className="my-2 text-[12px] font-bold text-[#8A8A8A] flex items-center">
                        //         <img src={ClockIconLogo} alt="clockicon" className="mr-1" />
                        //         no data available
                        //       </p>
                        //     </div>
                        //   </div>
                        // </div>
                        ""
                      )}
                    </div>
                  )
                ))
                : myState?.organization?.map((item, i) =>
                    i < 3 ? (
                      <div key={item.id}>
                        {item?.Goal?.length > 0 ? (
                          item.Goal.map((goal, index) =>
                            index < 3 ? (
                              goal?.userId === item.id ? (
                                <div
                                  key={index}
                                  className="details mx-5 p-5 rounded-3xl border border-[#F6F6F6] my-3"
                                >
                                  <div className="detail flex items-start justify-between">
                                    <div>
                                      <h4>{goal.name}</h4>
                                      <small className="text-[#8A8A8A] font-medium mb-4" >AI-Based Recommendation</small>
                                      <small className="mb-3 block text-[14px] text-gray-600">
                                        {goal.description}
                                      </small>
                                      <small className="text-[15px]">
                                      {
                                    item?.Avatar !== null  ?
                                    <div className="flex items-center" >
                                      <div className="rounded-[50%] bg-gray-200 w-[30px] w-[30px] mr-3" >
                                      <img className="rounded-[50%] w-[30px] h-[30px] object-contain" src={item?.Avatar} alt="" /> 
                                      </div>
                                      {item.fullName}
                                    </div>
                                    :
                                    <div className="flex items-center text-[#8A8A8A] font-semibold" >
                                      <div className="rounded-[50%] bg-[#4E2357] flex items-center justify-center p-[4px] w-[30px] h-[30px] mr-3" >
                                      <FaUserTie className="text-[20px] rounded-[50%] w-[30px] h-[30px] text-white" />
                                      </div>
                                      {item.fullName}
                                    </div>
                                  }

                                      </small>
                                    </div>
                                    <div className="flex flex-col items-end">
                                      <p className="bg-[#FFF8F3] text-[#A4562A] rounded-3xl px-3 py-1 font-medium text-[13px]">
                                        {goal.priority || "high priority"}
                                      </p>
                                      <p className="mt-20 text-[12px] font-bold text-[#8A8A8A] flex items-center">
                                        <img
                                          src={ClockIconLogo}
                                          alt="clockicon"
                                          className="mr-1"
                                        />
                                        {new Date(
                                          goal.updatedAt
                                        ).toLocaleDateString("en-GB")}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ) : null
                            ) : null
                          )
                        ) : (
                          // <div className="details mx-5 p-5 rounded-3xl border border-[#F6F6F6] my-3">
                          //   <div className="detail flex items-start justify-between">
                          //     <div>
                          //       <h4>{item.fullName}</h4>
                          //       <p className="text-[14px] font-bold">
                          //         no data available
                          //       </p>
                          //       <small className="my-3 block text-[12px]">
                          //         no data available
                          //       </small>
                          //     </div>
                          //     <div className="flex flex-col items-end">
                          //       <p className="bg-[#FFF8F3] text-[#A4562A] rounded-3xl px-3 py-1 font-medium text-[13px]">
                          //         {/* {reminder.priority || "high priority"} */}
                          //       </p>
                          //       <p className="my-2 text-[12px] font-bold text-[#8A8A8A] flex items-center">
                          //         <img
                          //           src={ClockIconLogo}
                          //           alt="clockicon"
                          //           className="mr-1"
                          //         />
                          //         no data available
                          //       </p>
                          //     </div>
                          //   </div>
                          // </div>
                          ""
                        )}
                      </div>
                    ) : null
                  )}
            </div>
          </div>

          <div className="border-t-[2px] py-3 bg-[#fff] rounded-b-3xl">
            <div className="flex items-center justify-center px-5 my-3">
              <Link
                to="/user/action-&-goals"
                className="text-[#4E2357] font-medium"
              >
                {" "}
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* right section */}
        <div className="right w-[50%] flex flex-col justify-between ml-5">
          <div className="top bg-[#fff] rounded-3xl p-5">
            <div className="clients">
              <div className="clients-reports-tabs px-2 py-2 flex justify-between items-center border-2 border-[#fafafa] rounded-[40px]">
                <button
                  className={`w-[50%] ${
                    menu === "client" ? "bg-[#F9F6F9]" : ""
                  } py-3 text-[#4E2357] font-medium rounded-3xl`}
                  onClick={() => setMenu("client")}
                >
                  Clients ({myState.totalClients ? myState.totalClients : "0"})
                </button>
                <button
                  className={`w-[50%] ${
                    menu === "reports" ? "bg-[#F9F6F9]" : ""
                  } py-3 text-[#4E2357] font-medium rounded-3xl`}
                  onClick={() => setMenu("reports")}
                >
                  Reports ({myState.totalReports ? myState.totalReports : "0"})
                </button>
              </div>

              {
                menu === "client" ? 
                <>
                 <div className="clients-and-reports-table px-2 mt-5 pb-4 flex items-center">
                <img
                  src={ClientsIconLogo}
                  alt="clients logo"
                  className="p-3 rounded-[50%] bg-[#FBF5FC]"
                />
                <h5 className="font-medium mx-3">Recently Updated Clients</h5>
              </div>

              <table className="w-full border-separate border-spacing-y-[20px] border-spacing-x-[10px]">
                <thead className="border-2 border">
                  <tr className="text-[14px] text-[#A6A4A4]">
                    <th className="text-start">Clients</th>
                    <th className="text-start">Invation Status</th>
                    <th className="text-start">Last Updated</th>
                    <th className="text-start"></th>
                  </tr>
                </thead>
                {myState?.organization
                  ?.filter((item) => item.role === "client")
                  ?.map((item , index) => {
                    if(index < 2)
                    return (
                      <tbody>
                        <tr>
                          <td className="flex flex-col">
                            <p className="font-medium">{item.fullName}</p>
                            <small className="text-[#A6A4A4]">
                              {item.email}
                            </small>
                          </td>
                          <td>
                            {" "}
                            <p className="bg-[#F7F4FF] px-3 py-2 text-[#495DC5] lowercase font-medium inline rounded-3xl">
                              {item.status}
                            </p>
                          </td>
                          <td>{item.updatedAt}</td>
                          <td>
                            <div className="cursor-pointer relative" onClick={() => handleClientDropdown(item.id) } > 
                            <img  className="w-[50%]" src={Dots} alt="" />
                            {
                              clientDropdown === item.id && 
                              <div className="absolute font-medium left-[-90px] top-[20px] drop-shadow-md bg-white w-[200px] z-[999] rounded-xl px-3 py-2" >
                                <ul>
                                  <li className="my-3 pb-2 border-b-2 border-[#F9F6F9]" >View Document</li>
                                  <li className="my-3 pb-2 border-b-2 border-[#F9F6F9]" >Update Client Information</li>
                                  <li className="my-3 pb-2 border-b-2 border-[#F9F6F9]" >Switch to Client View</li>
                                  <li className="my-3">Delete</li>
                                </ul>
                              </div>
                            }
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>

              <div className="view-all flex justify-center items-center border-t-2 mx-[-17px] pt-4">
                <Link to="/user/clients-&-reports" className="text-[#4E2357] font-medium">
                  {" "}
                  View all
                </Link>
              </div>
                </>
                :
                <>
                <div className="clients-and-reports-table px-2 mt-5 pb-4 flex items-center">
                <img
                  src={RecentReportsLogo}
                  alt="clients logo"
                  className="p-3 rounded-[50%] bg-[#FBF5FC]"
                />
                <h5 className="font-medium mx-3">Recently Updated Reports</h5>
              </div>

              <table className="overflow-y-scroll w-full border-separate border-spacing-y-[20px] border-spacing-x-[10px]">
                <thead className="border-2 border">
                  <tr className="text-[14px] text-[#A6A4A4]">
                    <th className="text-start">Clients</th>
                    <th className="text-start">Report Name</th>
                    <th className="text-start">Created</th>
                    <th className="text-start">Updated</th>
                    <th className="text-start"></th>
                  </tr>
                </thead>
                {
  myState?.organization?.map((elem, index) => {
    let reportCount = 0; 
    if (elem?.Report?.length !== 0) {
      return elem?.Report?.map((report) => {
        if (reportCount < 3) {
          reportCount++;
          return (
            <tbody key={report.id}>
              <tr>
                <td>
                  {elem?.Avatar !== null ? (
                    <div className="flex items-center">
                      <div className="rounded-[50%] bg-gray-200 w-[40px] w-[40px] mr-3">
                        <img className="rounded-[50%] w-[40px] h-[40px]" src={elem?.Avatar} alt="" />
                      </div>
                      {elem?.fullName}
                      {elem?.email}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="rounded-[50%] bg-[#4E2357] flex items-center justify-center w-[34px] h-[34px] mr-3">
                        <FaUserTie className="text-[20px] rounded-[50%] w-[30px] h-[30px] text-white" />
                      </div>
                      <div className="flex flex-col">
                        {elem?.fullName}
                        <small>{elem?.email}</small>
                      </div>
                    </div>
                  )}
                </td>
                <td>
                  {" "}
                  <p className="px-3 py-2 font-medium inline rounded-3xl">{report.reportName}</p>
                </td>
                <td>{new Date(report.createdAt).toLocaleDateString('en-GB')}</td>
                <td>{new Date(report.updatedAt).toLocaleDateString('en-GB')}</td>
                <td>
                            <div className="cursor-pointer relative" onClick={() => handleReportDropdown(elem.id) } > 
                            <img  className="w-[50%]" src={Dots} alt="" />
                            {
                              reportDropdown === elem.id && 
                              <div className="absolute font-medium left-[-90px] top-[20px] drop-shadow-md bg-white w-[200px] z-[999] rounded-xl px-3 py-2" >
                                <ul>
                                  <li className="my-3 pb-2 border-b-2 border-[#F9F6F9]" >View Report</li>
                                  <li className="my-3 pb-2 border-b-2 border-[#F9F6F9]" >Update Report Section</li>
                                  <li className="my-3">Delete</li>
                                </ul>
                              </div>
                            }
                            </div>
                          </td>
              </tr>
            </tbody>
          );
        }
        return null;
      });
    } else {
      return null;
    }
  })
}
              </table>
              <div className="view-all flex justify-center items-center border-t-2 mx-[-17px] pt-4">
                <Link to="/user/clients-&-reports" className="text-[#4E2357] font-medium">
                  {" "}
                  View all
                </Link>
              </div>
                </>
              }


            </div>
          </div>

          <div className="bottom bg-[#fff] rounded-3xl p-5 mt-6">
            <div className="documents">
              <div className="doc-and-btn flex items-center justify-between font-medium px-5 mt-3 pb-1">
                <div className="flex items-center">
                  <img
                    src={DocIconLogo}
                    alt="clients logo"
                    className="p-3 rounded-[50%] bg-[#FBF5FC]"
                  />
                  <h5 className="font-medium mx-3">Documents</h5>
                </div>
                <Link to="/user/documents" className="text-[#4E2357]">View all</Link>
              </div>

              <table className="w-full border-separate border-spacing-y-[20px] border-spacing-x-[10px]">
  <thead className="border-2 border">
    <tr className="text-[14px] text-[#A6A4A4] ">
      <th className="text-start">Document</th>
      <th className="text-start">Client Name</th>
      <th className="text-end">Status</th>
    </tr>
  </thead>
  <tbody>
    {myState?.organization?.map((organization, index) => {
      let documentCount = 0;
      return (
        organization?.Document?.map((document, docIndex) => {
          if(document){
            if (documentCount < 2 && (organization.id === document.userId)) {
              ++documentCount;
              return (
                <tr key={docIndex}>
                  <td className="flex flex-col">
                    <a href={document.downloadUrl} className="flex items-center">
                      <img src={DocLogo} alt="Document" className="mr-2" />
                      {document.fileName}
                    </a>
                  </td>
                  <td>{organization.fullName || "No Name"}</td>
                  <td className="text-end">
                    <p className="px-4 py-1 rounded-3xl inline border-2">
                      {document.status}
                    </p>
                  </td>
                </tr>
              );
            }
          }
          return ""
        })
      );
    })}
  </tbody>
</table>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
