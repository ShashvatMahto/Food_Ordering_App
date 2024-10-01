import React, { useState } from 'react'
import Restaurant from './Restaurant';


const TopRestaurant = ({ data ,title }) => {
  const [value, setvalue] = useState(0);
  const handleNext = () => {

    if (value < 450) {
      setvalue(prev => prev + 45)
    }


  }

  const handlePrev = () => {
    if (value > 0) setvalue(prev => prev - 45);

  }
  return (
    <div className='mt-14 '>

      <div className='flex justify-between '>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <div className='flex gap-3'>
          <div className={`w-9 h-9 rounded-full flex justify-center items-center cursor-pointer ` + (value <= 0 ? "bg-gray-100" : " bg-gray-200 ")}
            onClick={handlePrev}>
            <i className={`fi fi-rr-arrow-small-left text-2xl mt-1 ` + (value <= 0 ? "text-gray-200" : "text-gray-800")}></i>
          </div>
          <div className={`w-9 h-9 bg-gray-200 rounded-full flex justify-center items-center cursor-pointer ` + (value >= 450 ? "bg-gray-100" : "bg-gray-200")}
            onClick={handleNext}>
            <i className={`fi fi-rr-arrow-small-right text-2xl mt-1 ` + (value >= 450 ? "text-gray-200" : "text-gray-800")}></i>
          </div>
        </div>
      </div>

      <div className='flex w-full mt-3 gap-5 duration-300' style={{ translate: `-${value}%` }}>

        {
          data?.map(({ info ,cta:{link} }) => (
            <div key={info.id} className='hover:scale-95 duration-300'>
              <Restaurant {...info} link={link}/>
            </div>

            

          ))
        }
      
        
      </div>
      <hr className='border  mt-4'/>
      
    </div>
  )
}

export default TopRestaurant