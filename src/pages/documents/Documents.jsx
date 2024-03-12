import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dots from "../../assets/images/dots.png";
import AddDocument from "../../components/add-document/AddDocument";
import DocLogo from "../../assets/images/doc-logo.svg";
import { AiOutlineFileText } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { getOrganizationUsers } from "../../redux/user/user-actions";


const Documents = () => {
  const myState = useSelector((state) => state.user);
  const [addDocScreen, setAddDocScreen] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [docsDropdown , setDocsDropdown] = useState(false);

  const dispatch = useDispatch();

  const handleDocsDropdown = (id) => {
    setDocsDropdown((prev) => prev === id ? null : id);
  }

  const filteredDocuments = myState?.organization
    ?.flatMap((organization) => organization?.Document || [])
    .filter((document) => {
      const fileNameLower = document.fileName.toLowerCase();
      const clientNameLower = myState.organization
        .find((org) => org.id === document.userId)
        ?.fullName.toLowerCase();
      const categoryLower = document.Category.toLowerCase();
      const statusLower = document.status.toLowerCase();
      const expireDateLower = document.expireDate.toLowerCase();
      const filterLower = filterValue.toLowerCase();
      return (
        fileNameLower.includes(filterLower) ||
        (clientNameLower && clientNameLower.includes(filterLower)) ||
        categoryLower.includes(filterLower) ||
        statusLower.includes(filterLower) ||
        expireDateLower.includes(filterLower)
      );
    })
    
    useEffect(() => {
      dispatch(getOrganizationUsers(myState?.userData?.OrganizationId))
    },[addDocScreen])

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <>
    <Toaster
        toastOptions={{
          duration: 3000,
          position: 'top-right',
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
    <section className="documents h-full">
      {addDocScreen && (
        <div className="h-full w-full flex items-center justify-center h-[143.5vh] bg-[#cdcdcd8f] absolute left-0 top-0">
          <AddDocument setAddDocScreen={setAddDocScreen} />
        </div>
      )}
      <div className="docs-header flex justify-between items-center">
        <div>
          <h2>Documents</h2>
        </div>
        <div>
        <button
              className="hover:text-white hover:bg-[#4E2357] border border-[#EAE0EC] text-[#4E2357] font-medium px-6 py-3 mx-3 rounded-3xl flex items-center"
              onClick={() => setAddDocScreen(true)}
            >
              <AiOutlineFileText className="text-[20px] mr-3 " />
              Add New Document
            </button>
        </div>
      </div>

      <div className="last-update">
        <small className="text-gray-500 font-medium">
          Last Updated 10/17/23 2:39:42 PM
        </small>
      </div>

    <div className="bg-white mt-5 mb-10 p-5 rounded-3xl h-[600px] overflow-y-scroll" >
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search documents"
          className="py-2 px-5 my-5 bg-[#F9F9F9] rounded-2xl w-full"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        {/* <button className="bg-[#D9D9D9] px-10 py-2 ms-5 rounded-xl font-medium">
          Filter
        </button> */}
      </div>

      <table className="table-auto w-full border-separate border-spacing-y-[40px] border-spacing-x-[10px]">
        <thead>
          <tr className="border">
            <th className="text-start text-[#8A8A8A] font-medium">Document Name</th>
            <th className="text-start text-[#8A8A8A] font-medium">Client Name</th>
            <th className="text-start text-[#8A8A8A] font-medium">Category</th>
            <th className="text-start text-[#8A8A8A] font-medium">Status</th>
            <th className="text-start text-[#8A8A8A] font-medium">Expiration Date</th>
            <th className="text-start text-[#8A8A8A] font-medium">Access</th>
            <th className="text-start text-[#8A8A8A] font-medium">Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments?.map((document, index) => {
            const organization = myState.organization.find(
              (org) => org.id === document.userId
            );
            return (
              <>
              <tr key={index}>
                <td className="flex flex-col font-medium">
                  <a href={document.downloadUrl} className="flex items-center">
                    <img src={DocLogo} alt="Document" className="mr-4" />
                    {document.fileName}
                  </a>
                </td>
                <td>{organization?.fullName || "No Name"}</td>
                <td className="">
                  <p className="px-4 py-1 rounded-3xl inline border-2 border-[#F6F6F6]">
                    {document.Category}
                  </p>
                </td>
                <td>
                  <span className="rounded-3xl py-2 px-3 text-[#5E861F] bg-[#6fde5e26] font-semibold">
                    {document.status}
                  </span>
                </td>
                <td>{new Date(document.expireDate).toLocaleDateString('en-GB')}</td>
                <td>{document.publicAccess ? "All parties" : "Only owner"}</td>
                <td>
                            <div className="cursor-pointer relative" onClick={() => handleDocsDropdown(document.id) } > 
                            <img  className="w-[33%] ml-4" src={Dots} alt="" />
                            {
                              docsDropdown === document.id && 
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
              </>
            );
          })}
        </tbody>
      </table>
    </div>
    </section>
    </>
  );
};

export default Documents;
