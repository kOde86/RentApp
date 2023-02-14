import React from 'react'

import './Footer.scss'

function Footer() {
    const date = new Date()
  return (
    <div className='row footer'>
        <p className='brand-name'>Rent Ghana</p>
        <p className='copyright'>&copy; Copyright {date.getFullYear()} </p>
    </div>
    
  
  )
}

export default Footer