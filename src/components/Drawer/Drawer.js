import React from 'react'
import axios from 'axios';

import AppContext from '../../context';
import { Info } from '../Info';

import '../../App.css'
// import styles from './Drawer.module.scss'


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Drawer({onClose, onRemove, items = [], opened}) {
  const {cartItems, setCartItems} = React.useContext(AppContext)
  const [orderId, setOrderId] = React.useState(null)
  const [isOrderComplete, setisOrderComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const {isLanguage} = React.useContext(AppContext)
  
  let cartTitle, cartTotal, cartButton,
  orderSend, orderEmpty, orderComplete_1, orderComplete_2, orderNone,
  totalPrice, priceFigure
  if(isLanguage){
    cartTitle = "Cart"
    cartTotal = "Total:"
    cartButton = "Place an Order"
    orderSend = "Order completed"
    orderEmpty = "Cart is empty"
    orderComplete_1 = "Your order #"
    orderComplete_2 = " will soon be handed over to courier delivery"
    orderNone = "Please add at least one item"
    priceFigure = "$"
    totalPrice = cartItems.reduce((sum, obj) => Number(Math.round(obj.price/38)) + sum, 0)
  }
  else{
    cartTitle = "Корзина"
    cartTotal = "Итого:"
    cartButton = "Оформить заказ"
    orderSend = "Заказ оформлен"
    orderEmpty = "Корзина пустая"
    orderComplete_1 = "Ваш заказ #"
    orderComplete_2 = " скоро будет передан курьерской доставке"
    orderNone = "Добавьте хотя бы товар"
    priceFigure = "грн"
    totalPrice = cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0)
  }

  const onClickOrder = async () => {
    try{
      setIsLoading(true)
      const {data} = await axios.post('https://635ba19f8aa87edd914cefe5.mockapi.io/api/sneakers/orders', {
        items: cartItems
      })
      setOrderId(data.id)
      setisOrderComplete(true)
      setCartItems([])
      
      for (let i=1; i <= cartItems.length; i=i+1) {
        await axios.delete(`https://635ba19f8aa87edd914cefe5.mockapi.io/api/sneakers/cart/${Number(i)}`)
        await delay(800)
      }
    }
    catch(error){
      alert('Не удалось создать заказ')
    }
    setIsLoading(false)
  }
  return(
    <div className={'drawer'} style={{visibility: opened ? "visible" : "hidden", opacity: opened ? "1" : "0", overflow: 'hidden'}}>
      {/* <div className='drawer'> */}
      <div onClick={onClose} className='drawer-left'></div>
        <div className="drawer-right" style={{transform: opened ? 'translateX(0)' : 'translateX(50%)' }}>
        <div className="drawer-header">
            <h2>{cartTitle}</h2>
            <img onClick={onClose} className="btn-remove" width={24} height={24} src="img/btn-remove.svg" alt="Close" />
        </div>
        {items.length > 0 ? (
            <div className='cart-panel'>
          <div className="cart-panel-item">
            {items.map((obj) => (
              <div key={obj.id} className="cart-item">
                <div style={{ backgroundImage: `url(${obj.src})` }} className="cart-item-img"></div>
                <div style={{padding: '0 15px'  }}>
                  <p>{ isLanguage ? (obj.name.replace('Мужские кроссовки', "Men's sneakers")):(obj.name)}</p>
                  <b>{isLanguage ? (Math.round(obj.price/38)) : (obj.price)} {priceFigure}</b>
                </div>
                <img onClick={() => onRemove(obj.id)} className="btn-remove" width={36} height={36} src="img/btn-remove.svg" alt="Remove" />
              </div>
            ))}
            </div>
            <div className="cart-total-block">
            <ul className="total-coast">
              <li>
                <span>{cartTotal}</span>
                <div></div>
                <b>
                  {isLanguage ? (Math.round(totalPrice/38)) : (totalPrice)} {priceFigure}
                </b>
              </li>
            </ul>
              <button disabled={isLoading} onClick={onClickOrder}>{cartButton}</button>
          </div>
            </div>
          
          ):(
            <Info title={isOrderComplete ? `${orderSend}` : `${orderEmpty}`} 
            description=
            { 
              (isOrderComplete ? `${orderComplete_1}${orderId}${orderComplete_2}` : (orderNone))
            } 
              img={isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"}/>
          )}
          
          
        </div>
      </div>
    )
}