import { useState } from "react";
import "./Menu.scss";
import { useEffect } from "react";
import { getAllFoodTypes } from '../../services/server';

function Menu() {
  const [foodTypes, setFoodTypes] = useState([]);

  useEffect(() => {
    async function loadData() {
      const foodTypes = await getAllFoodTypes();
      setFoodTypes(foodTypes);
    }
    loadData();
  });

  return (
    <>
      <div>Menu</div>
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
    </>

  )
}

export default Menu
