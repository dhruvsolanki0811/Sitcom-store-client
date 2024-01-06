import axios from "axios";
import { useUserAuthStore } from "../store/Authstore";
import { APIBASEURL } from "../store/store";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
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
      console.log(response)
      if(response.status==401 && response.statusText=='Unauthorized'){
        console.log("aaaaaaaaa")
        await fetch(`${APIBASEURL}/accounts/logout/`,{method:'POST'}).then((resp)=>{
          console.log("ok",resp)
          if(resp.status==200 ){
            console.log("not")
            useUserAuthStore.setState({ user: { userEmail: null, userId: null }, loader: false} )
          }
        })
    }})
    .catch((error) => {
      console.error(error, "Aaaaaaaa");
      useUserAuthStore().logout();
    });
        
      
      
      
    }
    return Promise.reject(error);
  }
);
