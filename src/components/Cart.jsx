import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteItem } from '../store/CartSlice';
import toast from 'react-hot-toast';
import { toggleLogin } from '../store/ToggleSlice';
import EmptyCart from './EmptyCart';

const Cart = () => {

  const [showMore, setshowMore] = useState(false);
  const cartData = useSelector(state => state.CartSlice.cartItems);

  const resInfo = useSelector(state => state.CartSlice.resInfo);
  const dispatch = useDispatch();

  const userData = useSelector(state => state.Authentication.userData)

  // const navigate = useNavigate();
  const totalPrice = cartData.reduce((acc, curr) => {
    return acc += curr.price / 100 || curr.defaultPrice / 100;
  }, 0)

  const handlePlaceOrder = () => {

    if (!userData) {
      toast.error("You need to logIn");
      dispatch(toggleLogin())
      return
    }
    toast.success("Order Placed")
  }




  let veg = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/2048px-Indian-vegetarian-mark.svg.png"
  let nonveg = "https://www.pngkey.com/png/detail/245-2459071_non-veg-icon-non-veg-symbol-png.png";

  const handleClick = () => {
    setshowMore(!showMore);
  }


  if (cartData.length === 0) {
   return  <EmptyCart/>
  }

  return (

    <div className='w-full mt-32'>
      <div className='w-[95%] md:w-[800px] mx-auto mt-6'>
        <h1 className='text-2xl font-bold '><span className='border-b-2 pb-2'> {resInfo}</span></h1>
        {
          cartData.map(({ price, defaultPrice, name, vegClassifier, imageId, rating, ratingCountV2, description = "", id, resInfo }, indx) => {

            let trimDesc = description.substring(0, 138)
            return (
              <div key={id} className='flex w-full justify-between min-h-182px] mt-7'>
                <div className=' w-[55%] md:w-[70%]'>
                  <img className='w-5 rounded-sm' src={(vegClassifier === "VEG" ? veg : nonveg)} alt="" />

                  <h2 className='font-bold text-lg'>{name}</h2>
                  <p>₹{price / 100 || defaultPrice / 100}</p>
                  <div className='flex items-center gap-1'>
                    <i className="fi fi-ss-star mt-1"></i>
                    <span>{rating ? rating : ""}({ratingCountV2 ? ratingCountV2 : ""})</span>
                  </div>
                  <div className=''>
                    <span className=''>{showMore ? description : trimDesc}</span>
                    {description.length > 138 && <span className='cursor-pointer font-semibold' onClick={handleClick}>{showMore ? " less" : "...show"}</span>}
                  </div>
                </div>
                <div className=' w-[30%] md:w-[20%] relative h-full'>
                  <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/` + (imageId)} className='h-[144px] w-[165px] object-fit rounded-xl' alt="" />
                  <button className='bg-red-500 text-lg text-white rounded-xl px-10 py-2 drop-shadow-sm  absolute bottom-[-13px] left-2 font-bold'
                    onClick={() => {
                      dispatch(deleteItem(indx))

                    }
                    }>Remove</button>
                </div>
              </div>
            )
          })
        }

        <p className='mt-6 font-bold text-xl'>Total-price :₹{totalPrice}</p>
        <div className='flex justify-between'>
          <button className='p-3 bg-green-600 text-white' onClick={() => dispatch(clearCart())}>Clear Cart</button>
          <button className='p-3 bg-green-600 text-white' onClick={() => handlePlaceOrder()}>Place Order</button>
        </div>
      </div>

    </div>
  )
}

export default Cart