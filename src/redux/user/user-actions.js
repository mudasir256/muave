import { USER_ACTIONS } from "./user-constants";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  addDoc,
  AddReminder,
  GetOrganizationUsers,
  getUserPlans,
  AdvisorOnboard,
  setAccountSettings,
  setFirmSettings,
  setSecuritySetting,
  setNotificationSettings,
  setClientSettings,
  getTotalClients,
  getTotalReports,
  getTotalActionItems,
  getTotalDocs,
  getTotalGoals,
  InviteTeam,
  getbillingSetting,
  getPlanInfo,
  addReport,
  AddGoal,
  ClientUpdate,
  clientDelete,
} from "./user-service";
import toast, { Toaster } from "react-hot-toast";

export const userDetails = () => {
  return async (dispatch) => {
    try {
      const response = await getUserDetails();
      if(response.message === "Request failed with status code 401"){
      localStorage.removeItem("accessToken")
      window.location.reload();
      }
      if (response) {
        dispatch({
          type: USER_ACTIONS.SET_USER_DETAILS,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};


export const getOrganizationUsers = (orgId) => {
  return async (dispatch) => {
    try {
      const response = await GetOrganizationUsers(orgId);
      if (response) {
        console.log(response, "all usersssssssssssssssssssssssss");
        dispatch({
          type: USER_ACTIONS.SET_ORG_USERS,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const getClients = (orgId) => {
  return async (dispatch) => {
    try {
      const response = await getTotalClients(orgId);
      if (response) {
        dispatch({
          type: USER_ACTIONS.SET_TOTAL_CLIENTS,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const getReports = (orgId) => {
  return async (dispatch) => {
    try {
      const response = await getTotalReports(orgId);
      if (response) {
        dispatch({
          type: USER_ACTIONS.SET_TOTAL_REPORTS,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const getActionItems = (orgId) => {
  return async (dispatch) => {
    try {
      const response = await getTotalActionItems(orgId);
      if (response) {
        dispatch({
          type: USER_ACTIONS.SET_TOTAL_ACTION_ITEMS,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const getDocs = (orgId) => {
  return async (dispatch) => {
    try {
      const response = await getTotalDocs(orgId);
      if (response) {
        dispatch({
          type: USER_ACTIONS.SET_TOTAL_DOCS,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const getGoals = (orgId) => {
  return async (dispatch) => {
    try {
      const response = await getTotalGoals(orgId);
      if (response) {
        dispatch({
          type: USER_ACTIONS.SET_TOTAL_GOALS,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const handleAddDocument = (docObj) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_ACTIONS.SET_LOADING,
      });
      const response = await addDoc(docObj);
      if ((response.status === 200 || response.status === 201)) {
        toast.success("Document Added Successfully!");
        dispatch({
          type: USER_ACTIONS.SET_LOADING_FALSE,
        });
      } else {
        console.error("Something went wrong with the response:", response);
        toast.error("Something went wrong. Please try again later.");
        dispatch({
          type: USER_ACTIONS.SET_LOADING_FALSE,
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
        dispatch({
          type: USER_ACTIONS.SET_LOADING_FALSE,
        });
      } else {
        toast.error("Something went wrong. Please try again later.");
        dispatch({
          type: USER_ACTIONS.SET_LOADING_FALSE,
        });
      }
      return error;
    }
  };
};

export const addReminder = (reminderObj, clientId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_ACTIONS.SET_LOADING,
      });
      const response = await AddReminder(reminderObj, clientId);
      if (response) {
        dispatch({
          type: USER_ACTIONS.cls,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const setSubscription = (plan) => {
  return (dispatch) => {
    dispatch({
      type: USER_ACTIONS.SET_SUBSCRIPTION,
      payload: plan,
    });
  };
};

export const getPlans = () => {
  return async (dispatch) => {
    try {
      const response = await getUserPlans();
      if (response) {
        dispatch({
          type: USER_ACTIONS.SET_PLANS,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const advisorOnboard = (data) => {
  return async (dispatch) => {
    dispatch({
      type: USER_ACTIONS.SET_LOADING,
    });
    try {
      const response = await AdvisorOnboard(data);
      if (response) {
        dispatch({
          type: USER_ACTIONS.SET_LOADING_FALSE,
        });
       console.log(response);
      } else {
        dispatch({
          type: USER_ACTIONS.SET_LOADING_FALSE,
        });
      }
    } catch (err) {
      return err;
    }
  };
};

export const accountSettings = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_ACTIONS.SET_LOADING,
      });
      const response = await setAccountSettings(data);
      if (response) {
        toast.success("Information has been updated");
        dispatch({
          type: USER_ACTIONS.UPDATE_USER_DETAILS,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const firmSettings = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_ACTIONS.SET_LOADING,
      });
      const response = await setFirmSettings(data);
      if (response) {
        toast.success("Firm information has been updated");

        dispatch({
          type: USER_ACTIONS.UPDATE_FIRM_DETAILS,
          payload: response,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const securitySetting = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_ACTIONS.SET_LOADING,
      });
      const response = await setSecuritySetting(data);
      if (response) {
        dispatch({
          type: USER_ACTIONS.UPDATE_SECURITY,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const billingSetting = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_ACTIONS.SET_LOADING,
      });
      const response = await getbillingSetting();
      if (response) {
        dispatch({
          type: USER_ACTIONS.BILLING_SETTING,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const planInfo = (id) => {
  return async (dispatch) => {
    try {
      // console.log("heheh");
      dispatch({
        type: USER_ACTIONS.SET_LOADING,
      });
      const response = await getPlanInfo(id);
      if (response) {
        dispatch({
          type: USER_ACTIONS.GETTING_PLAN_INFO,
          payload: response,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const notificationSettings = (
  enableDocument,
  enableReminders,
  enableTouchPoints
) => {
  return async (dispatch) => {
    try {
      const response = await setNotificationSettings(
        enableDocument,
        enableReminders,
        enableTouchPoints
      );
      if (response) {
        toast.success("Setting updated");
        dispatch({
          type: USER_ACTIONS.NOTIFICATION_SETTINGS,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const clientSettings = (data) => {
  return async (dispatch) => {
    try {
      const response = await setClientSettings(data);
      if (response) {
        dispatch(
          {
            type: USER_ACTIONS.SET_USER_PERMISSIONS,
            payload: response,
          },
          window.location.reload()
        );
      }
    } catch (error) {
      return error;
    }
  };
};

export const updateClient = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_ACTIONS.SET_LOADING,
      });
      const response = await ClientUpdate(data);
      if (response) {
        toast.success("Client Updated");
        dispatch({
          type: USER_ACTIONS.UPDATE_CLIENT,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const deleteClient = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_ACTIONS.SET_LOADING,
      });
      const response = await clientDelete(data);
      if (response) {
        toast.success("Client Updated");
        dispatch({
          type: USER_ACTIONS.DELETE_CLIENT,
          payload: response,
        });
      }
    } catch (error) {
      return error;
    }
  };
};

export const inviteTeam = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: USER_ACTIONS.SET_LOADING
            })
          const response = await InviteTeam(data);
          if(response){
            dispatch({
              type : USER_ACTIONS.SET_LOADING_FALSE
            })
            toast.success("Client added Successfully!");
            return response;
          }
          if(!response){
            dispatch({
              type : USER_ACTIONS.SET_LOADING_FALSE
            })
            toast.error("Error in Invitation!")
          }
        } catch (error) {
          return error;
        }
      };
}
export const createReport = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_ACTIONS.SET_LOADING,
      });
      const response = await addReport(data);
      if (response) {
        toast.success("Report has been added");

        dispatch({
          type: USER_ACTIONS.ADDED_REPORT,
          payload: response,
        });
      }
    } catch (error) {
      toast.error("Failed to create report");

      return error;
    }
  };
};

export const addGoal = (data) => {
  return async (dispatch) => {
    try {
      console.log(data)
      dispatch({
        type: USER_ACTIONS.SET_LOADING,
      });
      const response = await AddGoal(data);
      if(response){
        dispatch({
          type : USER_ACTIONS.SET_LOADING_FALSE
        })
        toast.success("Goal added Successfully!");
        return response;
      }
      if(!response){
        dispatch({
          type : USER_ACTIONS.SET_LOADING_FALSE
        })
        toast.error("Error in Creating Goal!")
      }
    } catch (error) {
      toast.error("Failed to create goal");

      return error;
    }
  };
};



const setLoadingFalse = () => {
  return(dispatch) => {
    dispatch({
      type : USER_ACTIONS.SET_LOADING_FALSE
    })
  }
}