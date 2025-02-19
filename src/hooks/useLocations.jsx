import { useEffect, useState } from "react"
import { fetchLocations } from "../api/properities";

export const useLocations = () => {
  const [locations, setLocations] = useState()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLocations = async () => {
          setLoading(true);
          try {
            const data = await fetchLocations();            
            setLocations(data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        loadLocations();
  }, [])

  return {locations, error, loading}
}