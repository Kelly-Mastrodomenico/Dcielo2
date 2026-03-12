import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logoDcielo from '../assets/logo-dcielo.png';

const navLinks = [
  { name: 'Inicio',         path: '/'         },
  { name: 'Quiénes Somos',  path: '/nosotros'  },
  { name: 'Nuestra Granja', path: '/granja'    },
  { name: 'Tienda',         path: '/tienda'    },
  { name: 'Contacto',       path: '/contacto'  },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled]             = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location                                = useLocation();
  const { totalItems, setIsOpen }               = useCart();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

  // En páginas que NO tienen hero-foto, la navbar siempre va sobre fondo blanco
  const isHome = location.pathname === '/';

  // Cuando el hero tiene foto oscura la navbar puede ser transparente al inicio
  const hasPhotoBg = ['/', '/granja', '/tienda', '/contacto'].includes(location.pathname);

  // Scrolled o en páginas sin foto → fondo blanco
  const solidBg = isScrolled || !hasPhotoBg;

  return (
    <>
      <nav
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solidBg
            ? 'bg-white/97 backdrop-blur-md shadow-sm py-2 border-b border-[#E8DFCC]'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container-custom flex items-center justify-between px-6">

          {/* ── LOGO ── */}
          <Link to="/" data-testid="nav-logo" className="flex items-center gap-3 group">
            <img
              src={logoDcielo}
              alt="DCielo Huevos Ecológicos"
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className={`font-serif text-xl font-bold tracking-wide transition-colors duration-300 ${
                solidBg ? 'text-[#C69B1A]' : 'text-[#C69B1A]'
              }`}>
                DCielo
              </span>
              <span className={`text-[10px] uppercase tracking-widest font-light transition-colors duration-300 ${
                solidBg ? 'text-[#8C7A60]' : 'text-white/60'
              }`}>
                Huevos Ecológicos
              </span>
            </div>
          </Link>

          {/* ── LINKS DESKTOP ── */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  location.pathname === link.path
                    ? 'text-[#C69B1A]'
                    : solidBg
                      ? 'text-[#1A1208] hover:text-[#C69B1A]'
                      : 'text-white/90 hover:text-[#C69B1A]'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#C69B1A] transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* ── CARRITO + CTA + HAMBURGUESA ── */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              data-testid="cart-button"
              className={`relative p-2 rounded-full border transition-all duration-200 ${
                solidBg
                  ? 'bg-[#C69B1A]/10 hover:bg-[#C69B1A]/20 border-[#C69B1A]/30'
                  : 'bg-white/10 hover:bg-white/20 border-white/20'
              }`}
            >
              <ShoppingCart className="w-5 h-5 text-[#C69B1A]" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#C69B1A] text-[#1A1208] text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            <Link
              to="/tienda"
              className="hidden sm:flex items-center gap-1.5 bg-[#C69B1A] hover:bg-[#9A7510] text-[#1A1208] text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 hover:shadow-lg"
            >
              Comprar
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${
                solidBg ? 'text-[#1A1208]' : 'text-white/90'
              } hover:text-[#C69B1A]`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── MENÚ MOBILE ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-b border-[#E8DFCC] py-6 px-6 shadow-lg"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium py-2 border-b border-[#E8DFCC] transition-colors ${
                    location.pathname === link.path ? 'text-[#C69B1A]' : 'text-[#1A1208]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/tienda"
                className="mt-2 text-center bg-[#C69B1A] text-[#1A1208] font-bold py-3 rounded-full"
              >
                🛒 Comprar ahora
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
