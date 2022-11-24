import Card from '../components/Card'
import React from 'react'
import '../App.css';
import AppContext from '../context';

export default function Favorites({onAddToCart,onAddToFavorite, onUnFavorite}){
  const {favorites} = React.useContext(AppContext)
  const {t, isLanguage} = React.useContext(AppContext)

  return(
  <div className="content">
    <div className="content-header">
      <h1>{t('favorites')}</h1>
    </div>

    <div className="card-container">
      <div className="card-block">
            
      { favorites.map((item, index) => (
          <Card 
          key={index}
          onUnFavorite ={(item) => onUnFavorite(item)}
          addToCart={(item) => onAddToCart(item)}
          isFav
          {...item}
          />
        ))
      }
          
      </div>
    </div>   
  </div>

    )
}
