import { Link, useNavigate } from 'react-router-dom';
import './AddFoodType.scss';
import { createFoodType } from '../../services/server';

function AddFoodType() {
  const navigate = useNavigate();

  async function clickSubmitButton(event) {
    event.preventDefault();

    const type = event.target.type.value;
    const priority = event.target.priority.value;
    const image = event.target.image.value;

    try {
      await createFoodType(type, image, priority);
      navigate('/menu/foodtypes');
    } catch {
      console.log('Error');
    }
  }

  return (
    <div className='add-food-type'>
      <div className='add-food-type-header'>
        <Link to="/menu/foodtypes"><i className="bi bi-arrow-left"></i></Link>
        <h2>Add New Type</h2>
      </div>
      <form className='add-foot-type-form' onSubmit={(event) => clickSubmitButton(event)}>
        <div>
          <p>Type</p>
          <input type="text" id='type' />
          <p>Priority</p>
          <input type="number" id='priority' />
          <p>Image</p>
          <input type="text" id='image' />
        </div>
        <div className='add-foot-type-action-container'>
          <Link to='/menu/foodtypes'><button>Cancel</button></Link>
          <button>Save</button>
        </div>
      </form>
    </div>
  )
}

export default AddFoodType
