import React from 'react'
import '../App.css';
import {Link} from 'react-router-dom'
import AppContext from '../context';

export default function Header(props) {
  const {cartItems} = React.useContext(AppContext)
  const {isLanguage, setIsLanguage} = React.useContext(AppContext)
 
  let totalPrice, reactTitle, priceFigure
  if(isLanguage){
    priceFigure = "$"
    reactTitle = "Best sneaker store"
    totalPrice = cartItems.reduce((sum, obj) => Number(Math.round(obj.price/38)) + sum, 0)
  }
  else{
    priceFigure = "грн"
    reactTitle = "Магазин лучших кроссовок"
    totalPrice = cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0)
  }

  return(
        <header>
        <Link to="/" >
        <div className="header-left">
          <img width={40} height={40} src="img/sneaker-svgrepo-com.svg" alt="Sneakkers Shop"/>
          <div  className="headerInfo">
            <h3>React Sneakers</h3>
            <p>{reactTitle}</p>
          </div>
        </div>
        </Link>

        <label className="switch" >
          <input type="checkbox" onChange={() => setIsLanguage(!isLanguage)}/>
          <span className="slider round"></span>
        </label>
        <ul className='header-right'>
          <li onClick={props.onClickCart}>
            <img width={20} height={20} src="img/cart.svg" alt="Корзина"/>
            <span>{totalPrice} {priceFigure}</span>
          </li>
          <li>
            <Link to="/favorites">
              <img width={20} height={20} src="img/heart.svg" alt="Улюбленні"/>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <img width={20} height={20} src="img/user.svg" alt="Аккаунт"/>
            </Link>
          </li>
        </ul>
      </header>
    )
}