import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DateImg from '../../assets/images/calendar.svg'
import { FaEllipsisH, FaCheck, FaChevronUp, FaChevronDown , FaUserTie } from "react-icons/fa";
import { getActionItems , getOrganizationUsers } from "../../redux/user/user-actions";
import AddNewGoal from "../../components/AddNewGoal";
import {toast , Toaster} from "react-hot-toast";


const ActionItems = () => {

	const [name, setName] = useState("goal")
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const [moreInfo, setMoreInfo] = useState("");
	const [dropdown, setDropdown] = useState(false);
	const [addGoalScreen, setAddGoalScreen] = useState(false);


	const handleMoreInfo = (id) => {
	setMoreInfo((prev) => (prev === id ? null : id));
	}

	const handleDropdown = (id) => {
		setDropdown((prev) => (prev === id ? null : id));
	}
	

	useEffect(() => {
		if (user?.userData?.organizationId) {
			dispatch(getActionItems(user.userData.organizationId));
		}
	}, [dispatch, user]);

	useEffect(() => {
		dispatch(getOrganizationUsers(user?.userData?.OrganizationId));	
	},[addGoalScreen]);

	useEffect(() => {
		window.scrollTo(0, 0);
	  }, []);

	return (
		<>
		<Toaster
        toastOptions={{
          duration: 5000,
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
		<section className="action-items h-full">
			{addGoalScreen && (
			<div className="h-[182vh] w-full flex items-start justify-center pt-20 bg-[#cdcdcd8f] absolute left-0 top-[0px] z-20">
			  <AddNewGoal setAddGoalScreen={setAddGoalScreen} />
			</div>
		  )}
			<div className="client-and-reports-header flex justify-between items-center">
				<h2>Action Items & Goals Planning</h2>
			</div>

			<div className="p-5 rounded-3xl bg-white my-10">
				{
					name === "goal" ?
						<div className="flex items-center justify-between" >
							<div className="inline-flex py-2 px-2 rounded-[60px] client-and-reports-tabs border-2 font-medium my-[20px]">
								<button
									onClick={() => setName("action")}
									className={`flex flex-col px-5 py-3  ${name === "action" ? "bg-[#F9F6F9] text-[#4E2357] font-semibold" : "text-[#828282]"} rounded-3xl`}
								>
									Action Items
								</button>
								<button onClick={() => setName("goal")} className={`flex flex-col ${name === "goal" ? "bg-[#F9F6F9] text-[#4E2357] font-semibold" : "text-[#828282]"} px-5 py-3 rounded-3xl`}>
									Goals Planning
								</button>
							</div>
							<button
							className="hover:text-white hover:bg-[#4E2357] border border-[#EAE0EC] text-[#4E2357] font-medium px-6 py-3 mx-3 rounded-3xl flex items-center"
							  onClick={() => setAddGoalScreen(true)}
							>
							{/* <AiOutlineUser className="text-[20px] mr-3 " /> */}
							Add New Goal
							</button>
						</div>
						:
						<div className="inline-flex py-2 px-2 rounded-[60px] client-and-reports-tabs border-2 font-medium my-[20px]">
							<button
								onClick={() => setName("action")}
								className={`flex flex-col px-5 py-3  ${name === "action" ? "bg-[#F9F6F9] text-[#4E2357] font-semibold" : "text-[#828282]"} rounded-3xl`}
							>
								Action Items
							</button>
							<button onClick={() => setName("goal")} className={`flex flex-col ${name === "goal" ? "bg-[#F9F6F9] text-[#4E2357] font-semibold" : "text-[#828282]"} px-5 py-3 rounded-3xl`}>
								Goals Planning
							</button>
						</div>
				}
				{
					name === "goal" ?
						<div className="goal-plan-body bg-white rounded-3xl px-5 py-8">
							<div className="grid grid-cols-2 gap-10">
								{
									(!user?.organization) ? <h1>No data</h1> :
									user.organization.map((elem) => {
										if (elem.Goal.length > 0) {
											return elem.Goal.map((goal) => {
												return <div key={elem.id} className="border border-[#FBF5FC] rounded-3xl bg-[#FFFDFF] p-4" >
														<div className="flex items-center justify-between" >
															<div className="flex items-center">
															{
															elem?.Avatar !== null  ?
															<div className="flex items-center text-[#8A8A8A] font-medium" >
															<div className="rounded-[50%] bg-gray-200 w-[40px] w-[40px] mr-3" >
															<img className="rounded-[50%] w-[40px] h-[40px] object-contain" src={elem?.Avatar} alt="" /> 
															</div>
															{elem.fullName}
															</div>
															:
															<div className="flex items-center text-[#8A8A8A] font-medium">
															<div className="rounded-[50%] bg-[#4E2357] flex items-center justify-center w-[34px] h-[34px] mr-3" >
															<FaUserTie className="text-[20px] rounded-[50%] w-[30px] h-[30px] text-white" />
															</div>
															{elem.fullName}
															</div>
														}

															</div>
															<div className="relative" >
																<FaEllipsisH onClick={() => handleDropdown(goal.id)} className="text-[#E3E3E3] text-[18px] cursor-pointer" />
																{
																	dropdown === goal.id &&
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
																		<FaCheck />
																	</div>
																	<h5>{goal.name ? goal.name : "Goal Name"}</h5>
																</div>
																<small className="text-[#8A8A8A] mt-5 ms-3" >AI-Based Recommendation</small>
															</div>
															<p className="px-6 py-1 bg-[#FFF7F3] text-[#A4562A] rounded-[40px]" >{goal.priority}</p>
														</div>
							
														<div className="flex items-center justify-between goal-plan-date mt-6 pb-3 border-b-2 border-[#FBF5FC]" >
															<p className="text-[#8A8A8A]" >Discuss by Date:</p>
															<p className="flex items-center"> <img src={DateImg} className="mr-3" alt="calendar" /> {goal.date ? goal.date : "no date!"}</p>
														</div>
							
														<div className="goal-plan-desc mt-6 pb-3 border-b-2 border-[#FBF5FC]" >
															<p className="text-[#8A8A8A]" >Description</p>
															<small>{goal.description ? goal.description : "no description"}</small>
														</div>
							
														{
															moreInfo === goal.id ?
															<div className="goal-plan-notes mt-6 pb-3 border-b-2 border-[#FBF5FC]">
																<p className="text-[#8A8A8A]" >Notes</p>
																<small>{goal.notes ? goal.notes : "-"}</small>
															</div> :""
														}
														{
															moreInfo === goal.id ?
																<button className="mt-4 font-semibold flex items-center text-[#4E2357]" onClick={() => handleMoreInfo(goal.id)}> Hide <FaChevronUp className="ms-3" /> </button>
																:
																<button className="mt-4 font-semibold flex items-center text-[#4E2357]" onClick={() => handleMoreInfo(goal.id)}> view more information <FaChevronDown className="ms-3" /> </button>
														}
													</div>
											});
										}
							
										return null;
									})
								}
							</div>
						</div>
						: ""
				}

				{/* Reminders */}
				{/* {user?.organization?.map((item) => (
          <div key={item.id} className="flex flex-col items-start w-full">
            {item.Reminder.map((reminder) => (
              <div key={reminder.id} className="reminders flex justify-between">
                <div className="reminder">
                  <div className="details mx-5 p-5 rounded-3xl border-2 border-[#F6F6F6]  my-3">
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
                        <p className="px-5 my-2 text-[12px] font-bold">
                          {reminder.targetDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))} */}
			</div>
		</section>
		</>
	);
};

export default ActionItems;
