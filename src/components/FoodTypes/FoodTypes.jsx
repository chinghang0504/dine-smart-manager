import { useEffect, useState } from 'react';
import './FoodTypes.scss';
import { getAllFoodTypes } from '../../services/server';

function FoodTypes() {
  const [foodTypes, setFoodTypes] = useState([]);

  useEffect(() => {
    async function loadData() {
      const foodTypes = await getAllFoodTypes();
      setFoodTypes(foodTypes);
    }
    loadData();
  });

  return (
    <div className="food-types">
      <h1>Food Types</h1>

      {foodTypes.map((foodType, index) => {
        return (
          <div key={index}>
            <p>{foodType.id}</p>
            <p>{foodType.type}</p>
            <p>{foodType.image}</p>
            <p>{foodType.priority}</p>
          </div>
        );
      })}
    </div>
  );
}

export default FoodTypes
