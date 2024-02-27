import { useState } from "react"
import Dots from '../../assets/images/dots.png'
import AddDocument from "../../components/add-document/AddDocument";

const Documents = () => {
    const[addDocScreen , setAddDocScreen] = useState(false);
  return (
    <section className="documents h-full">
    {addDocScreen &&
    <div className='h-full w-full flex items-center justify-center bg-[#cdcdcd8f] absolute left-0 top-0' >
    <AddDocument setAddDocScreen={setAddDocScreen} />
    </div> 
    }
    <div className="docs-header flex justify-between items-center">
        <div>
          <h2>Documents</h2>
        </div>
        <div>
        <button className='bg-[#D9D9D9] px-5 py-2 mx-3 rounded-xl font-medium' onClick={() => setAddDocScreen(true)} >Add Document</button>
        </div>
    </div>

    <div className="last-update">
    <small className="text-gray-500 font-medium" >
    Last Updated 10/17/23 2:39:42 PM
    </small>
    </div>    

    <div className="flex justify-between items-center" >
        <input type="text" placeholder="Search documents" className=" py-2 px-5 my-5 bg-[#f5f5f5] border border-[#cdcdcd] rounded-2xl w-full"  />
        <button className="bg-[#D9D9D9] px-10 py-2 ms-5 rounded-xl font-medium" >Filter</button>
    </div>

    <table class="table-auto w-full border-separate border-spacing-y-[40px] border-spacing-x-[10px]">
        <thead>
            <tr className="border" >
            <th className="text-start font-medium" >Document Name</th>
            <th className="text-start font-medium" >Client Name</th>
            <th className="text-start font-medium" >Category</th>
            <th className="text-start font-medium" >Status</th>
            <th className="text-start font-medium" >Expiration Date</th>
            <th className="text-start font-medium" >Access</th>
            <th className="text-start font-medium">Options</th>
            </tr>
        </thead>
        <tbody className="docuemnt-tbody" >
            <tr className='' >
            <td>Lorne Kloska</td>
            <td>Kloska family</td>
            <td className="flex" >
                <p className="rounded-3xl py-1 px-4 border-2 border-[#cdcdcd]" >Trust</p>
            </td>
            {/* <td>15.01.2024</td> */}
            <td>
                <span className='rounded-3xl px-5 py-2 bg-[#f5f5f5]' >
                complete
                </span>
            </td>
            <td>Reminders</td>
            <td>All Parties</td>
            <td><img className='w-[30%]' src={Dots} alt="" /></td>
            </tr>
            
            <tr className='' >
            <td>Lorne Kloska</td>
            <td>Kloska family</td>
            <td className="flex" >
                <p className="rounded-3xl py-1 px-4 border-2 border-[#cdcdcd]" >Trust</p>
            </td>
            <td>
                <span className='rounded-3xl px-5 py-2 bg-[#f5f5f5]' >
                complete
                </span>
            </td>
            <td>Reminders</td>
            <td>All Parties</td>
            <td><img className='w-[30%]' src={Dots} alt="" /></td>
            </tr>
            <tr className='' >
            <td>Lorne Kloska</td>
            <td>Kloska family</td>
            <td className="flex" >
                <p className="rounded-3xl py-1 px-4 border-2 border-[#cdcdcd]" >Trust</p>
            </td>
            <td>
                <span className='rounded-3xl px-5 py-2 bg-[#f5f5f5]' >
                complete
                </span>
            </td>
            <td>Reminders</td>
            <td>All Parties</td>
            <td><img className='w-[30%]' src={Dots} alt="" /></td>
            </tr>
            <tr className='' >
            <td>Lorne Kloska</td>
            <td>Kloska family</td>
            <td className="flex" >
                <p className="rounded-3xl py-1 px-4 border-2 border-[#cdcdcd]" >Trust</p>
            </td>
            <td>
                <span className='rounded-3xl px-5 py-2 bg-[#f5f5f5]' >
                complete
                </span>
            </td>
            <td>Reminders</td>
            <td>All Parties</td>
            <td><img className='w-[30%]' src={Dots} alt="" /></td>
            </tr>
           
            <tr className='' >
            <td>Lorne Kloska</td>
            <td>Kloska family</td>
            <td className="flex" >
                <p className="rounded-3xl py-1 px-4 border-2 border-[#cdcdcd]" >Trust</p>
            </td>
            <td>
                <span className='rounded-3xl px-5 py-2 bg-[#f5f5f5]' >
                complete
                </span>
            </td>
            <td>Reminders</td>
            <td>All Parties</td>
            <td><img className='w-[30%]' src={Dots} alt="" /></td>
            </tr>

            <tr className='' >
            <td>Lorne Kloska</td>
            <td>Kloska family</td>
            <td className="flex" >
                <p className="rounded-3xl py-1 px-4 border-2 border-[#cdcdcd]" >Trust</p>
            </td>
            <td>
                <span className='rounded-3xl px-5 py-2 bg-[#f5f5f5]' >
                complete
                </span>
            </td>
            <td>Reminders</td>
            <td>All Parties</td>
            <td><img className='w-[30%]' src={Dots} alt="" /></td>
            </tr>
           
        </tbody>
        </table>
    </section>
  )
}

export default Documents