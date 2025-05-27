import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'

const FoodDisplay = ({category}) => {
     const { food_list} = useContext(StoreContext)
    //  console.log("food list of display",food_list)
  return (
    <div className='food-display' id = 'food-display'>
        <h2>Top dishes near you</h2>
        <div className='food-display-list'>
          {food_list.map((item, index) => {
  console.log("FoodDisplay item object:", item);
  // Try to find a unique id property automatically
  let uniqueId = item._id || item.id || item.food_id || item.slug || item.name;
  if (!item._id && !item.id && !item.food_id && !item.slug) {
    console.warn("No unique id property found for food item. Using name as fallback. This may cause UI bugs if names are not unique.", item);
  }
  if (category === "All" || category === item.category) {
    return <FoodItem key={uniqueId} id={uniqueId} name={item.name} image={item.image} price={item.price} description={item.description} category={item.category}></FoodItem>;
  }
})}
         </div>
    </div>
  )
}

export default FoodDisplay
