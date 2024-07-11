import './Header.scss';
import Logo from '../../assets/logos/main-logo-white-transparent.svg';
import { NavLink, Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
      <div className='header-logo'>
        <Link className='header-logo__logo' to="/">
          <img className='header-logo__image' src={Logo} alt="logo" />
          <h1 className='header-logo__title'>DineSmart</h1>
        </Link>
      </div>
      <div className='header-nav'>
        <nav className='header-nav__nav'>
          <ul className='header-nav__list'>
            <li className='header-nav__item'><NavLink className={({ isActive }) => (isActive ? 'header-nav__link header-nav__link--active' : 'header-nav__link')} to="/orders">Orders</NavLink></li>
            <li className='header-nav__item'><NavLink className={({ isActive }) => (isActive ? 'header-nav__link header-nav__link--active' : 'header-nav__link')} to="/menu">Menu</NavLink></li>
            <li className='header-nav__item'><NavLink className={({ isActive }) => (isActive ? 'header-nav__link header-nav__link--active' : 'header-nav__link')} to="/tools">Tools</NavLink></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
