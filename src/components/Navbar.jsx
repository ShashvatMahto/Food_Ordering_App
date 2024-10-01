import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cordinate } from '../context/contextApi'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLogin, toggleSearch } from '../store/ToggleSlice'
import SignIn from './SignIn'

const Navbar = () => {

  const navItems = [
    {
      name: "Search",
      image: <i className="fi fi-rr-search"></i>,
      path:"/search"
    },

    {
      name: "Sign In",
      image: <i className="fi fi-rr-user"></i>,
      path:"/signIn"
    },

    {
      name: "Cart",
      image: <i className="fi fi-rr-shopping-cart-add"></i>,
      path:"/cart"
    },


  ]
  
  const [searchState, setsearchState] = useState([])

  const [address, setaddress] = useState("Delhi, India")

  const visible = useSelector(state => state.ToggleSlice.searchToggle);

  const loginvisible = useSelector(state => state.ToggleSlice.loginToggle);
  
  
  const dispatch = useDispatch();

  const cartData = useSelector(state=>state.CartSlice.cartItems)
  const userData = useSelector(state=>state.Authentication.userData)
  
  const handleVisible = () => {
    dispatch(toggleSearch())
  }

  const handleLogin = ()=>{    
    dispatch(toggleLogin())
  }

  const { setcord } = useContext(Cordinate)

  const fetchdata = async (val) => {
    if (val === "") return;
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}dapi/misc/place-autocomplete?input=${val}`)
    const data = await res.json();
    console.log(data.data);
    setsearchState(data.data)

  }

  const fetchLatAndLng = async (id) => {
    if (id === "") return;
    handleVisible();
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}dapi/misc/address-recommend?place_id=${id}`);
    const data = await res.json();
    console.log("lat", data?.data[0]?.geometry?.location?.lat);
    setcord({
      lat: data?.data[0]?.geometry?.location?.lat,
      lng: data?.data[0]?.geometry?.location?.lng
    })
    console.log("lng", data?.data[0]?.geometry?.location?.lng);
    console.log(id);
    setaddress(data?.data[0]?.formatted_address)
    console.log(data?.data[0]?.formatted_address);



  }
  return (
    <div className='w-full fixed top-0 z-20 bg-white'>

      <div className='w-full'>
        <div className={'w-full z-30 bg-black/50 h-[100vh] absolute ' + (visible ? "visible" : "invisible")}
          onClick={handleVisible}>
        </div>
        <div className={'bg-white flex justify-end w-full md:w-[40%] h-[100vh] z-40 absolute p-5 ' + (visible ? "left-0 " : "-left-[100%]")}>
          <div className='flex flex-col w-full lg:w-[45%] mr-10'>
            <i className="fi fi-rr-cross cursor-pointer" onClick={handleVisible}></i>

            <input type="text" placeholder='Enter your location'
              className='border p-5 mt-4 focus:outline-none focus:shadow-lg'
              onChange={(e) => fetchdata(e.target.value)} />


            <div className='border p-5 mt-4'>
              <ul>
                {searchState.map((curr , indx) => {

                  const isLast = indx===searchState.length-1;
                  return (
                  <div className='my-5 '>
                    <div className='flex '>
                      <li className='list-none cursor-pointer'
                        onClick={() => fetchLatAndLng(curr?.place_id)}>

                        <div className='flex items-center gap-4'>
                          <div>
                            <i className="fi fi-rs-marker mt-3 "></i>
                          </div>
                          <div>
                            <p>{curr?.structured_formatting?.main_text}</p>
                            <p className='text-black/60'>{curr?.structured_formatting?.secondary_text}</p>
                          </div>

                        </div>

                        {!isLast && <p className=''>---------------------------------</p>}


                      </li>
                    </div>
                  </div>
                )})}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full'>
        <div className={'w-full z-30 bg-black/50 h-[100vh] absolute ' + (loginvisible ? "visible" : "invisible")}
          onClick={handleLogin}>
        </div>
        <div className={'bg-white flex   w-full md:w-[40%] h-[100vh] z-40 absolute p-5 ' + (loginvisible ? "right-0 " : "-right-[100%]")}>
          <div className='m-4 w-[60%]'>
            <i className="fi fi-rr-cross cursor-pointer" onClick={handleLogin}></i>

            <div className='w-full flex my-10 justify-between items-center'>
                <h1 className=' font-bold text-4xl'>Login</h1>
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" className='w-28' alt="" />
            </div>

            <SignIn/>
            <p className='text-sm opacity-70'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
          </div>
        </div>
      </div>


      <div className='w-full shadow-lg h-20 flex justify-center items-center'>

        <div className=' w-full md:w-[70%] flex justify-between'>

          <Link to={'/'}>
            <div className='flex  items-center'>
              <img className='w-24' src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt="" />
              <p>
                <span className='border-b-2 border-black'>others</span>
                <span className='ml-2  text-sm max-w-[250px] opacity-85'>{address}</span>

              </p>
              <i className="fi fi-rr-angle-small-down  cursor-pointer text-2xl text-orange-500 mt-1"
                onClick={handleVisible}></i>
            </div>
          </Link>

          <div className='md:flex hidden
           items-center gap-3 md:gap-6'>
            {
              navItems.map((curr, indx) => (
                curr.name === "Sign In" ?
                <div className='cursor-pointer' onClick={handleLogin} key={indx}>
                
                <div className='flex gap-3 items-center' >
                  <p className='mt-1 text-xl text-gray-700'>{userData?<img className='h-10 w-10 rounded-[50%]' src={userData.image}alt=''/>:curr.image}</p>
                  <p className='text-lg  text-gray-700'>{userData?userData.name:curr.name}</p>
                  <p>{curr.name ==="Cart" && cartData.length}</p>


                </div>
                
                </div>
                :
                <Link to={curr.path} key={indx}>
                
                <div className='flex gap-3' >
                  <p className='mt-1 text-xl text-gray-700'>{curr.image}</p>
                  <p className='text-lg  text-gray-700'>{curr.name}</p>
                  <p>{curr.name ==="Cart" && cartData.length}</p>
                </div>
                
                </Link>
              ))
            }

          </div>

          <div className='flex 
           items-center gap-10  mr-4 md:hidden '>
            {navItems.map((curr , indx)=>(

              curr.name === "Sign In"?
              <div className='cursor-pointer' onClick={handleLogin} key={indx}>
                <p className='mt-1 text-xl text-gray-700'>{userData?<img className='h-10 w-10 rounded-[50%]' src={userData.image}  alt=''/>:curr.image}</p>
              </div>
              :
              <Link to={curr.path}>
                <div className='flex gap-2 items-center relative '>
                <p className='mt-1 text-xl text-gray-700'>{curr.image}</p>
                {curr.name ==="Cart" && <div className='absolute h-6 w-6 bg-black top-[-18px] rounded-[50%] text-white flex justify-center items-center'>{cartData.length}</div>}
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar