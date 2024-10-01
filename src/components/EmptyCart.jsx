import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmptyCart = () => {

  const navigate = useNavigate();
  const moreRestaurant = ()=>{

    navigate('/')
  }
  return (
    <div className='mt-36 flex justify-center items-center w-screen  flex-col gap-6'>
       
       <div>
        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" className='w-[24rem] h-80' alt="" />
       </div>

       <div>
        <h1 className='text-center text-2xl font-bold text-black/70'>Your cart is empty</h1>
        <p className='text-lg text-black/60 text-center'>You can go to home page to view more restaurants</p>
       </div>

       <div>
        <button className='text-2xl bg-orange-400 p-4 text-white font-bold rounded-lg' onClick={moreRestaurant}>See Restaurants near you</button>
       </div>
    </div>
  )
}

export default EmptyCart