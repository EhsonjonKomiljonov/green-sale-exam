import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { API } from '../../API/api';
import { GreenButton } from '../../components/GreenButton/GreenButton';
import { Loading } from '../../components/Loading/Loading';
import { LoadingContext } from '../../context/LoadingContext';
import { setToken } from '../../redux/token/tokenAction';
import './admin-login.scss';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const admin_sec_key = import.meta.env.VITE_REACT_APP_ADMIN_SECRET_KEY;

  const initialValues = {
    admin_email: '',
    admin_password: '',
  };

  const validationSchema = Yup.object({
    admin_email: Yup.string()
      .required('Iltimos emailni kiriting!')
      .min(5)
      .max(120)
      .email("Noto'g'ri email!")
      .matches(
        /^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/,
        "Noto'g'ri admin_email!"
      ),
    admin_password: Yup.string()
      .required('Iltimos parolingizni kiriting!')
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

  const { mutate } = useMutation('signin-user', API.loginAdmin, {
    onSuccess: (data) => {
      if (data.data.token) {
        setIsLoading(false);
        localStorage.setItem('token', data.data.token);
        dispatch(setToken(data.data.token));
        localStorage.setItem('admin', admin_sec_key);
        toast.success('Kirish muvaffaqiyatli yakunlandi!');
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      }
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(
        err.response.data.message == 'Not Found admin!'
          ? 'Bunday admin mavjud emas!'
          : err.response.data.message
      );
      navigate('/');
    },
  });

  const onSubmit = (values, { resetForm }) => {
    setIsLoading(true);
    mutate({
      admin_email: values.admin_email,
      admin_password: values.admin_password,
    });
  };

  return (
    <>
      <section className="admin-login">
        <div className="container">
          <div className="admin-login__inner">
            <h2>Kirish</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <div className="d-flex flex-column input-box">
                  <label className="label" htmlFor="admin_email">
                    Email (gmail, email, mail)
                  </label>
                  <Field name="admin_email" type="text" />
                  <span className="err-message">
                    <ErrorMessage name="admin_email" />
                  </span>
                </div>

                <div className="d-flex flex-column input-box">
                  <label className="label" htmlFor="admin_password">
                    Parol
                  </label>
                  <Field name="admin_password" type="password" />
                  <span className="err-message">
                    <ErrorMessage name="admin_password" />
                  </span>
                </div>

                <div className="btn-box">
                  <GreenButton text="Yuborish" type="submit" />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </section>

      {isLoading ? <Loading /> : ''}
    </>
  );
};
