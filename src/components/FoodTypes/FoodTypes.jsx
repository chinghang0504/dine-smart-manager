import { useEffect, useState } from 'react';
import './FoodTypes.scss';
import { getAllFoodTypes, deleteFoodType } from '../../services/server';
import { Link, useNavigate } from 'react-router-dom';

function FoodTypes() {
  const [foodTypes, setFoodTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const foodTypes = await getAllFoodTypes();
      setFoodTypes(foodTypes);
    }
    loadData();
  }, []);

  async function clickDeleteButton(id) {
    try {
      await deleteFoodType(id);
      const foodTypes = await getAllFoodTypes();
      setFoodTypes(foodTypes);
    } catch {
      console.log('Error');
    }
  }

  function clickEditButton(id) {
    navigate(`/menu/editfoodtype?id=${id}`);
  }

  return (
    <div className="food-types">
      <div className='food-types-header'>
        <ul className='food-types-header__list'>
          <li className='food-types-header__item'>ID</li>
          <li className='food-types-header__item'>Type</li>
          <li className='food-types-header__item'>Image</li>
          <li className='food-types-header__item'>Priority</li>
          <li className='food-types-header__item'>Actions</li>
        </ul>
      </div>
      {foodTypes.map((foodType, index) => {
        return (
          <div className='food-types-type' key={index}>
            <div className='food-types-type__content-container'>
              <h3>ID</h3>
              <p>{foodType.id}</p>
            </div>
            <div>
              <div className='food-types-type__content-container'>
                <h3>Type</h3>
                <p>{foodType.type}</p>
              </div>
              <div className='food-types-type__content-container'>
                <h3>Priority</h3>
                <p>{foodType.priority}</p>
              </div>
            </div>
            <div className='food-types-type__content-container'>
              <h3>Image</h3>
              <img className='food-types-type__image' src={`${import.meta.env.VITE_SERVER_URL}/foodtypes/${foodType.image}`} alt={foodType.type} />
              <p>{foodType.image}</p>
            </div>
            <div className='food-types-type__content-container'>
              <h3>Actions</h3>
              <div>
                <button onClick={() => clickEditButton(foodType.id)}><i className="bi bi-pencil"></i></button>
                <button onClick={() => clickDeleteButton(foodType.id)}><i className="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FoodTypes
