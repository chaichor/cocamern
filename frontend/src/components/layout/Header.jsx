import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Package, Building2, Tag, Menu, X, CarFront, ScrollText } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white py-4 w-full shadow-md">
      <div className="w-full px-3 sm:px-4 md:px-6 mx-auto max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl flex flex-wrap justify-between items-center">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/dashboard" className="text-blue-700 font-bold text-xl font-montserrat">
            CRUDS COCACOLA
          </Link>
          
          {/* Botón de menú móvil */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-100 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Navegación para escritorio */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:items-center md:block`}>
          <ul className="flex flex-col mt-4 md:mt-0 md:flex-row md:space-x-6 md:items-center">
            <li className="text-black hover:text-blue-600 transition-colors py-2 md:py-0">
              <Link to="/dashboard" className="flex items-center">
                <Home className="mr-1 h-4 w-4" />
                Inicio
              </Link>
            </li>
            <li className="text-black hover:text-blue-600 transition-colors py-2 md:py-0">
              <Link to="/products" className="flex items-center">
                <Package className="mr-1 h-4 w-4" />
                Productos
              </Link>
            </li>
            <li className="text-black hover:text-blue-600 transition-colors py-2 md:py-0">
              <Link to="/branches" className="flex items-center">
                <Building2 className="mr-1 h-4 w-4" />
                Sucursales
              </Link>
            </li>
            <li className="text-black hover:text-blue-600 transition-colors py-2 md:py-0">
              <Link to="/categories" className="flex items-center">
                <Tag className="mr-1 h-4 w-4" />
                Categorías
              </Link>
            </li>
            <li className="text-black hover:text-blue-600 transition-colors py-2 md:py-0">
              <Link to="/transport" className="flex items-center">
                <CarFront className="mr-1 h-6 w-6" />
                Transporte
              </Link>
            </li>
            <li className="text-black hover:text-blue-600 transition-colors py-2 md:py-0">
              <Link to="/blog" className="flex items-center">
                <ScrollText className="mr-1 h-6 w-6" />
                Blogs
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
