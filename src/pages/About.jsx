import '../App.css';
import React from 'react'
import ContentLoader from 'react-content-loader'
import AppContext from '../context';


export default function About() {
  const {isItemAdded} = React.useContext(AppContext)
  // const {cartItems} = React.useContext(AppContext)
  
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
        {}
        )
}      
    