import React, { useEffect, useState } from 'react';
import Footer from '../UI/Footer';
import Navbar from '../UI/Navbar';
import { Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [pedidosPendientes, setPedidosPendientes] = useState([]);
  const [pedidosCompletados, setPedidosCompletados] = useState([]);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(0);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTotalProductos();
    fetchTopProductos();
    fetchPedidos();
    fetchUsuarios();
  }, []);


  const fetchTotalProductos = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/productos/all`);
      const data = await response.json();
      setTotalProductos(data.productos.length);
    } catch (error) {
      console.error('Error al obtener el total de productos:', error);
    }
  };

  const fetchTopProductos = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/top-productos');
      if (response.ok) {
        const data = await response.json();
        setProductosMasVendidos(
          data.top_productos.map(producto => ({
            id: producto.id,
            nombre: producto.nombre,
            vendidos: producto.total_cantidad,
            imagen: producto.imagen,
          }))
        );
      } else {
        console.error("Error al obtener productos más vendidos");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  const fetchPedidos = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/ordenes/all`);
      const data = await response.json();
      setPedidosPendientes(data.filter(p => p.estado === 'PENDIENTE'));
      setPedidosCompletados(data.filter(p => p.estado === 'COMPLETO'));
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  };


  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/obtener-usuarios`);
      const data = await response.json();
      setUsuariosRegistrados(data.length);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const pedidosPendientesFiltrados = pedidosPendientes.filter((pedido) =>
    `${pedido.nombre} ${pedido.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()));
  const pedidosCompletadosFiltrados = pedidosCompletados.filter((pedido) =>
    `${pedido.nombre} ${pedido.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleVerDetalles = (pedidoId) => {
    setOrdenSeleccionada(ordenSeleccionada === pedidoId ? null : pedidoId);
  };

  const mostrarCampo = (titulo, valor) => {
    if (valor) {
      return <p><strong>{titulo}:</strong> {valor}</p>;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-8">
        <div className="max-w-7xl w-full space-y-12">
          <h1 className="text-4xl font-bold text-center">Dashboard de Administración</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {renderCardInfo('Total de Productos', totalProductos, 'bg-blue')}
            {renderCardInfo('Pedidos Pendientes', pedidosPendientes.length, 'bg-yellow-500')}
            {renderCardInfo('Pedidos Completados', pedidosCompletados.length, 'bg-green-500')}
            {renderCardInfo('Usuarios Registrados', usuariosRegistrados, 'bg-purple-500')}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6">Productos Más Vendidos</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 p-4 text-left font-medium">Producto</th>
                  <th className="border-b-2 p-4 text-left font-medium">Vendidos</th>
                </tr>
              </thead>
              <tbody>
                {productosMasVendidos.map((producto) => (
                  <tr key={producto.id}>
                    <td className="border-b p-4 text-gray-600 flex items-center">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="h-12 w-12 mr-4 rounded"
                      />
                      {producto.nombre}
                    </td>
                    <td className="border-b p-4 text-gray-600">{producto.vendidos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6">Estado de Pedidos</h2>
            <input
              type="text"
              placeholder="Buscar pedidos por nombre o apellido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mx-auto mb-4 p-2 border rounded w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Clock className="text-yellow-600 h-6 w-6 mr-2" />
                  <h3 className="text-xl font-semibold">
                    Pedidos Pendientes ({pedidosPendientesFiltrados.length})
                  </h3>
                </div>
                <div className="space-y-4">
                  {pedidosPendientesFiltrados.map((pedido) => (
                    <div key={pedido.id} className="border p-4 rounded bg-white shadow-sm flex flex-col justify-between">
                    <div className="flex">
                      <div className="ml-0 mr-auto">
                        <p className="font-medium">{pedido.nombre} {pedido.apellido}</p>
                        <p className="text-sm text-gray-600">{formatFecha(pedido.created_at)}</p>
                      </div>
                      <button className="text-blue-500 border px-2 py-1 h-11 rounded hover:text-red-500"
                        onClick={() => handleVerDetalles(pedido.id)}>
                        {ordenSeleccionada === pedido.id ? 'Ocultar detalles' : 'Ver detalles'}
                      </button>
                    </div>
                    {ordenSeleccionada === pedido.id && (
                      <div className="mt-4">
                        <p><strong>ID del pedido:</strong> {pedido.id}</p>
                        <p><strong>Método de Pago:</strong> {pedido.metodo_pago}</p>
                        <p><strong>Teléfono:</strong> {pedido.telefono}</p>
                        {mostrarCampo("Dirección", pedido.direccion)}
                        {mostrarCampo("Provincia", pedido.provincia)}
                        {mostrarCampo("Ciudad", pedido.ciudad)}
                        {mostrarCampo("Código Postal", pedido.codigo_postal)}
                      </div>
                    )}
                  </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-100 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-green-600 h-6 w-6 mr-2" />
                  <h3 className="text-xl font-semibold">
                    Pedidos Completados ({pedidosCompletadosFiltrados.length})
                  </h3>
                </div>
                <div className="space-y-4">
                  {pedidosCompletadosFiltrados.map((pedido) => (
                    <div key={pedido.id} className="border p-4 rounded bg-white shadow-sm flex flex-col justify-between">
                      <div className="flex">
                        <div className="ml-0 mr-auto">
                          <p className="font-medium">{pedido.nombre} {pedido.apellido}</p>
                          <p className="text-sm text-gray-600">▸ {formatFecha(pedido.created_at)}</p>
                          <p className="text-sm text-gray-600">▹ {formatFecha(pedido.updated_at)}</p>
                        </div>
                        <button className="text-blue-500 border px-2 h-11 py-1 rounded hover:text-red-500"
                          onClick={() => handleVerDetalles(pedido.id)}>
                          {ordenSeleccionada === pedido.id ? 'Ocultar detalles' : 'Ver detalles'}
                        </button>
                      </div>
                      {ordenSeleccionada === pedido.id && (
                        <div className="mt-4">
                          <p><strong>ID del pedido:</strong> {pedido.id}</p>
                          <p><strong>Método de Pago:</strong> {pedido.metodo_pago}</p>
                          <p><strong>Teléfono:</strong> {pedido.telefono}</p>
                          {mostrarCampo("Dirección", pedido.direccion)}
                          {mostrarCampo("Provincia", pedido.provincia)}
                          {mostrarCampo("Ciudad", pedido.ciudad)}
                          {mostrarCampo("Código Postal", pedido.codigo_postal)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const renderCardInfo = (title, value, color) => (
  <div className={`p-8 rounded-lg shadow-md ${color} text-white`}>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Dashboard;