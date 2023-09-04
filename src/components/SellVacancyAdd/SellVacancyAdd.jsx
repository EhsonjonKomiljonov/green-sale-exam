import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import './sellvacancyadd.scss';
import { GreenButton } from '../../components/GreenButton/GreenButton';
import * as Yup from 'yup';
import { API } from '../../API/api';
import { Link, useNavigate } from 'react-router-dom';
import { districts } from '../../db/districts';
import { cities } from '../../db/cities';
import { toast } from 'react-toastify';

export const SellVacancyAdd = () => {
  const filesRef = useRef();
  const selectRef = useRef();
  const selectRef2 = useRef();

  const [imgNames, setImgNames] = useState([]);

  const handleFiles = (e) => {
    const files = e.target.files;
    setImgNames([]);
    if (files.length == 0) {
      return toast.error('Iltimos rasmni tanlang');
    }
    if (files.length > 5) {
      toast.error('5ta gacha rasm tanlash mumkun');
      return setImgNames([]);
    }
    setImgNames((prev) => [
      ...Array.from(files).map((file) => file.name + ' '),
    ]);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Mahsulot nomini kiritish majburiy !!!'),
    description: Yup.string().required('Izoh kiritish majburiy !!!'),
    price: Yup.number('Iltimos son kiriting !!!')
      .typeError('Iltimos Son kiriting !!!')
      .required('Narxni kiritish majburiy !!!'),
    capacity: Yup.number()
      .typeError("Iltimos sig'imga son kiriting !!!")
      .required("sig'imni yozish majburiy !!!"),
    capacityMeasure: Yup.string().required(
      "sig'im tipini  kiritsh majburiy !!!"
    ),
    type: Yup.string().required('Mahsulot tipini kiriting !!!'),
    district: Yup.string().required('Tummanni yozish majburiy !!!'),
  });

  const createSellerRequest = async (formData) => {
    const data = await API.createSeller(formData).catch((err) =>
      console.log(err)
    );
    console.log(data);
  };

  const initialValues = {
    name: '',
    description: '',
    price: '',
    capacity: '',
    capacityMeasure: '',
    type: '',
    district: '',
  };

  const CreateSellerSubmit = (values) => {
    const formData = new FormData();

    const valueFormData = {
      ...values,
      categoryId: selectRef.current.value,
      region: selectRef2?.current.value,
      contact: localStorage.getItem('phone'),
      imgLink: [...filesRef?.current?.files],
    };

    if (
      valueFormData?.categoryId &&
      valueFormData?.contact &&
      valueFormData?.imgLink
    ) {
      formData.append('name', valueFormData.name);
      formData.append('price', valueFormData.price);
      formData.append('capacity', valueFormData.capacity);
      formData.append('capacityMeasure', valueFormData.capacityMeasure);
      formData.append('type', valueFormData.type);
      formData.append('region', valueFormData.region);
      formData.append('categoryId', valueFormData.categoryId);
      formData.append('district', valueFormData.district);
      formData.append('description', valueFormData.description);
      formData.append('contact', valueFormData.contact);
      valueFormData.imgLink.forEach((file) => formData.append('imgLink', file));

      createSellerRequest(formData);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      toast.error('Iltimos logindan oting');
      navigate('/login');
    }
  }, []);
  return (
    <>
      <section className='sell_vacancy '>
        <div className='sell_vacancy__inner d-flex'>
          <div className='sell_vacancy_left w-50'>
            <input
              onChange={handleFiles}
              className='visually-hidden'
              type='file'
              id='file_upload'
              ref={filesRef}
              multiple
            />
            <div>
              <span className='sell__vacancy__icon'></span>
              <label
                htmlFor='file_upload'
                className='sell__vacancy__label'
              >
                faylni yuklash uchun ushbu
                <br /> maydonga bosing
                <span className='img_names'>
                  {imgNames.map((el) => {
                    return (
                      <>
                        <span
                          key={el}
                          className='img_name'
                        >
                          {el}
                        </span>
                        <br />
                      </>
                    );
                  })}
                </span>
              </label>
            </div>
          </div>
          <div className='sell_vacancy_right'>
            <h2 className='sell__vacancy__title'>Add Product</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={CreateSellerSubmit}
            >
              <Form className='sell__vacancy__form'>
                <select
                  ref={selectRef}
                  required
                  className='sell_vacancy__select'
                  defaultValue='1'
                >
                  <option value='64f07d6885548d0039615a9a'>Sabzavotlar</option>
                  <option value='64f07653f7c051e624804d60'>
                    Poliz-ekinlari
                  </option>
                  <option value='64f07653f7c051e624804d5f'>Mevalar</option>
                </select>
                <div className='sell__vacancy__input__box'>
                  <label htmlFor='name'>Mahsulot nomini yozing</label>
                  <Field
                    required
                    type='text'
                    name='name'
                    id='name'
                    className='sell__vacancy__input'
                  />
                  <span className='error__message'>
                    <ErrorMessage name='name' />
                  </span>
                </div>
                <div className='sell__vacancy__input__box'>
                  <label htmlFor='price'>Narxi</label>
                  <Field
                    required
                    type='number'
                    name='price'
                    id='price'
                    className='sell__vacancy__input'
                  />
                  <span className='error__message'>
                    <ErrorMessage name='price' />
                  </span>
                </div>
                <div className='sell__vacancy__input__box'>
                  <label htmlFor='capacity'>Sig'imini yozing</label>
                  <Field
                    required
                    type='number'
                    name='capacity'
                    id='capacity'
                    className='sell__vacancy__input'
                  />
                  <span className='error__message'>
                    <ErrorMessage name='capacity' />
                  </span>
                </div>
                <div className='sell__vacancy__input__box'>
                  <label htmlFor='capacityMeasure'>
                    Sig'im tipi: tonna, kilogram
                  </label>
                  <Field
                    required
                    type='text'
                    name='capacityMeasure'
                    id='capacityMeasure'
                    className='sell__vacancy__input'
                  />
                  <span className='error__message'>
                    <ErrorMessage name='capacityMeasure' />
                  </span>
                </div>
                <div className='sell__vacancy__input__box'>
                  <label htmlFor='type'>Mahsulot tipi</label>
                  <Field
                    required
                    type='text'
                    name='type'
                    id='type'
                    className='sell__vacancy__input'
                  />
                  <span className='error__message'>
                    <ErrorMessage name='type' />
                  </span>
                </div>
                <div className='sell__vacancy__input__box'>
                  <select
                    ref={selectRef2}
                    required
                    className='sell_vacancy__select sell__vacancy__select'
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
                <div className='sell__vacancy__input__box'>
                  <label htmlFor='district'>Tuman</label>
                  <Field
                    className='sell__vacancy__input'
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
                <div className='sell__vacancy__input__box'>
                  <label htmlFor='description'>Izoh</label>
                  <Field
                    required
                    type='text'
                    name='description'
                    id='description'
                    className='sell__vacancy__input'
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
                  className='sell__vacancy__link'
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
