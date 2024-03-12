import { makeRequest } from "../../shared/request-service";
import { METHODS } from "../../shared/requests.constants";
import { USER_ENDPOINTS } from "./user-constants";
import toast, { Toaster } from "react-hot-toast";

export const getUserDetails = async () => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.USER_DETAILS,
      METHODS.GET
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in getting user details!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetOrganizationUsers = async (organizationId) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.GET_ALL_ORGANIZATION_USER + `/${organizationId}`,
      METHODS.GET
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in getting organization details!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const AdvisorOnboard = async (payload) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.ADVISOR_ONBOARD,
      METHODS.POST,
      {
        fullName: payload.fullName,
        email: payload.email,
        account: payload.account,
        twoFactorAuth: payload.twoFactor,
        plan: payload.plan,
        organizationName: payload.firmName,
        logo: payload.firmLogo,
      }
    );

    if (!response || !response.data) {
      toast.error("Something went wrong. Please try again later.");
      throw new Error(`Something went wrong in Advisor Onboarding!`);
    }

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      toast.error("Something went wrong in Advisor Onboarding!");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong in Advisor Onboarding!");
    }
    return error;
  }
};
export const setAccountSettings = async (data) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.ACCOUNT_SETTINGS,
      METHODS.POST,
      {
        fullName: data.fullName,
        email: data.email,
        department: data.advisor,
        profilepic: data.selectedImage,
        userId: data.id,
      }
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in Account Settings`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const setFirmSettings = async (data) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.FIRM_SETTINGS,
      METHODS.POST,
      {
        fullName: data.firmName,
        logo: data.selectedImage,
      }
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in Firm Settings`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};
export const setSecuritySetting = async (data) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.SECURITY_SETTINGS,
      METHODS.POST,
      {
        enable: data,
      }
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in Security customization!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getbillingSetting = async () => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.BILLING_SETTING,
      METHODS.GET
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in Security customization!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getPlanInfo = async (organizationId) => {
  try {
    console.log(USER_ENDPOINTS.PLAN_INFO + `/${organizationId}`);
    const response = await makeRequest(
      USER_ENDPOINTS.PLAN_INFO + `/${organizationId}`,
      METHODS.GET
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in Security customization!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const setNotificationSettings = async (
  enableDocument,
  enableReminders,
  enableTouchPoints
) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.NOTIFICATION_SETTINGS,
      METHODS.POST,
      { enableDocument, enableReminders, enableTouchPoints }
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in Security customization!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const setClientSettings = async (data) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.CLIENT_SETTINGS,
      METHODS.POST,
      data
    );
    if (!response || !response.data) {
      toast("Error in saving Data!");
      throw new Error(`Something wen't wrong in Client Setings!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const ClientUpdate = async (data) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.UPDATE_CLIENT,
      METHODS.POST,
      {
        clientId: data.clientId,
        clientName: data.clientName,
        netWorth: data.netWorth,
        estateName: data.estateName,
        email: data.email,
        contactNo: data.contactNo,
      }
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in Security customization!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const clientDelete = async (data) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.DELETE_CLIENT + `/${data.clientId}`,
      METHODS.GET
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in Security customization!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addReport = async (data) => {
  try {
    console.log(data);
    const response = await makeRequest(
      USER_ENDPOINTS.ADD_REPORT,
      METHODS.POST,
      {
        reportName: data.reportName,
        clientId: data.userId,
        section: data.sections,
      }
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in Client Setings!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTotalClients = async (orgId) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.TOTAL_CLIENTS + `/${orgId}`,
      METHODS.GET
    );
    // if (!response || !response.data) {
    //   throw new Error(`Something wen't wrong in getting total clients!`);
    // }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTotalReports = async (orgId) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.TOTAL_REPORTS + `/${orgId}`,
      METHODS.GET
    );
    // if (!response === "" || !response.data) {
    //     throw new Error(`Something wen't wrong in getting total reports!`);
    // }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTotalActionItems = async (orgId) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.TOTAL_ACTION_ITEMS + `/${orgId}`,
      METHODS.GET
    );
    // if (!response || !response.data) {
    //     throw new Error(`Something wen't wrong in getting total action items!`);
    // }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTotalDocs = async (orgId) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.TOTAL_DOCS + `/${orgId}`,
      METHODS.GET
    );
    if (!response || !response.data) {
      //   throw new Error(`Something wen't wrong in getting total documents!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTotalGoals = async (orgId) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.TOTAL_GOALS + `/${orgId}`,
      METHODS.GET
    );
    // if (!response || !response.data) {
    //   throw new Error(`Something wen't wrong in getting total goals!`);
    // }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserPlans = async () => {
  try {
    const response = await makeRequest(USER_ENDPOINTS.GET_PLANS, METHODS.GET);
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in getting plans!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addDoc = async (docObj) => {
  try {
    console.log("final checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", docObj);
    const response = await makeRequest(
      USER_ENDPOINTS.UPLOAD_DOCUMENT,
      METHODS.POST,
      docObj
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in getting Document!`);
    }
    return response;
  } catch (error) {
    return error;
  }
};

export const AddReminder = async (reminderObj, clientId) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.ADD_REMINDER,
      METHODS.POST,
      {
        clientId: clientId,
        action: reminderObj.Action,
        actionItem: reminderObj.actionItem,
        targetDate: reminderObj.targetDate,
        description: reminderObj.description,
      }
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in getting user details!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const InviteTeam = async (data) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.INVITE_TEAM,
      METHODS.POST,
      data
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in getting user details!`);
    }
    return response.data;
  } catch (error) {
    error;
  }
};

export const AddGoal = async (data) => {
  try {
    const response = await makeRequest(
      USER_ENDPOINTS.ADD_GOAL,
      METHODS.POST,
      data
    );
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong in getting Goals!`);
    }
    return response.data;
  } catch (error) {
    error;
  }
};
