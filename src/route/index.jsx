import { Navigate, Route } from "react-router-dom";

import Login from "../pages/auth/Login"
import Dashboard from "../pages/dashboard/Dashboard"
import UserRoutes from "../components/UserRoutes"
import ClientsAndReports from "../pages/clients-and-reports/ClientsAndReports"
import ActionItems from "../pages/action-items/ActionItems"
import AccessTokenComponent from "../components/AccessTokenComponent"
import Documents from "../pages/documents/Documents"
import Overview from "../pages/overview/Overview"
import GoalPlanning from "../pages/goal-planning/GoalPlanning"
import Introduction from "../pages/registration/Introduction"
import Steps from '../pages/registration/Steps'
import AccountSettings from "../pages/settings/Account"
import FirmSettings from '../pages/settings/Firm'
import ClientAndTeamSettings from '../pages/settings/ClientAndTeam'
import SecuritySettings from '../pages/settings/Security'
import PaymentSettings from '../pages/settings/PaymentAndBilling'
import NotificationSettings from '../pages/settings/Notification'
import Client from '../pages/dashboard/ClientsAndReports'
import Onboarding from '../pages/onboarding';
import Subscription from "../components/Subscription"
import Refferal from "../pages/settings/Refferal"
import Plaid from '../pages/plaid';
import SessionRoute from "../components/SessionRoute";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../redux/user/user-actions";

const Router = (isLoggedIn) => {

  const dispatch = useDispatch();
  const myState = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(userDetails());
    }
  }, [isLoggedIn]);

  return [
    {
      path: "/",
      element: (
        <>
          {isLoggedIn && (myState.userData?.isOnboarded === true) && (myState.userData?.role === "owner" || myState.userData?.role === "member") ? (
            <Navigate to="/user/dashboard" />
          ) : isLoggedIn && (myState.userData?.isOnboarded === false) && (myState.userData?.role === "owner" || myState.userData?.role === "member") ? (
            <Navigate to="/registration/steps" />
          ) : (
            isLoggedIn && (myState.userData?.isOnboarded === false) && (myState.userData?.role === "client") ?
              <Navigate to="/onboarding" />
              :
              (
                isLoggedIn && (myState.userData?.isOnboarded === true) && (myState.userData?.role === "client") ? <Navigate to="/client/dashboard/client" />
                  :
                  (!isLoggedIn) ? <AccessTokenComponent /> : ""
              )
          )}
        </>
      ),
    },

    {
      path: "user",
      element:
        isLoggedIn &&
          myState.userData?.isOnboarded &&
          (myState.userData?.role === "owner" ||
            myState.userData?.role === "member") ? (
          <UserRoutes />
        ) : (
          <Navigate to="/registration/steps" />
        ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "clients-&-reports", element: <ClientsAndReports /> },
        { path: "action-&-goals", element: <ActionItems /> },
        { path: "documents", element: <Documents /> },
        { path: "overview", element: <Overview /> },
        { path: "goal-planning", element: <GoalPlanning /> },
        { path: "subscription", element: <Subscription /> },
      ],
    },

    {
      path: "client",
      element:
      isLoggedIn && (myState.userData?.isOnboarded && (myState.userData?.role === "client"))? (
      <UserRoutes />
      ) : (
      <Navigate to="/onboarding" />
      )
      ,
      children: [{ path: "dashboard/client", element: <Client /> }],
    },

    {
      path: "auth/login",
      element: (isLoggedIn && myState.userData?.isOnboarded === false && (myState.userData?.role === "client")) ? <Navigate to="/onboardding" /> :
        (isLoggedIn && myState.userData?.isOnboarded && (myState.userData?.role === "client")) ? <Navigate to="/client/dashboard/client" /> :
          (isLoggedIn && myState.userData?.isOnboarded === false && (myState.userData?.role === "owner" || myState.userData?.role === "member")) ?
            <Navigate to="/registration/steps" /> :
            (isLoggedIn && myState.userData?.isOnboarded && (myState.userData?.role === "owner" || myState.userData?.role === "member")) ?
              <Navigate to="/user/dashboard" /> :
              (!isLoggedIn) ? <Login /> : ""
    },

    {
      path: "/onboarding",
      element: <Onboarding />
      // :
      // (isLoggedIn && myState.userData?.isOnboarded && (myState.userData?.role === "client")) ? <Navigate to="/client/dashboard/client" /> :
      //   (isLoggedIn && myState.userData?.isOnboarded && (myState.userData?.role === "owner" || myState.userData?.role === "member")) ?
      //     <Navigate to="/user/dashboard" /> :
      //     (isLoggedIn && myState.userData?.isOnboarded === false && (myState.userData?.role === "owner" || myState.userData?.role === "member")) ?
      //       <Navigate to="/registration/steps" /> : (!isLoggedIn) ? <Navigate to="/auth/login" /> : ""
    },

    // {
    //   path: "/onboarding",
    //   element: (isLoggedIn && myState.userData?.isOnboarded && (myState.userData?.role === "client")) ? <Navigate to="/client/dashboard/client" /> :
    //     (isLoggedIn && myState.userData?.isOnboarded && (myState.userData?.role === "owner" || myState.userData?.role === "member")) ?
    //     <Navigate to="/user/dashboard" /> :
    //     (isLoggedIn && myState.userData?.isOnboarded === false && (myState.userData?.role === "owner" || myState.userData?.role === "member")) ?
    //     <Navigate to="/registration/steps" />
    //     :
    //     (!isLoggedIn) ? <Navigate to="/auth/login" /> : ""
    // },

    {
      path: "/registration/steps",
      element: (isLoggedIn && myState.userData?.isOnboarded === false && (myState.userData?.role === "owner" || myState.userData?.role === "member")) ?
        <Steps /> :
        (isLoggedIn && myState.userData?.isOnboarded && (myState.userData?.role === "owner" || myState.userData?.role === "member")) ?
          <Navigate to="/user/dashboard" /> :
          (isLoggedIn && myState.userData?.isOnboarded && (myState.userData?.role === "client")) ? <Navigate to="/client/dashboard/client" /> :
            (isLoggedIn && myState.userData?.isOnboarded === false && (myState.userData?.role === "client")) ? <Navigate to="/onboarding" /> :
              (!isLoggedIn) ? <Navigate to="/auth/login" /> : ""
    },

    {
      path: "settings",
      children: [
        { path: "account", element: <AccountSettings /> },
        { path: "firm", element: <FirmSettings /> },
        //   ...(isLoggedIn && (myState?.userData?.role === "owner" || myState?.userData?.role === "member")
        // ? [{ path: "clientAndTeam", element: <ClientAndTeamSettings /> }]
        // : []),
        { path: "clientAndTeam", element: <ClientAndTeamSettings /> },
        { path: "security", element: <SecuritySettings /> },
        { path: "payment", element: <PaymentSettings /> },
        { path: "notification", element: <NotificationSettings /> },
        { path: "referral", element: <Refferal /> },

      ]
    },
    // {
    //   path: "settings/clientAndTeam",
    //   element:
    //     isLoggedIn && myState.userData?.role === "client" ? (
    //       <Navigate to="/settings/account" />
    //     ) : (
    //       ""
    //     ),
    // },
    {
      path: "/plaid",
      element: <Plaid />
    },

    {
      path: "/:session_id",
      element: isLoggedIn ? <SessionRoute /> : <Navigate to="/auth/login" />
    }
  ]
}

export default Router;
