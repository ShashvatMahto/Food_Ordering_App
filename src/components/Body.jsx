import React, { useContext, useEffect, useState } from 'react'
import Carousel from './Carousel'
import TopRestaurant from './TopRestaurantCarousel'
import Reswdelivery from './Reswdelivery';
import { Cordinate } from '../context/contextApi';
import { useSelector } from 'react-redux';
import Shimmer from './Shimmer';

const Body = () => {

  const [TopRestaurantCarouseldata, setTopRestaurantCarouseldata] = useState([]);
  const [Carouseldata, setCarouseldata] = useState([])

  const [CarouselTitle, setCarouselTitle] = useState("")

  const [data, setdata] = useState({})


  const { cord: { lat, lng } } = useContext(Cordinate);

  const filterVal = useSelector(state => state.FilterSlice.filterVal)



  const fetchData = async () => {

    try {

      const res = await fetch(`${process.env.REACT_APP_BASE_URL}dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)

      const json = await res.json();

      //console.log(json?.data?.cards[1]?.card?.card?.header.title);
      setCarouselTitle((json?.data?.cards[1]?.card?.card?.header?.title) || "Top Restaurant Chains")
      setdata(json.data);

      let TopResData = json?.data?.cards.find(data => data?.card?.card?.id === "top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      let TopResData2 = json?.data?.cards.find(data => data?.card?.card?.id === "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      console.log(TopResData2 );
      
      let onYourMindData =  json?.data?.cards.find(data => data?.card?.card?.id === "whats_on_your_mind")?.card?.card?.gridElements?.infoWithStyle?.info;
      console.log(onYourMindData);
      
      // setTopRestaurantCarouseldata(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      setTopRestaurantCarouseldata(TopResData || TopResData2)

      // setCarouseldata(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info)
      setCarouseldata(onYourMindData);
    }
    catch (error) {
      console.log(error);

    }

  }


  const filterdData = TopRestaurantCarouseldata.filter((curr) => {
    if (!filterVal) return true;

    switch (filterVal) {

      case "Ratings 4.0+": return curr?.info?.avgRating > 4.1;
      case "Rs. 300 - Rs. 600": return curr?.info?.costForTwo.slice(1, 4) >= "300" && curr?.info?.costForTwo.slice(1, 4) <= "600";
      case "Offers":

        // Check if `aggregatedDiscountInfoV2` exists and is not empty
        // const discountInfo = curr?.info?.aggregatedDiscountInfoV2;
        // if (discountInfo && Object.keys(discountInfo).length !== 0) {


        //   return discountInfo; // Only return if it's not empty
        // } else {
        //   return null; // or any fallback value if it's empty
        // }
        return curr?.info?.aggregatedDiscountInfoV3;
      case "Less than Rs. 300": return curr?.info?.costForTwo.slice(1, 4) < "300"
      default: return true;
        ;

    }
  })


  useEffect(() => {
    fetchData();
  }, [lat, lng])


  if(TopRestaurantCarouseldata.length===0) return <Shimmer/>
  return (
    <div className='w-full'>
      <div className=' w-full px-10 sm:w-[90%]  lg:w-[80%]   mx-auto mt-3 overflow-hidden'>

        {Carouseldata ? <Carousel data={Carouseldata} />:""}
        <TopRestaurant data={TopRestaurantCarouseldata} title={CarouselTitle} />
        <Reswdelivery data={filterVal === null ? TopRestaurantCarouseldata : filterdData} title={CarouselTitle} />
      </div>


    </div>
  )
}

export default Body