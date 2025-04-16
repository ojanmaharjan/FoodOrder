import React, { useContext } from 'react'
import {assets} from '../../assets/assets'
import "./FoodItem.css"
import { StoreContext } from '../../Context/StoreContext'

const FoodItem =({id,name,price,description,image}) => {
    // const [itemCount,setitemCount] = useState(0)
    const {cartItems,addToCart,removeFromCart}= useContext(StoreContext); //usecontext is not a function so we used { } inseded of [ ]
    // console.log("name of food",name)
   

    return(
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-img' src={image} alt=''/>
                
                    
                 {!cartItems[id]
                    ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''/>
                    :<div className='food-item-counter'>
                        <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=''/>
                        <p>{cartItems[id]}</p>
                        <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=''/>
                    </div>
                    } 
                     
            </div>
                
                <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p className='food-item-name'>{name}</p>
                    <img src={assets.rating_starts}/>
                </div>
            </div>
            <p className='food-item-des'>{description}</p>
            <p className='food-item-price'>RS. {price}</p>

        </div>

         )
}



export default FoodItem
