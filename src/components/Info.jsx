import React from 'react'
import AppContext from '../context'

export const Info = ({title, img, description}) => {
    const {setCartOpened} =React.useContext(AppContext)
    const {isLanguage} = React.useContext(AppContext)

    let infoButton
  if(isLanguage){
    infoButton = "Go back"
  }else{
    infoButton = "Вернуться назад"
  }

  return (
    <div className='cart-empty'>
            <div className='cart-empty-item'>
            <img className='cart-empty-img' width={124} src={img} alt="Карзина пустая"/>
            <h2>{title}</h2>
            <div className='empty-p'>
              <p style={{opacity: 0.6}}>{description}</p>
            </div>
            <button onClick={() => setCartOpened(false)} className='empty-green-button'>
              <h1>{infoButton}</h1>
            </button>
          </div>
          </div>
  )
}
