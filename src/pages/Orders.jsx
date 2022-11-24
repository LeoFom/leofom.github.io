import React from 'react'
import Card from '../components/Card'
import '../App.css';
import axios from 'axios';
import AppContext from '../context';


export default function Orders(){
  const [allOrders, setAllOrders] = React.useState([])
  const [orders, setOrders] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const {t, isLanguage} = React.useContext(AppContext)


  React.useEffect(() => {
    (async () => {
      try{
        const { data } = await axios.get('https://635ba19f8aa87edd914cefe5.mockapi.io/api/sneakers/orders')
        setAllOrders(data)
        setOrders(data.reduce((prev, obj) => [ ...prev , ...obj.items], []))
        setIsLoading(false)
      }
      catch(error){
        alert('Ошибка при запросе заказов')
        console.error(error)
      }
      
    })() 
  }, [])

  return(
  <div className="content">
    <div className="content-header">
      <h1>{t("orederTitle")}</h1>
    </div>
      
      { (isLoading ? [...Array(8)] : (Object.values(allOrders)).reverse()).map((item,index) => (
        
      item ?  (
        <div key={index} className='order'>
          <div className="order-container">
            <div className='order-header'>
              
              <h1>{`${t('order')} #${item.id}`}</h1>
            </div>
              <div className='order-card'> 
          
            { 
              item && (
                item.items.map((item, index) => (
                  <Card 
                    key={index}
                    pageLoading={isLoading}
                    {...item}
                  />    
                ))
              )
            } </div>
            </div>          
          </div>
          ) : 
          (
            <div key={index} className="card-container">
            <div className="card-block">
               { [...Array(8)].map((item, index) => (
                  <Card 
                    key={index}
                    pageLoading={isLoading}
                    {...item}
                  />    
                ))}
            </div>
            </div>
          )
          

          ))
        }
          
      </div>


    )
}
