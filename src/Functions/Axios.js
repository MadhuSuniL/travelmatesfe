import axios from 'axios';
import { getData } from './LocalStorage';

// Create an instance with custom configurations
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Base URL for requests
  timeout: 15000, // Timeout for requests in milliseconds
  headers: {
    'Authorization': `Bearer ${getData("accessToken")}`, // Example authorization header
  }
});

const refreshToken = async () => {
  try {
   const response = await axios.post(
     `${process.env.REACT_APP_API_URL}users/token/refresh/`,
     {
       refresh: getData("refreshToken"),
     }
   );
   const newAccessToken = response.data.access;
   return newAccessToken;
 } catch (error) {
   throw error;
 }
};

// Add a response interceptor to handle 401 errors
instance.interceptors.response.use(
 (response) => response,
 async (error) => {
   if (error.response) {
     const { status } = error.response;
     if (status === 401) {
       try {
         const newAccessToken = await refreshToken(); 
         if (newAccessToken) {
           localStorage.setItem("accessToken", newAccessToken);
           error.config.headers.Authorization = `Bearer ${newAccessToken}`;
           return axios(error.config);
         }
         else{
           localStorage.removeItem("accessToken");
           localStorage.removeItem("user");
           window.location.href = '/login';
         }
       } catch (refreshError) {
         localStorage.removeItem("accessToken");
         localStorage.removeItem("user");
         window.location.href = '/login';
       }
     }
   }
   return Promise.reject(error);
 }
);

const apiCall = (endpoint, body, method, loadingState, onSuccess) => {
  loadingState(true)
  instance[method](endpoint, body)
  .then(response => {
      let data = response.data
      loadingState(false)
      return onSuccess(data)
  })
  .catch(error => {
      try {
        alert('Error:', error)   
        loadingState(false)
      } catch (error) {
        loadingState(false)
        alert('Error:', error)   
      }
  }) 
}

export default apiCall