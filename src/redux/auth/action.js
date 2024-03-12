import { AUTH_ACTIONS } from "./auth-constants";
import { loginUser, googleAuth, signOutUser } from "./auth-service";
import toast, { Toaster } from "react-hot-toast";

export const userLogin = (email) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: AUTH_ACTIONS.SET_LOADING,
      });
      const result = await loginUser(email);
      if (result) {
        toast.success("Please check your email for the magic link to sign in");
        dispatch({
          type: AUTH_ACTIONS.LOGIN_DATA,
          payload: result,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const signout = (email) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: AUTH_ACTIONS.SET_LOADING,
      });
      const result = await signOutUser();
      if (result) {
        dispatch({
          type: AUTH_ACTIONS.LOGOUT_DATA,
          payload: result,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const googleLogin = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: AUTH_ACTIONS.SET_LOADING,
      });
      const result = await googleAuth();
      if (result) {
        window.location.href = result;
      }
    } catch (error) {
      throw error;
    }
  };
};
