import { useState } from "react";
import Navbar from "./Navbar"; // Ajusta la ruta según tu estructura de carpetas
import Footer from "./Footer"; // Ajusta la ruta según tu estructura de carpetas

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
  const [envio, setEnvio] = useState("envia");
  const [pago, setPago] = useState("sinpe");
  const [cantidades, setCantidades] = useState(
    productos.map(() => 1) // Inicializa cada producto con una cantidad de 1
  );

  const cambiarCantidad = (index, nuevaCantidad) => {
    const nuevasCantidades = [...cantidades];
    nuevasCantidades[index] = nuevaCantidad;
    setCantidades(nuevasCantidades);
  };

  // Calcular total del pedido
  const calcularTotal = () => {
    return productos.reduce((total, producto, index) => {
      return total + producto.precio * cantidades[index];
    }, 0);
  };

  return (
    <div>
      <Navbar /> {/* Agrega el Navbar aquí */}
      <div className="flex gap-8 max-w-7xl mx-auto p-6">
        {/* Formulario de Envío */}
        <div className="w-2/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
            Cuenta
          </h2>
          <input
            type="email"
            defaultValue="juanperez@example.com"
            className="w-full border p-2 rounded mb-2 bg-white"
            readOnly
          />

          <h3 className="text-xl font-semibold mb-2">Entrega</h3>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="entrega"
                value="envia"
                checked={envio === "envia"}
                onChange={() => setEnvio("envia")}
                className="mr-2"
              />
              Envia
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="entrega"
                value="retiro"
                checked={envio === "retiro"}
                onChange={() => setEnvio("retiro")}
                className="mr-2"
              />
              Retiro en tienda
            </label>
          </div>

          {/* Mostrar campos según el método de entrega */}
          {envio === "envia" ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Apellidos"
                  className="border p-2 rounded"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border p-2 rounded">
                  Costa Rica
                </div>
                <input type="text" placeholder="Teléfono" className="border p-2 rounded" />
              </div>

              <input
                type="text"
                placeholder="Dirección"
                className="w-full border p-2 rounded mb-4"
              />
              <input
                type="text"
                placeholder="Casa, apartamento, etc. (opcional)"
                className="w-full border p-2 rounded mb-4"
              />

              <div className="grid grid-cols-3 gap-4 mb-4">
                <input type="text" placeholder="Provincia / Estado" className="border p-2 rounded" />
                <input type="text" placeholder="Ciudad" className="border p-2 rounded" />
                <input type="text" placeholder="Código postal (opcional)" className="border p-2 rounded" />
              </div>
            </>
          ) : (
            // Campos para Retiro en tienda
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input type="text" placeholder="Nombre" className="border p-2 rounded" />
              <input type="text" placeholder="Apellidos" className="border p-2 rounded" />
              <input type="text" placeholder="Teléfono" className="border p-2 rounded" />
            </div>
          )}

          <h3 className="text-xl font-semibold mt-6 mb-2">Pago</h3>
          <p className="text-sm text-gray mb-4">
            Todas las transacciones son seguras y están encriptadas.
          </p>

          <div className="border rounded-lg p-4 mb-4">
            <label className="flex items-center mb-4">
              <input
                type="radio"
                name="pago"
                value="sinpe"
                checked={pago === "sinpe"}
                onChange={() => setPago("sinpe")}
                className="mr-2"
              />
              Sinpe Móvil - Depósito
            </label>

            <label className="flex items-center mb-4">
              <input
                type="radio"
                name="pago"
                value="efectivo"
                checked={pago === "efectivo"}
                onChange={() => setPago("efectivo")}
                className="mr-2"
              />
              Efectivo
            </label>

            <label className="flex items-center mb-4">
              <input
                type="radio"
                name="pago"
                value="credomatic"
                checked={pago === "credomatic"}
                onChange={() => setPago("credomatic")}
                className="mr-2"
              />
              Tasa 0 con Credomatic
            </label>

            <label className="flex items-center mb-4">
              <input
                type="radio"
                name="pago"
                value="bn"
                checked={pago === "bn"}
                onChange={() => setPago("bn")}
                className="mr-2"
              />
              Sistema de apartado a 2 meses con BN
            </label>

            <label className="flex items-center mb-4">
              <input
                type="radio"
                name="pago"
                value="mini_cuotas"
                checked={pago === "mini_cuotas"}
                onChange={() => setPago("mini_cuotas")}
                className="mr-2"
              />
              Mini cuotas del BN
            </label>
          </div>

          {/* Mensaje para finalizar el pedido */}
          <div className="mt-4 text-md font-semibold">
            Finaliza el pedido y escribenos vía Facebook o Instagram para completar el pago.
            <div className="mt-2 flex space-x-4"></div>
          </div>

          <button className="w-full bg-blue hover:bg-red text-white py-2 rounded mt-4">
            Finalizar Pedido
          </button>
        </div>

        {/* Lista de Productos */}
        <div className="w-1/3 bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tu Pedido</h2>
          {productos.map((producto, index) => (
            <div key={producto.id} className="relative mb-4 border-b pb-2 flex items-center">
              <div className="relative">
                <img src={producto.imagen} alt={producto.nombre} className="w-16 h-16 rounded" />
                {/* Pop-up de cantidad encima de la imagen */}
                <span className="absolute top-0 right-0 bg-blue text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                  {cantidades[index]}
                </span>
              </div>
              <div className="ml-4 flex flex-col">
                <span className="font-semibold">{producto.nombre}</span>
                <span>₡{producto.precio.toLocaleString()}</span>
              </div>
            </div>
          ))}
          <div className="flex justify-between font-semibold mt-4">
            <span>Total:</span>
            <span>₡{calcularTotal().toLocaleString()}</span>
          </div>
        </div>
      </div>
      <Footer /> {/* Agrega el Footer aquí */}
    </div>
  );
}

export default FormularioEnvio;
