import './EditFoodType.scss';
import useQuery from '../../hooks/useQuery';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFoodType, modifyFoodType } from '../../services/server';

function EditFoodType() {
  const query = useQuery();
  const navigate = useNavigate();
  const [foodType, setFoodType] = useState({});
  const [imageUrl, setImageIUrl] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Load the data
  async function loadData(id) {
    try {
      const foodType = await getFoodType(id);
      setFoodType(foodType);
    } catch {
      navigate('/menu/foodtypes');
    }
  }

  function changeImageUrl(event) {
    setImageIUrl(`${import.meta.env.VITE_SERVER_URL}/foodtypes/${event.target.value}`);
  }

  function changeType() {
    setShowErrorMessage(false);
  }

  async function clickSubmitButton(event) {
    event.preventDefault();

    const id = foodType.id;
    const type = event.target.type.value;
    const priority = event.target.priority.value;
    const image = event.target.image.value;

    try {
      await modifyFoodType(id, type, image, priority);
      navigate('/menu/foodtypes');
    } catch {
      setShowErrorMessage(true);
    }
  }

  // Execute once
  useEffect(() => {
    const id = query.get('id');
    if (!id) {
      navigate('/menu/foodtypes');
    }

    loadData(id);
    setImageIUrl(`${import.meta.env.VITE_SERVER_URL}/foodtypes/${foodType.image}`);
  });

  return (
    <div className='edit-food-type'>
      <div className='edit-food-type-header'>
        <Link className='edit-food-type-header__link' to="/menu/foodtypes"><i className="bi bi-arrow-left"></i></Link>
        <h2 className='edit-food-type-header__title'>Edit Food Type</h2>
      </div>
      <form className='edit-food-type-form' onSubmit={clickSubmitButton}>
        <div className='edit-food-type-form__container'>
          <div className='edit-food-type-form__left-container'>
            <div className='edit-food-type-form__content-container'>
              <label className='edit-food-type-form__label'>ID:</label>
              <p className='edit-food-type-form__description'>{foodType.id}</p>
            </div>
            <div className='edit-food-type-form__content-container'>
              <label className='edit-food-type-form__label' htmlFor='type'>Type:</label>
              <input className='edit-food-type-form__input' type="text" id='type' name='type' required onChange={changeType} defaultValue={foodType.type} />
              {showErrorMessage &&
                <p className='edit-food-type-form__status'><i className="bi bi-exclamation-circle"></i> This type is already exist.</p>
              }
            </div>
            <div className='edit-food-type-form__content-container'>
              <label className='edit-food-type-form__label' htmlFor='priority'>Priority:</label>
              <input className='edit-food-type-form__input' type="number" id='priority' name='priority' defaultValue={foodType.priority} />
            </div>
          </div>
          <div className='edit-food-type-form__right-container'>
            <div className='edit-food-type-form__content-container'>
              <label className='edit-food-type-form__label' htmlFor='image'>Image:</label>
              <input className='edit-food-type-form__input' type="text" id='image' name='image' onChange={changeImageUrl} defaultValue={foodType.image} />
              {imageUrl ?
                <img className='edit-food-type-form__image' src={imageUrl} alt='Food type image' /> :
                <p className='edit-food-type-form__description'>No image available</p>
              }
            </div>
          </div>
        </div>
        <div className='edit-food-type-form__action-container'>
          <Link className='edit-food-type-form__link' to='/menu/foodtypes'><button className='edit-food-type-form__button'>Cancel</button></Link>
          <button className='edit-food-type-form__button'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default EditFoodType
