// import React, { useContext } from 'react'
// import './Cart.css'
// import { StoreContext } from '../../Context/StoreContext'
// import { food_list } from '../../assets/assets'


// const Cart = () => {
//   const {cartItems,addToCart,removeFromCart,TotalCartAmount}= useContext(StoreContext)
//   return (
//     <div className='cart'>
//       <div className='cart-items'>
//         <div className='cart-items-title'>
//           <p>Items</p>
//           <p>Titles</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
        
//         <br/>
//         <hr/>
//        {food_list.map((item,index)=>{
//         if(cartItems[item._id]>0)
//         {
//           return(
//             <div>
//             <div className='cart-items-title cart-items-item' key={item._id}>
//             <img src={item.image} alt=''/>
//             <p>{item.name}</p>
//             <p>{item.price}</p>
//             <p>{cartItems[item._id]}</p>
//             <p>{item.price*cartItems[item._id]}</p>
//             <p  onClick={()=>{removeFromCart(item._id)}} className='cross'>X</p>
//             </div>
//             <hr/>
//             </div>
//           )
//         }
//        }
    
//         )}
    
//     </div>
//         <div className='cart-bottom'>
//           <div className='cart-total'>  
//             <h2>cart Total</h2>
//             <div className='cart-total-details'>
//               <p>SubTotal</p>
//               <p>{TotalCartAmount()}</p>
//             </div>
//             <div className='cart-total-details'>
//               <p>Delivery fee</p>
//               <p>{2}</p>
//             </div>
//             <div className='cart-total-details'>
//               <b>Cart Total </b>
//               <b>{TotalCartAmount()+2}</b>
//             </div>
//             <button className='cart-total-button'>Proced to Check</button>
//           </div>
//        </div>
//         {/* <div className='cart-promocode'>
//           <p>If you have promocode enter here</p>
//           <div className='cart-promocode-input'>
//             <input type='text' placeholder='Enter your promocode'/>
//             <button>Submit</button>
//           </div>
//         </div> */}
    
//   </div>
      
    
//   )
// }

// export default Cart;
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { food_list } from '../../assets/assets';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, TotalCartAmount } = useContext(StoreContext);
  const [cart, setCart] = useState({});

  // useEffect(() => {
  //   // Fetch cart from backend (if you have a backend storage for the cart)
  //   axios.get('http://127.0.0.1:8000/api/cart/')
  //     .then(response => {
  //       setCart(response.data);
  //     })
  //     .catch(error => console.error('Error fetching cart:', error));
  // }, []);

                                      // const handleAddToCart = (id) => {
                                      //   axios.post('http://127.0.0.1:8000/api/add-to-cart/', { food_item_id: id, quantity: 1 })
                                      //     .then(response => {
                                      //       // Update cartItems after adding item
                                      //       addToCart(id);
                                      //     })
                                      //     .catch(error => console.error('Error adding item to cart:', error));
                                      // };

  const handleRemoveFromCart = (id) => {
    axios.delete('http://127.0.0.1:8000/api/remove-from-cart/', { data: { food_item_id: id } })
      .then(response => {
        // Update cartItems after removing item
        removeFromCart(id);
      })
      .catch(error => console.error('Error removing item from cart:', error));
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
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt='' />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}</p>
                  <p onClick={() => { handleRemoveFromCart(item._id) }} className='cross'>X</p>
                  {/* <p onClick={() => { handleAddToCart(item._id) }} className='cross'>+</p> */}
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
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
            <b>{TotalCartAmount() + 2}</b>
          </div>
          {/* <button className='cart-total-button'>Proceed to Checkout</button> */}
          <button
  className='cart-total-button'
  onClick={() => {
    // Save all cartItems to backend
    Object.entries(cartItems).forEach(([id, quantity]) => {
      if (quantity > 0) {
        const payload = {
          food_item: parseInt(id),
          quantity,
        };
        console.log("Sending to backend:", payload); // ✅ Log what's being sent

        axios.post('http://127.0.0.1:8000/api/cart/', payload)
          .then((res) => {
            console.log("✅ POST success:", res.data);
          })
          .catch((error) => {
            console.error(" POST failed:", error.response?.data || error.message);
          });
      }
    });

    setTimeout(() => {
      window.location.href = "/crud"; // Navigate to CartCRUDPage
    }, 500); // Small delay for requests
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
