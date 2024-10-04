import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dropdown from "./Dropdown";
import CartDropdown from "../carts/CartDropdown";

interface NavbarProps {
  onSubmit: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onSubmit }) => {
  const { isAuthenticated, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartData, setCartData] = useState([]);
  if (loading) {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="p-4 bg-orange-700">
      <div className="container flex items-center justify-between mx-auto">
        {/* Hamburger menu button */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Title centered in the navbar */}
        <div className="flex-1 text-center md:text-start">
          <div className="text-xl font-bold text-white">
            <i className="fas fa-pot-food"></i> Ordering APP
          </div>
        </div>

        {/* Desktop and Mobile menu */}
        <div className="items-center hidden space-x-4 md:flex">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/home"
                className={({ isActive }) => 
                  `px-3 py-2 text-sm font-medium text-white rounded-md ${isActive ? 'bg-orange-900' : 'hover:bg-orange-900 hover:text-white'}`
                }
              >
                <i className="fas fa-home"></i> Home
              </NavLink>
              <NavLink
                to="/food-products"
                className={({ isActive }) => 
                  `px-3 py-2 text-sm font-medium text-white rounded-md ${isActive ? 'bg-orange-900' : 'hover:bg-orange-900 hover:text-white'}`
                }
              >
                <i className="fas fa-pot-food"></i> Foods
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => 
                  `px-3 py-2 text-sm font-medium text-white rounded-md ${isActive ? 'bg-orange-900' : 'hover:bg-orange-900 hover:text-white'}`
                }
              >
                <i className="fas fa-info"></i> About
              </NavLink>
              <CartDropdown onSubmit={onSubmit} setCartData={setCartData} />
              <Dropdown />
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => 
                  `px-3 py-2 text-sm font-medium text-white rounded-md ${isActive ? 'bg-orange-900' : 'hover:bg-orange-900 hover:text-white'}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => 
                  `px-3 py-2 text-sm font-medium text-white rounded-md ${isActive ? 'bg-orange-900' : 'hover:bg-orange-900 hover:text-white'}`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Right-side Dropdown Menu */}
        <div className="flex md:hidden">{isAuthenticated && <Dropdown />}</div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center mt-2 space-y-2">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/home"
                  className="w-full px-3 py-2 text-sm font-medium text-center text-white rounded-md hover:bg-orange-900 hover:text-white"
                >
                  <i className="fas fa-home"></i> Home
                </NavLink>
                <NavLink
                  to="/food-products"
                  className="w-full px-3 py-2 text-sm font-medium text-center text-white rounded-md hover:bg-orange-900 hover:text-white"
                >
                  <i className="fas fa-pot-food"></i> Foods
                </NavLink>
                <NavLink
                  to="/carts"
                  className="w-full px-3 py-2 text-sm font-medium text-center text-white rounded-md hover:bg-orange-900 hover:text-white"
                >
                  <i className="fas fa-shopping-cart"></i> My Cart{cartData.length < 1 ? "" : `s (${cartData.length})`}
                </NavLink>
                <NavLink
                  to="/about"
                  className="w-full px-3 py-2 text-sm font-medium text-center text-white rounded-md hover:bg-orange-900 hover:text-white"
                >
                  <i className="fas fa-info"></i> About
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="w-full px-3 py-2 text-sm font-medium text-center text-white rounded-md hover:bg-orange-900 hover:text-white"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="w-full px-3 py-2 text-sm font-medium text-center text-white rounded-md hover:bg-orange-900 hover:text-white"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
