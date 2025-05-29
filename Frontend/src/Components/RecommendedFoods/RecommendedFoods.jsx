import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './RecommendedFoods.css';

// Custom hook to react to localStorage token changes (even in same tab)
function useAccessToken() {
  const getToken = () => localStorage.getItem('access') || localStorage.getItem('accessToken');
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    // Listen for changes in localStorage (from other tabs)
    const onStorage = () => setToken(getToken());
    window.addEventListener('storage', onStorage);

    // Listen for changes in this tab (after login/logout)
    const interval = setInterval(() => {
      const current = getToken();
      setToken(prev => (prev !== current ? current : prev));
    }, 500);

    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  return token;
}

const RecommendedFoods = () => {
  const accessToken = useAccessToken();
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(StoreContext);

  useEffect(() => {
    setError('');
    setFoods([]);
    if (!accessToken) {
      setError('You must be logged in to see recommendations.');
      return;
    }
    setLoading(true);
    axios.get('http://localhost:8000/api/recommend/', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(res => {
        setFoods(res.data.recommendations || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Could not fetch recommendations.');
        setLoading(false);
        console.error(err);
      });
  }, [accessToken]);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (loading) return <div>Loading recommendations...</div>;
  if (!foods.length) return null;

  return (
    <div className="recommended-section">
      <h2>Recommended for You</h2>
      <div className="recommended-list">
        {foods.map((food, idx) => {
  const uniqueId = food._id || food.id || food.food_id;
  if (!uniqueId) {
    return (
      <div key={idx} style={{color: 'red', fontWeight: 'bold'}}>
        Error: Recommended food item missing unique id (must have _id, id, or food_id). This item cannot be added to cart. Data: {JSON.stringify(food)}
      </div>
    );
  }
  return (
    <FoodItem
      key={uniqueId}
      id={uniqueId}
      name={food.name}
      image={food.image}
      price={food.price}
      description={food.description}
      category={food.category}
    />
  );
})}
      </div>
    </div>
  );
};

export default RecommendedFoods;