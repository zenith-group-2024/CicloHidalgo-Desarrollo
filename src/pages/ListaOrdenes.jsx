import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../global/GlobalState';

const ListaOrdenes = () => {
    const { state } = useContext(GlobalContext);  // Obtener el id del usuario del contexto global
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/ordenes-usuario/${state.id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener las órdenes');
                }
                const data = await response.json();
                setOrdenes(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (state.id) {
            fetchOrdenes();  // Solo hacer la petición si el id está disponible
        }
    }, [state.id]);  // Dependencia para ejecutar cuando el id cambie

    if (loading) {
        return <div className="text-center text-3xl font-bold my-6">Cargando órdenes...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const calcularSubtotal = (productos) => {
        return productos.reduce((subtotal, producto) => {
            return subtotal + (producto.pivot.cantidad * producto.pivot.precio);
        }, 0);
    };

    const obtenerMetodoPago = (metodo_pago) => {
        switch (metodo_pago) {
            case 'sinpe':
                return 'Sinpe Móvil - Depósito';
            case 'efectivo':
                return 'Efectivo';
            case 'credomatic':
                return 'Tasa 0 con Credomatic';
            case 'bn':
                return 'Sistema de apartado a 2 meses';
            case 'mini_cuotas':
                return 'Mini cuotas del Banco Nacional de Costa Rica';
            default:
                return 'Método de pago desconocido';
        }
    };

    const eliminarOrden = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/borrar-orden/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la orden');
            }

            setOrdenes(ordenes.filter(orden => orden.id !== id));
            console.log('Orden eliminada correctamente');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Tus órdenes</h1>
            <ul className="space-y-4 w-2/3">
                {ordenes.map((orden) => (
                    <li className="bg-white shadow-md rounded-lg p-6" key={orden.id}>
                        <div className="space-y-2">
                            <p className=""><strong>ID:</strong> {orden.id}</p>
                            <p className=""><strong>Cliente:</strong> {orden.nombre} {orden.apellido}</p>
                            <p className=""><strong>Total:</strong> ₡{orden.total}</p>
                            <p className=""><strong>Método de Pago:</strong> {obtenerMetodoPago(orden.metodo_pago)}</p>
                            <p className=""><strong>Productos:</strong></p>
                            <ul className="list-disc list-inside ml-4">
                                {orden.productos.map((producto) => (
                                    <div key={producto.id} className="grid grid-cols-3">
                                        <p className="max-w-40">- {producto.nombre}</p>
                                        <p className="max-w-40">Cantidad: {producto.pivot.cantidad}</p>
                                        <p className="max-w-40">Precio: ₡{producto.pivot.precio}</p>
                                    </div>
                                ))}
                            </ul>
                            <p className="mt-4"><strong>Subtotal:</strong> ₡{calcularSubtotal(orden.productos)}</p>
                            <button
                                className="mt-4 px-4 py-2 bg-gray text-white rounded hover:bg-red-700"
                                onClick={() => eliminarOrden(orden.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaOrdenes;
