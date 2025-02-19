import { useState, useEffect } from "react";
import { fetchPublicPropertyById } from "../api/properities";

export const usePublicPropertyById = (id) => {  
  const [property, setProperty] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        const data = await fetchPublicPropertyById(id);
        setProperty(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [id]);

  return { property, error, loading };
};
