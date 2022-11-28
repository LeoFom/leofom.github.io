import '../App.css';
import React from 'react'
import ContentLoader from 'react-content-loader'
import AppContext from '../context';


export default function Card({id, parentId, name, price, src, onFavorite, onUnFavorite, isFav=false, addToCart, pageLoading = false}) {
  const {isItemAdded} = React.useContext(AppContext)
  const {isItemFavorite} = React.useContext(AppContext)
  const {isLanguage} = React.useContext(AppContext)

  let priceTitle, priceFigure
  if(isLanguage){
    priceFigure = "$"
    priceTitle = "Price:"
  }
  else{
    priceFigure = "грн"
    priceTitle = "Цена:"
  }

    const obj = {id, parentId, name, price, src}
  
    const clickPlus = () => {
        addToCart(obj)
    }

    const clickFavorite = () => {
      onFavorite(obj) 
    }

    const unClickFavorite = () => {
      onUnFavorite(obj)
    }
  
    
    return(
      
      <div>
      {pageLoading ? (
        <div className='card'>
        <ContentLoader
        speed={2}
        width={168}
        height={220}
        viewBox="0 0 200 265"
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        <rect x='1' y='0' rx='10' ry='10' width='165' height='140' />
        <rect x='0' y='166' rx='5' ry='5' width='165' height='11' />
        <rect x='0' y='186' rx='5' ry='5' width='120' height='11' />
        <rect x='1' y='223' rx='5' ry='5' width='52' height='38' />
        <rect x='147' y='223.5' rx='10' ry='10' width='39' height='39' />
        
        </ContentLoader>
      </div>
      ) : (
        <div className='card'>
          <div className='card-left'>
            <div className="favorite">
              
              { addToCart && (onFavorite ?
                <img onClick={clickFavorite} src={(isItemFavorite(id) ? "img/heart-red.svg" : "img/heart.svg")} alt="Подобається"/> 
                :
                <img onClick={unClickFavorite} src={"img/heart-red.svg"} alt="Подобається"/>)
              }
            </div>
            <img width={133} height={112} src={src} alt="Nike Blazer Mid Suede"/>
            <h5>{ isLanguage ? (name.replace('Мужские кроссовки', "Men's sneakers")):(name)}</h5>
            <div className="card-price">
              <div className="price-block">
                <span>{priceTitle}</span>
                <h3><b>{isLanguage ? (Math.round(price/38)) : (price)} {priceFigure}</b></h3>
              </div>
              <div onClick={clickPlus} className='card-button'>
                {addToCart && 
                <img width={32} height={32} src={isItemAdded(parentId) ? "img/btn-checked.svg" : "img/btn-plus.svg"} alt="Добавить"/>
                }
              </div>
            </div>
          </div>
        
        </div>

        )
      }
    </div>
        
        
    )
}