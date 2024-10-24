import { useEffect, useState, useContext } from "react";
import { CartContext } from "../UI/Prueba_Carrito.jsx";

import { Truck, Store } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GlobalContext } from '../global/GlobalState';
import FetchUser from "../../hooks/FetchUser";

function FormularioEnvio() {

  const productos = [];
  const { state } = useContext(GlobalContext);
  const { cart, setCart } = useContext(CartContext);
  const [envio, setEnvio] = useState("envia");
  const [pago, setPago] = useState("sinpe");
  const [cantidades, setCantidades] = useState(productos.map(() => 1));

  const [formOrdenData, setFormData] = useState({
    user_id: state.id || "",
    metodo_envio: "envia",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    direccion_detalles: "",
    provincia: "",
    ciudad: "",
    codigo_postal: "",
    metodo_pago: "sinpe",
    productos: cart.map(item => ({
      id: item.id,
      cantidad: item.quantity,
    })),
  });

  const { formData: userData, loading: userLoading } = FetchUser();

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      user_id: state.id // Actualizas el formOrdenData con el id del usuario
    }));
  }, [state.id]);


  /*   const cambiarCantidad = (index, nuevaCantidad) => {
      const nuevasCantidades = [...cantidades];
      nuevasCantidades[index] = nuevaCantidad;
      setCantidades(nuevasCantidades);
    }; */

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

  const handleEnvioChange = (e) => {
    const { value } = e.target;
    setEnvio(value);
    setFormData((prevData) => ({
      ...prevData,
      metodo_envio: value,
    }));
  };
  const handlePagoChange = (e) => {
    const { value } = e.target;
    setPago(value);
    setFormData((prevData) => ({
      ...prevData,
      metodo_pago: value,
    }));
  };

  const handleFinalizarOrden = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/registrar-orden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` // si necesitas enviar un token de autenticación
        },
        body: JSON.stringify(formOrdenData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      } else {
        console.error('Error al registrar la orden:', data.message); // Maneja el error
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formOrdenData,
      [name]: value
    });

  };

  if (userLoading) {
    return (
      <>
        <p className="text-2xl font-semibold text-center text-gray-500 italic mx-auto">Cargando...</p>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex gap-8 max-w-7xl mx-auto p-6 flex-1">
        <form className="w-2/3 bg-white shadow-md rounded-lg p-8" onSubmit={handleFinalizarOrden}>
          <h2 className="text-2xl font-semibold mb-6">Cuenta</h2>
          <div className="flex items-center mb-6">
            <input
              type="email"
              value={userData.email || ""}
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
                onChange={handleEnvioChange}
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
                onChange={handleEnvioChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-700">Retiro en tienda</span>
            </label>


          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formOrdenData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Apellidos</label>
              <input
                type="text"
                name="apellido"
                value={formOrdenData.apellido}
                onChange={handleChange}
                placeholder="Apellidos"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={formOrdenData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {envio === "envia" ? (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formOrdenData.direccion}
                  onChange={handleChange}
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
                  name="direccion_detalles"
                  value={formOrdenData.direccion_detalles}
                  onChange={handleChange}
                  placeholder="Casa, apartamento, etc. (opcional)"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                />
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Provincia / Estado</label>
                  <input
                    type="text"
                    name="provincia"
                    value={formOrdenData.provincia}
                    onChange={handleChange}
                    placeholder="Provincia / Estado"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Ciudad</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formOrdenData.ciudad}
                    onChange={handleChange}
                    placeholder="Ciudad"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Código postal</label>
                  <input
                    name="codigo_postal"
                    value={formOrdenData.codigo_postal}
                    onChange={handleChange}
                    type="text"
                    placeholder="Código postal (opcional)"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
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
                onChange={handlePagoChange}
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
                onChange={handlePagoChange}
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
                onChange={handlePagoChange}
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
                onChange={handlePagoChange}
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
                onChange={handlePagoChange}
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
