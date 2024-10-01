import React from 'react'

const Discount = ({data:{info:{couponCode , header,offerLogo }}}) => {

 
  
  return (
    <div key={header} className='flex min-w-[328px] h-[78px] items-center gap-5 p-4 '>
      <div>
        <img  className='' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_80,h_80/` + offerLogo }alt="" />
      </div>

      <div>
        <h3>{header}</h3>
        <p>{couponCode}</p>
      </div>
    </div>
  )
}

export default Discount