import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-contain'>
          
            <div className='footer-Left'>
                    <img src={assets.logo} alt=''/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae exercitationem eligendi minima ullam veniam dicta at quia commodi porro, optio dolores quis, non vitae ex! Aliquid consectetur odio magni debitis?</p>
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
                </ul>
            </div>

        </div>
        <hr/>
        <p className='footer-copyright'> CopyRight 2025 © ojan.com - All Right Reserve</p>
        
      
    </div>
  )
}

export default Footer
