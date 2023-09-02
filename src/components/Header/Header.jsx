import { useContext, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
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
  let lastScrollY = 0;

  const { mutate } = useMutation('verify-token', API.verifyToken, {
    onSuccess: (data) => {
      setIsLoading(false);
      if (data.data) {
        setIsLoading(false);
        setVerifyToken(true);
      } else setVerifyToken(false);
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
    mutate(token);

    const handleScroll = () => {
      const scrollY = window.pageYOffset;

      if (scrollY > lastScrollY && scrollY > 115) {
        setScroll(true);
      }

      if (scrollY < lastScrollY && scrollY < 115) {
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
            <div className="site-header__top d-flex align-items-center justify-content-between mb-4">
              <div className="localization">
                <select className="localization__select">
                  <option value="uzbek">Uzbek</option>
                  <option value="rus">Russian</option>
                </select>
                <span className="localization__arrow"></span>
              </div>
              <div className="d-flex align-items-center">
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
            <div className="site-header__center d-flex align-items-center justify-content-between">
              <button className="menu-btn" onClick={() => openMenu()}>
                <i className="fa-solid fa-bars"></i>
              </button>
              <Link className="logo" to="/">
                <img src={Logo} alt="Green Sale" width="50px" />
                <p>GREEN SALE</p>
              </Link>
              <label className="px-3 input-group">
                <input type="text" placeholder="Search for product" />
                <button className="search-btn-header btn">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </label>
              <div className="site-header__center-links">
                <Link className="like rounded-1" to="/buy-vacancies">
                  Oluvchi vakansiyalar
                </Link>
                <Link className="like rounded-1" to="/sell-vacancies">
                  Sotuvchi vakansiyalar
                </Link>
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
          </div>
        </div>
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
                <Link to="/buy-vacancies">Oluvchi vakansiyalar</Link>
              </li>
              <li>
                <Link to="/sell-vacancies">Sotuvchi vakansiyalar</Link>
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
        <div id="log-out-modal">
          <a className="close-modal-bg" href="#"></a>
          <div>
            <a href="#">&times;</a>
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  localStorage.removeItem('token');
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
