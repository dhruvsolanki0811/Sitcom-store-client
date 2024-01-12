import axios from "axios";
import { useUserAuthStore } from "../store/Authstore";
import { APIBASEURL } from "../store/store";

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.status === 403 || error?.response?.status === 401) {
      
      await fetch(`${APIBASEURL}/accounts/login/refresh/`,{
    method: 'POST',  // or 'GET' or any other HTTP method you're using
    credentials: 'include',  // Set to 'include' to send cookies
    headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
    },}).then(async (response) => {
      if(response.status==401 ){
        await fetch(`${APIBASEURL}/accounts/logout/`,{method:'POST'}).then((resp)=>{
          if(resp.status==200 ){
              
            useUserAuthStore.setState({ user: { userEmail: null, userId: null }, loader: false} )

          }
        })
    }})
    .catch(() => {
      useUserAuthStore.getState().logout();
    });
        
      
      
      
    }
    return Promise.reject(error);
  }
);
