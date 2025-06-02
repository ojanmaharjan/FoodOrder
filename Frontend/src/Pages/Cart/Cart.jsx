


import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
// import { food_list } from '../../assets/assets';
import KhaltiPayment from '../../Components/KhaltiPayment';
import UserDetailForm from './UserDetailForm';

const Cart = () => {
  // Remove all of one item from cart
  const removeAllOfItem = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[String(itemId)];
      return newCart;
    });
  };
  const {food_list, cartItems, setCartItems, addToCart, removeFromCart, TotalCartAmount } = useContext(StoreContext);
  const [cart, setCart] = useState({});
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [userDetail, setUserDetail] = useState(null);

  // This function checks if the user is logged in by checking if an accessToken exists in localStorage
  const isLoggedIn = () => {
    const token = localStorage.getItem('accessToken');
    return token !== null; // If there's an accessToken, the user is logged in
  };

  // Step 1: Show user detail form before processing cart
  const handleProcessToCart = () => {
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
    setShowDetailForm(true);
  };

  // Step 2: Handle user detail form submission
  const handleUserDetailSubmit = async (detail) => {
    setProcessing(true);
    setError('');
    setSuccessMsg('');
    setUserDetail(detail);
    try {
      const accessToken = localStorage.getItem('accessToken');
      // Save user detail to backend (adjust endpoint as needed)
      await axios.post('/api/save-detail/', detail, { headers: { Authorization: `Bearer ${accessToken}` } });
      // Now process the cart
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
      await axios.post(
        '/api/checkout/',
        { order },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setSuccessMsg(' Cart processed successfully!');
      setCartItems({}); // Clear cart
      setShowDetailForm(false);
    } catch (err) {
      // Show backend error details if available
      if (err.response && err.response.data) {
        // If backend returns validation errors
        if (err.response.data.data) {
          setError(
            typeof err.response.data.data === 'string' ?
              err.response.data.data :
              Object.entries(err.response.data.data)
                .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`)
                .join(' | ')
          );
        } else if (err.response.data.detail) {
          setError(err.response.data.detail);
        } else if (err.response.data.status) {
          setError(err.response.data.status);
        } else {
          setError('Failed to save details or process cart.');
        }
      } else {
        setError('Failed to save details or process cart.');
      }
    } finally {
      setProcessing(false);
    }
  };


  return (
    <div className='cart'>
      {/* Show user detail form if needed */}
      {showDetailForm && (
        <UserDetailForm onSubmit={handleUserDetailSubmit} loading={processing} />
      )}
    <div className='cart-items'>
      <div className='cart-items-title'>
        <p>Items</p>
        <p>Titles</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>DecreaseItem</p>
        <p>Add</p>
        <p>RemoveAll</p>
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
                <p onClick={() => removeAllOfItem(item.id)} className='remove-all-btn'>X</p>
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
        <button className='cart-total-button' onClick={handleProcessToCart} disabled={processing || TotalCartAmount() === 0 || showDetailForm}>
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
