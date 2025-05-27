import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);

  useEffect(() => {
    // Fetch food items from backend API
    fetch("/api/venues/")
      .then((res) => res.json())
      .then((data) => {
        // The backend returns { Bulky: [...] }
        if (data.Bulky) {
          setFoodList(data.Bulky);
        } else {
          setFoodList([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch food items:", err);
        setFoodList([]);
      });
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [String(itemId)]: (prev[String(itemId)] || 0) + 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[String(itemId)] > 1) {
        return { ...prev, [String(itemId)]: prev[String(itemId)] - 1 };
      } else {
        const { [String(itemId)]: _, ...rest } = prev;
        return rest;
      }
    });
  }

  const TotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let ItemInfo = food_list.find((product) => String(product._id) === item);
        if (ItemInfo) {
          totalAmount += ItemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  }

  const contextValue = {
    food_list,        // Now from backend
    cartItems,
    setCartItems,
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