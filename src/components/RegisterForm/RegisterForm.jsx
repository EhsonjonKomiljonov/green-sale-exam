import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { API } from '../../API/api';
import { AuthContext } from '../../context/AuthContext';
import { cities } from '../../db/cities';
import { motion } from 'framer-motion';
import { districts } from '../../db/districts';
import { GreenButton } from '../GreenButton/GreenButton';
import '../Header/header.scss';
import './register-form.scss';
import { LoadingContext } from '../../context/LoadingContext';
import { Loading } from '../Loading/Loading';
import { VerifyContactContext } from '../../context/VerifyContactContext';
import { VerifyTokenContext } from '../../context/VerifyToken';
import { setToken } from '../../redux/token/tokenAction';
import { useDispatch } from 'react-redux';

export const RegisterForm = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { setVerify } = useContext(VerifyContactContext);
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
    first_name: '',
    last_name: '',
    contact: '',
    email: '',
    region: 'toshkent shahri',
    district: '',
    address: '',
    password: '',
  };

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required('Iltimos ismingizni kiriting!')
      .min(2, "Ism 2 harfdan ko'p bo'lishi lozim!")
      .max(100, "Ism 100 ta harfdan kam bo'lishi lozim!"),
    last_name: Yup.string()
      .required('Iltimos familiyangizni kiriting!')
      .min(2, "Familiya 2 harfdan ko'p bo'lishi lozim!")
      .max(100, "Familiya 100 ta harfdan kam bo'lishi lozim!"),
    contact: Yup.string()
      .required('Iltimos Telefon raqamingizni kiriting!')
      .min(9, 'Telefon raqam uzunligi 8 tadan ortiq bolishi lozim!')
      .max(9, "Telefon raqam uzunligi eng ko'pi 9 ta bolishi mumkin!"),
    region: Yup.string()
      .required('Iltimos shaharni tanlang!')
      .default('toshkent shahri'),
    district: Yup.string().required('Iltimos tumanni tanlang!'),
    address: Yup.string()
      .required('Iltimos Mahalla nomini kiriting!')
      .min(2, "Mahalla eng kami 2 harf bo'lishi lozim!"),
    email: Yup.string()
      .required('Iltimos emailni kiriting!')
      .min(5)
      .max(120)
      .email("Noto'g'ri email!")
      .matches(
        /^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/,
        "Noto'g'ri email!"
      ),
    password: Yup.string()
      .required('Iltimos parolingizni kiriting!')
      .min(8, "Parol eng kami 8 ta bo'lishi lozim!")
      .matches(/[0-9]/, "Parolda bir dona bo'lsa ham raqam bo'lishi lozim!")
      .matches(
        /[a-z]/,
        "Parolda bir dona bo'lsa ham kichik harf bo'lishi lozim!"
      )
      .matches(
        /[A-Z]/,
        "Parolda bir dona bo'lsa ham katta harf ishlatilishi lozim!"
      ),
  });

  const { mutate } = useMutation('signup-user', API.registerUser, {
    onSuccess: (data) => {
      if (data.data.status) {
        setIsLoading(false);
        setVerify('sign-up-user');
        localStorage.setItem('token', data.data.token);
        dispatch(setToken(data.data.token));
        setAuth(data.data.userPhone);
        toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
        setTimeout(() => {
          navigate('/');
        }, 500);
      }
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(
        err.response.data.message == "Bunday User avval ro'yhatdan o'tgan!"
          ? "Bunday User avval ro'yhatdan o'tgan!"
          : err.response.data.message
      );
      if (!err.response.data.message) {
        toast.error(
          err.message == 'Network Error'
            ? "Serverda xatolik qaytadan urinib ko'ring!"
            : err.message
        );
      }
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);

    await mutate({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      contact: '+998' + values.contact,
      region: values.region,
      district: values.district,
      address: values.address,
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

      <section className="sign-up">
        <div className="sign-up__inner">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: [0, 0.5, 1],
              transition: { duration: 0.7 },
            }}
            className="sign-up__img-box"
          ></motion.div>
          <motion.div
            className="sign-up__form-box"
            initial={{ x: 300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1, transition: { duration: 1 } }}
          >
            <button className="menu-btn menu-form" onClick={() => openMenu()}>
              <i className="fa-solid fa-bars"></i>
            </button>
            <h2>Ro'yxatdan o'tish</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <div className="d-flex flex-column input-box">
                  <label className="label" htmlFor="first_name">
                    Ismingiz
                  </label>
                  <Field name="first_name" type="text" />
                  <span className="err-message">
                    <ErrorMessage name="first_name" />
                  </span>
                </div>

                <div className="d-flex flex-column input-box">
                  <label className="label" htmlFor="last_name">
                    Familiyangiz
                  </label>
                  <Field name="last_name" type="text" />
                  <span className="err-message">
                    <ErrorMessage name="last_name" />
                  </span>
                </div>

                <div className="d-flex flex-column input-box">
                  <label className="label" htmlFor="contact">
                    Telefon raqamingiz
                  </label>
                  <div className="d-flex align-items-center phone">
                    <span>+998</span>
                    <Field name="contact" type="number" />
                    <span className="err-message">
                      <ErrorMessage name="contact" />
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-column input-box">
                  <label className="label" htmlFor="email">
                    Email (gmail, email, mail)
                  </label>
                  <Field name="email" type="text" />
                  <span className="err-message">
                    <ErrorMessage name="email" />
                  </span>
                </div>

                <div className="d-flex flex-column input-box">
                  <label className="label" htmlFor="region">
                    Viloyat
                  </label>
                  <Field as="select" name="region" type="text">
                    {cities.map((item) => (
                      <option key={item.name} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <span className="err-message">
                    <ErrorMessage name="region" />
                  </span>
                </div>

                <div className="d-flex flex-column input-box">
                  <label className="label" htmlFor="district">
                    Tuman
                  </label>
                  <Field name="district" type="text" list="district" />
                  <datalist id="district">
                    {districts.map((item) => (
                      <option
                        key={item.name}
                        value={item.name[0].toLowerCase() + item.name.slice(1)}
                      ></option>
                    ))}
                  </datalist>
                  <span className="err-message">
                    <ErrorMessage name="district" />
                  </span>
                </div>

                <div className="d-flex flex-column input-box">
                  <label className="label" htmlFor="address">
                    Mahalla
                  </label>
                  <Field name="address" type="text" />
                  <span className="err-message">
                    <ErrorMessage name="address" />
                  </span>
                </div>

                <div className="d-flex flex-column input-box">
                  <label className="label" htmlFor="password">
                    Parol
                  </label>
                  <Field name="password" type="password" />
                  <span className="err-message">
                    <ErrorMessage name="password" />
                  </span>
                </div>

                <div className="btn-box">
                  <GreenButton text="Yuborish" type="submit" />
                  <Link to="/login">
                    Kirish <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
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
              <Link to="/buy-vacancies">Olish uchun vakansiya</Link>
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
        </div>
      </div>

      {isLoading ? <Loading /> : ''}
    </>
  );
};
