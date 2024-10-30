import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../global/GlobalState';
import Footer from '../UI/Footer';
import Navbar from '../UI/Navbar';

const ListaOrdenes = () => {
    const { state } = useContext(GlobalContext);  // Obtener el id del usuario del contexto global
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

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
            fetchOrdenes();
        }
    }, [state.id]);

    const handleVerDetalles = (ordenId) => {
        setOrdenSeleccionada(ordenId === ordenSeleccionada ? null : ordenId);
    };

    const mostrarCampo = (label, valor) => {
        return valor ? <p><strong>{label}:</strong> {valor}</p> : null;
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = ordenes.slice(indexOfFirstOrder, indexOfLastOrder);

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(ordenes.length / ordersPerPage)));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));



    if (loading) {
        return <div className="text-center text-3xl font-bold my-6">Cargando órdenes...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Navbar />

            <div className="mx-auto min-h-screen flex flex-col p-6">
                <h1 className="text-2xl mx-auto font-bold mb-6">Tus órdenes:</h1>
                {ordenes.length === 0 ? (
                    <p className="text-center text-lg font-semibold">No tienes órdenes registradas.</p>
                ) : (
                    <ul className="mx-auto flex flex-col space-y-4 w-2/3">
                        {currentOrders.map((orden) => (
                            <li className="bg-white shadow-md rounded-lg p-6" key={orden.id}>
                                <div className="space-y-2">
                                    <p><strong>Cliente:</strong> {orden.nombre} {orden.apellido}</p>
                                    <p><strong>Total:</strong> ₡{orden.total}</p>
                                    <div className='flex'>
                                        <p className='m-auto'><strong>Productos:</strong></p>
                                        <p className='m-auto'><strong>Cantidad:</strong></p>
                                    </div>
                                    <ul className="list-disc list-inside ml-4">
                                        {orden.productos.map((producto) => (
                                            <div key={producto.id} className="grid grid-cols-2">
                                                <p className="ml-4">▸ {producto.nombre}</p>
                                                <p className="m-auto">{producto.pivot.cantidad}</p>
                                            </div>
                                        ))}
                                    </ul>
                                    <button
                                        className="px-4 py-2 bg-blue text-white rounded hover:bg-blue-700"
                                        onClick={() => handleVerDetalles(orden.id)}
                                    >
                                        {ordenSeleccionada === orden.id ? 'Ocultar detalles' : 'Ver detalles'}
                                    </button>
                                    {ordenSeleccionada === orden.id && (
                                        <div className="mt-4">
                                            <p><strong>ID del pedido:</strong> {orden.id}</p>
                                            <p><strong>Método de Pago:</strong> {orden.metodo_pago}</p>
                                            <p><strong>Teléfono:</strong> {orden.telefono}</p>
                                            {mostrarCampo("Dirección", orden.direccion)}
                                            {mostrarCampo("Provincia", orden.provincia)}
                                            {mostrarCampo("Ciudad", orden.ciudad)}
                                            {mostrarCampo("Código Postal", orden.codigo_postal)}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {/* Controles de paginación */}
                <div className="flex justify-center mt-4">
                    <button
                        className="text-white px-4 py-2 bg-gray rounded-l hover:bg-blue"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2">Página {currentPage}</span>
                    <button
                        className="text-white px-4 py-2 bg-gray rounded-r hover:bg-blue"
                        onClick={nextPage}
                        disabled={currentPage === Math.ceil(ordenes.length / ordersPerPage)}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ListaOrdenes;