import { makeRequest } from "../../shared/request-service";
import { METHODS } from "../../shared/requests.constants";
import { AUTH_ENDPOINTS } from "./auth-constants";

export const loginUser = async (payload) => {
  try {
    const response = await makeRequest(AUTH_ENDPOINTS.LOGIN, METHODS.POST, {
      email: payload,
    });
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong during logging in!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const signOutUser = async () => {
  try {
    const response = await makeRequest(AUTH_ENDPOINTS.LOGOUT, METHODS.GET, {});
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong during logging in!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const googleAuth = async () => {
  try {
    const response = await makeRequest(AUTH_ENDPOINTS.GOOGLE_AUTH, METHODS.GET);
    if (!response || !response.data) {
      throw new Error(`Something wen't wrong GOOGLE AUTH!`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};
