import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartCRUD = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios.get('http://127.0.0.1:8000/api/cart/')
      .then(res => setCartItems(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/cart/${id}/`)
      .then(() => fetchCart())
      .catch(err => console.error(err));
  };

  const handleUpdate = (id, newQty) => {
    axios.patch(`http://127.0.0.1:8000/api/cart/${id}/`, { quantity: newQty })
      .then(() => fetchCart())
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Cart Items</h1>
      {cartItems.map(item => (
        <div key={item.id} style={{ marginBottom: '1rem' }}>
          <p><b>{item.food_item_detail.name}</b></p>
          <p>Price: ${item.food_item_detail.price}</p>
          <p>Quantity:
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleUpdate(item.id, e.target.value)}
              style={{ width: '60px', marginLeft: '10px' }}
            />
          </p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CartCRUD;
