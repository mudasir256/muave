import Logo from '../assets/images/logo.svg';
import SubLogo from '../assets/images/sub-logo.svg';
import { Link } from "react-router-dom";
import { items } from '../data/NavItems';
import { FaAngleDown } from "react-icons/fa6";
import { useState } from 'react';
import RefillBalance from './refill-balance/RefillBalance';
import { FaMagnifyingGlass } from "react-icons/fa6";
const Navbar = () => {
  const[showDropdown , setShowDropdown] = useState(false);
  const[refillBal , setRefillBal] = useState(false);
  const handleNavDropdown = () => {
    setShowDropdown(!showDropdown);
  }
  const handleRefillBal = () => {
    setRefillBal(true);
    setShowDropdown(false);
  }
  return (
    <>
    {refillBal &&
    <div className='h-full w-full flex items-center justify-center bg-[#cdcdcd8f] absolute left-0 top-0' >
    <RefillBalance setRefillBal={setRefillBal} />
    </div> 
    }
      <div className="header flex items-center justify-between w-100 my-2">
        <div className="header-logo flex items-center">
          <img className='pe-4 w-[50%]' src={Logo} alt="" />
          <small className='w-[2.5px] h-[36px] ms-1 bg-[#cdcdcd] rounded-xl' ></small>
          <p className='ps-3 text-[#7B7B7B] text-[17px]'>
            <img src={SubLogo} alt="logo" />
          </p>
        </div>

        <div className="nav-items">
          <ul className='flex text-[15px] ' >
            {
              items.map((item) => {
                const route = item.toLowerCase().replace(/ /g, '-')
                return (
                  <li>
                    <Link className='capitalize px-3' to={`/user/${route}`}>{item}</Link>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className='nav-actions'>
          <ul className='flex text-[14px]' >
            <div className='items flex cursor-pointer mr-2'>
              <div style={{
                borderRadius: '50%',
                padding:"11px",
                // backgroundColor: 'rgba(11,11,11,0.1)',
                backgroundColor: '#fff',
              }} className=''>
                <FaMagnifyingGlass />
              </div>
            </div>
            <li className='flex items-center mx-4 cursor-pointer' onClick={handleNavDropdown} >
              <span className='flex flex-col' >Faizan Khan <small className='text-[10px]' >The Advisor Group</small> </span>
              <FaAngleDown className='mx-2' />
            </li>
          </ul>
            {
              showDropdown && 
              <ul className="w-[22%] bg-white absolute right-[80px] top-[70px] border border-[#cscscs] px-3 pt-3 rounded-3xl">
              <div className='relative'>
                <div className='flex flex-col rounded-2xl bg-[#f5f5f5] border border-[#cscscs] p-4' >
                <div className='flex items-center justify-between font-medium' >
                  <p>Document Update Credits </p>
                  <small>10 сredits</small>
                </div>
                <button className='px-5 py-2 bg-[#CCCCCC] rounded-3xl font-medium mt-3' onClick={handleRefillBal} >Refill balance</button>
                </div>
                <ul className='pt-3 px-3 font-medium' >
                <li className='my-1 py-2 border-b border-[#cdcdcd]'>Settings</li>
                <li className='my-1 py-3 border-b border-[#cdcdcd]'>Client & Team Settings</li>
                <li className='my-1 py-2'>Logout</li>
                </ul>
              </div>
            </ul>
            }
</div>
      </div>
    </>
  )
}

export default Navbar