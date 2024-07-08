import { useEffect, useState } from 'react';
import './FoodItems.scss';
import { getAllFoodItems } from '../../services/server';

function FoodItems() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    async function loadData() {
      const foodItems = await getAllFoodItems();
      setFoodItems(foodItems);
    }
    loadData();
  }, []);

  return (
    <div className="food-items">
      <h1>Food Items</h1>

      {foodItems.map((foodItem, index) => {
        return (
          <div key={index}>
            <p>{foodItem.id}</p>
            <p>{foodItem.name}</p>
            <p>{foodItem.description}</p>
            <p>{foodItem.price}</p>
            <p>{foodItem.image}</p>
            <p>{foodItem.priority}</p>
            <p>{foodItem.type}</p>
          </div>
        );
      })}
    </div>
  );
}

export default FoodItems
