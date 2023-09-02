import React, { useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../API/api';
import { Header } from '../../components/Header/Header';
import { LoadingContext } from '../../context/LoadingContext';
import './my-profile.scss';
import LoadingImage from '../../assets/images/loader.svg';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { cities } from '../../db/cities';
import { districts } from '../../db/districts';
import { GreenButton } from '../../components/GreenButton/GreenButton';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading/Loading';

export const MyProfile = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { setAuth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const selectCityRef = useRef();
  const optionCityRef = useRef();

  const query = useQuery('get-user', API.getUser, {
    onSuccess: (data) => {
      setIsLoading(true);
      if (data.data.region == selectCityRef.current?.value) {
        optionCityRef.current?.setAttribute('selected');
      }
      setTimeout(() => {
        setData(data.data);
        setIsLoading(false);
      }, 2000);
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(`Ups!
      serverda qandaydur xatolik.
      Iltimos qaytadan urinib ko'ring!`);
    },
    refetchOnWindowFocus: false,
  });

  const initialValues = {
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    phoneNumber: data.phoneNumber?.split('+998')[1] || '',
    region: data.region || '',
    district: data.district || '',
    address: data.address || '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Ism 2 harfdan ko'p bo'lishi lozim!")
      .max(100, "Ism 100 ta harfdan kam bo'lishi lozim!"),
    lastName: Yup.string()
      .min(2, "Familiya 2 harfdan ko'p bo'lishi lozim!")
      .max(100, "Familiya 100 ta harfdan kam bo'lishi lozim!"),
    phoneNumber: Yup.string()
      .min(9, 'Telefon raqam uzunligi 8 tadan ortiq bolishi lozim!')
      .max(9, "Telefon raqam uzunligi eng ko'pi 9 ta bolishi mumkin!"),
    region: Yup.string().default('toshkent shahri'),
    district: Yup.string(),
    address: Yup.string().min(2, "Mahalla eng kami 2 harf bo'lishi lozim!"),
  });

  const { mutate } = useMutation('edit-user-profile', API.editUser, {
    onSuccess: (data) => {
      if (data.data) {
        setIsLoading(false);
        navigate('/');
        toast.success("O'zgartirilishlar kiritildi!");
      }
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(`Ups!
      serverda qandaydur xatolik.
      Iltimos qaytadan urinib ko'ring!`);
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append(
      'region',
      values.region ? values.region : 'toshkent shahri'
    );
    formData.append('district', values.district);
    formData.append('address', values.address);
    formData.append('phoneNumber', '+998' + values.phoneNumber);

    setAuth('+998' + values.phoneNumber);
    await mutate(formData);
  };

  const initialValueEditPass = {
    oldPassword: '',
    newPassword: '',
    returnNewPassword: '',
  };

  const validateEditPassword = Yup.object({
    oldPassword: Yup.string()
      .min(8, "Parol eng kami 8 ta bo'lishi lozim!")
      .required('Eski Parolni kiriting!')
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
    newPassword: Yup.string()
      .min(8, "Parol eng kami 8 ta bo'lishi lozim!")
      .required('Yangi Parolni kiriting!')
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
    returnNewPassword: Yup.string()
      .min(8, "Parol eng kami 8 ta bo'lishi lozim!")
      .required('Yangi Parolni tasdiqlang!')
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

  const { mutate: mutatePassword } = useMutation(
    'edit-user-profile',
    API.editUserPassword,
    {
      onSuccess: (data) => {
        if (data.data) {
          setLoading(false);
          toast.success('Parol yangilandi!');
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      },
      onError: (err) => {
        setLoading(false);
        toast.error(`Ups!
      serverda qandaydur xatolik.
      Iltimos qaytadan urinib ko'ring!`);
      },
    }
  );

  const submitEditedPassword = (value) => {
    setLoading(true);
    mutatePassword(value);
  };

  return (
    <>
      <Header />
      <section className="my-profile">
        <div className="container">
          <div className="my-profile__inner">
            <h2>Mening Profilim</h2>

            {isLoading ? (
              <img
                style={{
                  position: 'absolute',
                  right: '45%',
                  top: '60%',
                }}
                src={LoadingImage}
                width="100px"
              />
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <div className="main-inputs">
                    <div className="inputs-left">
                      <div className="d-flex flex-column input-box">
                        <label className="label" htmlFor="firstName">
                          Ismingiz
                        </label>
                        <Field name="firstName" type="text" />
                        <span className="err-message">
                          <ErrorMessage name="firstName" />
                        </span>
                      </div>

                      <div className="d-flex flex-column input-box">
                        <label className="label" htmlFor="lastName">
                          Familiyangiz
                        </label>
                        <Field name="lastName" type="text" />
                        <span className="err-message">
                          <ErrorMessage name="lastName" />
                        </span>
                      </div>

                      <div className="d-flex flex-column input-box">
                        <label className="label" htmlFor="phoneNumber">
                          Telefon raqamingiz
                        </label>
                        <div className="d-flex align-items-center phone">
                          <span>+998</span>
                          <Field name="phoneNumber" type="number" />
                          <span className="err-message">
                            <ErrorMessage name="phoneNumber" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="inputs-right">
                      <div className="d-flex flex-column input-box">
                        <label className="label" htmlFor="region">
                          Viloyat
                        </label>
                        <Field
                          ref={selectCityRef}
                          as="select"
                          name="region"
                          type="text"
                        >
                          {cities.map((item) => (
                            <option
                              key={item.name}
                              ref={optionCityRef}
                              value={item.value}
                            >
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
                              value={
                                item.name[0].toLowerCase() + item.name.slice(1)
                              }
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
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between password-edit-box">
                    <a
                      className="text-dark fs-5 text-decoration-underline"
                      href="#edit-password-modal"
                    >
                      Parolni o'zgartirish.
                    </a>
                    <div className="profile-btn-box">
                      <GreenButton text="Yuborish" type="submit" />
                    </div>
                  </div>
                </Form>
              </Formik>
            )}
            <div id="edit-password-modal">
              <a className="close-modal-bg" href="#"></a>
              <div className="edit-pass-modal">
                <a href="#">&times;</a>
                <h2>Parol o'zgartirish</h2>
                <Formik
                  initialValues={initialValueEditPass}
                  onSubmit={submitEditedPassword}
                  validationSchema={validateEditPassword}
                >
                  <Form>
                    <div className="input-box">
                      <label htmlFor="oldPassword">Eski parol</label>
                      <Field
                        name="oldPassword"
                        id="oldPassword"
                        type="password"
                      />
                      <span className="err-message">
                        <ErrorMessage name="oldPassword" />
                      </span>
                    </div>
                    <div className="input-box">
                      <label htmlFor="newPassword">Yangi parol</label>
                      <Field
                        name="newPassword"
                        id="newPassword"
                        type="password"
                      />
                      <span className="err-message">
                        <ErrorMessage name="newPassword" />
                      </span>
                    </div>
                    <div className="input-box">
                      <label htmlFor="returnNewPassword">
                        Yangi parolni tasdiqlang
                      </label>
                      <Field
                        name="returnNewPassword"
                        id="returnNewPassword"
                        type="password"
                      />
                      <span className="err-message">
                        <ErrorMessage name="returnNewPassword" />
                      </span>
                    </div>
                    <GreenButton text="Yuborish" type="submit" />
                  </Form>
                </Formik>
              </div>
            </div>
          </div>

          {loading ? <Loading /> : ''}
        </div>
      </section>
    </>
  );
};
