import React from 'react';
import './footer.scss';
import Logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
export const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="row justify-content-center">
              <div className="col-12 text-md-start text-center pt-md-0 pt-3 col-md-2">
                <h5 className="h5 footer__title">Biz Haqimizda</h5>
                <ul className="footer__list">
                  <li className="footer__item">
                    <a href="">Biz Haqimizda</a>
                  </li>
                  <li className="footer__item">
                    <a href="">FAQ</a>
                  </li>
                </ul>
              </div>
              <div className="col-12 text-md-start text-center pt-md-0 pt-3 col-md-2">
                <h5 className="h5 footer__title">Linklar</h5>
                <ul className="footer__list  ">
                  <li className="footer__item">
                    <a href="">BOSH SAHIFA</a>
                  </li>
                  <li className="footer__item">
                    <a href="">SABZAVOTLAR</a>
                  </li>
                  <li className="footer__item">
                    <a href="">MEVALAR</a>
                  </li>
                  <li className="footer__item">
                    <a href="">POLIZ EKINLARI</a>
                  </li>
                </ul>
              </div>
              <div className="col-12 text-md-start text-center pt-md-0 pt-3 col-md-2">
                <h5 className="h5 footer__title">Login</h5>
                <ul className="footer__list">
                  <li className="footer__item">
                    <a href="">Login</a>
                  </li>
                  <li className="footer__item">
                    <a href="">Register</a>
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
