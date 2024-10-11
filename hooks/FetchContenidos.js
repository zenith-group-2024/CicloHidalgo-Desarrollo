import { useEffect, useState } from "react";

export const useFetchContenidos = () => {
  const [contenidos, setContenidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getContenidos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/contenidos/all');
      const result = await response.json();
      setContenidos(result.contenidos || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(contenidos);

  useEffect(() => {
    getContenidos();
  }, []);

  return {
    contenidos,
    isLoading,  
  };
};
