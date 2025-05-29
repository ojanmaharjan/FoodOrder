import React,{useState} from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDelivery/FoodDisplay'
import RecommendedFoods from '../../Components/RecommendedFoods/RecommendedFoods'
const Home = () => {
  const [category,setCategory] = useState("All");
    
  return (
    <div>
      <Header/>
      <RecommendedFoods/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category = {category}/>
    </div> 
   
  )
}

export default Home
