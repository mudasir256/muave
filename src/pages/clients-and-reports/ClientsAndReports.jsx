import { useState , useEffect } from "react";
import TableIcon from "../../assets/images/table-icon.svg";
import Dots from "../../assets/images/dots.svg";
import NewClientReport from "../../components/NewClientReport";
import Onboard from "../../components/onboard/Onboard";
import NewClientLogo from "../../assets/images/add-new-client.svg";
import ReportsIconLogo from "../../assets/images/create-client-report.svg";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { FaUserTie } from "react-icons/fa";

const ClientsAndReports = () => {
  const myState = useSelector((state) => state.user);
  const [allClients, setAllClients] = useState(true);
  const [allReports, setAllReports] = useState(false);
  const [onBoardScreen, setOnboardScreen] = useState(false);
  const [NewClientReportt, setNewClientReport] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [clientDropdown, setClientDropdown] = useState(false);
  const [reportDropdown, setReportDropdown] = useState(false);


  const handleClientDropdown = (id) => {
    setClientDropdown((prevId) => (prevId === id ? null : id));
  };

  const handleReportDropdown = (id) => {
    setReportDropdown((prevId) => prevId === id ? null : id);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            background: "#cdcdcd",
            color: "#fff",
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
      <section className="client-and-reports h-full">
        {onBoardScreen && (
          <div className="h-[139vh] w-full flex items-center justify-center bg-[#cdcdcd8f] absolute left-0 top-0">
            <Onboard setOnboardScreen={setOnboardScreen} />
          </div>
        )}
        {NewClientReportt && (
          <div className="h-[139vh] w-full flex items-center justify-center bg-[#cdcdcd8f] absolute left-0 top-0">
            <NewClientReport setNewClientReport={setNewClientReport} />
          </div>
        )}
        <div className="client-and-reports-header flex justify-between items-center">
          <div>
            <h2>Clients & Reports</h2>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white my-10">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-start py-[7px] px-2 client-and-reports-tabs  rounded-[40px] border-2  font-medium my-[20px]">
              <button
                onClick={() => {
                  setAllClients(true);
                  setAllReports(false);
                }}
                className={`flex flex-col ${
                  allClients ? "text-[#4E2357]" : "text-[#828282]"
                } ${allClients ? "bg-[#F9F6F9]" : ""} px-6 py-2 rounded-3xl`}
              >
                All clients
              </button>
              <button
                onClick={() => {
                  setAllReports(true);
                  setAllClients(false);
                }}
                className={`flex flex-col ${
                  allReports ? "text-[#4E2357]" : "text-[#828282]"
                } ${allReports ? "bg-[#F9F6F9]" : ""} px-6 py-2 rounded-3xl`}
              >
                Reports{" "}
              </button>
            </div>
            <div>
              {allClients ? (
                <button
                  className="bg-[#4E2357] text-white px-5 py-3 mx-3 rounded-3xl font-medium flex items-center "
                  onClick={() => setOnboardScreen(true)}
                >
                  {" "}
                  <img src={NewClientLogo} alt="" className="mr-3" /> Add New
                  Client
                </button>
              ) : (
                <button
                  className="bg-[#4E2357] text-white px-5 py-3 mx-3 rounded-3xl font-medium flex items-center"
                  onClick={() => setNewClientReport(true)}
                >
                  {" "}
                  <img src={ReportsIconLogo} alt="" className="mr-3" />
                  Create a client report{" "}
                </button>
              )}
            </div>
          </div>

          <div className="h-[60vh] overflow-y-scroll" >

          <div className="">
            <FaMagnifyingGlass className="relative top-[28px] left-[20px]" />
            <input
              type="text"
              placeholder="Search"
              className=" py-3 px-12 bg-[#F9F9F9] rounded-3xl w-full outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* for clients */}
          {allClients ? (
            <table class="table-auto w-full border-separate border-spacing-y-[30px] border-spacing-x-[10px] text-[12px]">
              <thead>
                <tr className="border text-[#8A8A8A]">
                  <th className="text-start font-normal">Client name </th>
                  <th className="text-start font-normal">Estate Name </th>
                  <th className="text-start font-normal">Est. Net Worth </th>
                  <th className="text-start font-normal">E-Mail</th>
                  <th className="text-start font-normal">Phone Number</th>
                  <th className="text-start font-normal">Last Updated </th>
                  <th className="text-start font-normal">Invation Status</th>
                </tr>
              </thead>

              {myState?.organization?.map((item) => {
                // Check if the user has an EstatePlan
                const hasEstatePlan = item?.EstatePlan?.length > 0;

                // Check if the user matches the search query
                const matchesSearchQuery =
                  item.fullName
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  item.email
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  item.contact
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  (item.EstatePlan &&
                    item?.EstatePlan?.some((estate) =>
                      estate.name
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    ));

                // If the user matches the search query, or if there's no search query, render the user
                if (!searchQuery || matchesSearchQuery) {
                  return (
                    <tbody className="docuemnt-tbody" key={item.id}>
                      <tr className="">
                      <td>
                      {
                                    item?.Avatar !== null  ?
                                    <div className="flex items-center" >
                                      <div className="rounded-[50%] w-[40px] w-[40px] mr-3 bg-[#e8d3edbd]" >
                                      <img className="rounded-[50%] w-[40px] h-[40px] object-contain" src={item?.Avatar} alt="" /> 
                                      </div>
                                      {item.fullName}
                                    </div>
                                    :
                                    <div className="flex items-center" >
                                      <div className="rounded-[50%] bg-[#4E2357] flex items-center justify-center w-[34px] h-[34px] mr-[17px]" >
                                      <FaUserTie className="text-[20px] rounded-[50%] w-[30px] h-[30px] text-white" />
                                      </div>
                                      {item.fullName}
                                    </div>
                      }
                       </td>
                        {/* Check if EstatePlan exists */}
                        <td>
                          {hasEstatePlan
                            ? item.EstatePlan.map((estate) => estate.name)
                            : "No name present"}
                        </td>
                        <td>$117,050,000</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        <td>{item.updatedAt}</td>
                        <td>
                          <p className="bg-[#F7F4FF] text-[#495DC5] px-4 py-2 font-medium  rounded-3xl inline">
                            {item.status}
                          </p>
                        </td>
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
                } else {
                  return (
                    <div>
                      No Data Available
                    </div>
                  ); // Skip rendering if the user doesn't match the search query
                }
              })}
            </table>
          ) : (
            ""
          )}

          {/* for reports */}
          {allReports ? (
            <>
              {/* {myState?.organization?.map((item) => {
                return (
                  <>
                    {item?.Reminder?.map((reminder, index) => {
                      if (reminder.userId === item.id) {
                        return (
                          <div
                            key={index}
                            className="details mx-5 p-5 rounded-3xl border border-[#F6F6F6] my-3"
                          >
                            <div className="detail flex items-start justify-between">
                              <div>
                                <h4>{item.fullName}</h4>
                                <p className="text-[14px] font-bold">
                                  {reminder.actionItem}
                                </p>
                                <small className="my-3 block text-[12px]">
                                  {reminder.description}
                                </small>
                              </div>
                              <div className="flex flex-col items-end">
                                <p className="bg-[#FFF8F3] text-[#A4562A] rounded-3xl px-3 py-1 font-medium text-[13px]">
                                  {reminder.priority || "high priority"}
                                </p>
                                <p className="my-2 text-[12px] font-bold text-[#8A8A8A] flex items-center">
                                  <img
                                    src={ClockIconLogo}
                                    alt="clockicon"
                                    className="mr-1"
                                  />
                                  {reminder.targetDate}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return null; // This will ensure that no component is rendered if the condition is not met
                      }
                    })}
                  </>
                );
              })} */}
              <table class="table-auto w-full border-separate border-spacing-y-[30px] border-spacing-x-[30px]">
                <thead>
                  <tr className="border text-[#828282]">
                    <th className="text-start font-normal">Client name </th>
                    <th className="text-start font-normal">Report Name </th>
                    <th className="text-start font-normal">Creation Date </th>
                    <th className="text-start font-normal">
                      Last Updated Date
                    </th>
                    <th className="text-start font-normal">
                      Sections Included{" "}
                    </th>
                  </tr>
                </thead>

                {myState?.organization?.map((item) => {
                  return (
                    <>
                      {item?.Report?.map((reminder, index) => {
                        if (
                          (reminder.userId === item.id &&
                            reminder.reportName
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())) ||
                          item.fullName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        ) {
                          return (
                            <>
                              <tbody className="docuemnt-tbody">
                                <tr className="">
                                <td>
                                  {
                                    item?.Avatar !== null  ?
                                    <div className="flex items-center" >
                                      <div className="rounded-[50%] bg-gray-200 w-[40px] w-[40px] mr-3" >
                                      <img className="rounded-[50%] w-[40px] h-[40px]" src={item?.Avatar} alt="" /> 
                                      </div>
                                      {item.fullName}
                                    </div>
                                    :
                                    <div className="flex items-center" >
                                      <div className="rounded-[50%] bg-[#4E2357] flex items-center justify-center w-[34px] h-[34px] mr-3" >
                                      <FaUserTie className="text-[20px] rounded-[50%] w-[30px] h-[30px] text-white" />
                                      </div>
                                      {item.fullName}
                                    </div>
                                  }
                                </td>
                                  <td>{reminder.reportName}</td>
                                  <td> {new Date(reminder.createdAt).toLocaleDateString('en-GB')}</td>
                                  <td>
                                  {new Date(reminder.updatedAt).toLocaleDateString('en-GB')}
                                  </td>
                                  <td className="text-[#4E2357] font-medium">
                                    <div className="flex">
                                    {reminder?.section?.length > 0 ? (
                                      reminder.section.map((report, index) => (
                                        <p key={index} className="bg-[#FBF5FC] px-3 py-1 rounded-3xl m-2">
                                          {report}
                                        </p>
                                      ))
                                    ) : (
                                      <p className="text-gray-500">No Secction added</p>
                                    )}
                                    </div>
                                  </td>
                                  <td>
                                  <div className="cursor-pointer relative" onClick={() => handleReportDropdown(item.id) } > 
                                  <img  className="w-[50%]" src={Dots} alt="" />
                                  {
                                    reportDropdown === item.id && 
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
                            </>
                          );
                        } else {
                          return null; // This will ensure that no component is rendered if the condition is not met
                        }
                      })}
                    </>
                  );
                })}
              </table>
            </>
          ) : (
            ""
          )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientsAndReports;
