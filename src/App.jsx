import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './components/Header/Header';
import Orders from './pages/Orders/Orders';
import Menu from './pages/Menu/Menu';
import Tools from './pages/Tools/Tools';
import FoodTypes from './components/FoodTypes/FoodTypes';
import AddFoodType from './components/AddFoodType/AddFoodType';
import EditFoodType from './components/EditFoodType/EditFoodType';
import FoodItems from './components/FoodItems/FoodItems';
import AddFoodItem from './components/AddFoodItem/AddFoodItem';
import EditFoodItem from './components/EditFoodItem/EditFoodItem';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/orders" />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />}>
            <Route path="" element={<Navigate to="/menu/foodtypes" />} />
            <Route path='foodtypes' element={<FoodTypes />} />
            <Route path='addfoodtype' element={<AddFoodType />} />
            <Route path='editfoodtype' element={<EditFoodType />} />
            <Route path='fooditems' element={<FoodItems />} />
            <Route path='addfooditem' element={<AddFoodItem />} />
            <Route path='editfooditem' element={<EditFoodItem />} />
            <Route path='*' element={<Navigate to="/menu/foodtypes" />} />
          </Route>
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
