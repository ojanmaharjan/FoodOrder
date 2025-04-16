import React,{useState,useEffect} from 'react'
import axios from "axios";

const FoodManager = () => {
    const[foodItems,setfoodItems]= useState([]);
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/food-items/")
        .then(response=>{
            setfoodItems(response.data); //stores the response data in the state
        })
        .catch(error=>{
            console.error("there is an error fatching the data",error)
        });
    },[]); //empty the dependecny array ensure this effects runs once when the component  mounts
  return (
    <div>
        <h1>Food items</h1>
        {foodItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
    </div>
  )
}

export default FoodManager
