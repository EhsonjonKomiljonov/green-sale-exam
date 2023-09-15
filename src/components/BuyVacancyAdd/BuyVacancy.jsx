import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { GreenButton } from '../../components/GreenButton/GreenButton';
import * as Yup from 'yup';
import { API } from '../../API/api';
import { Link, useNavigate } from 'react-router-dom';
import { districts } from '../../db/districts';
import { cities } from '../../db/cities';
import { toast } from 'react-toastify';
import './buyvacancyadd.scss';

export const BuyVacancy = () => {
  const selectRef = useRef();
  const selectRef2 = useRef();

  const validationSchema = Yup.object({
    name: Yup.string().required('Mahsulot nomini kiritish majburiy !!!'),
    description: Yup.string().required('Izoh kiritish majburiy !!!'),
    capacity: Yup.number()
      .typeError("Iltimos sig'imga son kiriting !!!")
      .required("sig'imni yozish majburiy !!!"),
    capacityMeasure: Yup.string().required(
      "sig'im tipini  kiritsh majburiy !!!"
    ),
    type: Yup.string().required('Mahsulot tipini kiriting !!!'),
    district: Yup.string().required('Tummanni yozish majburiy !!!'),
  });

  const createBuyerRequest = async (valueForm) => {
    const data = await API.createBuyer(valueForm).catch((err) =>
      console.log(err)
    );

    if (data.data?.data?._id) {
      toast.success('Vacansiya muvaffaqiyatli qoshildi');
      return setTimeout(() => {
        navigate('/');
      }, 1000);
    } else if (data.data?.message) {
      toast.error(data.data?.message);
    } else {
      toast.error('Iltimos barcha narsani togri kiriting');
    }
  };

  const initialValues = {
    name: '',
    description: '',
    capacity: '',
    capacityMeasure: '',
    type: '',
    district: '',
  };

  const CreatebuyerSubmit = (values) => {
    const formData = new FormData();

    const valueForm = {
      ...values,
      categoryId: selectRef.current.value,
      region: selectRef2?.current.value,
      contact: localStorage.getItem('phone'),
    };

    if (
      valueForm?.categoryId &&
      valueForm?.contact &&
      valueForm?.region
    ) {
      createBuyerRequest(valueForm);
    }
  };
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      toast.error('Iltimos logindan oting');
      navigate('/login');
    }
  }, []);
  (async function () {
    if (localStorage.getItem('token')) {
      const data = await API.verifyToken();

      if (!data?.data?.data) {
        toast.error('Iltimos logindan oting');
        navigate('/login');
      }
    }
  })();
  return (
    <>
      <section className='buy_vacancy'>
        <div className='buy_vacancy__inner d-flex'>
          <div className='buy_vacancy_right'>
            <h2 className='buy__vacancy__title'>Buyer Vacancy</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={CreatebuyerSubmit}
            >
              <Form className='buy__vacancy__form'>
                <select
                  ref={selectRef}
                  required
                  className='buy_vacancy__select'
                  defaultValue='1'
                >
                  <option value='64f07d6885548d0039615a9a'>Sabzavotlar</option>
                  <option value='64f07653f7c051e624804d60'>
                    Poliz-ekinlari
                  </option>
                  <option value='64f07653f7c051e624804d5f'>Mevalar</option>
                </select>
                <div className='buy__vacancy__input__box'>
                  <label htmlFor='name'>Mahsulot nomini yozing</label>
                  <Field
                    required
                    type='text'
                    name='name'
                    id='name'
                    className='buy__vacancy__input'
                  />
                  <span className='error__message'>
                    <ErrorMessage name='name' />
                  </span>
                </div>
                <div className='buy__vacancy__input__box'>
                  <label htmlFor='capacity'>Sig'imini yozing</label>
                  <Field
                    required
                    type='number'
                    name='capacity'
                    id='capacity'
                    className='buy__vacancy__input'
                  />
                  <span className='error__message'>
                    <ErrorMessage name='capacity' />
                  </span>
                </div>
                <div className='buy__vacancy__input__box'>
                  <label htmlFor='capacityMeasure'>
                    Sig'im tipi: tonna, kilogram
                  </label>
                  <Field
                    required
                    type='text'
                    name='capacityMeasure'
                    id='capacityMeasure'
                    className='buy__vacancy__input'
                  />
                  <span className='error__message'>
                    <ErrorMessage name='capacityMeasure' />
                  </span>
                </div>
                <div className='buy__vacancy__input__box'>
                  <label htmlFor='type'>Mahsulot tipi</label>
                  <Field
                    required
                    type='text'
                    name='type'
                    id='type'
                    className='buy__vacancy__input'
                  />
                  <span className='error__message'>
                    <ErrorMessage name='type' />
                  </span>
                </div>
                <div className='buy__vacancy__input__box'>
                  <select
                    ref={selectRef2}
                    required
                    className='buy_vacancy__select buy__vacancy__select'
                    defaultValue='1'
                  >
                    {cities.map((item) => (
                      <option
                        key={item.name}
                        value={item.value}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <span className='error__message'>
                    <ErrorMessage name='region' />
                  </span>{' '}
                </div>
                <div className='buy__vacancy__input__box'>
                  <label htmlFor='district'>Tuman</label>
                  <Field
                    className='buy__vacancy__input'
                    name='district'
                    type='text'
                    list='district'
                  />
                  <datalist id='district'>
                    {districts.map((item) => (
                      <option
                        key={item.name}
                        value={item.name[0].toLowerCase() + item.name.slice(1)}
                      ></option>
                    ))}
                  </datalist>
                </div>
                <div className='buy__vacancy__input__box'>
                  <label htmlFor='description'>Izoh</label>
                  <Field
                    required
                    type='text'
                    name='description'
                    id='description'
                    className='buy__vacancy__input'
                  />
                  <span className='error__message'>
                    <ErrorMessage name='Izoh' />
                  </span>
                </div>
                <GreenButton
                  text='Yuborish'
                  type='submit'
                />
                <Link
                  className='buy__vacancy__link'
                  to='/'
                >
                  Bosh Sahifaga
                  <i className='fa-solid fa-arrow-right'></i>
                </Link>
              </Form>
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};
