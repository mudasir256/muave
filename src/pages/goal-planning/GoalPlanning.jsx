import { useState } from "react";
import { FaCircleCheck , FaAngleUp , FaAngleDown } from "react-icons/fa6";

const GoalPlanning = () => {
    const [hide , setHide] = useState(false);
    const handleHide = () => {
        setHide(!hide);
    }
  return (
    <section className="goal-planning h-full">
    <div className="goal-planning-header flex items-center justify-between my-2">
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

    <div className="flex client-and-reports-tabs border-b-2 font-medium mt-[30px]">
        <button className={`flex flex-col ${"text-[#828282]"}`} >Goal Planning <small className={`w-[70px] h-[2px]  inline-block relative top-[2px]`}></small> </button>
        <button className={`flex flex-col mx-[30px] ${"text-[#828282]"}`} >Asset Overview <small className={`w-[55px] h-[2px] inline-block relative top-[2px]`}></small> </button>
        <button className={`flex flex-col mx-[30px] ${"text-[#828282]"}`} >Estate Diagram <small className={`w-[55px] h-[2px] inline-block relative top-[2px]`}></small> </button>
        <button className={`flex flex-col mx-[30px] ${"text-[#828282]"}`} >Beneficiaries <small className={`w-[55px] h-[2px] inline-block relative top-[2px]`}></small> </button>
        <button className={`flex flex-col mx-[30px] ${"text-[#828282]"}`} >Fiduciaries <small className={`w-[55px] h-[2px] inline-block relative top-[2px]`}></small> </button>
        <button className={`flex flex-col mx-[30px] ${"text-[#828282]"}`} >Family Tree <small className={`w-[55px] h-[2px] inline-block relative top-[2px]`}></small> </button>
        <button className={`flex flex-col mx-[30px] ${"text-[#828282]"}`} >Action Items <small className={`w-[55px] h-[2px] inline-block relative top-[2px]`}></small> </button>
      </div>

      {/* components will come based of tab menus */}
      <div className="header flex items-center justify-between my-4">
        <div className="w-[65%]" >
        <h2>Goal Planning</h2>
        <p className="text-[#666666] mt-2" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus obcaecati dolore iure quis recusandae numquam incidunt quisquam alias eaque? Dolore. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae cumque iste dicta. Sit maxime magni itaque ipsam enim eum perspiciatis!</p>
        </div>
        <button className='bg-[#D9D9D9] px-5 py-2 mx-3 rounded-xl font-medium' >Add Goal</button>
      </div>
      <div className="component-body flex w-full" > 
        <div className="left w-[50%] rounded-3xl">
            {/* plan-1 */}
            <div className="bg-[#F5F5F5] rounded-3xl mt-10 font-medium px-5 py-6" >
            <div className="flex items-center justify-between">
            <p className="text-[#828282]" >Discuss by Date: <span className="font-bold text-black mx-2" >24.02.2024</span> </p>
            <div>
                <button>Edit</button>
                <button className="ms-5" >Delete</button>
            </div>
            </div>

            <div className="plans" >
            <div className="flex items-center justify-between mt-5" >
            <div className="flex items-center" >
            <FaCircleCheck className="text-3xl text-[#cdcdcd]" />
            <h4 className="mx-3" >Education finance</h4>
            </div>
            <p className='bg-[#E8E4E4] rounded-3xl px-5 py-2 font-bold text-[13px]' >High Priority</p>
            </div>
            <div className="plan-description py-5 border-b-[1px] border-[#cdcdcd]">
            <p className="my-2 text-[#7B7B7B]" >Description</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam veritatis reprehenderit soluta aliquam ut quasi laborum similique. Inventore quisquam laborum rem delectus hic minima fugiat incidunt. Tenetur cum ullam dolorem accusamus mollitia, veniam nobis, quod quia et sint asperiores fugiat.</p>
            </div>
            
            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`} >
            <p className=" text-[#7B7B7B]" >Requires Follow Up?</p>
            <p>No</p>
            </div>

            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`}  >
            <p className="my-2 text-[#7B7B7B]" >Progress</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus incidunt quis hic dicta dolore impedit, debitis assumenda nisi itaque, similique obcaecati quidem. Distinctio temporibus vero, minus voluptatem nostrum, at repellendus accusamus voluptas maiores harum amet quisquam autem deserunt aliquid. Obcaecati.</p>
            </div>

            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`}  >
            <p className="my-2 text-[#7B7B7B]" >Fundng strategy</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aspernatur nisi dolorem. Voluptas nesciunt maiores earum non iusto corporis nulla consequatur temporibus vitae a suscipit illum, voluptatum molestias, eaque sapiente?</p>
            </div>

            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`}  >
            <p className="my-2 text-[#7B7B7B]" >Notes</p>
            <p>-</p>
            </div>
            <button className="mt-5 font-medium flex items-center" onClick={handleHide} >{
                hide? <>View more information <FaAngleDown className="mx-1" /></> : <>Hide<FaAngleUp className="mx-1" /></>
            }</button>
            </div>
            </div>


            {/* plan-2 */}
            <div className="bg-[#F5F5F5] rounded-3xl mt-10 font-medium px-5 py-6" >
            <div className="flex items-center justify-between">
            <p className="text-[#828282]" >Discuss by Date: <span className="font-bold text-black mx-2" >24.02.2024</span> </p>
            <div>
                <button>Edit</button>
                <button className="ms-5" >Delete</button>
            </div>
            </div>

            <div className="plans" >
            <div className="flex items-center justify-between mt-5" >
            <div className="flex items-center" >
            <FaCircleCheck className="text-3xl text-[#cdcdcd]" />
            <h4 className="mx-3" >Education finance</h4>
            </div>
            <p className='bg-[#E8E4E4] rounded-3xl px-5 py-2 font-bold text-[13px]' >High Priority</p>
            </div>
            <div className="plan-description py-5 border-b-[1px] border-[#cdcdcd]">
            <p className="my-2 text-[#7B7B7B]" >Description</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam veritatis reprehenderit soluta aliquam ut quasi laborum similique. Inventore quisquam laborum rem delectus hic minima fugiat incidunt. Tenetur cum ullam dolorem accusamus mollitia, veniam nobis, quod quia et sint asperiores fugiat.</p>
            </div>
            
            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`} >
            <p className=" text-[#7B7B7B]" >Requires Follow Up?</p>
            <p>No</p>
            </div>

            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`}  >
            <p className="my-2 text-[#7B7B7B]" >Progress</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus incidunt quis hic dicta dolore impedit, debitis assumenda nisi itaque, similique obcaecati quidem. Distinctio temporibus vero, minus voluptatem nostrum, at repellendus accusamus voluptas maiores harum amet quisquam autem deserunt aliquid. Obcaecati.</p>
            </div>

            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`}  >
            <p className="my-2 text-[#7B7B7B]" >Fundng strategy</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aspernatur nisi dolorem. Voluptas nesciunt maiores earum non iusto corporis nulla consequatur temporibus vitae a suscipit illum, voluptatum molestias, eaque sapiente?</p>
            </div>

            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`}  >
            <p className="my-2 text-[#7B7B7B]" >Notes</p>
            <p>-</p>
            </div>
            <button className="mt-5 font-medium flex items-center" onClick={handleHide} >{
                hide? <>View more information <FaAngleDown className="mx-1" /></> : <>Hide<FaAngleUp className="mx-1" /></>
            }</button>
            </div>
            </div>
        </div>


        <div className="right w-[50%] rounded-3xl ms-6">
              {/* plan-1 */}
              <div className="bg-[#F5F5F5] rounded-3xl mt-10 font-medium px-5 py-6" >
            <div className="flex items-center justify-between">
            <p className="text-[#828282]" >Discuss by Date: <span className="font-bold text-black mx-2" >24.02.2024</span> </p>
            <div>
                <button>Edit</button>
                <button className="ms-5" >Delete</button>
            </div>
            </div>

            <div className="plans" >
            <div className="flex items-center justify-between mt-5" >
            <div className="flex items-center" >
            <FaCircleCheck className="text-3xl text-[#cdcdcd]" />
            <h4 className="mx-3" >Education finance</h4>
            </div>
            <p className='bg-[#E8E4E4] rounded-3xl px-5 py-2 font-bold text-[13px]' >High Priority</p>
            </div>
            <div className="plan-description py-5 border-b-[1px] border-[#cdcdcd]">
            <p className="my-2 text-[#7B7B7B]" >Description</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam veritatis reprehenderit soluta aliquam ut quasi laborum similique. Inventore quisquam laborum rem delectus hic minima fugiat incidunt. Tenetur cum ullam dolorem accusamus mollitia, veniam nobis, quod quia et sint asperiores fugiat.</p>
            </div>
            
            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`} >
            <p className=" text-[#7B7B7B]" >Requires Follow Up?</p>
            <p>No</p>
            </div>

            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`}  >
            <p className="my-2 text-[#7B7B7B]" >Progress</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus incidunt quis hic dicta dolore impedit, debitis assumenda nisi itaque, similique obcaecati quidem. Distinctio temporibus vero, minus voluptatem nostrum, at repellendus accusamus voluptas maiores harum amet quisquam autem deserunt aliquid. Obcaecati.</p>
            </div>

            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`}  >
            <p className="my-2 text-[#7B7B7B]" >Fundng strategy</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aspernatur nisi dolorem. Voluptas nesciunt maiores earum non iusto corporis nulla consequatur temporibus vitae a suscipit illum, voluptatum molestias, eaque sapiente?</p>
            </div>

            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`}  >
            <p className="my-2 text-[#7B7B7B]" >Notes</p>
            <p>-</p>
            </div>
            <button className="mt-5 font-medium flex items-center" onClick={handleHide} >{
                hide? <>View more information <FaAngleDown className="mx-1" /></> : <>Hide<FaAngleUp className="mx-1" /></>
            }</button>
            </div>
            </div>


            {/* plan-2 */}
            <div className="bg-[#F5F5F5] rounded-3xl mt-10 font-medium px-5 py-6" >
            <div className="flex items-center justify-between">
            <p className="text-[#828282]" >Discuss by Date: <span className="font-bold text-black mx-2" >24.02.2024</span> </p>
            <div>
                <button>Edit</button>
                <button className="ms-5" >Delete</button>
            </div>
            </div>

            <div className="plans" >
            <div className="flex items-center justify-between mt-5" >
            <div className="flex items-center" >
            <FaCircleCheck className="text-3xl text-[#cdcdcd]" />
            <h4 className="mx-3" >Education finance</h4>
            </div>
            <p className='bg-[#E8E4E4] rounded-3xl px-5 py-2 font-bold text-[13px]' >High Priority</p>
            </div>
            <div className="plan-description py-5 border-b-[1px] border-[#cdcdcd]">
            <p className="my-2 text-[#7B7B7B]" >Description</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam veritatis reprehenderit soluta aliquam ut quasi laborum similique. Inventore quisquam laborum rem delectus hic minima fugiat incidunt. Tenetur cum ullam dolorem accusamus mollitia, veniam nobis, quod quia et sint asperiores fugiat.</p>
            </div>
            
            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`} >
            <p className=" text-[#7B7B7B]" >Requires Follow Up?</p>
            <p>No</p>
            </div>

            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`}  >
            <p className="my-2 text-[#7B7B7B]" >Progress</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus incidunt quis hic dicta dolore impedit, debitis assumenda nisi itaque, similique obcaecati quidem. Distinctio temporibus vero, minus voluptatem nostrum, at repellendus accusamus voluptas maiores harum amet quisquam autem deserunt aliquid. Obcaecati.</p>
            </div>

            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`}  >
            <p className="my-2 text-[#7B7B7B]" >Fundng strategy</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aspernatur nisi dolorem. Voluptas nesciunt maiores earum non iusto corporis nulla consequatur temporibus vitae a suscipit illum, voluptatum molestias, eaque sapiente?</p>
            </div>

            <div className={`py-5 border-b-[1px] border-[#cdcdcd] ${hide ? "hidden" : ""}`}  >
            <p className="my-2 text-[#7B7B7B]" >Notes</p>
            <p>-</p>
            </div>
            <button className="mt-5 font-medium flex items-center" onClick={handleHide} >{
                hide? <>View more information <FaAngleDown className="mx-1" /></> : <>Hide<FaAngleUp className="mx-1" /></>
            }</button>
            </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default GoalPlanning