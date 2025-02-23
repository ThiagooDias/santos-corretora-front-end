import { API } from "./api";

export const fetchProperties = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    
    
    const response = await API.get(`/properties/public?${queryParams}`);
    console.log(response);
    console.log(response.data);    
    
    return response.data;
  } catch (error) {
    console.error("Error fetching Properties:", error.message);
    return [];
  }
};


export const fetchPublicPropertyById = async (id) => {
  try {
    const response = await API.get(`/properties/public/${id}`);
    
    return response.data;
  } catch(error) {
      console.error(`Error fetching property by ID ${id}:`, error.message);
  }
};

export const fetchLocations = async () => {
  try {
    const response = await API.get(`/properties/public/locations`);

    return response.data;
  } catch(error) {
      console.error(`Error fetching plocations: `, error.message);
  }
};