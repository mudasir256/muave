import React, { useState, useEffect } from "react";
import MauveLogo from "../../assets/images/mauve-single-logo.svg";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { billingSetting, planInfo } from "../../redux/user/user-actions";
import Layout from "./Layout";

const PaymentSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [billingInfo, setBillingInfo] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);

  const desc =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, commodi.";

  const [largeView, setLargeView] = useState(false);

  useEffect(() => {
    const billing = async () => {
      if (user?.userData?.OrganizationId) {
        await dispatch(planInfo(user?.userData?.OrganizationId));
      }
    };
    billing();
  }, [user?.userData?.OrganizationId]);

  useEffect(() => {
    const billing = async () => {
      await dispatch(billingSetting());
    };
    billing();
  }, []);

  console.log(user);

  useEffect(() => {
    if (user) {
      setBillingInfo(user?.billingData);
    }
  }, [user.billingData]);

  useEffect(() => {
    if (user) {
      setCurrentPlan(user?.planInfo);
    }
  }, [user.planInfo]);

  console.log(currentPlan);

  const data = {
    sub: [
      {
        title: "Active License",
        credits: "6",
        dollars: "2.400",
        description: "Next annual billing cycle",
        createdAt: "20.01.2025",
      },
    ],
    bill: [
      {
        title: "Active License",
        credits: "6",
        dollars: "2.400",
        description: "Next annual billing cycle",
        createdAt: "20.01.2025",
      },
      {
        title: "Active License",
        credits: "6",
        dollars: "2.400",
        description: "Next annual billing cycle",
        createdAt: "20.01.2025",
      },
      // {
      //     title: 'Active License',
      //     credits: '6',
      //     dollars: '2.400',
      //     description: 'Next annual billing cycle',
      //     createdAt: '20.01.2025'
      // },
      // {
      //     title: 'Active License',
      //     credits: '6',
      //     dollars: '2.400',
      //     description: 'Next annual billing cycle',
      //     createdAt: '20.01.2025'
      // },
      // {
      //     title: 'Active License',
      //     credits: '6',
      //     dollars: '2.400',
      //     description: 'Next annual billing cycle',
      //     createdAt: '20.01.2025'
      // }
    ],
  };
  const paymentSetting = (
    <div className="ml-[2%] mr-[40%] flex flex-col mb-10 mt-10">
      <div>
        <h5 className="pb-3 font-medium">Subscription Information</h5>
        {/* {data.bill.map((bill) => ( */}
        <div>
          <div className="flex">
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "10px",
                backgroundColor: "#FBF5FC",
                margin: "15px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h6 className="font-semibold">{currentPlan?.name}</h6>
              <p className=" text-gray-400 text-sm mt-1">
                {/* {bill.description} - {bill.createdAt} */}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                marginLeft: "27%",
              }}
            >
              <img src={MauveLogo} alt="" />
              <h6 className="font-semibold ms-2 text-[16px]">
                credits ({currentPlan?.price || "00"}$)
              </h6>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
      <div className="mt-10">
        <h5 className="pb-3 font-medium">Billing History</h5>
        <div className="border-2 border-[#F9F6F9] rounded-2xl">
          {billingInfo?.map((sub) => (
            <div className="border-2 border-[#F9F6F9] rounded-2xl flex">
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "10px",
                  backgroundColor: "#FBF5FC",
                  margin: "15px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h6 className="font-semibold">{sub.title}</h6>
                <p className=" text-gray-400 text-sm mt-1">
                  {sub.lines.data[0].description} - {sub.created}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  marginLeft: "27%",
                }}
              >
                <img src={MauveLogo} alt="" />
                <a href={sub.invoice_pdf}>download invoice</a>
                <h6 className="font-semibold ms-2 text-[16px]">
                  {sub.credits} credits ({sub.amount_paid}$)
                </h6>
              </div>
            </div>
          ))}

          <button
            className={`m-5 text-[#4E2357] font-medium flex items-center`}
            onClick={() => setLargeView(!largeView)}
          >
            view more information <FaAngleDown className="ms-1 text-[20px]" />
          </button>
        </div>
      </div>
      <div className="mt-10">
        <h4 className="pb-3 font-medium">Billing Support</h4>
        <label className=" text-sm">
          <span className="text-gray-400 ">
            For billing questions, please reach out to our team at
          </span>
          <strong> support@mauveplanning.com</strong>
        </label>
      </div>
    </div>
  );

  return (
    <Layout
      title={"Payments & Billing"}
      description={desc}
      content={paymentSetting}
    />
  );
};

export default PaymentSettings;
