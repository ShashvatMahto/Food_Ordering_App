import React from 'react'

const MenuShimmer = () => {
  return (
    <div className='mt-24 w-full lg:w-[50%] mx-auto'>
      <div className='w-full sm:h-80 rounded-xl  animate'></div>
      <div className='w-full flex mt-10  justify-between'>
        <div className='w-[45%] h-10 rounded-xl animate'></div>
        <div className='w-[45%] h-10 rounded-xl animate'></div>

      </div>

      <div className='w-full mt-20 flex flex-col gap-9'>
      {Array(5).fill("").map(data=> <div className='w-full h-40  flex justify-between'>
          <div className='w-[60%] flex flex-col gap-5 h-full'> 
            <div className='w-[100%] animate h-5'></div>
            <div className='w-[50%] animate h-5'></div>
            <div className='w-[30%] animate h-5'></div>
          </div>
          <div className='w-[30%] animate h-full rounded-xl'></div>
        </div>)}
        
      </div>
    </div>
  )
}

export default MenuShimmer