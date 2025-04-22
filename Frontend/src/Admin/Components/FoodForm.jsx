import React, { useState, useEffect } from 'react';
// import './FoodForm.css';

/**
 * Form component for adding/editing food items
 * @param {Object} props - Component props
 * @param {Object|null} props.food - Food item to edit (null for new items)
 * @param {Function} props.onSubmit - Submit handler
 * @param {Function} props.onCancel - Cancel handler
 */
const FoodForm = ({ food, onSubmit, onCancel }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null
  });

  // Image preview state
  const [imagePreview, setImagePreview] = useState(null);

  // Initialize form when food prop changes
  useEffect(() => {
    if (food) {
      setFormData({
        name: food.name,
        description: food.description,
        price: food.price.toString(),
        category: food.category,
        image: null
      });
      if (food.image) {
        setImagePreview(`/images/${food.image}`); // Adjust path as needed
      }
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null
      });
      setImagePreview(null);
    }
  }, [food]);

  /**
   * Handles form field changes
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handles image file selection
   * @param {Object} e - Event object
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Handles form submission
   * @param {Object} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare data for submission
    const submissionData = {
      ...formData,
      price: parseFloat(formData.price)
    };
    
    onSubmit(submissionData);
  };

  return (
    <div className="food-form-container">
      <h2>{food ? 'Edit Food Item' : 'Add New Food Item'}</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price and Category Row */}
        <div className="form-row">
          {/* Price Field */}
          <div className="form-group">
            <label htmlFor="price">Price ($):</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          {/* Category Field */}
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="appetizer">Appetizer</option>
              <option value="main">Main Course</option>
              <option value="dessert">Dessert</option>
              <option value="beverage">Beverage</option>
            </select>
          </div>
        </div>

        {/* Image Field */}
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
          
          {/* Current image notice for edits */}
          {food?.image && !formData.image && (
            <p className="current-image-notice">Current image: {food.image}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {food ? 'Update' : 'Add'} Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodForm;