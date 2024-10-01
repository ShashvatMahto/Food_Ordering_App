import React, { useState } from 'react'
import Restaurant from './Restaurant'
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../store/FilterSlice';

const Reswdelivery = ({ data , title }) => {

  const filterOptions = [
    {
      filterName:"Ratings 4.0+",
    },

    {
      filterName:"Rs. 300 - Rs. 600",
    },
    {
      filterName:"Offers",
    },
    {
      filterName:"Less than Rs. 300",
    },
  ]

  const [active, setactive] = useState(null);
  const dispatch = useDispatch();

  const handleFilterbtn = (indx , filterName)=>{
    setactive(active === indx ? null :indx);
    
    active === indx ? dispatch(setFilterValue(null)) : dispatch(setFilterValue(filterName))
  }

  return (
    <div className='mt-4'>
      <h1 className='text-2xl font-bold'>{title}</h1>

      <div className='my-7 flex flex-wrap gap-3'>
          {
            filterOptions.map(({filterName} , indx)=>(
              <button key={indx} className={'border-2 p-2 rounded-xl shadow-sm  border-[rgb(227, 220, 220)] flex gap-2 ' + (active === indx?"bg-gray-200":"")}
              onClick={()=>{
                handleFilterbtn(indx ,filterName)
              }}>
                <p>{filterName}</p>
                <i className={"fi fi-rr-cross-small mt-1 " + (active===indx ? "":"hidden")}></i>
              </button>
            ))
          }
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-10 mt-10 '>
      {
        data?.map(({ info ,cta:{link} }) => (
          <div key={info.id} className='hover:scale-95 duration-300'>
            <Restaurant {...info} link={link} />
          </div>

        ))
      }
      </div>
    </div>
  )
}

export default Reswdelivery