import { UpdatePasswordForm } from '../../components/UpdatePasswordForm/UpdatePasswordForm';
import '../../components/Header/header.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const UpdatePassword = () => {
  const [menu, setMenu] = useState(false);

  const openMenu = () => {
    setMenu(true);
  };

  const closeMenu = (evt) => {
    if (evt.target.matches('.menu')) {
      setMenu(false);
    }
  };

  return (
    <>
      <div className="site-header__bottom">
        <nav
          className="nav justify-content-center shadow-none"
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: '5',
            maxWidth: '100%',
            height: '54px',
            borderRadius: '0',
            transition: 'all .5s ease',
            boxShadow: '10px 5px 20px #333, -10px 10px 10px #3333335e',
          }}
        >
          <ul className="nav__list d-flex align-items-center">
            <li>
              <Link to="/">Bosh sahifa</Link>
            </li>
            <li>
              <Link to="/buy-vacancy">Olish uchun vakansiya</Link>
            </li>
            <li>
              <Link to="/sell-vacancies">Sotish uchun vakansiya</Link>
            </li>
            <li>
              <Link to="/about">Biz Haqimizda</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="signup-menu update-password-menu">
        <button className="menu-btn" onClick={() => openMenu()}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <UpdatePasswordForm />

      <div
        className={`menu ${menu ? 'open' : ''}`}
        onClick={(evt) => closeMenu(evt)}
      >
        <div className={`menu__inner ${menu ? 'open' : ''}`}>
          <label className="px-3 w-100 input-group">
            <input
              type="text"
              placeholder="Search for product"
              className="form-control"
            />
            <button className="search-btn btn">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </label>
          <ul className="d-flex flex-column">
            <li>
              <Link to="/">Bosh sahifa</Link>
            </li>
            <li>
              <Link to="/buy-vacancy">Olish uchun vakansiya</Link>
            </li>
            <li>
              <Link to="/sell-vacancy">Sotish uchun vakansiya</Link>
            </li>
            <li>
              <Link to="/about">Biz Haqimizda</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
