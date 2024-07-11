import './Orders.scss';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import EmptyOrderImage from '../../assets/images/empty-order.png';

const ENDPOINT = import.meta.env.VITE_SOCKET_URL; //endpoint port 5000

function Orders() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data) => {
      response.unshift(data);
      setResponse([...response]);
      console.log(response);
    });
  }, []);

  return (
    <div className='orders'>
      <div className='orders-header'>
        <h1 className='orders-header__title'>Order Status</h1>
      </div>
      <div className='orders-content'>
        {
          response.length === 0 ?
            <div className='orders-content__container' >
              <img className='orders-content__image' src={EmptyOrderImage} alt="Empty order" />
              <p className='orders-content__description'>There is no any order.</p>
            </div> :
            <div className='orders-content__container2'>
              <ul className='orders-content__list'>
                {
                  response.map((item, index) => (
                    <li className='orders-content__item' key={index}>
                      <p className='orders-content__description'>Table: {item.tableId}</p>
                      {
                        item.cart.map((food, index) => (
                          <div className='orders-content__food-container' key={index + 100000}>
                            <p>Item: {food.name}, Quantity: {food.quantity}</p>
                          </div>
                        ))
                      }
                    </li>
                  ))}
              </ul>
            </div>
        }
      </div>
    </div>
  )
}

export default Orders
