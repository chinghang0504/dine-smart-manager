import './Orders.scss';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = import.meta.env.VITE_SOCKET_URL; //endpoint port 5000

function Orders() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data) => {
      console.log(data);
      // setResponse(data);
    });

  }, []);
  

  return (
    <p>{response}</p>
  )
}

export default Orders
