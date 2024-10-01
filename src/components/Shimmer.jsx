import React from 'react'

const Shimmer = () => {
  return (
    <div className='mt-20 w-full'>
      <div className='w-full h-[350px] bg-slate-900 flex flex-col gap-6 justify-center items-center text-white'>
        <div className='relative'>
          <img className='w-16 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="" />

          <span className="loader "></span>
        </div>
        <h1 className='text-2xl font-semibold'>Looking for great food near you</h1>


      </div>

      <div className='w-[70%] mx-auto py-8 flex flex-wrap gap-16'>
      {Array(12).fill("").map(data=> <div className=' w-[295px] h-[182px]   animate rounded-md  '></div>)}
        
      </div>

    </div>
  )
}

export default Shimmer

// https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa