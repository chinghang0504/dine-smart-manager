import { useEffect, useState } from 'react';
import './FoodItems.scss';
import { getAllFoodItems, deleteFoodItem } from '../../services/server';
import { useNavigate } from 'react-router-dom';

function FoodItems() {
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();

  // Load the data
  async function loadData() {
    const foodItems = await getAllFoodItems();
    setFoodItems(foodItems);
  }

  // Click the delete button
  async function clickDeleteButton(id) {
    try {
      await deleteFoodItem(id);
      loadData();
    } catch {
      // No action
    }
  }

  // Click the edit button
  function clickEditButton(id) {
    navigate(`/menu/fooditems/edit?id=${id}`);
  }

  // Execute once
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="food-items">
      <div className='food-items-header'>
        <ul className='food-items-header__list'>
          <li className='food-items-header__item'>ID</li>
          <li className='food-items-header__item'>Name</li>
          <li className='food-items-header__item'>Description</li>
          <li className='food-items-header__item'>Price</li>
          <li className='food-items-header__item food-items-header__item--image'>Image</li>
          <li className='food-items-header__item'>Priority</li>
          <li className='food-items-header__item'>Type</li>
          <li className='food-items-header__item'>Actions</li>
        </ul>
      </div>

      {foodItems.map((foodItem, index) => {
        return (
          <div className='food-items-item' key={index}>
            <div className='food-items-item__content-container'>
              <p className='food-items-item__title'>ID:</p>
              <p className='food-items-item__description'>{foodItem.id}</p>
            </div>
            <div className='food-items-item__content-container'>
              <p className='food-items-item__title'>Name:</p>
              <p className='food-items-item__description'>{foodItem.name}</p>
            </div>
            <div className='food-items-item__content-container'>
              <p className='food-items-item__title'>Description:</p>
              <p className='food-items-item__description'>{foodItem.description}</p>
            </div>
            <div className='food-items-item__content-container'>
              <p className='food-items-item__title'>Price:</p>
              <p className='food-items-item__description'>{foodItem.price}</p>
            </div>
            <div className='food-items-item__content-container food-items-item__content-container--image'>
              <p className='food-items-item__title'>Image:</p>
              { foodItem.image ? 
                <img className='food-items-item__image' src={`${import.meta.env.VITE_SERVER_URL}/fooditems/${foodItem.image}`} alt={foodItem.name} /> :
                <p className='food-items-item__description'>No image available</p>
              }
              <p className='food-items-item__description'>{foodItem.image}</p>
            </div>
            <div className='food-items-item__content-container'>
              <p className='food-items-item__title'>Priority:</p>
              <p className='food-items-item__description'>{foodItem.priority}</p>
            </div>
            <div className='food-items-item__content-container'>
              <p className='food-items-item__title'>Type:</p>
              <p className='food-items-item__description'>{foodItem.type}</p>
            </div>
            <div className='food-items-item__content-container'>
              <p className='food-items-item__title'>Actions:</p>
              <div className='food-items-item__action-container'>
                <button className="food-items-item__button food-items-item__button--edit" onClick={() => clickEditButton(foodItem.id)}><i className="bi bi-pencil"></i> Edit</button>
                <button className="food-items-item__button food-items-item__button--delete" onClick={() => clickDeleteButton(foodItem.id)}><i className="bi bi-pencil"></i> Delete</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FoodItems
