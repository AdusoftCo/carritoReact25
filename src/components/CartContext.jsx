// CartContext.jsx

import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarAlCarrito = (product) => {

    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find(item => item.id === product.id);
      if (existe) {
        // Si ya existe, aumentar la cantidad
        return prevCarrito.map(item =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      // Si no existe, agregarlo con cantidad 1
      return [...prevCarrito, { ...product, cantidad: 1 }];
    });
    console.log('Current cart:', carrito);
  };

  // Eliminar producto por ID
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(item => item.id !== id));
  };

  // Vaciar el carrito (opcional)
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito
      }}
    >
      {children}
    </CartContext.Provider>
  );
}