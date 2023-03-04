import React, { useState } from 'react';

function Cart() {
  const [items, setItems] = useState([]);

  function addToCart(item) {
    setItems(prevItems => [...prevItems, item]);
  }

  function removeFromCart(item) {
    setItems(prevItems => prevItems.filter(prevItem => prevItem !== item));
  }

  return (
    <div>
      <h2>Carrito</h2>
      <ul>
        {items.map(item => (
          <li key={item}>
            {item} <button onClick={() => removeFromCart(item)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addToCart('Item nuevo')}>Agregar al carrito</button>
    </div>
  );
}

export default Cart;
