import React from 'react'
import { Link } from 'react-router-dom'

const Restaurant = (info) => {    
  return (
    <Link to={`/restaurantmenu/${info?.link.split('/').at(-1)}`}>
      <>
        <div className='min-w-[280px] h-[182px] relative'>
          <img className=' w-full h-full rounded-2xl object-cover' src={'https://media-assets.swiggy.com/swiggy/image/upload/' + info?.cloudinaryImageId} alt=''></img>
          <div className='bg-gradient-to-t from-black from-1% to-transparent to 40% w-full h-full absolute top-0 rounded-2xl'></div>
          <p className='absolute bottom-0 text-white  font-bold ml-2 mb-1 text-2xl'>
            {
              info?.aggregatedDiscountInfoV3?.header ? info?.aggregatedDiscountInfoV3?.header + " " + info?.aggregatedDiscountInfoV3?.subHeader : ""
            }
          </p>


        </div>

        <div>
          <h2 className='text-lg font-semibold'>{info.name}</h2>
          <p className='flex items-center gap-1 text-base font-semibold'><i className="fi fi-sr-circle-star text-green-700 text-xl mt-1"></i>{info?.avgRating} <span>25-30min</span></p>
          <p className='line-clamp-1 text-black/60 font-medium'> {info?.cuisines.join(', ')}</p>
          <p className='line-clamp-1 text-black/60 font-medium'>{info?.locality}</p>
        </div>
      </>
    </Link>
  )
}

export default Restaurant