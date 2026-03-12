import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Genera un número de pedido único
const generarNumeroPedido = () => {
  var timestamp = Date.now().toString(36).toUpperCase();
  var random    = Math.random().toString(36).substring(2, 6).toUpperCase();
  return 'DCL-' + timestamp + '-' + random;
};

// Simula el envío de email de confirmación (en producción, aquí iría la llamada al backend)
const enviarEmailConfirmacion = (pedido) => {
  console.log('=== EMAIL DE CONFIRMACIÓN ENVIADO ===');
  console.log('Para:', pedido.email);
  console.log('Número de pedido:', pedido.numeroPedido);
  console.log('Total:', pedido.total + '€');
  console.log('Productos:', pedido.items.map(function(i) { return i.product.name + ' x' + i.quantity; }).join(', '));
  // En WordPress/WooCommerce esto lo gestiona automáticamente el plugin
  // En backend propio: llamar a API de email (SendGrid, Resend, etc.)
};

export const CartProvider = ({ children }) => {
  const [items, setItems]   = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar carrito de localStorage al iniciar
  useEffect(() => {
    try {
      var saved = localStorage.getItem('dcielo-cart');
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {
      console.error('Error cargando carrito:', e);
    }
  }, []);

  // Guardar carrito en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem('dcielo-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity) => {
    var qty = quantity || 1;
    setItems(function(prev) {
      var existing = prev.find(function(i) { return i.product.id === product.id; });
      if (existing) {
        return prev.map(function(i) {
          return i.product.id === product.id
            ? Object.assign({}, i, { quantity: i.quantity + qty })
            : i;
        });
      }
      return [...prev, { product: product, quantity: qty }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId) => {
    setItems(function(prev) { return prev.filter(function(i) { return i.product.id !== productId; }); });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(function(prev) {
      return prev.map(function(i) {
        return i.product.id === productId ? Object.assign({}, i, { quantity: quantity }) : i;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('dcielo-cart');
  };

  // Confirmar pedido — genera número y prepara datos para email
  const confirmarPedido = (datosCliente) => {
    var numeroPedido = generarNumeroPedido();
    var pedido = {
      numeroPedido:  numeroPedido,
      email:         datosCliente.email,
      nombre:        datosCliente.name,
      telefono:      datosCliente.phone || '',
      direccion:     datosCliente.address + ', ' + datosCliente.city + ' ' + datosCliente.postalCode,
      items:         items,
      total:         totalPrice.toFixed(2),
      fecha:         new Date().toLocaleDateString('es-ES', { day:'2-digit', month:'2-digit', year:'numeric' }),
    };
    enviarEmailConfirmacion(pedido);
    clearCart();
    return pedido;
  };

  var totalItems = items.reduce(function(sum, i) { return sum + i.quantity; }, 0);
  var totalPrice = items.reduce(function(sum, i) { return sum + (i.product.price * i.quantity); }, 0);

  return (
    <CartContext.Provider value={{
      items, isOpen, setIsOpen,
      addItem, removeItem, updateQuantity, clearCart, confirmarPedido,
      totalItems, totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};
