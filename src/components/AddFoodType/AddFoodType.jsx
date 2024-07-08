import { Link, useNavigate } from 'react-router-dom';
import './AddFoodType.scss';
import { createFoodType } from '../../services/server';
import { useState } from 'react';

function AddFoodType() {
  const navigate = useNavigate();
  const [imageUrl, setImageIUrl] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  function changeImageUrl(event) {
    setImageIUrl(`${import.meta.env.VITE_SERVER_URL}/foodtypes/${event.target.value}`);
  }

  function changeType() {
    setShowErrorMessage(false);
  }

  async function clickSubmitButton(event) {
    event.preventDefault();

    const type = event.target.type.value;
    const priority = event.target.priority.value;
    const image = event.target.image.value;

    try {
      await createFoodType(type, image, priority);
      navigate('/menu/foodtypes');
    } catch {
      setShowErrorMessage(true);
    }
  }

  return (
    <div className='add-food-type'>
      <div className='add-food-type-header'>
        <Link className='add-food-type-header__link' to="/menu/foodtypes"><i className="bi bi-arrow-left"></i></Link>
        <h2 className='add-food-type-header__title'>Add New Type</h2>
      </div>
      <form className='add-food-type-form' onSubmit={clickSubmitButton}>
        <div className='add-food-type-form__container'>
          <div className='add-food-type-form__left-container'>
            <div className='add-food-type-form__content-container'>
              <label className='add-food-type-form__label' htmlFor='type'>Type:</label>
              <input className='add-food-type-form__input' type="text" id='type' name='type' required onChange={changeType} />
              {showErrorMessage &&
                <p className='add-food-type-form__status'><i className="bi bi-exclamation-circle"></i> This type is already exist.</p>
              }
            </div>
            <div className='add-food-type-form__content-container'>
              <label className='add-food-type-form__label' htmlFor='priority'>Priority:</label>
              <input className='add-food-type-form__input' type="number" id='priority' name='priority' />
            </div>
          </div>
          <div className='add-food-type-form__right-container'>
            <div className='add-food-type-form__content-container'>
              <label className='add-food-type-form__label' htmlFor='image'>Image:</label>
              <input className='add-food-type-form__input' type="text" id='image' name='image' onChange={changeImageUrl} />
              {imageUrl ?
                <img className='add-food-type-form__image' src={imageUrl} alt='New type image' /> :
                <p className='add-food-type-form__description'>No image available</p>
              }
            </div>
          </div>
        </div>
        <div className='add-food-type-form__action-container'>
          <Link className='add-food-type-form__link' to='/menu/foodtypes'><button className='add-food-type-form__button'>Cancel</button></Link>
          <button className='add-food-type-form__button'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default AddFoodType
