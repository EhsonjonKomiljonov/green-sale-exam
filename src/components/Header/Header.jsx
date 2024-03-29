import { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../API/api';
import Logo from '../../assets/images/logo.svg';
import { VerifyTokenContext } from '../../context/VerifyToken';
import { removeToken } from '../../redux/token/tokenAction';
import { Loading } from '../Loading/Loading';
import './header.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const [isLoading, setIsLoading] = useState(false);
  const { verifyToken, setVerifyToken } = useContext(VerifyTokenContext);
  const [scroll, setScroll] = useState(false);
  const [menu, setMenu] = useState(false);
  const headerCenterRef = useRef();
  const admin_key = import.meta.env.VITE_REACT_APP_ADMIN_SECRET_KEY;
  let lastScrollY = 0;

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;

      if (scrollY > lastScrollY && scrollY > 100) {
        setScroll(true);
      }

      if (scrollY < lastScrollY && scrollY < 100) {
        setScroll(false);
      }
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="site-header__inner">
            <div className="site-header__top d-flex align-items-center justify-content-end mb-4">
              <div className="d-flex align-items-center">
                {admin_key != localStorage.getItem('admin') && (
                  <Link
                    style={{
                      fontSize: '13px',
                    }}
                    to="/my-profile"
                    className={`text-white text-opacity-50 ${
                      verifyToken ? '' : 'd-none'
                    }`}
                  >
                    Mening profilim
                  </Link>
                )}
                {verifyToken && (
                  <a
                    style={{
                      fontSize: '13px',
                    }}
                    href="#log-out-modal"
                    className={`btn text-white text-opacity-50 ${
                      verifyToken ? '' : 'd-none'
                    }`}
                  >
                    Chiqish
                  </a>
                )}
              </div>
              <div
                className={`site-header__sign ${verifyToken ? 'd-none' : ''}`}
              >
                <Link className="me-3" to="/login">
                  Kirish
                </Link>
                <Link to="/register">Ro'yxatdan o'tish</Link>
              </div>
            </div>
            <div
              ref={headerCenterRef}
              className={`site-header__center d-flex align-items-center justify-content-between ${
                scroll ? 'fix' : ''
              }`}
            >
              <button className="menu-btn" onClick={() => openMenu()}>
                <i className="fa-solid fa-bars"></i>
              </button>
              <Link className="logo" to="/">
                <img src={Logo} alt="Green Sale" width="50px" />
                <p>GREEN SALE</p>
              </Link>
              <div className="site-header__center-links">
                {verifyToken && admin_key != localStorage.getItem('admin') ? (
                  <Link className="like rounded-1" to="/my-vacancies">
                    Mening vakansiyalarim
                  </Link>
                ) : (
                  ''
                )}
                <Link className="like rounded-1" to="/buyer-vacancies">
                  Oluvchi vakansiyalar
                </Link>
                <Link className="like rounded-1" to="/seller-vacancies">
                  Sotuvchi vakansiyalar
                </Link>
                {verifyToken && admin_key != localStorage.getItem('admin') ? (
                  <Link className="like rounded-1" to="/favorite-vacancies">
                    <svg width={23} viewBox="0 0 256 256">
                      <rect fill="none" height="256" width="256"></rect>
                      <path
                        d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                        strokeWidth="20px"
                        stroke="#ffffff"
                        fill="none"
                      ></path>
                    </svg>
                  </Link>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="site-header__bottom">
              <nav
                className="nav"
                style={{
                  position: scroll ? 'fixed' : '',
                  top: scroll ? '0' : '',
                  left: scroll ? '0' : '',
                  zIndex: scroll ? '9' : '',
                  maxWidth: scroll ? '1530px' : '',
                  height: scroll ? '54px' : '',
                  borderRadius: scroll ? '0' : '',
                  transition: scroll ? 'all .5s ease' : '',
                }}
              >
                <ul
                  className={`nav__list d-flex align-items-center ${
                    scroll
                      ? 'w-100 justify-content-center'
                      : 'justify-content-between'
                  }`}
                >
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
                </ul>
              </nav>
            </div>
          </div>
        </div>
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
        <div id="log-out-modal">
          <a className="close-modal-bg" href="#"></a>
          <div>
            <a href="#">&times;</a>
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('admin');
                  location.replace('/');
                  dispatch(removeToken());
                  setIsLoading(false);
                }, 3000);
              }}
            >
              Chiqishni tasdiqlash!
            </button>
          </div>
        </div>
      </header>

      {isLoading ? <Loading /> : ''}
    </>
  );
};
