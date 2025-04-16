import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, TotalCartAmount } = useContext(StoreContext);
  const [foodItems, setFoodItems] = useState([]);

  // Fetch food items from the backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/food-items/')
      .then(res => setFoodItems(res.data))
      .catch(err => console.error('Error fetching food items:', err));
  }, []);

  // Remove item from backend
  const handleRemoveFromCart = (id) => {
    axios.delete('http://127.0.0.1:8000/api/remove-from-cart/', { data: { food_item: id } })
      .then(response => {
        removeFromCart(id);
      })
      .catch(error => console.error('Error removing item from cart:', error.response?.data || error.message));
  };

  // Calculate cart total using real foodItems
  const getTotalAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = foodItems.find(f => f.id === parseInt(itemId));
      if (item) {
        total += item.price * cartItems[itemId];
      }
    }
    return total;
  };

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Titles</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {foodItems.map((item) => {
          if (cartItems[item.id] > 0) {
            return (
              <div key={item.id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt='' />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item.id]}</p>
                  <p>${item.price * cartItems[item.id]}</p>
                  <p onClick={() => handleRemoveFromCart(item.id)} className='cross'>X</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div className='cart-total-details'>
            <p>SubTotal</p>
            <p>${getTotalAmount()}</p>
          </div>
          <div className='cart-total-details'>
            <p>Delivery fee</p>
            <p>$2</p>
          </div>
          <div className='cart-total-details'>
            <b>Cart Total</b>
            <b>${getTotalAmount() + 2}</b>
          </div>

          <button
            className='cart-total-button'
            onClick={() => {
              Object.entries(cartItems).forEach(([id, quantity]) => {
                if (quantity > 0) {
                  const payload = {
                    food_item: parseInt(id),
                    quantity,
                  };
                  axios.post('http://127.0.0.1:8000/api/cart/', payload)
                    .then((res) => {
                      console.log("✅ POST success:", res.data);
                    })
                    .catch((error) => {
                      console.error("POST failed:", error.response?.data || error.message);
                    });
                }
              });

              setTimeout(() => {
                window.location.href = "/crud";
              }, 500);
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
