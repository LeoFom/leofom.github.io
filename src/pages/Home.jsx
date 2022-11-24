import Card from '../components/Card'
import React from 'react'
import '../App.css';
import AppContext from '../context';


export default function Home({items, searchValue, setSearchValue, onChangeSearchInput, onAddToCart, onAddToFavorite, isLoading}){
  const {t, isLanguage} = React.useContext(AppContext)


  function renderCards() {
    return (items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) =>(

      <Card       
        key={index}
        onFavorite={(item) => onAddToFavorite(item)}
        addToCart={(item) => onAddToCart(item)}
        // itemIsFavorite={isItemFavorite(item.id)}
        // added={isItemAdded(item)}
        pageLoading={isLoading}
        {...item}
      />)))
  }
  function renderGrey(){
    return ([...Array(8)]).map((item, index) =>(
      <Card 
        key={index}
        pageLoading={isLoading}
        {...item}
      />))
  }
  
  return(
    <div className="content">
      <div className="content-header">
        <h1>{searchValue ? `${t('search')} - "${searchValue}"` : t('homeTitle')}</h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="Search" />
            {searchValue && <img onClick={() => setSearchValue('')  } className='search-clear' src='/img/btn-remove.svg' alt='Clear'/>}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>

        <div className="card-container">
          <div className="card-block">
             {isLoading ? renderGrey() : renderCards()}
          </div>
        </div>   
      </div>
    )
}
