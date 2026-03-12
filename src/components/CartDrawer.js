import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            data-testid="cart-drawer"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FAF6EC] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#C69B1A/15] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[#C69B1A]" />
                <h2 className="font-serif text-xl font-semibold text-[#1A1208]">Tu Cesta</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                data-testid="close-cart-button"
                className="p-2 rounded-full hover:bg-[#1A1208]/10 transition-colors"
              >
                <X className="w-5 h-5 text-[#5C5040]" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-[#E7E5E4] mb-4" />
                  <p className="text-[#5C5040] mb-2">Tu cesta está vacía</p>
                  <p className="text-sm text-[#78716C]">Añade algunos productos deliciosos</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      data-testid={`cart-item-${item.product.id}`}
                      className="bg-white rounded-xl p-4 shadow-sm border border-[#C69B1A/15]"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-[#1A1208]">{item.product.name}</h3>
                          <p className="text-sm text-[#78716C]">{item.product.quantity} huevos</p>
                          <p className="text-[#D97706] font-semibold mt-1">
                            {item.product.price.toFixed(2)}€
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            data-testid={`decrease-${item.product.id}`}
                            className="p-1.5 rounded-full bg-[#F2F0E6] hover:bg-[#E7E5E4] transition-colors"
                          >
                            <Minus className="w-4 h-4 text-[#5C5040]" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            data-testid={`increase-${item.product.id}`}
                            className="p-1.5 rounded-full bg-[#F2F0E6] hover:bg-[#E7E5E4] transition-colors"
                          >
                            <Plus className="w-4 h-4 text-[#5C5040]" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          data-testid={`remove-${item.product.id}`}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {/* Clear Cart */}
                  <button
                    onClick={clearCart}
                    data-testid="clear-cart-button"
                    className="text-sm text-[#78716C] hover:text-red-500 transition-colors underline"
                  >
                    Vaciar cesta
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#C69B1A/15] bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#5C5040]">Total</span>
                  <span className="font-serif text-2xl font-bold text-[#1A1208]">
                    {totalPrice.toFixed(2)}€
                  </span>
                </div>
                <Link to="/checkout" onClick={() => setIsOpen(false)}>
                  <Button
                    data-testid="checkout-button"
                    className="w-full bg-[#1A1208] hover:bg-[#2C3B2B] text-white rounded-full py-6 text-lg font-serif"
                  >
                    Finalizar Compra
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
