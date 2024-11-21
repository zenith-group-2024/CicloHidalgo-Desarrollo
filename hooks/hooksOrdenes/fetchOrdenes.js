const API_BASE_URL = 'http://localhost:8000/api';

export const fetchOrdenes = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/ordenes-usuario/${userId}`);
        if (!response.ok) {
            throw new Error('Error al obtener las órdenes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en fetchOrdenes:', error);
        throw error;
    }
};