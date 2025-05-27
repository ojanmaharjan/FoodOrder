import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get auth token from localStorage
      const accessToken = localStorage.getItem('accessToken');
      
      // Use a more descriptive endpoint name for adding food
      const response = await fetch("http://127.0.0.1:8000/api/quiz/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(foodItem),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response from backend:", result);
        alert("Food item added successfully!");
        
        // Reset form after successful submission
        setFoodItem({
          name: "",
          price: "",
          category: "",
          description: "",
        });
        
        // Navigate to the list page to see the updated list
        navigate('/admins/list');
      } else {
        alert("Failed to add food item. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting food item:", error);
      alert("An error occurred while adding the food item.");
    }

    // Reset form after submission
    setFoodItem({
      name: "",
      price: "",
      category: "",
      description: "",
    });
  };

  return (
    <div className="container">
      <h1>Add Food Item</h1>

      <form onSubmit={handleSubmit} className="food-form">
        <div className="form-row">
          <div className="form-column">
            <label>Food Name</label>
            <input
              type="text"
              name="name"
              value={foodItem.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-column">
            <label>Price (Rs)</label>
            <input
              type="number"
              name="price"
              value={foodItem.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label>Category</label>
            <select
              name="category"
              value={foodItem.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select...</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>

          <div className="form-column">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={foodItem.description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit Food Item
        </button>
      </form>

      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .food-form {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
        }
        .form-row {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;
        }
        .form-column {
          flex: 1;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input,
        select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .submit-btn {
          background: #4caf50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }
        .submit-btn:hover {
          background: #45a049;
        }
      `}</style>
    </div>
  );
};

export default Order;
