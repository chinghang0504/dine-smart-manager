import { useEffect, useState } from 'react';
import './FoodTypes.scss';
import { getAllFoodTypes, deleteFoodType } from '../../services/server';
import { useNavigate } from 'react-router-dom';

function FoodTypes() {
  const [foodTypes, setFoodTypes] = useState([]);
  const navigate = useNavigate();

  // Load the data
  async function loadData() {
    const foodTypes = await getAllFoodTypes();
    setFoodTypes(foodTypes);
  }

  // Click the delete button
  async function clickDeleteButton(id) {
    try {
      await deleteFoodType(id);
      loadData();
    } catch {
      // No action
    }
  }

  // Click the edit button
  function clickEditButton(id) {
    navigate(`/menu/foodtypes/edit?id=${id}`);
  }

  // Execute once
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="food-types">
      <div className='food-types-header'>
        <ul className='food-types-header__list'>
          <li className='food-types-header__item'>ID</li>
          <li className='food-types-header__item'>Type</li>
          <li className='food-types-header__item food-types-header__item--image'>Image</li>
          <li className='food-types-header__item'>Priority</li>
          <li className='food-types-header__item'>Actions</li>
        </ul>
      </div>
      {foodTypes.map((foodType, index) => {
        return (
          <div className='food-types-type' key={index}>
            <div className='food-types-type__content-container'>
              <p className='food-types-type__title'>ID:</p>
              <p className='food-types-type__description'>{foodType.id}</p>
            </div>
            <div className=' food-types-type__content-container'>
              <p className='food-types-type__title'>Type:</p>
              <p className='food-types-type__description'>{foodType.type}</p>
            </div>
            <div className='food-types-type__content-container food-types-type__content-container--image'>
              <p className='food-types-type__title'>Image:</p>
              {foodType.image ?
                <div>
                  <img className='food-types-type__image' src={`${import.meta.env.VITE_SERVER_URL}/foodtypes/${foodType.image}`} alt={foodType.type} />
                  <p className='food-types-type__description'>{foodType.image}</p>
                </div>
                :
                <div>
                  <img className='food-items-item__image' src={`${import.meta.env.VITE_SERVER_URL}/placeholder.png`} alt="No image available" />
                  <p className='food-types-type__description'>No image available</p>
                </div>
              }
            </div>
            <div className='food-types-type__content-container'>
              <p className='food-types-type__title'>Priority:</p>
              <p className='food-types-type__description'>{foodType.priority}</p>
            </div>
            <div className='food-types-type__content-container'>
              <p className='food-types-type__title'>Actions:</p>
              <div className='food-types-type__action-container'>
                <button className="food-types-type__button food-types-type__button--edit" onClick={() => clickEditButton(foodType.id)}><i className="bi bi-pencil"></i> Edit</button>
                <button className="food-types-type__button food-types-type__button--delete" onClick={() => clickDeleteButton(foodType.id)}><i className="bi bi-pencil"></i> Delete</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FoodTypes
