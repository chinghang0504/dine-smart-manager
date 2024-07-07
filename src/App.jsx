import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Menu from './pages/Menu/Menu';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/menu" />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
