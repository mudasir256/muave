import { USER_ACTIONS } from "./user-constants";
const initialState = {
  temporaryUserData: null,
  temporaryTwoFactor: null,
  temporaryOrganizationData: null,
  temporaryNotificationData: null,
  userData: null,
  loading: false,
  reminder: null,
  report: null,
  organization: null,
  subscription: null,
  plans: null,
  selectedPlan: null,
  totalClients: null,
  totalReports: null,
  totalActionItems: null,
  totalDocs: null,
  totalGoals: null,
  settingsLoader: false,
  billingData: null,
  planInfo: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER_DETAILS: {
      console.log(action.payload);
      return {
        ...state,
        userData: action.payload,
      };
    }

    case USER_ACTIONS.SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case USER_ACTIONS.SET_LOADING_FALSE: {
      return {
        ...state,
        loading: false,
      };
    }

    case USER_ACTIONS.UPDATE_USER_DETAILS: {
      return {
        ...state,
        temporaryUserData: action.payload,
        loading: false,
      };
    }
    case USER_ACTIONS.UPDATE_FIRM_DETAILS: {
      return {
        ...state,
        loading: false,
        temporaryOrganizationData: action.payload,
      };
    }
    case USER_ACTIONS.UPDATE_SECURITY: {
      return {
        ...state,
        temporaryTwoFactor: action.payload.twoFactorAuth,
        loading: false,
      };
    }

    case USER_ACTIONS.NOTIFICATION_SETTINGS: {
      return {
        ...state,
        loading: false,
        temporaryNotificationData: action.payload,
      };
    }
    case USER_ACTIONS.BILLING_SETTING: {
      return {
        ...state,
        billingData: action.payload,
      };
    }

    case USER_ACTIONS.GETTING_PLAN_INFO: {
      return {
        ...state,
        planInfo: action.payload.Plan,
      };
    }

    case USER_ACTIONS.SET_TOTAL_CLIENTS:
      return {
        ...state,
        totalClients: action.payload,
      };

    case USER_ACTIONS.SET_TOTAL_REPORTS:
      return {
        ...state,
        totalReports: action.payload,
      };
    case USER_ACTIONS.ADDED_REPORT:
      return {
        ...state,
        report: action.payload,
      };
    case USER_ACTIONS.SET_TOTAL_ACTION_ITEMS:
      return {
        ...state,
        totalActionItems: action.payload,
      };
    case USER_ACTIONS.SET_TOTAL_DOCS:
      return {
        ...state,
        totalDocs: action.payload,
      };
    case USER_ACTIONS.SET_TOTAL_GOALS:
      return {
        ...state,
        totalGoals: action.payload,
      };

    case USER_ACTIONS.SET_DOC_DETAILS: {
      return {
        ...state,
        documents: action.payload,
        loading: false,
      };
    }

    case USER_ACTIONS.ADD_REMINDER:
      return {
        ...state,
        reminder: action.payload,
        loading: false,
      };

    case USER_ACTIONS.SET_ORG_USERS:
      return {
        ...state,
        organization: action.payload.organization,
      };

    case USER_ACTIONS.UPDATE_CLIENT:
      return {
        ...state,
        organization: action.payload,
        loading: false,
      };
    case USER_ACTIONS.DELETE_CLIENT:
      return {
        ...state,
        organization: action.payload,
        loading: false,
      };

    case USER_ACTIONS.SET_SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload,
      };

    case USER_ACTIONS.SET_PLANS:
      return {
        ...state,
        plans: action.payload,
      };

    case USER_ACTIONS.SET_USER_PERMISSIONS:
      const payloadId = action.payload.id;
      organization?.organization?.map((elem) => {
        if (elem.id === payloadId) {
          const newData = [action.payload];
          return {
            ...state,
            settingsLoader: false,
            UserPermissions: newData,
          };
        } else {
          return elem;
        }
      });

    case USER_ACTIONS.SET_SETTINGS_LOADER:
      return {
        ...state,
        settingsLoader: true,
      };

    default:
      return state;
  }
};

export default user;
