import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Cordinate } from '../context/contextApi';

const Search = () => {

  const [searchquery, setsearchquery] = useState("");

  const [data, setdata] = useState([]);
  console.log(data);

  const { cord: { lat, lng } } = useContext(Cordinate);
  const handleSearch = (e) => {
    setsearchquery(e.target.value);
  }

  const fetchdata = async () => {
    const data = await fetch(`${process.env.REACT_APP_BASE_URL}dapi/restaurants/search/suggest?lat=${lat}&lng=${lng}&str=${searchquery}&trackingId=undefined&includeIMItem=true`)

    const res = await data.json();
    setdata(res?.data?.suggestions)

  }

  useEffect(() => {

    fetchdata()

  }, [searchquery])
  return (
    <div className='mt-28 w-full  '>

      <div className='w-[75%]  ml-auto z-10 sticky top-0'>
        <div className='w-full'>
          <input value={searchquery} type="text" placeholder='Search for dishes' className=' border-2 w-[85%] md:w-[60%] px-10 py-3 outline-none focus:outline-none' onChange={handleSearch} />
        </div>

        <div className='w-full'>
        {data?.map(({type ,cloudinaryId , metadata, cta:{text}  }) => 
        
        
        {
          const meta = JSON.parse(metadata)

          console.log(meta?.data?.primaryRestaurantId);

          const resid = meta?.data?.primaryRestaurantId
          

           return resid ? <Link to={`/restaurantmenu/${resid}`}>
            <div className=' w-[85%] md:w-[60%] flex gap-3  mt-10 border-2 p-5 shadow-lg items-center md:gap-6'>
            <div className=''>
              <img className='h-44  w-44 rounded-xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/` +(cloudinaryId)} alt="" />
            </div>

            <div className=''>
              <p className='text-xl font-bold text-black/50'>{text}</p>
              <p className='text-lg text-black/50 '> {type}</p>
            </div>
          </div>
          </Link>
          :
          <Link to={`/`}>
            <div className=' w-[85%] md:w-[60%] flex gap-3  mt-10 border-2 p-5 shadow-lg items-center md:gap-6'>
            <div className=''>
              <img className='h-44  w-44 rounded-xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/` +(cloudinaryId)} alt="" />
            </div>

            <div className=''>
              <p className='text-xl font-bold text-black/50'>{text}</p>
              <p className='text-lg text-black/50 '> {type}</p>
            </div>
          </div>
          </Link>
        })}
        </div>

      </div>
    </div>
  )
}

export default Search
// 38260

// "{"type":"DISH","data":{"vegIdentifier":"NA","cloudinaryId":"angrwyewtancp3ywnriu","dishFamilyId":"846565","dishFamilyIds":["846565"]},"businessCategory":"SWIGGY_FOOD","displayLabel":"Dish"}"