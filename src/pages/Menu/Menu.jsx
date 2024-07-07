import "./Menu.scss";
import { Link, NavLink, Outlet } from "react-router-dom";

function Menu() {
  return (
    <div className="menu">
      <div className="menu-header">
        <h1 className="menu-header__title">Menu Data</h1>
        <nav className="menu-nav">
          <ul className="menu-nav__list">
            <li className="menu-nav__item"><NavLink className={({ isActive }) => (isActive ? 'menu-nav__link menu-nav__link--active' : 'menu-nav__link')} to="/menu/foodtypes">Food Types</NavLink></li>
            <li className="menu-nav__item"><NavLink className={({ isActive }) => (isActive ? 'menu-nav__link menu-nav__link--active' : 'menu-nav__link')} to="/menu/fooditems">Food Items</NavLink></li>
          </ul>
        </nav>
        <Link className="menu-header__link" to="/menu/addfoodtype">+ Add New Food Type</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Menu
