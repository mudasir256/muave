import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import Layout from "./Layout";
import { notificationSettings } from "../../redux/user/user-actions";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const NotificationSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [enableDocument, setEnableDocument] = useState(false);
  const [enableReminders, setEnableReminders] = useState(false);
  const [enableTouchPoints, setEnableTouchPoints] = useState(false);
  useEffect(() => {
    if (user) {
      setEnableDocument(user?.userData?.Notifications?.enableDocument);
      setEnableReminders(user?.userData?.Notifications?.enableReminders);
      setEnableTouchPoints(user?.userData?.Notifications?.enableTouchPoints);
    }
  }, [user]);

  useEffect(() => {
    if (user.temporaryNotificationData) {
      setEnableDocument(user?.temporaryNotificationData?.enableDocument);
      setEnableReminders(user?.temporaryNotificationData?.enableReminders);
      setEnableTouchPoints(user?.temporaryNotificationData?.enableTouchPoints);
    }
  }, [user.temporaryNotificationData]);

  console.log(user.temporaryNotificationData);
  const desc =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, ut?";

  const notificationSetting = (
    <div className="ml-[2%] mr-[50%] flex flex-col mb-10 mt-10">
      <div className="flex flex-col justify-end">
        <div className="flex flex-col font-semibold">
          <Checkbox
            checked={enableDocument}
            onChange={(e) => setEnableDocument(e.target.checked)}
            className="my-2"
          >
            Document Updates
          </Checkbox>
          <Checkbox
            checked={enableReminders}
            onChange={(e) => setEnableReminders(e.target.checked)}
            className="my-2"
          >
            Reminders
          </Checkbox>
          <Checkbox
            checked={enableTouchPoints}
            onChange={(e) => setEnableTouchPoints(e.target.checked)}
            className="my-2"
          >
            Potential Touchpoints
          </Checkbox>
          <button
            className="bg-[#4E2357] px-[10px] py-[8px] rounded-3xl ml-[88%] mt-5"
            onClick={() =>
              dispatch(
                notificationSettings(
                  enableDocument,
                  enableReminders,
                  enableTouchPoints
                )
              )
            }
          >
            {" "}
            <small className="mx-2 text-[13px] text-white">Save</small>
          </button>
        </div>
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
        title={"Notification Settings"}
        description={desc}
        content={notificationSetting}
      />
    </>
  );
};

export default NotificationSettings;
