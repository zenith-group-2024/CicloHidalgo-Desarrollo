import Logo from '../assets/images/logo.svg';
import { ShoppingCart, UserRound, AlignJustify, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white p-4 w-full flex flex-col md:flex-row justify-between items-center border-b-2 border-border-gray-opacity z-50">
            <div className="flex items-center justify-between w-full md:w-auto">
                <img src={Logo} alt="logo" className="h-16 md:h-20 m-4" />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-black focus:outline-none"
                >
                    <AlignJustify size={28} />
                </button>
            </div>

            
            <div className="hidden md:flex flex-grow justify-center space-x-8">
                <a href="#home" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Inicio</a>
                <a href="#about" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Productos</a>
                <a href="#services" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Servicios</a>
                <a href="#contact" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Contenido</a>
            </div>

           
            <div ref={menuRef} className={`fixed top-0 right-0 w-3/4 bg-white h-full shadow-lg flex flex-col items-center transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} space-y-6 z-50 md:hidden`}>
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-black focus:outline-none"
                >
                    <X size={28} />
                </button>
                <div className="flex flex-col space-y-4 mt-16 pt-20 ">
                    <a href="#home" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Inicio</a>
                    <a href="#about" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Productos</a>
                    <a href="#services" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Servicios</a>
                    <a href="#contact" className="text-black font-primary font-bold hover:text-gray transform transition-transform duration-300 hover:scale-110">Contenido</a>
                </div>
                <div className="flex space-x-4 mt-auto mb-4 pt-5">
                    <ShoppingCart size={28} className="transform transition-transform duration-300 hover:scale-110" />
                    <UserRound size={28} className="transform transition-transform duration-300 hover:scale-110" />
                </div>
            </div>

            
            <div className="flex space-x-4 m-4 md:ml-4 hidden md:flex">
                <ShoppingCart size={28} className="transform transition-transform duration-300 hover:scale-110" />
                <UserRound size={28} className="transform transition-transform duration-300 hover:scale-110" />
            </div>
        </nav>
    );
}

export default Navbar;
