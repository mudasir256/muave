import Logo from "../assets/images/logo.svg";
import SubLogo from "../assets/images/sub-logo.svg";
import Settings from "../assets/images/settings.svg";
import Logout from "../assets/images/logout.svg";
import Subs from "../assets/images/subs.svg";
import { Link, useNavigate } from "react-router-dom";
import { items } from "../data/NavItems";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";
import RefillBalance from "./refill-balance/RefillBalance";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SingleLogo from '../assets/images/mauve-single-logo.svg';

import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/auth/action";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [refillBal, setRefillBal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const handleNavDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleRefillBal = () => {
    setRefillBal(true);
    setShowDropdown(false);
  };

  const logout = () => {
    dispatch(signout());
    localStorage.clear();
    navigate("/auth/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/auth/login");
  };
  return (
    <>
      {refillBal && (
        <div className="h-full w-full flex items-center justify-center bg-[#cdcdcd8f] absolute left-0 top-0">
          <RefillBalance setRefillBal={setRefillBal} />
        </div>
      )}
      <div className="header flex items-center justify-between w-100 my-2">
        <div className="header-logo flex items-center">
          <img className="pe-4 w-[50%]" src={Logo} alt="" />
          <small className="w-[2.5px] h-[36px] ms-1 bg-[#cdcdcd] rounded-xl"></small>
          <p className="ps-3 text-[#7B7B7B] text-[17px]">
            <img src={state?.userData?.Organization?.logo} style={{maxWidth:"225px", height:"52px" , objectFit:"contain"}} alt="logo" />
          </p>
        </div>

        <div className="nav-items">
          <ul className="flex text-[15px] ">
            {items.map((item) => {
              const route = item.toLowerCase().replace(/ /g, "-");
              return (
                <li>
                  <Link className="capitalize mx-5 font-medium" to={`/user/${route}`}>
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="nav-actions">
          <ul className="flex text-[14px]">
            <div className="items flex items-center cursor-pointer">
              {/* <div
                style={{
                  borderRadius: "50%",
                  padding: "11px",
                  backgroundColor: "#fff",
                  marginRight : "20px"
                }}
                className=""
              >
                <FaMagnifyingGlass />
              </div> */}
              <div className="bg-gray-200 rounded-[50%]" >
                <img className="w-[50px] h-[50px] rounded-[50%] object-contain " src={state?.userData?.Avatar} alt="" />
              </div>
            </div>
            <li
              className="flex items-center mx-4 cursor-pointer"
              onClick={handleNavDropdown}
            >
              <span className="flex flex-col font-semibold ">
                {state.userData?.fullName}{" "}
                <small className="text-[13px] font-normal text-[#918F91]">{state?.userData?.Organization?.name}</small>{" "}
              </span>
              <FaAngleDown className="mx-2" />
            </li>
          </ul>
          {showDropdown && (
            <ul className="w-[22%] bg-white absolute right-[80px] top-[79px] drop-shadow-md px-3 pt-3 rounded-3xl">
              <div className="relative">
                <div className="flex flex-col rounded-2xl border-2 border-[#F9F6F9] p-4">
                  <div className="flex items-center justify-between font-medium">
                  <div className="flex items-center " >
                    <img className="w-[30px] mr-3" src={SingleLogo} alt="logo" />
                    <p>Document Update Credits </p>
                  </div>

                    <small className="text-[#4E2357] font-bold text-[12px]" >10 сredits</small>
                  </div>
                  <button
                    className="px-5 py-2 bg-[#FBF5FC] border-2 rounded-3xl font-medium mt-3"
                    onClick={handleRefillBal}
                  >
                    Refill balance
                  </button>
                </div>
                <ul className="pt-3 px-3 font-medium">
                  <Link to={"/settings/account"}>
                    <li className="my-1 py-2 flex items-center border-b-2 border-[#F9F6F9]">
                      <img src={Settings} className="mr-2" alt="settings" />
                      Settings
                    </li>
                  </Link>
                  <Link to={"/settings/clientAndTeam"}>
                    <li className="my-1 py-3 flex items-center border-b-2 border-[#F9F6F9]">
                    <img src={Subs} className="mr-2" alt="logout" />
                      Subscriptions
                    </li>
                  </Link>
                  <button>
                    <li
                      className="my-1 py-2 flex items-center"
                      onClick={() => {
                        dispatch(setLoadingFalse());
                        logout();
                      }}
                    >
                    <img src={Logout} className="mr-2" alt="logout" />
                      Logout
                    </li>
                  </button>
                </ul>
              </div>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
