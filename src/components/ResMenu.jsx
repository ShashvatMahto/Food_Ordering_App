import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Discount from './Discount';
import MenuCards from './MenuCards';
import { Cordinate } from '../context/contextApi';
import MenuShimmer from './MenuShimmer';

const ResMenu = () => {
  const { id } = useParams();
  const resId = id.split('-').at(-1).split('t').at(-1);


  const [menu, setmenu] = useState([])
  const [resInfo, setresInfo] = useState([]);
  const [discount, setdiscount] = useState([]);
  const [TopPicks, setTopPicks] = useState({})
  const [value, setvalue] = useState(0);
  const{cord:{lat , lng}} = useContext(Cordinate);

  console.log(resInfo);
  

  const handleNext = () => {

  }

  const handlePrev = () => {

  }



  const fetchMenu = async () => {
    const data = await fetch(`${process.env.REACT_APP_BASE_URL}dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);

    const res = await data.json();
    const resInfo2 = res?.data?.cards.find(data=> data?.card?.card?.["@type"].includes("food.v2.Restaurant"))?.card?.card?.info;

    setresInfo(resInfo2)
    

    
    
    setdiscount(res?.data?.cards?.find((data)=> data?.card?.card?.id==="offerCollectionWidget_UX4")?.card?.card?.gridElements?.infoWithStyle?.offers)

    const actualMenu = res?.data?.cards.find((data=>data?.groupedCard))?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(data => data?.card?.card?.itemCards || data?.card?.card?.categories);
  

    setmenu(actualMenu)
    setTopPicks(( res?.data?.cards.find((data=>data?.groupedCard))?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data => data.card?.card?.title === "Top Picks")[0])


  }

  useEffect(() => {

    fetchMenu();
  }, [])
  return (
    <div className='w-full'>
      {menu.length?(<div className=' w-[95%] md:w-[800px] mx-auto pt-8 mt-20'>
        <p className='text-sm text-slate-400'>
          <Link to={'/'}><span className='hover:text-slate-700 cursor-pointer'>Home/</span></Link>
          <span className='hover:text-slate-700 cursor-pointer'>{resInfo?.city}/</span>
          <span>{resInfo.name}</span>
        </p>
        <h1 className='text-2xl font-bold pt-6'>{resInfo.name}</h1>

        <div className='w-full h-[250px]  rounded-[35px] mt-3 bg-gradient-to-t from-slate-200/70 p-5 border'>
          <div className='w-full h-full border border-slate-200/70 rounded-[30px] bg-white p-4'>
            <div className='flex items-center gap-1 font-semibold'>
              <i className="fi fi-sr-circle-star text-green-700 text-xl mt-1"></i>
              <span>{resInfo.avgRating}</span>
              <span>({resInfo.totalRatingsString})</span>
              .
              <span>{resInfo.costForTwoMessage}</span>

            </div>

            <p className='text-orange-600 underline font-semibold'>
              {resInfo?.cuisines?.join(', ')}
            </p>

            <div className='flex gap-4'>
              <div className='relative mt-2'>
                <div className='h-3 w-3 bg-gray-300 rounded-full flex'>
                </div>
                <div className='h-3 w-3 bg-gray-300 rounded-full mt-7'>
                </div>
                <div className='h-7 w-[1.5px] bg-gray-400 absolute top-3 left-[5px]'>
                </div>

              </div>

              <div>

                <div className='flex gap-4'>
                  <span className='font-bold'>Outlet</span>
                  <span>{resInfo.areaName}</span>
                </div>

                <div className='mt-4'>
                  <p> {resInfo?.sla?.minDeliveryTime} - {resInfo?.sla?.maxDeliveryTime}  mins</p>
                </div>

              </div>

            </div>
            <hr className='border mt-4' />
            <div className='flex mt-3'>
              <i className="fi fi-tr-biking mx-2"></i>
              <span>{resInfo?.sla?.lastMileTravel} kms</span>
              <div className='h-4 w-[1px] bg-gray-400 mt-1 mx-2'></div>
              <span className='mx-1'> {(resInfo?.feeDetails?.amount/ 100) || 38  } Delivery fee will apply</span>
            </div>


          </div>

        </div>

        <div className='w-full overflow-hidden '>
          <div className='flex justify-between mt-8 '>
            <h1 className='text-xl font-bold mt-5'>Deals for you</h1>
            <div className='flex gap-3'>
              <div className={`w-9 h-9 rounded-full flex justify-center items-center cursor-pointer ` + (value <= 0 ? "bg-gray-100" : " bg-gray-200 ")}
                onClick={handlePrev}>
                <i className={`fi fi-rr-arrow-small-left text-2xl mt-1 ` + (value <= 0 ? "text-gray-200" : "text-gray-800")}></i>
              </div>
              <div className={`w-9 h-9 bg-gray-200 rounded-full flex justify-center items-center cursor-pointer ` + (value >= 90 ? "bg-gray-100" : "bg-gray-200")}
                onClick={handleNext}>
                <i className={`fi fi-rr-arrow-small-right text-2xl mt-1 ` + (value >= 90 ? "text-gray-200" : "text-gray-800")}></i>
              </div>
            </div>



          </div>


          <div className='flex mt-6'>
            {
              discount?.map((curr ,indx) => (
                <Discount data={curr} key={indx} resInfo = {resInfo} />
              ))
            }
          </div>

        </div>


        <div className='w-full '>
          <h2 className='text-center mt-5 '>Menu</h2>

          <div className='w-full mt-5 relative cursor-pointer'>
            <div className='w-full  text-center  bg-slate-200 p-3 font-semibold text-lg rounded-xl'> Search For Dishes </div>
            <i className="fi fi-rr-search absolute top-3 right-4  "></i>
          </div>


        </div>


        {
          TopPicks &&
          <div className='w-full overflow-hidden '>
            <div className='flex justify-between mt-8 '>
              <h1 className='text-xl font-bold mt-5'>{TopPicks?.card?.card?.title}</h1>
              <div className='flex gap-3'>
                <div className={`w-9 h-9 rounded-full flex justify-center items-center cursor-pointer ` + (value <= 0 ? "bg-gray-100" : " bg-gray-200 ")}
                  onClick={handlePrev}>
                  <i className={`fi fi-rr-arrow-small-left text-2xl mt-1 ` + (value <= 0 ? "text-gray-200" : "text-gray-800")}></i>
                </div>
                <div className={`w-9 h-9 bg-gray-200 rounded-full flex justify-center items-center cursor-pointer ` + (value >= 90 ? "bg-gray-100" : "bg-gray-200")}
                  onClick={handleNext}>
                  <i className={`fi fi-rr-arrow-small-right text-2xl mt-1 ` + (value >= 90 ? "text-gray-200" : "text-gray-800")}></i>
                </div>
              </div>



            </div>


            <div className='flex mt-6 gap-4'>
              {
                TopPicks?.card?.card?.carousel?.map(({ creativeId, dish: { info: { id, defaultPrice, price } } } ,indx) => (
                  <div key={indx} className='min-w-[400px] h-[405px] relative'>
                    <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" + creativeId} alt="" className='w-full  ' />
                    <div className='absolute bottom-3 text-white w-[100%] flex justify-between items-center px-5 '>
                      <p className=''>₹{defaultPrice / 100 || price / 100}</p>
                      <button className='bg-white text-lg text-green-700 rounded-xl px-10 py-2  drop-shadow-sm border  font-bold'>Add</button>
                    </div>
                  </div>

                ))
              }
            </div>

          </div>
        }

        <div>
          {
            menu?.map(({ card: { card } } , indx) => {


              return <MenuCards card={card} key={indx} resInfo={resInfo} />
            })
          }
        </div>


      </div>):<MenuShimmer/>}
      
    </div>
  )
}

export default ResMenu