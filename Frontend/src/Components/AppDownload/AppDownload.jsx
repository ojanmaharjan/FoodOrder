import React from 'react'
import "./AppDownload.css"
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-Download' id='app-Download'>
        <p>For better experiece</p>
        <div className="app-Download-platform">
            <img src={assets.app_store} alt=""/>
            <img src={assets.play_store} alt="" />
        </div>
      
    </div>
  )
}

export default AppDownload
