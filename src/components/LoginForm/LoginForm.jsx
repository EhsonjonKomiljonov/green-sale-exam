import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import { useMutation } from 'react-query';
import { API } from '../../API/api';
import { GreenButton } from '../GreenButton/GreenButton';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/token/tokenAction';
import { LoadingContext } from '../../context/LoadingContext';
import { Loading } from '../Loading/Loading';
import '../Header/header.scss';
import './login-form.scss';

export const LoginForm = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();

  const openMenu = () => {
    setMenu(true);
  };

  const closeMenu = (evt) => {
    if (evt.target.matches('.menu')) {
      setMenu(false);
    }
  };

  const initialValues = {
    phoneNumber: '',
    password: '',
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required('Iltimos Telefon raqamingizni kiriting!')
      .min(8, 'Telefon raqam uzunligi 8 tadan ortiq bolishi lozim!')
      .max(9, "Telefon raqam uzunligi eng ko'pi 9 ta bolishi mumkin!"),
    password: Yup.string()
      .required('Iltimos parolingizni kiriting!')
      .matches(/[0-9]/, "Parolda bir dona bo'lsa ham raqam bo'lishi lozim!")
      .matches(
        /[a-z]/,
        "Parolda bir dona bo'lsa ham kichik harf bo'lishi lozim!"
      )
      .matches(
        /[A-Z]/,
        "Parolda bir dona bo'lsa ham katta harf ishlatilishi lozim!"
      )
      .matches(
        /[\`!@#$%^&*()_+={}\[\]:;\"'<>,.?\\\/]+/,
        'Parolda simbol ishlatilishi lozim. misol (#$%)'
      ),
  });

  const { mutate } = useMutation('signin-user', API.loginUser, {
    onSuccess: (data) => {
      if (data.data.token) {
        setIsLoading(false);
        localStorage.setItem('token', data.data.token);
        dispatch(setToken(data.data.token));
        toast.success('Kirish muvaffaqiyatli yakunlandi!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(
        err.response.data.ErrorMessage == 'User not found!'
          ? 'Bunday foydalanuvchi mavjud emas!'
          : err.response.data.ErrorMessage
      );
    },
  });

  const onSubmit = (values, { resetForm }) => {
    setIsLoading(true);
    setAuth('+998' + values.phoneNumber);
    mutate({
      phoneNumber: '+998' + values.phoneNumber,
      password: values.password,
    });
  };

  return (
    <>
      <div className="site-header__bottom">
        <nav
          className="nav register-nav"
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
          <ul
            className={`nav__list d-flex align-items-center ${
              scroll
                ? 'w-100 justify-content-start ms-xxl-4 '
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
      <div className="signup-menu">
        <button className="menu-btn" onClick={() => openMenu()}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <section className="login">
        <div className="login__inner">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: [0, 0.5, 1],
              transition: { duration: 0.7 },
            }}
            className="login__img-box"
          ></motion.div>
          <motion.div
            className="login__form-box"
            initial={{ x: 300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1, transition: { duration: 1 } }}
          >
            <button className="menu-btn menu-form" onClick={() => openMenu()}>
              <i className="fa-solid fa-bars"></i>
            </button>
            <h2>Kirish</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <div className="d-flex flex-column input-box">
                  <label className="label" htmlFor="phoneNumber">
                    Telefon raqamingiz
                  </label>
                  <div className="d-flex align-items-center phone">
                    <span>+998</span>
                    <Field name="phoneNumber" type="number" />
                    <span className="err-message" data-has-content>
                      <ErrorMessage name="phoneNumber" />
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-column input-box">
                  <label className="label" htmlFor="password">
                    Parol
                  </label>
                  <Field name="password" type="password" />
                  <span className="err-message" data-has-content>
                    <ErrorMessage name="password" />
                  </span>
                </div>

                <div className="btn-box">
                  <GreenButton text="Yuborish" type="submit" />
                  <Link to="/register">
                    Ro'yxatdan o'tish
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
                <Link
                  className="d-block text-center text-dark mt-4"
                  to="/new-password"
                >
                  Parolingizni unutdingizmi ?
                </Link>
              </Form>
            </Formik>
          </motion.div>
        </div>
      </section>

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
      {isLoading ? <Loading /> : ''}
    </>
  );
};
