import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../components/Card';
import AppContext from '../context';


const Orders = () => {
  const { onAddToFavorite, onAddToCart } = useContext(AppContext)
   const [orders, setOrders] = useState([])
   const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      (async () => {
        const {data} = await axios.get(
          "https://6218b2941a1ba20cbaa883a4.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false)
      })()
    } catch (error) {
      alert('Ошибка при запросе заказа!')
      console.log(error)
    }
  }, [])
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            Мои заказы
          </h1>
        </div>
        <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(10)] : orders)
            .map((item, index) => (
              <Card
              key={index}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              loading={isLoading}
              {...item}
              />
            ))}
        </div>
      </div>
    );
}

export default Orders;
