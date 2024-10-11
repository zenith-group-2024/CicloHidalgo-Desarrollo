  import { useEffect, useState } from "react";
  export const useFetchProductos = () => {
          const [productos, setProductos] = useState([]);
          const [isLoading, setIsLoading] = useState(true);
          const getProductos = async () => {
            
              try {
                  
                  const response = await fetch('http://127.0.0.1:8000/api/productos/all');
                  const result = await response.json();
                  setProductos(result.productos);
                  setIsLoading(false);
              } catch (error) {
                  console.log(error);
                } finally {
                  setIsLoading(false);
                }
          };
          useEffect(() => {
              getProductos();
            }, []);
      
            return {
              productos
            };
          console.log( getProductos.result);
      };