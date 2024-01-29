import Logo from '../assets/images/logo.svg';
import { Link } from "react-router-dom";
import { items } from '../data/NavItems';
import { FaAngleDown } from "react-icons/fa6";
const Navbar = () => {
  return (
    <>
     <div className="header flex items-center justify-between w-100">
        <div className="header-logo flex items-center">
            <img className='pe-3 w-[50%]' src={Logo} alt="" />
            <p className='ps-3' >Advisor Firm Name</p>
        </div>

        <div className="nav-items">
            <ul className='flex text-[15px] ' >
            {
            items.map((item) => {
            const route = item.toLowerCase().replace(/ /g, '-')
            return(
            <li>
            <Link className='capitalize px-3' to={`/user/${route}`}>{item}</Link>   
            </li>  
            )
            })
            }  
            </ul>
        </div>

        <div className='nav-actions' >
            <ul className='flex text-[14px]' >
              <li className='mx-4' >Search</li>
              <li className='mx-4' >Notifications</li>
              <li className='flex items-center mx-4' ><span className='flex flex-col items-end' >Faizan <small className='text-[10px]' >The Advisor Group</small> </span> <FaAngleDown className='mx-2' /></li>
            </ul>
        </div>

    </div>
    </>
  )
}

export default Navbar