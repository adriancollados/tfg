import React, { useState, useContext } from 'react';

// Paso 1: Define un contexto para el carrito
const CarritoContext = React.createContext();

// Paso 2: Crea un proveedor para el contexto del carrito
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Función para agregar un artículo al carrito
  const agregarAlCarrito = (articulo, comentario, cantidad) => {
    setCarrito([...carrito, {articulo,comentario, cantidad}]);

    // Almacenar el carrito en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
  };

  // Función para incrementar la cantidad de un artículo en el carrito
  const incrementarCantidad = (item) => {
    const nuevoCarrito = carrito.map((articulo) => {
      if (articulo === item) {
        // Incrementar la cantidad en 1
        return { ...articulo, cantidad: articulo.cantidad + 1 };
      }
      return articulo;
    });
    setCarrito(nuevoCarrito);
  };

  // Función para reducir la cantidad de un artículo en el carrito
  const reducirCantidad = (item) => {
    const nuevoCarrito = carrito.map((articulo) => {
      if (articulo === item && articulo.cantidad > 1) {
        // Reducir la cantidad en 1 si es mayor que 1
        return { ...articulo, cantidad: articulo.cantidad - 1 };
      }
      return articulo;
    });
    setCarrito(nuevoCarrito);
  };
  // Función para eliminar un artículo del carrito
  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, incrementarCantidad, reducirCantidad }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook personalizado para acceder al contexto del carrito
export const useCarrito = () => {
  return useContext(CarritoContext);
};
