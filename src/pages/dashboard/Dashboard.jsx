import React from 'react'

const Dashboard = () => {
  return (
    <section className="dashboard">
      {/* dashboard header */}
      <div className="dashboard-header flex justify-between items-center">
        <div className="dashboard-greetings">
          <h2>Good Morning, Faizan</h2>
        </div>
        <div className="dashboard-header-actions">
          <button className='bg-[#D9D9D9] px-5 py-2 mx-3 rounded-xl' >Add New Client</button>
          <button className='bg-[#D9D9D9] px-5 py-2 mx-3 rounded-xl' >Add New Document</button>
        </div>
      </div>

      {/* dashboard body */}
      <div className="dashboard-body flex mt-5 mx-1">
        <div className="left w-[50%] bg-[#F5F5F5] rounded-3xl font-medium">
          
          <div className='bg-[#EEEEEE] rounded-3xl p-5' >
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
          </div>

          <div className='h-[46vh] left-inner overflow-y-scroll' >
          <div className="action-items flex justify-between bg-[#F5F5F5] m-4 py-4 border-b-[2px] border-[#cdcdcd]">
          <h5>Action Items</h5>
          <div>
            <ul className='flex text-[14px] text-[#7B7B7B]' >
              <li className='mx-3' >Reminders</li>
              <li className='mx-3' >Opportunities</li>
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
          </div>

          <div className='border-t-[2px] bg-[#F8F8F8] rounded-b-3xl' > 
            <div className='flex items-center justify-between px-5 my-3' >
            <button className='px-3 py-2 border-2 border-[#cdcdcd] rounded-[15px]' >Add Reminder</button>
            <button>View All</button>
            </div>
          </div>


        </div>
        <div className="right w-[50%] flex flex-col mx-1">
          <div className="top">top</div>
          <div className="bottom">bottom</div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard