import { UpdatePasswordForm } from '../../components/UpdatePasswordForm/UpdatePasswordForm';
import '../../components/Header/header.scss';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import { useContext, useState } from 'react';
import { VerifyTokenContext } from '../../context/VerifyToken';
import { useQuery } from 'react-query';
import { API } from '../../API/api';

export const UpdatePassword = () => {
  const [menu, setMenu] = useState(false);
  const { verifyToken, setVerifyToken } = useContext(VerifyTokenContext);
  const [setIsLoading] = useState(false);

  const query = useQuery('verify-token', API.verifyToken, {
    onSuccess: (data) => {
      setIsLoading(false);
      if (data.data.data) {
        setIsLoading(false);
        setVerifyToken(true);
      } else {
        setVerifyToken(false);
      }
    },
    onError: (err) => {
      setIsLoading(false);
      setVerifyToken(false);
      toast.error('Qandaydur xatolik saytni yangilang!');
    },
  });

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
              <Link to="/buy-vacancies">Olish uchun vakansiya</Link>
            </li>
            <li>
              <Link to="/sell-vacancies">Sotish uchun vakansiya</Link>
            </li>
            <li>
              <Link to="/about">Biz Haqimizda</Link>
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
          <Link className="logo" to="/">
            <img src={Logo} alt="Green Sale" width="50px" />
            <p>GREEN SALE</p>
          </Link>
          <ul className="d-flex flex-column">
            <li>
              <Link to="/">Bosh sahifa</Link>
            </li>
            <li>
              <Link to="/buy-vacancies">Olish uchun vakansiya</Link>
            </li>
            <li>
              <Link to="/sell-vacancies">Sotish uchun vakansiya</Link>
            </li>
            <li>
              <Link to="/about">Biz Haqimizda</Link>
            </li>
            <li>
              <Link to="/compares">Taqqoslash</Link>
            </li>
            <li>
              <Link to="/buyer-vacancies">Oluvchi vakansiyalar</Link>
            </li>
            <li>
              <Link to="/seller-vacancies">Sotuvchi vakansiyalar</Link>
            </li>
            {verifyToken && admin_key != localStorage.getItem('admin') ? (
              <li>
                <Link className="like rounded-1" to="/my-vacancies">
                  Mening vakansiyalarim
                </Link>
              </li>
            ) : (
              ''
            )}
            {verifyToken && admin_key != localStorage.getItem('admin') ? (
              <li>
                <Link className="like rounded-1" to="/favorite-vacancies">
                  Sevimlilar
                </Link>
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
