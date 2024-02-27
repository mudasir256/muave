import axios from "axios";
import {getBaseApi} from '../config/Environment';

export const makeRequest = (
  endpoint,
  method,
  payload = null,
  addedHeaders = null,
  params = null
) => {
  let headers = {};
  const token = localStorage.getItem("accessToken");
  if (token) headers.Authorization = `Bearer ${token}`;
  if (addedHeaders) headers = { ...headers, ...addedHeaders };
  switch (method) {
    case "GET":
      return axios.get(`${getBaseApi()}${endpoint}`, { headers });
    case "POST":
      return axios.post(`${getBaseApi()}${endpoint}`, payload, { headers });
    case "DELETE":
      return axios.delete(`${getBaseApi()}${endpoint}`, { headers, params });
    case "PUT":
      return axios.put(`${getBaseApi()}${endpoint}`, payload, {
        headers,
        params,
      });
    case "PATCH":
      return axios.patch(`${getBaseApi()}${endpoint}`, payload, {
        headers,
        params,
      });
    default:
      return false;
  }
};