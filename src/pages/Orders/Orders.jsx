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
      response.push(data);
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
            <div className='orders-content__container'>
              <ul className='orders-content__list'>
                {
                response.map((item, index) => (
                  <li className='orders-content__item' key={index}>
                    <p>Table: {item.tableId}</p>
                    {/* <img className='orders-content__image' src={item.image} alt="item.name" />
                    {item.name} - ${item.price}
                    <p className='cart-content__description'>Quantity: {item.quantity}</p> */}
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
