


import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
// import { food_list } from '../../assets/assets';
import KhaltiPayment from '../../Components/KhaltiPayment';

const Cart = () => {
  const {food_list, cartItems, addToCart, removeFromCart, TotalCartAmount } = useContext(StoreContext);
  const [cart, setCart] = useState({});
  const [error, setError] = useState('');

  // This function checks if the user is logged in by checking if an accessToken exists in localStorage
  const isLoggedIn = () => {
    const token = localStorage.getItem('accessToken');
    return token !== null; // If there's an accessToken, the user is logged in
  };



// Removed useNavigate since Khalti is used directly

// Remove handleCheckout logic and use Khalti directly



// Debugging output
  <div style={{ background: '#ffe', border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
    <h4>Debug Info</h4>
    <div>
      <strong>cartItems:</strong>
      <pre style={{ maxHeight: 120, overflow: 'auto', fontSize: 13 }}>{JSON.stringify(cartItems, null, 2)}</pre>
    </div>
    <div>
      <strong>food_list:</strong>
      <pre style={{ maxHeight: 120, overflow: 'auto', fontSize: 13 }}>{JSON.stringify(food_list, null, 2)}</pre>
    </div>
  </div>

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
        <p>Add</p>
      </div>

      <br />
      <hr />
      {food_list.map((item, index) => {
        if (cartItems[String(item.id)] > 0) {
          return (
            <div key={item.id}>
              <div className='cart-items-title cart-items-item'>
                {console.log("Cart item image:", item.image, item)}
<img 
  src={
    item.image
      ? item.image.startsWith('http')
        ? item.image
        : `http://localhost:8000/media/${item.image}`
      : '/images/default.jpg'
  }
  alt={item.name || ''}
/>
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{cartItems[String(item.id)]}</p>
                <p>{item.price * cartItems[String(item.id)]}</p>

                <p onClick={() => { removeFromCart(item.id) }} className='cross'>X</p>
                <p onClick={() => { addToCart(item.id) }} className='plus'>+</p>
              </div>
              <hr />
            </div>
          );
        }
      })}
    </div>

    <div className='cart-bottom'>
      <div className='cart-total'>
        <div className='cart-total-details'>
          <p>SubTotal</p>
          <p>{TotalCartAmount()}</p>
        </div>
        <div className='cart-total-details'>
          <p>Delivery fee</p>
          <p>{2}</p>
        </div>
        <div className='cart-total-details'>
          <b>Cart Total</b>
          <b>{TotalCartAmount() }</b>
        </div>
        <KhaltiPayment amount={TotalCartAmount()} />
      </div>
    </div>
  </div>
);
};

export default Cart;
