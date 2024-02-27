import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { handleAddDocument } from "../../redux/user/user-actions";
import { useDispatch } from "react-redux";

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

    const handleAddDoc = () => {
        if(docObj){
            console.log(docObj , "DDDDDDDDDDDDDDDDDDDDDDDDDDD");
            dispatch(handleAddDocument(docObj));
        }
    }

  return (
    <div className="add-reminder w-[38vw] bg-white rounded-3xl p-5">
    <div className="flex justify-end mt-2" >
    <FaTimes className="text-xl text-[#cdcdcd] cursor-pointer" onClick={() => setAddDocScreen(false)} />
    </div>

    <h3 className="font-medium text-center my-2" >Add Reminder</h3>
    
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
    <select onChange={handleDocChange} name="user" className="px-5 py-[15px] bg-[#F5F5F5] rounded-3xl outline-none text-[13px]" >
        <option value="USER-1">USER-1</option>
        <option value="USER-2">USER-2</option>
        <option value="USER-3">USER-3</option>
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

    <button className="px-5 py-4 mt-5 bg-[#D0D0D0] w-full rounded-xl outline-none font-medium" onClick={handleAddDoc} >Add Document</button>
    </div>
  )
}

export default AddDocument