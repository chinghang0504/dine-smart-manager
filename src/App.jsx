import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './components/Header/Header';
import Orders from './pages/Orders/Orders';
import Menu from './pages/Menu/Menu';
import Tools from './pages/Tools/Tools';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/orders" />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
