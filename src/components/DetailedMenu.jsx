import React from 'react'
import DetailedMenucard from './DetailedMenucard';

const DetailedMenu = ({ itemCards ,resInfo }) => {
  return (
    <>
      {itemCards.map(({ card: { info: { id, description, imageId, defaultPrice, price, name, ratings: { aggregatedRating: { rating, ratingCountV2 } }, itemAttribute: { vegClassifier } } } } ) => {

          return <DetailedMenucard price ={price} defaultPrice={defaultPrice} description={description} imageId={imageId} name={name} rating={rating} ratingCountV2={ratingCountV2} vegClassifier={vegClassifier} id={id} key={id} resInfo={resInfo.name} />

        })
      }
    </>
  )
}

export default DetailedMenu