import { useState, useContext } from "react";
import { CartContext } from "../UI/Prueba_Carrito.jsx";
import { Truck, Store } from "lucide-react"; // Iconos para la sección de Entrega
import Navbar from "./Navbar"; // Ajusta la ruta según tu estructura de carpetas
import Footer from "./Footer"; // Ajusta la ruta según tu estructura de carpetas
import { p } from "framer-motion/client";

// Datos de ejemplo de productos
const productos = [
  {
    id: 1,
    nombre: "Bicicleta de Montaña",
    precio: 350000,
    imagen: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    nombre: "Casco Profesional",
    precio: 75000,
    imagen: "https://via.placeholder.com/100",
  },
];

function FormularioEnvio() {

  const { cart, setCart } = useContext(CartContext);
  const [envio, setEnvio] = useState("envia");
  const [pago, setPago] = useState("sinpe");
  const [cantidades, setCantidades] = useState(productos.map(() => 1));

  const cambiarCantidad = (index, nuevaCantidad) => {
    const nuevasCantidades = [...cantidades];
    nuevasCantidades[index] = nuevaCantidad;
    setCantidades(nuevasCantidades);
  };

  // Calcular total del pedido
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.quantity, 0);
  };

  // Determinar el icono según el método de entrega
  const getEntregaIcon = () => {
    return envio === "envia" ? (
      <Truck className="w-6 h-6 mr-2 text-blue" />
    ) : (
      <Store className="w-6 h-6 mr-2 text-blue" />
    );
  };

  const handleFinalizarOrden = (e) => {
    e.preventDefault();
    console.log("Finalizar orden");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex gap-8 max-w-7xl mx-auto p-6 flex-1">
        <form className="w-2/3 bg-white shadow-md rounded-lg p-8" onSubmit={handleFinalizarOrden}>
          <h2 className="text-2xl font-semibold mb-6">Cuenta</h2>
          <div className="flex items-center mb-6">
            <input
              type="email"
              defaultValue="juanperez@example.com"
              className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>

          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            {getEntregaIcon()}
            Entrega
          </h3>
          <div className="flex gap-6 mb-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="entrega"
                value="envia"
                checked={envio === "envia"}
                onChange={() => setEnvio("envia")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-700">Envío</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="entrega"
                value="retiro"
                checked={envio === "retiro"}
                onChange={() => setEnvio("retiro")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-700">Retiro en tienda</span>
            </label>


          </div>
          {envio === "envia" ? (
            <>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Apellidos</label>
                  <input
                    type="text"
                    placeholder="Apellidos"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="flex items-center bg-gray-100 border border-gray-300 p-3 rounded-lg">
                  <span>Costa Rica</span>
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="text"
                    placeholder="Teléfono"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>


              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Dirección</label>
                <input
                  type="text"
                  placeholder="Dirección"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Casa, apartamento, etc. (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Casa, apartamento, etc. (opcional)"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                />
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Provincia / Estado</label>
                  <input
                    type="text"
                    placeholder="Provincia / Estado"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Ciudad</label>
                  <input
                    type="text"
                    placeholder="Ciudad"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Código postal (opcional)</label>
                  <input
                    type="text"
                    placeholder="Código postal (opcional)"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </>
          ) : (
            // Campos para Retiro en tienda
            <div className="grid grid-cols-1 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Apellidos</label>
                <input
                  type="text"
                  placeholder="Apellidos"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Teléfono</label>
                <input
                  type="text"
                  placeholder="Teléfono"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          )}

          <h3 className="text-2xl font-semibold mb-4">Pago</h3>
          <p className="text-sm text-gray-600 mb-6">
            Todas las transacciones son seguras y están encriptadas.
          </p>

          <div className="border border-gray-300 rounded-lg p-6 mb-8">
            <label className="flex items-center mb-4 cursor-pointer">
              <input
                type="radio"
                name="pago"
                value="sinpe"
                checked={pago === "sinpe"}
                onChange={() => setPago("sinpe")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-700 flex items-center">
                Sinpe Móvil - Depósito
              </span>
            </label>

            <label className="flex items-center mb-4 cursor-pointer">
              <input
                type="radio"
                name="pago"
                value="efectivo"
                checked={pago === "efectivo"}
                onChange={() => setPago("efectivo")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-700 flex items-center">
                Efectivo
              </span>
            </label>

            <label className="flex items-center mb-4 cursor-pointer">
              <input
                type="radio"
                name="pago"
                value="credomatic"
                checked={pago === "credomatic"}
                onChange={() => setPago("credomatic")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-700 flex items-center">
                Tasa 0 con Credomatic
              </span>
            </label>

            <label className="flex items-center mb-4 cursor-pointer">
              <input
                type="radio"
                name="pago"
                value="bn"
                checked={pago === "bn"}
                onChange={() => setPago("bn")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-700 flex items-center">
                Sistema de apartado a 2 meses
              </span>
            </label>

            <label className="flex items-center mb-4 cursor-pointer">
              <input
                type="radio"
                name="pago"
                value="mini_cuotas"
                checked={pago === "mini_cuotas"}
                onChange={() => setPago("mini_cuotas")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-700 flex items-center">
                Mini cuotas del Banco Nacional de Costa Rica
              </span>
            </label>
          </div>

          <div className="mt-4 text-md font-semibold text-gray-700">
            Finaliza el pedido y escríbenos vía Whatsapp para completar el pago.
          </div>

          <button type="submit" className="w-full bg-blue hover:bg-red text-white text-md py-3 rounded-lg mt-6 flex items-center justify-center transition-colors duration-200">
            Finalizar Pedido
          </button>
        </form>

        <div className="w-1/3 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Tu Pedido</h2>

          {cart.length === 0 ? (
            <p>Carrito vacío</p>
          ) : (
            <div>

              {cart.map((producto, index) => (

                <div key={index} className="flex items-center mb-6">
                  <div className="relative">
                    <img src={`../src/assets/${producto.img}`} alt={producto.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <span className="absolute top-0 right-0 bg-blue text-white text-xs font-bold w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full">
                      {producto.quantity}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold ">{producto.title}</h4>
                    <p className="">{`₡${producto.precio * producto.quantity}`}</p>
                  </div>
                </div>
              )
              )
              }

            </div>
          )}
          <div className="flex justify-between items-center mt-8">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-semibold">{`₡${getTotal()}`}</span>
          </div>
        </div>


      </div>
      <Footer />
    </div>
  );
}

export default FormularioEnvio;
