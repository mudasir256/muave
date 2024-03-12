import { useState } from "react"
import { FaInfo } from "react-icons/fa";

const ToolTip = ({text , children}) => {
    const [isHover , setIsHover] = useState(false);
  return (
    <>
    <button
        className="relative"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
    >
     {children}

     {
        isHover && 
        <div className="absolute left-[30px] top-[5px] bg-[#FBF5FC] rounded-2xl drop-shadow-sm p-5 w-[420px] text-[#000] text-md z-10 transition-opacity ease-in-out duration-300 opacity-100 transform translate-y-0" >
            {text}
        </div>
    }
    </button>
    </>
  )
}

export default ToolTip