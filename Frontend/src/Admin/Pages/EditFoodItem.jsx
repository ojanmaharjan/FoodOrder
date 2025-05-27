import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./EditFoodItem.css";

const EditFoodItem = () => {
  const { state } = useLocation(); // Get the passed state
  const { id } = useParams(); // Get the id from the URL params
  const navigate = useNavigate();
  const [isNewItem, setIsNewItem] = useState(!id || id === 'new');

  const [foodItem, setFoodItem] = useState({
    id: id || '',
    name: "",
    price: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    // If we have state data, use it
    if (state) {
      console.log("Received state:", state);
      setFoodItem({ ...state, id: state.id || '' });
      return;
    }
    
    // If it's a new item, don't try to fetch from API
    if (isNewItem) {
      console.log("Creating a new food item");
      return;
    }
    
    console.log("Fetching item by ID:", id);
    
    // Only fetch if we have a valid ID and it's not a new item
    if (id && id !== 'new') {
      const fetchFoodItem = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const response = await fetch(`http://127.0.0.1:8000/api/food/${id}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setFoodItem(data);
          } else {
            console.error("Error fetching food item: HTTP status", response.status);
          }
        } catch (err) {
          console.error("Error fetching food item:", err);
        }
      };
      
      fetchFoodItem();
    }
  }, [state, id, isNewItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodItem((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("Updated foodItem state on input change:", {
      ...foodItem,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending food item to backend:", foodItem);

    try {
      const accessToken = localStorage.getItem('accessToken');
      const endpoint = isNewItem 
        ? "http://127.0.0.1:8000/api/quiz/"
        : "http://127.0.0.1:8000/api/update/";

      let response;
      if (isNewItem) {
        // Use FormData for new items (with image)
        const formData = new FormData();
        formData.append('name', foodItem.name);
        formData.append('price', foodItem.price);
        formData.append('category', foodItem.category);
        formData.append('description', foodItem.description);
        if (foodItem.image) {
          formData.append('image', foodItem.image);
        }
        response = await fetch(endpoint, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          body: formData,
        });
      } else {
        // For update: if a new image is selected, use FormData, else use JSON
        if (foodItem.image) {
          const formData = new FormData();
          formData.append('id', foodItem.id);
          formData.append('name', foodItem.name);
          formData.append('price', foodItem.price);
          formData.append('category', foodItem.category);
          formData.append('description', foodItem.description);
          formData.append('image', foodItem.image);
          response = await fetch(endpoint, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },
            body: formData,
          });
        } else {
          response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(foodItem),
          });
        }
      }

      if (response.ok) {
        const successMessage = isNewItem 
          ? "Food item added successfully!" 
          : "Food item updated successfully!";
        alert(successMessage);
        navigate('/admins/list');
      } else {
        const errorMessage = isNewItem 
          ? "Failed to add food item." 
          : "Failed to update food item.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error saving food item:", error);
      alert("An error occurred while saving the food item.");
    }
  };


  return (
    <div className="container">
      <h2>{isNewItem ? "Add New Food Item" : "Edit Food Item"}</h2>
      <form onSubmit={handleSubmit} className="food-form" encType="multipart/form-data">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={foodItem.name}
          onChange={handleInputChange}
          required
        />
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={foodItem.price}
          onChange={handleInputChange}
          required
        />
        <label>Category</label>
        <select
          name="category"
          value={foodItem.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select...</option>
          <option value="Salad">Salad</option>
          <option value="Rolls">Rolls</option>
          <option value="Deserts">Deserts</option>
          <option value="Sandwitch">Sandwitch</option>
          <option value="Cake">Cake</option>
          <option value="Pure Veg">Pure Veg</option>
          <option value="Pasta">Pasta</option>
          <option value="Noodles">Noodles</option>
        </select>
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={foodItem.description}
          onChange={handleInputChange}
        />
        <label>Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={e => {
            const file = e.target.files[0];
            setFoodItem(prev => ({ ...prev, image: file }));
          }}
          required={isNewItem}
        />
        <button type="submit" className="submit-btn">
          {isNewItem ? "Add Item" : "Update Item"}
        </button>
      </form>
    </div>
  );
};

export default EditFoodItem;
