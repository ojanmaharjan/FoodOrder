import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSync } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./list.css";

const List = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleEditClick = (item) => {
    navigate(`/admins/edit/${item.id}`, { state: item }); // Navigate to the correct admin edit page and pass item data
  };

  const fetchFoodItems = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      
      const response = await fetch("http://127.0.0.1:8000/api/venues/", {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API response:', data); // Debug log
      
      // Handle different possible data structures
      let transformedItems = [];
      
      if (data.Bulky && Array.isArray(data.Bulky)) {
        transformedItems = data.Bulky.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          category: item.category || 'Uncategorized',
          image: item.image || null,
          // Add other fields as needed
        }));
      } else if (Array.isArray(data)) {
        transformedItems = data.map(item => ({
          id: item.id || item._id,
          name: item.name,
          price: item.price,
          description: item.description,
          category: item.category || 'Uncategorized',
          image: item.image || null,
        }));
      }
      
      setFoodItems(transformedItems);
      console.log('Transformed items:', transformedItems); // Debug log
    } catch (err) {
      console.error('Error fetching food items:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        
        const response = await fetch("http://127.0.0.1:8000/api/delete/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({ id: id }),
        });

        if (response.ok) {
          alert("Item deleted successfully.");
          // Remove the item from the UI
          setFoodItems(foodItems.filter((item) => item.id !== id));
        } else {
          alert("Failed to delete item.");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("An error occurred while deleting.");
      }
    }
  };

  return (
    <div className="food-list-container">
      <div className="food-list-header">
        <h1>Food Items Management</h1>
        <div className="food-list-actions">
          <button className="refresh-btn" onClick={fetchFoodItems}>
            <FaSync /> Refresh List
          </button>
          <Link to="/admins/add" className="add-btn">
            <FaPlus /> Add New Item
          </Link>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading food items...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={fetchFoodItems}>Try Again</button>
        </div>
      ) : foodItems.length === 0 ? (
        <div className="empty-container">
          <p>No food items found. Add some items to get started!</p>
          <Link to="/admins/add" className="add-btn">
            <FaPlus /> Add First Item
          </Link>
        </div>
      ) : (
        <div className="food-items-container">
          <div className="food-items-table">
            <div className="food-items-header">
              <div className="col-image">Photo</div>
              <div className="col-name">Name</div>
              <div className="col-category">Category</div>
              <div className="col-price">Price</div>
              <div className="col-actions">Actions</div>
            </div>
            
            {foodItems.map((item) => (
              <div key={item.id} className="food-item-row">
                <div className="col-image">
                  {item.image ? (
                    <img 
                      src={`http://127.0.0.1:8000/media/${item.image}`}
                      alt={item.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }}
                      onError={e => { e.target.onerror = null; e.target.src = '/no-image.png'; }}
                    />
                  ) : (
                    <img 
                      src="/no-image.png"
                      alt="No Image"
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }}
                    />
                  )}
                </div>
                <div className="col-name">{item.name}</div>
                <div className="col-category">{item.category}</div>
                <div className="col-price">Rs {parseFloat(item.price).toFixed(2)}</div>
                <div className="col-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(item)}
                    title="Edit this item"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                    title="Delete this item"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .food-list-container {
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .food-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f0f0f0;
        }
        .food-list-header h1 {
          margin: 0;
          color: #333;
        }
        .food-list-actions {
          display: flex;
          gap: 10px;
        }
        .refresh-btn, .add-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 16px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .refresh-btn {
          background-color: #f0f0f0;
          color: #333;
        }
        .refresh-btn:hover {
          background-color: #e0e0e0;
        }
        .add-btn {
          background-color: #4caf50;
          color: white;
        }
        .add-btn:hover {
          background-color: #45a049;
        }
        .food-items-table {
          width: 100%;
          border-collapse: collapse;
        }
        .food-items-header {
          display: flex;
          background-color: #f5f5f5;
          font-weight: bold;
          padding: 12px 15px;
          border-radius: 4px 4px 0 0;
        }
        .food-item-row {
          display: flex;
          padding: 12px 15px;
          border-bottom: 1px solid #eee;
          align-items: center;
          transition: background-color 0.2s;
        }
        .food-item-row:hover {
          background-color: #f9f9f9;
        }
        .food-items-header div, .food-item-row div {
          padding: 8px 12px;
        }
        .col-name {
          flex: 3;
        }
        .col-category {
          flex: 2;
        }
        .col-price {
          flex: 1;
          text-align: right;
        }
        .col-actions {
          flex: 2;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }
        .edit-btn, .delete-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        .edit-btn {
          background-color: #2196f3;
          color: white;
        }
        .edit-btn:hover {
          background-color: #0b7dda;
        }
        .delete-btn {
          background-color: #f44336;
          color: white;
        }
        .delete-btn:hover {
          background-color: #da190b;
        }
        .loading-container, .error-container, .empty-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          text-align: center;
        }
        .loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left: 4px solid #3498db;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default List;
