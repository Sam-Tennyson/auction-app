// axiosSetup.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/api";

export interface IRequest {
  API?: string;
  DATA?: any;
  timeout?: number;
}

export interface IActionResponse {
  data?: any;
  success?: (response?: any) => void;
  fail?: (error: any) => void;
}

// Define a base URL for your API
const BASE_URL = API_BASE_URL;

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Set a timeout of 10 seconds
});

// Function to get token from AsyncStorage
export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Failed to get token from AsyncStorage", error);
    return null;
  }
};

// Function to set token in AsyncStorage
export const setToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.error("Failed to set token in AsyncStorage", error);
  }
};

export const getUserAndToken = async (): Promise<{
  user: string | null;
  token: string | null;
}> => {
  try {
    const data = await AsyncStorage.getItem("auth");
    return data ? JSON.parse(data) : { user: null, token: null };
  } catch (error) {
    console.error("Failed to get user and token from AsyncStorage", error);
    return { user: null, token: null };
  }
};

// Function to set user and token in AsyncStorage
export const setUserAndToken = async (
  user: string,
  token: string
): Promise<void> => {
  try {
    await AsyncStorage.setItem("auth", JSON.stringify({ user, token }));
  } catch (error) {
    console.error("Failed to set user and token in AsyncStorage", error);
  }
};

// Function to remove token from AsyncStorage
export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Failed to remove token from AsyncStorage", error);
  }
};

// Function to remove token from AsyncStorage
export const removeUserAndToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("auth");
  } catch (error) {
    console.error("Failed to remove token from AsyncStorage", error);
  }
};

// Request interceptor to add the token to headers if it exists
axiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = await getToken();
    // const { token } = await getUserAndToken();
    // console.log(token, "token intercep;tor");
    if (!!token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle errors (e.g., log out user if token is invalid)
    if (error.response && error.response.status === 401) {
      // Implement logic to handle unauthorized errors
      removeToken();
    }
    return Promise.reject(error);
  }
);

export const getRequest = async ({ API = "" }: IRequest) => {
  return axiosInstance.get(API);
};

export const postRequest = async ({ API = "", DATA = {} }: IRequest) => {
  return axiosInstance.post(API, DATA);
};

export const putRequest = async ({ API = "", DATA = {} }: IRequest) => {
  return axiosInstance.put(API, DATA);
};

export const deleteRequest = async ({ API = "", DATA = {} }: IRequest) => {
  return axiosInstance.delete(API, { data: DATA });
};

// New function for handling file uploads
export const postFileRequest = async ({ API = "", DATA = {} }: IRequest) => {
  console.log(DATA, "Reqeust");
  return axiosInstance.post(API, DATA, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
