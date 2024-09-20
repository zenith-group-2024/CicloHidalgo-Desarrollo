import React, { useContext } from "react";
import Navbar from "../UI/Navbar.jsx";
import { CartContext } from '../UI/Prueba_Carrito.jsx';
import { Link } from "react-router-dom";


  
  
export const Carrito = () => {
const { cart } = useContext(CartContext);
const getTotalProducts = () => {
    return cart.reduce((total, item) => {
        return total + (item.precio * item.quantity);
    }, 0);
};

    return (
        <div>
            <Navbar />
           <div className="grid grid-cols-2 mb-8">
           <h1 className="text-black font-primary font-bold  text-2xl">Tus compras</h1>
           <Link to="/Productos" className="text-black font-primary font-bold m-auto hover:text-gray underline">Continua tu compra</Link>

           </div>
            <div className=" grid grid-cols-3 ">
            <h2 className=" font-secondary font-semibold text-xl text-black"> Producto </h2>
            <h2 className=" font-secondary font-semibold text-xl text-black"> Cantidad</h2>
            <h2 className=" font-secondary font-semibold text-xl text-black"> Total</h2>
            </div>
           
            {cart.length === 0 ? (
                <p>No has agregado productos al carrito.</p>
            ) : (
                cart.map((product, index) => (
                    <div key={index}  className="container mx-auto p-5 border-black drop-shadow-lg rounded-md bg-[#F9F9F9] grid grid-cols-3">
                        <div>
                        <img src={product.img} alt={product.title} />
                        <h3  className="font-primary font-semibold text-lg text-black ml-4 mt-4">{product.title}</h3>
                        </div>
                        <p  className="font-primary font-semibold text-lg text-black m-auto"> {product.quantity}</p>
                        <p className="font-primary font-semibold text-lg text-black m-auto"> {getTotalProducts()} </p>
                     
                    </div>
                ))
            )}
        </div>
    );
};