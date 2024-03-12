import React, { useState, useRef, useEffect } from "react";
import UploadLogo from "../../assets/images/upload-your-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { accountSettings } from "../../redux/user/user-actions";
import toast, { Toaster } from "react-hot-toast";

import Layout from "./Layout";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [advisor, setAdvisor] = useState();
  const [id, setId] = useState("");
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const desc =
    "Lorem ipsum dolor sit amet consectetur. Cras nunc diam tortor tincidunt. Mi ut enim feugiat blandit egestas.";

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // Handle the dropped files as needed
    handleFiles(files);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length > 0) {
      const selectedFile = files[0];

      setFileName(selectedFile.name);

      // Read the selected image file
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  useEffect(() => {
    if (user) {
      setFullName(user?.userData?.fullName);
      setEmail(user?.userData?.email);
      setAdvisor(user?.userData?.account);
      setId(user?.userData?.id);
      setSelectedImage(user?.userData?.Avatar);
    }
  }, [user.userData]);
  useEffect(() => {
    if (user.temporaryUserData != null) {
      setFullName(user?.temporaryUserData?.fullName);
      setEmail(user?.temporaryUserData?.email);
      setAdvisor(user?.temporaryUserData?.account);
      setId(user?.temporaryUserData?.id);
      setSelectedImage(user?.temporaryUserData?.Avatar);
    }
  }, [user.temporaryUserData]);

  const AccountSettings = (
    <div className="ml-[2%] w-[70%] flex flex-col mb-10 mt-10">
      <div className="flex flex-col justify-end">
        {/* upload profile picture */}
        <div className="flex justify-between items-center border-2 border-[#F9F6F9] rounded-[30px] p-5 mb-10">
          {selectedImage && (
            <div className="border border-[#cdcdcd] rounded-[50%]">
              <img
                src={selectedImage}
                alt="Selected"
                style={{
                  width: "170px",
                  height: "170px",
                  borderRadius: "50%",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
          {!selectedImage && (
            <div className="bg-[#F9F6F9] w-[170px] h-[170px] flex items-center justify-center  rounded-[50%]">
              <p className="text-gray-400 ">Profile not uploaded</p>
            </div>
          )}

          <div className="ml-[-150px]">
            <h6 className="font-medium">Profile Picture</h6>
            <p className="text-[#8A8A8A]">PNG, JPEG under 15MB</p>
          </div>

          <div className="flex items-start justify-end">
            <div
              className={` px-3 py-[5px] rounded-2xl w-full text-black outline-none flex items-center ${
                fileName ? "justify-between" : ""
              }`}
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
                <button
                  className="px-[25px] py-[7px] rounded-3xl font-medium flex items-center bg-[#FBF5FC] border-2 border-[#EAE0EC] text-[#4E2357] text-[16px]"
                  onClick={handleButtonClick}
                >
                  <img src={UploadLogo} alt="" />
                  <small className="mx-2">
                    {fileName ? fileName : "Upload your profile"}
                  </small>
                </button>
              </div>
              {fileName && (
                <div
                  className=" bg-[#F9F6F9] px-6 py-3 font-medium rounded-3xl ml-4 cursor-pointer"
                  onClick={() => {
                    setFileName(null);
                    setSelectedImage(null);
                  }}
                >
                  <button>remove</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* input fields */}
        <div className="input-fields">
          <div className="flex items-center justify-between w-full">
            <div className="w-[49%]">
              <label className=" text-gray-400 text-sm">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="px-3 py-[14px] rounded-3xl w-full text-black outline-none mb-4 bg-[#F9F9F9]"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
            </div>

            <div className="w-[49%]">
              <label className=" text-gray-400 text-sm">
                Account E-Mail Adress
              </label>
              <input
                type="email"
                placeholder="Enter your Email address"
                disabled
                className="px-3 py-[14px] rounded-3xl w-full text-black outline-none mb-4 bg-[#F9F9F9]"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full my-5">
            <div className="w-[49%]">
              <label for="depart" className=" text-gray-400 text-sm">
                Account Department
              </label>
              <select
                value={advisor}
                id="depart"
                onChange={(e) => setAdvisor(e.target.value)}
                className="px-3 py-[14px] rounded-3xl w-full text-black outline-none mb-4 bg-[#F9F9F9]"
              >
                <option value="advisor">Advisor</option>
                <option value="owner">Owner</option>
              </select>
            </div>

            <div className="w-[49%]">
              <label className=" text-gray-400 text-sm">UserID</label>
              <input
                type="text"
                disabled
                placeholder="Enter your user id"
                className=" px-3 py-[14px] rounded-3xl w-full text-black outline-none mb-4 bg-[#F9F9F9]"
                onChange={(e) => setId(e.target.value)}
                value={id}
              />
            </div>
          </div>
        </div>
        {user.loading ? (
          <button className="bg-[#4E2357] px-[25px] py-[10px] rounded-3xl ml-[89%] text-white">
            <svg
              className="relative  left-[50%]"
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 200 200"
            >
              <circle
                fill="#979797"
                stroke="#979797"
                stroke-width="15"
                r="15"
                cx="40"
                cy="100"
              >
                <animate
                  attributeName="opacity"
                  calcMode="spline"
                  dur="2"
                  values="1;0;1;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="-.4"
                ></animate>
              </circle>
              <circle
                fill="#979797"
                stroke="#979797"
                stroke-width="15"
                r="15"
                cx="100"
                cy="100"
              >
                <animate
                  attributeName="opacity"
                  calcMode="spline"
                  dur="2"
                  values="1;0;1;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="-.2"
                ></animate>
              </circle>
              <circle
                fill="#979797"
                stroke="#979797"
                stroke-width="15"
                r="15"
                cx="160"
                cy="100"
              >
                <animate
                  attributeName="opacity"
                  calcMode="spline"
                  dur="2"
                  values="1;0;1;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="0"
                ></animate>
              </circle>
            </svg>
          </button>
        ) : (
          <button
            className="bg-[#4E2357] px-[25px] py-[10px] rounded-3xl ml-[89%] text-white"
            onClick={() => {
              dispatch(
                accountSettings({ fullName, email, advisor, id, selectedImage })
              );
            }}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            background: "#cdcdcd",
            color: "#fff",
          },
          success: {
            duration: 2000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 2000,
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
      <Layout
        title={"Account Settings"}
        description={desc}
        content={AccountSettings}
      />
    </>
  );
};

export default AccountSettings;
