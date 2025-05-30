


import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
// import { food_list } from '../../assets/assets';
import KhaltiPayment from '../../Components/KhaltiPayment';

const Cart = () => {
  const {food_list, cartItems, setCartItems, addToCart, removeFromCart, TotalCartAmount } = useContext(StoreContext);
  const [cart, setCart] = useState({});
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // This function checks if the user is logged in by checking if an accessToken exists in localStorage
  const isLoggedIn = () => {
    const token = localStorage.getItem('accessToken');
    return token !== null; // If there's an accessToken, the user is logged in
  };

  const handleProcessToCart = async () => {
    setError('');
    setSuccessMsg('');
    if (!isLoggedIn()) {
      setError('Please log in to process your cart.');
      return;
    }
    if (TotalCartAmount() === 0) {
      setError('Cart is empty.');
      return;
    }
    setProcessing(true);
    // Prepare order data
    const order = Object.keys(cartItems).filter(
      (id) => cartItems[id] > 0
    ).map((id) => {
      const item = food_list.find((f) => String(f.id) === id);
      return item ? {
        name: item.name,
        price: item.price,
        quantity: cartItems[id]
      } : null;
    }).filter(Boolean);

    try {
      const accessToken = localStorage.getItem('accessToken');
      const res = await axios.post(
        '/api/checkout/',
        { order },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setSuccessMsg('Cart processed successfully!');
      setCartItems({}); // Clear cart
    } catch (err) {
      setError('Failed to process cart.');
    } finally {
      setProcessing(false);
    }
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
                <p>Rs {item.price}</p>
                <p>{cartItems[String(item.id)]}</p>
                <p>Rs {item.price * cartItems[String(item.id)]}</p>

                <p onClick={() => { removeFromCart(item.id) }} className='cross'>-</p>
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
          <b>Cart Total</b>
          <b> Rs  {TotalCartAmount() }</b>
        </div>
        <KhaltiPayment amount={TotalCartAmount()} />
        <button className='cart-total-button' onClick={handleProcessToCart} disabled={processing || TotalCartAmount() === 0}>
          {processing ? 'Processing...' : 'Processed to Cart'}
        </button>
        {successMsg && <div style={{color: 'green', marginTop: 8}}>{successMsg}</div>}
        {error && <div style={{color: 'red', marginTop: 8}}>{error}</div>}
      </div>
    </div>
  </div>
);
};

export default Cart;
