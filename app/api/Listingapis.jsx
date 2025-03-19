import { axiosInstance } from "./axiosInstance";
import axios from "axios"

export const getEmployeeHiringDetailsByBunit = async (Bunit,type) => {
    try {
      const response = await axiosInstance.get(`/api/dashboard/getEmployeeHiringDetailsByBunit/${Bunit}/${type}`);
      return response; 
    } catch (error) {
      console.error("Error fetching prehire details:", error);
      throw error; 
    }
  };

  export const getWorkForceReportByBunit = async (Bunit) => {
    
    
    try {
      const response = await axiosInstance.get(`/api/dashboard/getWorkForceReportByBunit/${Bunit}`);
      return response; 
    } catch (error) {
      console.error("Error fetching prehire details:", error);
      throw error; 
    }
  };
 

  export const getBusinessUnitList = async () => {
    try {
      const response = await axiosInstance.get(`/api/dashboard/getBusinessUnitList`);
      return response; 
    } catch (error) {
      console.error("Error fetching prehire details:", error);
      throw error; 
    }
  };
  
  export const getEmpVacationDetails = async (EmpId) => {
    try {
      const response = await axiosInstance.get(`/api/dashboard/getEmpVacationDetails/${EmpId}`);
      return response; 
    } catch (error) {
      console.error("Error fetching prehire details:", error);
      throw error; 
    }
  };

  export const getEmpImpContactDetails = async (EmpId) => {
    try {
      const response = await axiosInstance.get(`/api/dashboard/getEmpImpContactDetails/${EmpId}`);
      return response; 
    } catch (error) {
      console.error("Error fetching prehire details:", error);
      throw error; 
    }
  };

  // chatbot- http://127.0.0.1:8000/ask

  export const chatbotapi = async (text) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/ask`, { "text" :text});
      return response.data; // Returning only the relevant data
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      throw error; 
    }
  };