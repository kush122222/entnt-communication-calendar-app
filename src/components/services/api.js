import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5003',
  headers: { 'Content-Type': 'application/json' },
});

// Companies API
export const getCompanies = () => apiClient.get('/companies');
export const addCompany = (data) => apiClient.post('/companies', data);
export const updateCompany = (id, data) => apiClient.put(`/companies/${id}`, data);
export const deleteCompany = (id) => apiClient.delete(`/companies/${id}`);

// Communication Methods API
export const getCommunicationMethods = () => apiClient.get('/communicationMethods');
export const addCommunicationMethod = async (newCommunication) => {
  try {
    const response = await apiClient.post(`/communicationMethods`, newCommunication);
    return response.data;
  } catch (error) {
    console.error("Error adding communication method:", error);
    throw error;  // Rethrow the error to be handled by the caller
  }
};

export const updateCommunicationMethod = async (id, data) => {
  try {
    const response = await apiClient.put(`/communicationMethods/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating communication method:", error);
    throw error;  // Rethrow the error to be handled by the caller
  }
};

export const deleteCommunicationMethod = (id) =>
  apiClient.delete(`/communicationMethods/${id}`);

export const addCommunicationToCompany = async (companyId, newCommunication) => {
  try {
    const response = await apiClient.post(`/companies/${companyId}/lastCommunications`, newCommunication);
    return response.data; // Return the updated company object
  } catch (error) {
    console.error("Error adding communication to company:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};