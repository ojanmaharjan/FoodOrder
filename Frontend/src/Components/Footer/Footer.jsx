import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-contain'>
          
            <div className='footer-Left'>
                    <img src={assets.khaja} alt='footer-logo' className='footer-logo'/>
                    <p>Welcome to Khaja Time – your ultimate destination for mouthwatering mid-day cravings. Whether you're into crispy samosas, spicy chatpate, or sweet sel roti, we bring Nepal's favorite snacks straight to your fingertips. Fast delivery, fresh ingredients, and flavors that feel like home — that's the Khaja Time promise. Dive into taste, anytime!</p>
                    <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />

                    </div>
            </div>
            <div className='footer-Center'>
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About US</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div className='footer-Right'>
                <h2>Get In Touch</h2>
                <ul>
                    <li>+977-9861627437</li>
                    <li>ojanmaharjan03@gmail.com</li>
                    <li>+977-9803801115</li>
                    <li>ashimmaharjan@gmail.com</li>
                </ul>
            </div>

        </div>
        <hr/>
        <p className='footer-copyright'> CopyRight 2025 © Khaja Time - All Right Reserve</p>
        
      
    </div>
  )
}

export default Footer
