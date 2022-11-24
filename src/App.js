import React from 'react'
import axios from 'axios'
import './App.css';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header';
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import {Routes ,Route} from 'react-router-dom'

import AppContext from './context';
import Orders from './pages/Orders';
import Footer from './components/Footer';

import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const language = ['en', 'ua']

i18n
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next)
  .init({
  fallbackLng: "en",
  debug: false,
  whitelist: language,
  interpolation: {
    escapeValue: false
 }
});

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const [favorites, setFavorite] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  
  const [isLanguage, setIsLanguage] = React.useState(true)

  function clickLanguage(lang){
    i18n.changeLanguage(lang)
  }
  
  React.useEffect(() => {
    async function fetchData(){
      try{
        clickLanguage('en')
        setIsLoading(true)
        const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
          fetch('https://635ba19f8aa87edd914cefe5.mockapi.io/api/sneakers/items').then((res) => {
            return res.json()
        }).then((json) => {
          return(json)
        }),
          fetch('https://635ba19f8aa87edd914cefe5.mockapi.io/api/sneakers/cart').then((res) => {
          return res.json()
        }).then((json) => {
          return(json)
        }),
        fetch('https://635ba19f8aa87edd914cefe5.mockapi.io/api/sneakers/favorite').then((res) => {
          return res.json()
        }).then((json) => {
          return(json)
        })
        ])

  
        setIsLoading(false)

        setCartItems(cartResponse)
        setFavorite(favoritesResponse)
        setItems(itemsResponse)
        }
      catch(error){
        alert('Ошибка при запросе данных')
        console.error(error)
      }
    }    
    fetchData()
  }, [])
  
  const onAddToCart = async (obj) => { 
    try{
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.parentId))
      if (findItem){
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.parentId)))
        await axios.delete(`https://635ba19f8aa87edd914cefe5.mockapi.io/api/sneakers/cart/${findItem.id}`)
      }
      else {
        setCartItems((prev) => [...prev, obj])
        const {data} = await axios.post('https://635ba19f8aa87edd914cefe5.mockapi.io/api/sneakers/cart', obj)
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId){
            return{
              ...item,
              id: data.id
            }
          }
          return item
        }))
      }
  }
  catch(error){
    alert('Ошибка при добавлении в корзину')
    console.error(error)
  }
  }

  const onRemoveItems = (id) => {
    try{
      axios.delete(`https://635ba19f8aa87edd914cefe5.mockapi.io/api/sneakers/cart/${id}`)
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)) )
    }
    catch(error){
      alert('Не удалить товар из корзины') 
      console.error(error)

    }
  }

  const onAddToFavorite = async (obj) => {
    try {  
      const findItem = favorites.find((favObj) => Number(favObj.parentId) === Number(obj.id))
      if (findItem){
        setFavorite((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)) )
        axios.delete(`https://635ba19f8aa87edd914cefe5.mockapi.io/api/sneakers/favorite/${findItem.id}`)
      }
      else {
        setFavorite((prev) => [...prev, obj])
        const {data} = await axios.post('https://635ba19f8aa87edd914cefe5.mockapi.io/api/sneakers/favorite', obj)
        setFavorite((prev) => prev.map(item => {
          if (item.parentId === data.parentId){
            return{
              ...item,
              id: data.id
            }
          }
          return item
        }))
      }
    } catch (error) {
        alert('Не удалось добавить в фаворит')  
        console.error(error)
    }

  }

  const onUnFavorite = async (obj) => {
    try{
      axios.delete(`https://635ba19f8aa87edd914cefe5.mockapi.io/api/sneakers/favorite/${obj.id}`)
      setFavorite((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)) )
    }
    catch(error){
      alert('Не удалось удалить из фаворита')  
        console.error(error)
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  const isItemFavorite = (id) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(id))
  }

  const {t, i18n} = useTranslation()

  return (
    <AppContext.Provider value={{items, cartItems, setCartItems, favorites, isItemAdded, isItemFavorite, setCartOpened, isLanguage, t, clickLanguage, setIsLanguage}}>
      <div className="wrapper">
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItems} opened={cartOpened}/>
        <Header onClickCart={() => setCartOpened(true)} />
        
        <Routes>
          <Route path='/' exact element={<Home items={items} cartItems={cartItems} searchValue={searchValue} onChangeSearchInput={onChangeSearchInput} setSearchValue={setSearchValue} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} onUnFavorite={onUnFavorite} isLoading={isLoading}/>} />
          <Route path='/favorites' element={<Favorites onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} onUnFavorite={onUnFavorite}/>} />
          <Route path='/orders' element={<Orders onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite}/>} />
        </Routes>

        <Footer onClickCart={() => setCartOpened(true)}/>
      </div>
        <div className='main-footer'>
          <div className='main-footer-block'>
            <div className='main-footer-left'>
              <img width={40} height={40} src="/img/sneaker-svgrepo-com.svg" alt="Sneakers Shop"/>
              <div className='footer-left-title'>
                <h1>React</h1>
                <h2>Sneakers</h2>
              </div>
            </div>
            <div className='main-footer-right'>
              
              <a href='https://github.com/LeoFom'>
                <img width={30} height={30} src="/img/github.svg" alt="Sneakers Shop"/>
                <h2>GitHub</h2>
              </a>
            </div>
          </div>
        </div>
    </AppContext.Provider>
  );
}

export default App;
