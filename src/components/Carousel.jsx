import React, { useState } from 'react'

const Carousel = ({data}) => {
  const [value, setvalue] = useState(0);

  const handleNext  = ()=>{
    
     if(value<=90){
      setvalue(prev=> prev+18)
    }
    
  }

  const handlePrev = ()=>{
    if(value>0) setvalue(prev=> prev-18);
    
  }
  return (
    <div className='mt-24'>
       <div className='flex justify-between '>
          <h1 className='text-2xl font-bold'>What's On Your Mind?</h1>
          <div className='flex gap-3'>
            <div className={`w-9 h-9 rounded-full flex justify-center items-center cursor-pointer ` + (value<=0?"bg-gray-100":" bg-gray-200 ")}
            onClick={handlePrev}>
              <i className={`fi fi-rr-arrow-small-left text-2xl mt-1 ` + (value<=0?"text-gray-200":"text-gray-800")}></i>
            </div>
            <div className={`w-9 h-9 bg-gray-200 rounded-full flex justify-center items-center cursor-pointer ` + (value>=90?"bg-gray-100":"bg-gray-200")}
            onClick={handleNext}>
              <i className={`fi fi-rr-arrow-small-right text-2xl mt-1 ` + (value>=90?"text-gray-200":"text-gray-800")}></i>
            </div>
          </div>
        </div>

        <div 
        style={{translate:`-${value}%`}}
        className='flex mt-4 duration-75'>
          {
            data?.map((curr) => (
              <img className='w-36' src={`https://media-assets.swiggy.com/swiggy/image/upload/${curr.imageId}`} alt="" key={curr.id} />
            ))
          }
        </div>
        <hr className='border mt-6'/>
    </div>
  )
}

export default Carousel