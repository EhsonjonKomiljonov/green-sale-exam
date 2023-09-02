import React, { useContext } from 'react';
import './footer.scss';
import Logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { VerifyTokenContext } from '../../context/VerifyToken';
export const Footer = () => {
  const { verifyToken } = useContext(VerifyTokenContext);

  return (
    <>
      <section className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="row justify-content-center">
              <div className="col-12 text-md-start text-center pt-md-0 pt-3 col-md-2">
                <h5 className="h5 footer__title mb-4">Biz Haqimizda</h5>
                <ul className="footer__list">
                  <li className="footer__item">
                    <Link to="/">Biz Haqimizda</Link>
                  </li>
                  <li className="footer__item">
                    <Link to="/">FAQ</Link>
                  </li>
                </ul>
              </div>
              <div className="col-12 text-md-start text-center pt-md-0 pt-3 col-md-2">
                <h5 className="h5 footer__title mb-4">Linklar</h5>
                <ul className="footer__list  ">
                  <li className="footer__item">
                    <Link to="/">BOSH SAHIFA</Link>
                  </li>
                  <li className="footer__item">
                    <Link to="/buy-vacancy">OLISH UCHUN VAKANSIYA</Link>
                  </li>
                  <li className="footer__item">
                    <Link to="/sell-vacancies">sotish uchun vakansiya</Link>
                  </li>
                </ul>
              </div>
              <div className="col-12 text-md-start text-center pt-md-0 pt-3 col-md-2">
                <h5 className="h5 footer__title mb-4">Login</h5>
                <ul className="footer__list">
                  <li className="footer__item">
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
                    <Link
                      className={`${verifyToken ? 'd-none' : ''}`}
                      to="/login"
                    >
                      Kirish
                    </Link>
                  </li>
                  <li className="footer__item">
                    <a
                      style={{
                        fontSize: '13px',
                      }}
                      href="#log-out-modal"
                      className={`text-white text-opacity-50 ${
                        verifyToken ? '' : 'd-none'
                      }`}
                    >
                      Chiqish
                    </a>
                    <Link
                      to="/register"
                      className={`${verifyToken ? 'd-none' : ''}`}
                    >
                      Ro'yxatdan o'tish
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__logo text-center pt-5 pb-0">
              <Link className="logo" to="/">
                <img src={Logo} alt="Brezza" width="50px" />
                <p>GREEN SALE</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
