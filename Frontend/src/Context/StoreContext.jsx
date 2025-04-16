import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets"

export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});

  const addToCart = (itemId) => {
    // console.log("item id ",itemId)
    if (!cartItems[itemId]) { //cartItem[itemId] checks if the item with the given itemId exists in the cartItem object
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
cd 
    }
  }
  //{...prev}: This creates a copy of the previous state of the cartItem

  // const removeFromCart = (itemId) => {
  //   // setcartItem((prev) => { if (prev[itemId] > 1) {
  //   //     return { ...prev, [itemId]: prev[itemId] - 1 };
  //   //   } else {
  //   //     const { [itemId]: _, ...rest } = prev;
  //   //     return rest;
  //   //   }
  //   // });

  //   setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  // }
  const removeFromCart = (itemId) => {
    setcartItems((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
    });
  }
  

  const TotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let ItemInfo = food_list.find((product) => product._id === item);
        totalAmount += ItemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }


  

  const contextValue = {
    food_list,        //calling from assets food_List matrai ho 
    cartItems,
    setcartItems,
    addToCart,
    removeFromCart,
    TotalCartAmount
  }


  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;