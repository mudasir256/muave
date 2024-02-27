const Overview = () => {
  return (
    <>
    <section className="overview h-full">
    <div className="overview-header flex items-center justify-between my-2">
        <div className="overview-tabs bg-[#F0F0F0] p-1 rounded-3xl font-medium" >
        <button className="bg-[#D9D9D9] px-5 py-2 rounded-3xl" >Overview</button>
        <button className="px-5 py-2 rounded-3xl mx-5" >Estate</button>
        <button className="px-5 py-2 rounded-3xl" >Documents</button>
        </div>

        <div className="header-side">
        <div className="flex items-center" >
        <p className="font-medium" >Client:</p>
        <select className="bg-[#F5F5F5] px-20 py-3 rounded-3xl ms-6" >
            <option value="Cleint-1">Cleint-1</option>
            <option value="Cleint-2">Cleint-2</option>
            <option value="Cleint-3">Cleint-3</option>
        </select>
        </div>
    </div>
    </div>

    <div className="client-overview my-4 flex justify-between items-center">
    <div>
        <h2>Johnson Family</h2>
        <h5>James H. Johnson & Anna P. Johnson</h5>
    </div>
    <div className="flex justify-between items-center w-[60%]" >
    <div className="flex justify-evenly items-center w-full " >
        <div>
        <p>NET WORTH</p>
        <h2>$117,050,000</h2>
        </div>

        <span className="w-[2px] rounded-3xl h-[80px] bg-[#cdcdcd] inline-block" ></span>
    </div>
    <div className="flex justify-between items-center uppercase w-[100%]" >
        <p  ><span className="font-bold" >3 </span> Potential Touchpoints</p>
        <p className="mx-3" ><span className="font-bold" >6 </span> Unresolved tasks</p>
    </div>
    </div>
    </div>

    <div className="overview-actions flex justify-end">
    <button className='bg-[#D9D9D9] px-5 py-2 mx-3 rounded-xl font-medium'>Add New Document</button>
    <button className='bg-[#D9D9D9] px-5 py-2 mx-3 rounded-xl font-medium'>Generate a Report</button>
    </div>

    <div className="flex justify-between items-center mt-8 font-medium" >
    <div className="overview-stats bg-[#F5f5f5] rounded-3xl px-5 py-6 w-[32%]">
        <h4 className="text-end font-bold" >$117,050,000</h4>
        <p className="text-end text-[#747474]" >Inside Estate</p>
        <div className="flex justify-between items-center my-3" >
            <h4>Asset & Liabilities</h4>
        </div>

        <div className="flex justify-between items-center font-medium">
            <p>Assets</p>
            <p>$102,050,000</p>
        </div>
        <div className="flex justify-between items-center font-medium mt-3" >
            <p>Outside Estate</p>
            <p>$102,050,000</p>
        </div>
    </div>

    <div className="overview-stats bg-[#F5f5f5] rounded-3xl px-5 py-6 w-[32%]">
        <h4 className="text-end font-bold" >$117,050,000</h4>
        <p className="text-end text-[#747474]" >Inside Estate</p>
        <div className="flex justify-between items-center my-3" >
            <h4>Asset & Liabilities</h4>
        </div>

        <div className="flex justify-between items-center font-medium">
            <p>Assets</p>
            <p>$102,050,000</p>
        </div>
        <div className="flex justify-between items-center font-medium mt-3" >
            <p>Outside Estate</p>
            <p>$102,050,000</p>
        </div>
    </div>

    <div className="overview-stats bg-[#F5f5f5] rounded-3xl px-5 py-6 w-[32%]">
        <h4 className="text-end font-bold" >$117,050,000</h4>
        <p className="text-end text-[#747474]" >Inside Estate</p>
        <div className="flex justify-between items-center my-3" >
            <h4>Asset & Liabilities</h4>
        </div>

        <div className="flex justify-between items-center font-medium">
            <p>Assets</p>
            <p>$102,050,000</p>
        </div>
        <div className="flex justify-between items-center font-medium mt-3" >
            <p>Outside Estate</p>
            <p>$102,050,000</p>
        </div>
    </div>
    </div>

    <div className="overview-body flex w-full">
    <div className="    ">
          <div className='h-[70vh] left-inner overflow-y-scroll' >
          <div className="flex justify-between bg-[#F5F5F5] m-4 py-4 border-b-[2px] border-[#cdcdcd]">
          <h5>Notifications</h5>
          <div>
            <ul className='flex text-[14px] text-[#7B7B7B]' >
              <li className='mx-3' >Tasks</li>
              <li className='mx-3' >Goals</li>
              <li className='mx-3' >All Activity</li>
            </ul>
          </div>
          </div>

          <div className='details px-5 my-5' >
          <div className="detail flex items-start justify-between">
            <div className='w-[80%]' >
              <h4>Name</h4>
              <p className='text-[14px] font-bold' >Shalne Escalona has left a comment in question.</p>
              <small className='my-3 block text-[12px]' >Jill Sanders has left a comment in "Question "Do you expect any big changes this year"?</small>
            </div>
            <div className='flex flex-col items-end' >
            <p className='bg-[#E8E4E4] rounded-3xl px-5 py-1 font-bold text-[13px]' >High Priority</p>
            <p className='px-5 my-2 text-[12px] font-bold' >24.02.2024</p>
            </div>
          </div>
          </div>

          {/* new item added manually untill api is integrated! */}
          <div className='details mx-5 py-5 border-t-[2px] border-[#cdcdcd]' >
          <div className="detail flex items-start justify-between">
            <div className='' >
              <h4>Name</h4>
              <p className='text-[14px] font-bold' >Shalne Escalona has left a comment in question.</p>
              <small className='my-3 block text-[12px]' >Jill Sanders has left a comment in "Question "Do you expect any big changes this year"?</small>
            </div>
            <div className='flex flex-col items-end' >
            <p className='bg-[#E8E4E4] rounded-3xl px-5 py-1 font-bold text-[13px]' >High Priority</p>
            <p className='px-5 my-2 text-[12px] font-bold' >24.02.2024</p>
            </div>
          </div>
          </div>
          
          {/* new item added manually untill api is integrated! */}
          <div className='details mx-5 py-5 border-t-[2px] border-[#cdcdcd]' >
          <div className="detail flex items-start justify-between">
            <div className='' >
              <h4>Name</h4>
              <p className='text-[14px] font-bold' >Shalne Escalona has left a comment in question.</p>
              <small className='my-3 block text-[12px]' >Jill Sanders has left a comment in "Question "Do you expect any big changes this year"?</small>
            </div>
            <div className='flex flex-col items-end' >
            <p className='bg-[#E8E4E4] rounded-3xl px-5 py-1 font-bold text-[13px]' >High Priority</p>
            <p className='px-5 my-2 text-[12px] font-bold' >24.02.2024</p>
            </div>
          </div>
          </div>
          
          {/* new item added manually untill api is integrated! */}
          <div className='details mx-5 py-5 border-t-[2px] border-[#cdcdcd]' >
          <div className="detail flex items-start justify-between">
            <div className='' >
              <h4>Name</h4>
              <p className='text-[14px] font-bold' >Shalne Escalona has left a comment in question.</p>
              <small className='my-3 block text-[12px]' >Jill Sanders has left a comment in "Question "Do you expect any big changes this year"?</small>
            </div>
            <div className='flex flex-col items-end' >
            <p className='bg-[#E8E4E4] rounded-3xl px-5 py-1 font-bold text-[13px]' >High Priority</p>
            <p className='px-5 my-2 text-[12px] font-bold' >24.02.2024</p>
            </div>
          </div>
          </div>
          </div>

          <div className='border-t-[2px] bg-[#F8F8F8] rounded-b-3xl py-2' > 
            <div className='flex justify-center px-5 my-3' >
            <button>View All</button>
            </div>
          </div>
    </div>
    
    <div className="right w-[50%] ms-5 bg-[#F5F5F5] rounded-3xl mt-10 font-medium">
    <div className="flex justify-between bg-[#F5F5F5] m-4 py-4 ">
    <h5>Assets summary</h5>
    <button>View all</button>
    </div>   
     
     <div className="stats-grapgh px-4" >
        <p>here figure will come</p>
     </div>

    <div className="asstes-table px-2">
    <table className='w-full border-separate border-spacing-y-[20px] border-spacing-x-[10px]' >
              <thead className='border-2 border' >
                <tr className='text-[14px]' >
                  <th className='text-start'>Asset type</th>
                  <th className='text-start'>Amount</th>
                  <th className='text-end'>Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='flex flex-col'>Cash and Equivalents</td>
                  <td>$55,500,000</td>
                  <td className="text-end" >47.4 %</td>
                </tr>
                
                <tr>
                  <td className='flex flex-col' >
                  <p className='font-medium' >Grasso Family</p>
                  <small>marymccandlish@gmail.com</small>
                  </td>
                  <td>Pending</td>
                  <td className="text-end" >47.4 %</td>
                </tr>

                <tr>
                  <td className='flex flex-col' >
                  <p className='font-medium' >Grasso Family</p>
                  <small>marymccandlish@gmail.com</small>
                  </td>
                  <td>In Progress</td>
                  <td className="text-end" >47.4 %</td>
                </tr>
                
              </tbody>
              </table>  
    </div>

    </div>
    </div>
    
    </section>
    </>
  )
}

export default Overview