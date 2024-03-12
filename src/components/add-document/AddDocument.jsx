import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { handleAddDocument } from "../../redux/user/user-actions";
import { useDispatch, useSelector } from "react-redux";

const AddDocument = ({setAddDocScreen}) => {
    const[document , setDocument] = useState(null);
    const [docObj , setDocObj] = useState({
        doc:"",
        user:"",
        docName:"",
        category:"",
        docStatus:"",
        expDate:"",
        access:"",
    })

    const dispatch = useDispatch();
    const myState = useSelector((state) => state.user);

    const formData = new FormData()
    
    const handleDoc = (e) => {
        const selectedFile = e.target.files[0];
        setDocObj((prev) => {
            return {
                ...prev,
                doc: selectedFile,
            };
        });
    };

    const handleDocChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setDocObj((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });

    }

    const handleAddDoc = async () => {
        if(docObj){
        formData.append("clientId" , docObj.user);
        formData.append("fileName" , docObj.docName);
        formData.append("category" , docObj.category);
        formData.append("status" , docObj.docStatus);
        formData.append("Access" , docObj.access);
        formData.append("expireDate" , docObj.expDate);
        formData.append("file" , docObj.doc);

        await dispatch(handleAddDocument(formData));
        setAddDocScreen(false)
        }
    }

  return (
    <div className="add-reminder w-[38vw] bg-white rounded-3xl p-5">
    <div className="flex justify-end mt-2" >
    <FaTimes className="text-xl text-[#cdcdcd] cursor-pointer" onClick={() => setAddDocScreen(false)} />
    </div>

    <h3 className="font-medium text-center my-2" >Add Document</h3>
    
    <div className="flex flex-col my-1 w-full" >
    <label className="text-sm ms-2" >Upload PDF file for your document</label>
    <div class="file-upload-container">
    <label htmlFor="fileInput" class="text-sm ms-2 my-2">{
        docObj.doc ? <><h6 className="text-start font-medium" >{docObj.doc.name}</h6></> : "Click to upload PDF file for your document"
    }</label>
    <input type="file" name="doc" id="fileInput" onChange={(e) => handleDoc(e)}/>
    </div>
    </div>

    <div className="flex flex-col my-1 w-full" >
    <label className="text-sm ms-2 my-2" >Select the user of the document</label>
    <select onChange={handleDocChange} name="user" value={docObj.user} className="px-5 py-[15px] bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" >
    <option value="">Select User</option>
    {myState.organization?.map((elem) => (
      <option key={elem.fullName} value={elem.id}>
        {elem.fullName}
      </option>
    ))}
    </select>
    </div>

    <div className="flex flex-col my-1" >
    <label className="text-sm ms-2 my-2" >Document Name</label>
    <input name="docName" value={docObj.docName} onChange={handleDocChange} className="px-5 py-[14px] bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" type="text" placeholder="Document Name" />
    </div>

    <div className="flex items-center justify-between my-1" >
    <div className="flex flex-col my-3 w-full" >
    <label className="text-sm ms-2 my-2" >Category</label>
    <select name="category" onChange={handleDocChange} className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" >
        <option value="">Select client</option>
        <option value="cat-1">cat-1</option>
        <option value="option-cat-2">cat-2</option>
    </select>
    </div>
    
    <div className="flex flex-col my-1 mx-3 w-full" >
    <label className="text-sm ms-2 my-2" >Status</label>
    <select name="docStatus" onChange={handleDocChange} className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" >
        <option value="">Select Status</option>
        <option value="status-1">status-1</option>
        <option value="status-2">status-2</option>
    </select>
    </div>
    </div>

    <div className="flex items-center justify-between my-1" >
    <div className="flex flex-col my-3 w-full" >
    <label className="text-sm ms-2 my-2" >Expiration Date</label>
    <input type="date" onChange={handleDocChange} name="expDate" className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" />
    </div>
    
    <div className="flex flex-col my-3 mx-3 w-full" >
    <label className="text-sm ms-2 my-2" >Access</label>
    <select name="access" onChange={handleDocChange} className="px-5 py-3 bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" >
        <option value="">Select Access</option>
        <option value="Acsess-1">Access-1</option>
        <option value="Acsess-2">Access-2</option>
    </select>
    </div>
    </div>
        {
            myState.loading?
            <button className="px-5 py-2 mt-5 bg-[#4E2357] w-full rounded-[50px] outline-none font-medium" >
            <svg className='relative  left-[50%]' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 200 200"><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#979797" stroke="#979797" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
            </button>
            :
            <button className="px-5 py-4 mt-5 bg-[#4E2357] text-white w-full rounded-[50px] outline-none font-medium" onClick={handleAddDoc} >Add Document</button>
        }
    </div>
  )
}

export default AddDocument