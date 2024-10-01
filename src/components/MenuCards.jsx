import React, { useState } from 'react'
import DetailedMenu from './DetailedMenu';

const MenuCards = ({ card ,resInfo }) => {  
  let show = false;

  if (card["@type"]) {
    show = true;
  }
  const [showIndex, setshowIndex] = useState(show);

  const handleClick = () => {

    setshowIndex(!showIndex)
  }

  if (card.itemCards) {
    const { title, itemCards } = card;
    return (
      <>
        <div className='mt-7'>
          <div className='flex justify-between'>
            <h1 className={'font-bold text-' + (card["@type"]?"xl":"base")}>{title} ({itemCards.length})</h1>

            <i className={"fi text-xl cursor-pointer fi-rr-angle-small-" + (showIndex ? "up" : "down")} onClick={handleClick}></i>

          </div>

          {
            showIndex && <DetailedMenu itemCards={itemCards} showIndex={showIndex} resInfo ={resInfo} />
          }
        </div>

        <hr  className={'my-5 border-' + (card["@type"]?"[7px]":"[4px]")}/>
      </>
    )
  } else {
    const { title, categories } = card;
    return (
      <div>
        <h1 className='font-bold text-xl'>{title}</h1>
        {
          categories.map((data , indx) => (
            <MenuCards card={data} key={indx} resInfo={resInfo} />
          ))
        }
      </div>
    )
  }

}

export default MenuCards