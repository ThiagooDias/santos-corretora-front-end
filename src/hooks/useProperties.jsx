import { useState, useEffect } from "react";
import { fetchProperties } from "../api/properities";

export const useProperties = (filters = {}) => {  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        const validFilters = Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== undefined && value !== "")
        );
        const data = await fetchProperties(validFilters);       
        setProperties(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [JSON.stringify(filters)]);

  return { properties, error, loading };
};
