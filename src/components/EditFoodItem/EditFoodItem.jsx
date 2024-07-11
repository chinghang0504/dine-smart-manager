import './EditFoodItem.scss';
import useQuery from '../../hooks/useQuery';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFoodItem, modifyFoodItem, getAllFoodTypes } from '../../services/server';

function EditFoodItem() {
  const query = useQuery();
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState({});
  const [imageUrl, setImageIUrl] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [foodTypes, setFoodTypes] = useState([]);

  // Load the data
  async function loadData(id) {
    try {
      const foodItem = await getFoodItem(id);
      setFoodItem(foodItem);
      const foodTypes = await getAllFoodTypes();
      setFoodTypes(foodTypes);
    } catch {
      navigate('/menu/fooditems');
    }
  }

  function changeImageUrl(event) {
    setImageIUrl(`${import.meta.env.VITE_SERVER_URL}/fooditems/${event.target.value}`);
  }

  function changeName() {
    setShowErrorMessage(false);
  }

  async function clickSubmitButton(event) {
    event.preventDefault();

    const id = foodItem.id;
    const name = event.target.name.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const image = event.target.image.value;
    const priority = event.target.priority.value;
    const type = event.target.type.value;

    try {
      await modifyFoodItem(id, name, description, price, image, priority, type);
      navigate('/menu/fooditems');
    } catch {
      setShowErrorMessage(true);
    }
  }

  // Execute once
  useEffect(() => {
    const id = query.get('id');
    if (!id) {
      navigate('/menu/fooditems');
    }

    loadData(id);
    setImageIUrl(`${import.meta.env.VITE_SERVER_URL}/fooditems/${foodItem.image}`);
  });

  return (
    <div className='edit-food-item'>
      <div className='edit-food-item-header'>
        <Link className='edit-food-item-header__link' to="/menu/fooditems"><i className="bi bi-arrow-left"></i></Link>
        <h2 className='edit-food-item-header__title'>Edit Food Item</h2>
      </div>
      <form className='edit-food-item-form' onSubmit={clickSubmitButton}>
        <div className='edit-food-item-form__container'>
          <div className='edit-food-item-form__left-container'>
            <div className='edit-food-item-form__content-container'>
              <label className='edit-food-item-form__label'>ID:</label>
              <p className='edit-food-item-form__description'>{foodItem.id}</p>
            </div>
            <div className='edit-food-item-form__content-container'>
              <label className='edit-food-item-form__label' htmlFor='name'>Name:</label>
              <input className='edit-food-item-form__input' type="text" id='name' name='name' required onChange={changeName} defaultValue={foodItem.name} />
              {showErrorMessage &&
                <p className='edit-food-item-form__status'><i className="bi bi-exclamation-circle"></i> This name is already exist.</p>
              }
            </div>
            <div className='edit-food-item-form__content-container'>
              <label className='edit-food-item-form__label' htmlFor='description'>Description:</label>
              <input className='edit-food-item-form__input' type="text" id='description' name='description' defaultValue={foodItem.description} />
            </div>
            <div className='edit-food-item-form__content-container'>
              <label className='edit-food-item-form__label' htmlFor='price'>Price:</label>
              <input className='edit-food-item-form__input' type="number" step='0.01' id='price' name='price' defaultValue={foodItem.price} />
            </div>
            <div className='edit-food-item-form__content-container'>
              <label className='edit-food-item-form__label' htmlFor='priority'>Priority:</label>
              <input className='edit-food-item-form__input' type="number" id='priority' name='priority' defaultValue={foodItem.priority} />
            </div>
            <div className='edit-food-item-form__content-container'>
              <label className='edit-food-item-form__label' htmlFor='type'>Type:</label>
              <select className='edit-food-item-form__select' name="type" id="type">
                {foodTypes.map((foodType, index) => {
                  return (
                    <option key={index} value={foodType.type} selected={ foodItem.type === foodType.type }>{foodType.type}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className='edit-food-item-form__right-container'>
            <div className='edit-food-item-form__content-container'>
              <label className='edit-food-item-form__label' htmlFor='image'>Image:</label>
              <input className='edit-food-item-form__input' type="text" id='image' name='image' onChange={changeImageUrl} defaultValue={foodItem.image} />
              {imageUrl ?
                <img className='edit-food-item-form__image' src={imageUrl} alt='New Item image' /> :
                <p className='edit-food-item-form__description'>No image available</p>
              }
            </div>
          </div>
        </div>
        <div className='edit-food-item-form__action-container'>
          <Link className='edit-food-item-form__link' to='/menu/fooditems'><button className='add-food-item-form__button'>Cancel</button></Link>
          <button className='edit-food-item-form__button'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default EditFoodItem
