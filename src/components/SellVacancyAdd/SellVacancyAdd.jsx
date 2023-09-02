import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useRef } from 'react';
import './sellvacancyadd.scss';
import { GreenButton } from '../../components/GreenButton/GreenButton';
import * as Yup from 'yup';
import { API } from '../../API/api';
import { Link } from 'react-router-dom';
import { districts } from '../../db/districts';
import { cities } from '../../db/cities';
export const SellVacancyAdd = () => {
  const filesRef = useRef();
  const selectRef = useRef();
  const selectRef2 = useRef();
  const validationSchema = Yup.object({
    Title: Yup.string().required('Mahsulot nomini kiritish majburiy !!!'),
    Description: Yup.string().required('Izoh kiritish majburiy !!!'),
    Price: Yup.number('Iltimos son kiriting !!!')
      .typeError('Iltimos Son kiriting !!!')
      .required('Narxni kiritish majburiy !!!'),
    Capacity: Yup.number()
      .typeError("Iltimos sig'imga son kiriting !!!")
      .required("sig'imni yozish majburiy !!!"),
    CapacityMeasure: Yup.string().required(
      "sig'im tipini  kiritsh majburiy !!!"
    ),
    Type: Yup.string().required('Mahsulot tipini kiriting !!!'),
    Region: Yup.string().required('Viloyatni yozish majburiy !!!'),
    District: Yup.string().required('Tummanni yozish majburiy !!!'),
  });
  const createSellerRequest = async (formData) => {
    const data = await API.createSeller(formData).catch((err) =>
      console.log(err)
    );

    console.log(data);

    // if (error) {
    //   toast(error?.response?.data?.message);
    // } else {
    //   navigate('/');
    // }
  };

  const initialValues = {
    Title: '',
    Description: '',
    Price: '',
    Capacity: '',
    CapacityMeasure: '',
    Type: '',
    Region: '',
    District: '',
  };
  const CreateSellerSubmit = (values) => {
    const formData = new FormData();

    const valueFormData = {
      ...values,
      CategoryId: selectRef.current.value,
      District: selectRef2?.current.value,
      PhoneNumber: localStorage.getItem('phone'),
      imagePath: filesRef?.current?.files[0],
    };
    if (
      valueFormData.CategoryId &&
      valueFormData.PhoneNumber &&
      valueFormData.imagePath
    ) {
      const keysObject = Object.keys(valueFormData);

      formData.set(keysObject[0], valueFormData.Title);
      formData.set(keysObject[1], valueFormData.Description);
      formData.set(keysObject[2], valueFormData.Price);
      formData.set(keysObject[3], valueFormData.Capacity);
      formData.set(keysObject[4], valueFormData.CapacityMeasure);
      formData.set(keysObject[5], valueFormData.Type);
      formData.set(keysObject[6], valueFormData.Region);
      formData.set(keysObject[7], valueFormData.District);
      formData.set(keysObject[8], valueFormData.CategoryId);
      formData.set(keysObject[9], valueFormData.PhoneNumber);
      formData.set(keysObject[10], valueFormData.imagePath);
      console.log(valueFormData);
      createSellerRequest(formData);
    }
  };
  return (
    <>
      <section className="sell_vacancy ">
        <div className="sell_vacancy__inner d-flex">
          <div className="sell_vacancy_left w-50">
            <input
              className="visually-hidden"
              type="file"
              id="file_upload"
              ref={filesRef}
            />
            <div>
              <span className="sell__vacancy__icon"></span>
              <label htmlFor="file_upload" className="sell__vacancy__label">
                faylni yuklash uchun ushbu
                <br /> maydonga bosing
              </label>
            </div>
          </div>
          <div className="sell_vacancy_right">
            <h2 className="sell__vacancy__title">Add Product</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={CreateSellerSubmit}
            >
              <Form className="sell__vacancy__form">
                <select
                  ref={selectRef}
                  required
                  className="sell_vacancy__select"
                  defaultValue="1"
                >
                  <option value="1">Sabzavotlar</option>
                  <option value="2">Poliz-ekinlari</option>
                  <option value="3">Mevalar</option>
                </select>
                <div className="sell__vacancy__input__box">
                  <label htmlFor="Title">Mahsulot nomini yozing</label>
                  <Field
                    required
                    type="text"
                    name="Title"
                    id="Title"
                    className="sell__vacancy__input"
                  />
                  <span className="error__message">
                    <ErrorMessage name="Title" />
                  </span>
                </div>
                <div className="sell__vacancy__input__box">
                  <label htmlFor="Price">Narxi</label>
                  <Field
                    required
                    type="number"
                    name="Price"
                    id="Price"
                    className="sell__vacancy__input"
                  />
                  <span className="error__message">
                    <ErrorMessage name="Price" />
                  </span>
                </div>
                <div className="sell__vacancy__input__box">
                  <label htmlFor="Capacity">Sig'imini yozing</label>
                  <Field
                    required
                    type="number"
                    name="Capacity"
                    id="Capacity"
                    className="sell__vacancy__input"
                  />
                  <span className="error__message">
                    <ErrorMessage name="Capacity" />
                  </span>
                </div>
                <div className="sell__vacancy__input__box">
                  <label htmlFor="CapacityMeasure">
                    Sig'im tipi: tonna, kilogram
                  </label>
                  <Field
                    required
                    type="text"
                    name="CapacityMeasure"
                    id="CapacityMeasure"
                    className="sell__vacancy__input"
                  />
                  <span className="error__message">
                    <ErrorMessage name="CapacityMeasure" />
                  </span>
                </div>
                <div className="sell__vacancy__input__box">
                  <label htmlFor="Type">Mahsulot tipi</label>
                  <Field
                    required
                    type="text"
                    name="Type"
                    id="Type"
                    className="sell__vacancy__input"
                  />
                  <span className="error__message">
                    <ErrorMessage name="Type" />
                  </span>
                </div>
                <div className="sell__vacancy__input__box">
                  <select
                    ref={selectRef2}
                    required
                    className="sell_vacancy__select sell__vacancy__select"
                    defaultValue="1"
                  >
                    {cities.map((item) => (
                      <option key={item.name} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <span className="error__message">
                    <ErrorMessage name="Region" />
                  </span>{' '}
                </div>
                <div className="sell__vacancy__input__box">
                  <label htmlFor="District">Tuman</label>
                  <Field
                    className="sell__vacancy__input"
                    name="District"
                    type="text"
                    list="District"
                  />
                  <datalist id="District">
                    {districts.map((item) => (
                      <option
                        key={item.name}
                        value={item.name[0].toLowerCase() + item.name.slice(1)}
                      ></option>
                    ))}
                  </datalist>
                </div>
                <div className="sell__vacancy__input__box">
                  <label htmlFor="Description">Izoh</label>
                  <Field
                    required
                    type="text"
                    name="Description"
                    id="Description"
                    className="sell__vacancy__input"
                  />
                  <span className="error__message">
                    <ErrorMessage name="Izoh" />
                  </span>
                </div>
                <GreenButton text="Yuborish" type="submit" />
                <Link className="sell__vacancy__link" to="/">
                  Bosh Sahifaga
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </Form>
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};
