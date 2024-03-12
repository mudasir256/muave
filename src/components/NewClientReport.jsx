import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../redux/user/user-actions";

const NewClientReport = ({ setNewClientReport }) => {
  const [reportName, setReportName] = useState("");
  const [userId, setUserId] = useState("");
  const [sections, setSections] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSectionClick = (section) => {
    const newSections = [...sections];
    const sectionIndex = newSections.indexOf(section);
    if (sectionIndex === -1) {
      newSections.push(section);
    } else {
      newSections.splice(sectionIndex, 1);
    }
    setSections(newSections);
  };

  const handleSelectUser = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await dispatch(createReport({ userId, reportName, sections }));
      setNewClientReport(false);
    } catch (error) {}
  };

  return (
    <>
     
      <div className="w-[38vw] bg-white rounded-3xl p-5">
        <div className="flex justify-end mt-2">
          <FaTimes
            className="text-xl text-[#cdcdcd] cursor-pointer"
            onClick={() => setNewClientReport(false)}
          />
        </div>
        <h4 className="font-medium text-center">Create a new client report</h4>

        <div className="onboard-by-email">
          <p className="text-center my-10 px-5 text-[#8A8A8A]">
            Mauve can send an invite for the client to onboard and provide their
            information. This includes: family history, assets and life plans &
            goals. You can preview a message before inviting.
          </p>
          <div className="flex flex-col my-5">
            <label className="text-sm ms-2 my-2">Report name</label>
            <input
              className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none"
              type="text"
              placeholder="Enter report name"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
            />
          </div>

          <div className="flex flex-col my-5">
            <label className="text-sm ms-2 my-2">Select Client</label>
            <select
              className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none"
              value={userId}
              onChange={handleSelectUser}
            >
              <option value="">Select User</option>
              {user?.organization?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.fullName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col my-5">
            <label className="text-sm ms-2 my-2">Section</label>
            <div className="my-2 flex flex-wrap">
              {[
                "Goal Planning",
                "Asset Overview",
                "Estate Diagram",
                "Beneficiaries",
                "Family Tree",
                "Action Items",
                "Documents",
              ].map((section, index) => (
                <span
                  key={index}
                  className={`py-2 px-5 m-2 rounded-3xl cursor-pointer ${
                    sections.includes(section)
                      ? "bg-[#A9A9A9] text-white"
                      : "bg-[#F9F6F9] text-black"
                  }`}
                  onClick={() => handleSectionClick(section)}
                >
                  {section}
                </span>
              ))}
            </div>
          </div>

          <button
            className="px-5 py-3 mt-5 bg-[#4E2357] text-white w-full rounded-3xl outline-none"
            onClick={handleSubmit}
          >
            Send Invite
          </button>
        </div>
      </div>
    </>
  );
};

export default NewClientReport;
