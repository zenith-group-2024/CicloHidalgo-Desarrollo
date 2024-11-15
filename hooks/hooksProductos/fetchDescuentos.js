export async function fetchSinDescuento() {
    try {
        const response = await fetch('http://localhost:8000/api/sin-descuento/all');
        const data = await response.json();
        return data.productos;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    }
}

export async function fetchConDescuento() {
    try {
        const response = await fetch('http://localhost:8000/api/con-descuento/all');
        const data = await response.json();
        return data.productos;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    }
}