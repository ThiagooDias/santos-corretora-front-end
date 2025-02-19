import { API } from "./api";

export const fetchProperties = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    // console.log(`/properties/public?${queryParams}`);
    
    const response = await API.get(`/properties/public?${queryParams}`);
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