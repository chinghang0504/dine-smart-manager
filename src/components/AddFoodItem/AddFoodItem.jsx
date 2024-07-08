import { Link, useNavigate } from 'react-router-dom';
import './AddFoodItem.scss';
import { useEffect, useState } from 'react';
import { createFoodItem, getAllFoodTypes } from '../../services/server';

function AddFoodItem() {
  const navigate = useNavigate();
  const [imageUrl, setImageIUrl] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [foodTypes, setFoodTypes] = useState([]);

  function changeImageUrl(event) {
    setImageIUrl(`${import.meta.env.VITE_SERVER_URL}/fooditems/${event.target.value}`);
  }

  function changeName() {
    setShowErrorMessage(false);
  }

  async function clickSubmitButton(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const image = event.target.image.value;
    const priority = event.target.priority.value;
    const type = event.target.type.value;

    try {
      await createFoodItem(name, description, price, image, priority, type);
      navigate('/menu/fooditems');
    } catch {
      setShowErrorMessage(true);
    }
  }

  async function loadData() {
    const foodTypes = await getAllFoodTypes();
    setFoodTypes(foodTypes);
  }

  useEffect(() => {
    loadData();
  })

  return (
    <div className='add-food-item'>
      <div className='add-food-item-header'>
        <Link className='add-food-item-header__link' to="/menu/fooditems"><i className="bi bi-arrow-left"></i></Link>
        <h2 className='add-food-item-header__title'>Add New Item</h2>
      </div>
      <form className='add-food-item-form' onSubmit={clickSubmitButton}>
        <div className='add-food-item-form__container'>
          <div className='add-food-item-form__left-container'>
            <div className='add-food-item-form__content-container'>
              <label className='add-food-item-form__label' htmlFor='name'>Name:</label>
              <input className='add-food-item-form__input' type="text" id='name' name='name' required onChange={changeName} />
              {showErrorMessage &&
                <p className='add-food-item-form__status'><i className="bi bi-exclamation-circle"></i> This name is already exist.</p>
              }
            </div>
            <div className='add-food-item-form__content-container'>
              <label className='add-food-item-form__label' htmlFor='description'>Description:</label>
              <input className='add-food-item-form__input' type="text" id='description' name='description' />
            </div>
            <div className='add-food-item-form__content-container'>
              <label className='add-food-item-form__label' htmlFor='price'>Price:</label>
              <input className='add-food-item-form__input' type="number" step='0.01' id='price' name='price' defaultValue={'0.00'} />
            </div>
            <div className='add-food-item-form__content-container'>
              <label className='add-food-item-form__label' htmlFor='priority'>Priority:</label>
              <input className='add-food-item-form__input' type="number" id='priority' name='priority' />
            </div>
            <div className='add-food-item-form__content-container'>
              <label className='add-food-item-form__label' htmlFor='type'>Type:</label>
              <select className='add-food-item-form__select' name="type" id="type">
                { foodTypes.map((foodType, index) => {
                  return (
                    <option key={index} value={foodType.type}>{foodType.type}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className='add-food-item-form__right-container'>
            <div className='add-food-item-form__content-container'>
              <label className='add-food-item-form__label' htmlFor='image'>Image:</label>
              <input className='add-food-item-form__input' type="text" id='image' name='image' onChange={changeImageUrl} />
              {imageUrl ?
                <img className='add-food-item-form__image' src={imageUrl} alt='New Item image' /> :
                <p className='add-food-item-form__description'>No image available</p>
              }
            </div>
          </div>
        </div>
        <div className='add-food-item-form__action-container'>
          <Link className='add-food-item-form__link' to='/menu/fooditems'><button className='add-food-item-form__button'>Cancel</button></Link>
          <button className='add-food-item-form__button'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default AddFoodItem
