import React from 'react'
import '../App.css';
import {Link} from 'react-router-dom'
import AppContext from '../context';

export default function Footer(props) {
//   const {cartItems} = React.useContext(AppContext)
    
  return(
    <footer>
         <Link to="/" >
            <div className='footer-box'>
                <div className='footer-box-body'>
                    <img style={{opacity: 0.4}} width={20} height={20} src="/img/home.png" alt="Улюбленні"/>
                </div>
            </div>
        </Link>
        <div onClick={props.onClickCart}>
            <div className='footer-box'>
                <div className='footer-box-body'>
                <img width={20} height={20} src="/img/cart.svg" alt="Корзина"/>
                </div>
            </div>
        </div>
        <Link to="/favorites" >
            <div className='footer-box'>
                <div className='footer-box-body'>
                    <img width={20} height={20} src="/img/heart.svg" alt="Улюбленні"/>
                </div>
            </div>
        </Link>
        <Link to="/orders" >
            <div className='footer-box'>
                <div className='footer-box-body'>
                    <img width={20} height={20} src="/img/user.svg" alt="Аккаунт"/>
                </div>
            </div>
        </Link>
    </footer>
    )
}