import React, { useState } from 'react'

// import { useSelector } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";

import { addtoCart, clearCart, diffRest } from "../store/CartSlice";

const DetailedMenucard = ({ price, defaultPrice, name, vegClassifier, imageId, rating, ratingCountV2, description = "", id, resInfo }) => {

  const [showMore, setshowMore] = useState(false);
  


   const isDiff = useSelector(state => state.CartSlice.isDiff);
   
  const dispatch = useDispatch();

  let trimDesc = description.substring(0, 138);

  let veg = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/2048px-Indian-vegetarian-mark.svg.png"
  let nonveg = "https://www.pngkey.com/png/detail/245-2459071_non-veg-icon-non-veg-symbol-png.png";

  const handleClick = () => {
    setshowMore(!showMore);
  }

  return (
    <>
      <div className='flex w-full justify-between min-h-182px]'>
        <div className=' w-[50%] md:w-[70%]'>
          <img className='w-5 rounded-sm' src={(vegClassifier === "VEG" ? veg : nonveg)} alt="" />

          <h2 className='font-bold text-lg'>{name}</h2>
          <p>₹{price / 100 || defaultPrice / 100}</p>
          <div className='flex items-center gap-1'>
            <i className="fi fi-ss-star mt-1"></i>
            <span>{rating ? rating : ""}({ratingCountV2 ? ratingCountV2 : ""})</span>
          </div>
          <div className=''>
            <span className='line-clamp-2 md:line-clamp-none'>{showMore ? description : trimDesc}</span>
            {description.length > 138 && <span className='cursor-pointer hidden md:block font-semibold' onClick={handleClick}>{showMore ? " less" : "...show"}</span>}
          </div>
        </div>
        <div className=' w-[30%] md:w-[20%] relative h-full'>
          <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/` + (imageId)} className='h-[144px] w-[165px] object-fit rounded-xl' alt="" />
          <button className='bg-white text-lg text-green-700 rounded-xl px-10 py-2 drop-shadow-sm border absolute bottom-[-13px] left-2 font-bold'
            onClick={() => {
            dispatch(addtoCart({ price, defaultPrice, name, vegClassifier, imageId, rating, ratingCountV2, description, id , resInfo }))
            
            }
            }>Add Me</button>
        </div>
      </div>

      <hr className='my-4 border' />

      {
        isDiff && (
          <div className='w-[520px] h-[204px] p-8 border-2 fixed bottom-10 left-[30%] bg-white '>
            <h1 className='font-bold text-xl'>Items already in cart</h1>
            <p>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
            <div className='flex w-full justify-between gap-3 mt-3'>
              <button className='w-1/2 border-green-600 border-2 text-green-600 bg-white  p-4 '  onClick={()=>{
                dispatch(diffRest())
              }}>No</button>
              <button className='w-1/2 p-4  border-2 text-white bg-[#60B246]'
              onClick={()=>{
                dispatch(clearCart())
              }}>YES, START AFRESH</button>
            </div>
          </div>
        )
      }
    </>

  )
}

export default DetailedMenucard

              
