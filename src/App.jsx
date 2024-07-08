import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './components/Header/Header';
// import Orders from './pages/Orders/Orders';
import Menu from './pages/Menu/Menu';
// import Tools from './pages/Tools/Tools';
import FoodTypes from './components/FoodTypes/FoodTypes';
import AddFoodType from './components/AddFoodType/AddFoodType';
// import EditFoodType from './components/EditFoodType/EditFoodType';
import FoodItems from './components/FoodItems/FoodItems';
import AddFoodItem from './components/AddFoodItem/AddFoodItem';
// import EditFoodItem from './components/EditFoodItem/EditFoodItem';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/menu" />} />
          {/* <Route path="/orders" element={<Orders />} /> */}
          <Route path="/menu" element={<Menu />}>
            <Route path="" element={<Navigate to="/menu/foodtypes" />} />
            <Route path='foodtypes' element={<FoodTypes />} />
            <Route path='foodtypes/add' element={<AddFoodType />} />
            {/* <Route path='foodtypes/edit' element={<EditFoodType />} /> */}
            <Route path='fooditems' element={<FoodItems />} />
            <Route path='fooditems/add' element={<AddFoodItem />} />
            {/* <Route path='fooditems/edit' element={<EditFoodItem />} /> */}
            <Route path='*' element={<Navigate to="/menu/foodtypes" />} />
          </Route>
          {/* <Route path="/tools" element={<Tools />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
