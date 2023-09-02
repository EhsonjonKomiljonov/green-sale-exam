import { Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { API } from '../../API/api';
import { AuthContext } from '../../context/AuthContext';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/token/tokenAction';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import './verify-contact-form.scss';
import { GreenButton } from '../GreenButton/GreenButton';
import { VerifyContactContext } from '../../context/VerifyContactContext';

export const VerifyContactForm = () => {
  const dispatch = useDispatch();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(90);
  const { verify } = useContext(VerifyContactContext);
  const [isError, setIsError] = useState(false);

  const { mutate: newPassword } = useMutation(
    'new-verify-password',
    API.sendContact,
    {
      onSuccess: (data) => {
        if (data.data.result) {
          setIsError(false);
          toast.info('Yangi parol yuborildi!');
        }
      },
      onError: (err) => {
        setIsError(true);
        toast.error(
          `Ups parol yuborishlikda qandaydur hatolik chiqdi!
           Qaytadan urinib ko'ring`
        );
      },
    }
  );

  let time;

  const timerFunc = () => {
    time = setTimeout(() => {
      if (timer === 0) {
        func();
        newPassword(auth);
      } else {
        setTimer(timer - 1);
      }
    }, 1000);
  };

  function func() {
    clearTimeout(time);
  }

  useEffect(() => {
    timerFunc();
    if (JSON.stringify(auth) == '{}') return navigate('/');
  }, [timer]);

  const initialValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
  };

  const validationSchema = Yup.object({
    code1: Yup.number().required(),
    code2: Yup.number().required(),
    code3: Yup.number().required(),
    code4: Yup.number().required(),
    code5: Yup.number().required(),
  });

  const { mutate } = useMutation(
    'verify-contact',
    verify == 'update-password' ? API.verifyNewPassword : API.verifyContact,
    {
      onSuccess: (data) => {
        if (data.data.token) {
          localStorage.setItem('token', data.data.token);
          dispatch(setToken(data.data.token));
          toast.success("To'g'ri parol!");

          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      },
      onError: (err) => {
        toast.error("Noto'gri parol!");
      },
    }
  );

  const onSubmit = (values) => {
    let num = '';

    num += values.code1;
    num += values.code2;
    num += values.code3;
    num += values.code4;
    num += values.code5;

    mutate({
      phoneNumber: auth,
      code: +num,
    });
  };

  const handleBackspace = (formik, currentField, prevField) => (e) => {
    if (e.keyCode === 8 && formik.values[currentField] === '') {
      formik.setFieldTouched(prevField, true);
      document.querySelector(`input[name="${prevField}"]`).focus();
    }
  };

  const handleChange = (formik, currentField, nextField) => (e) => {
    if (e.target.value.length === 1) {
      if (nextField) {
        formik.setFieldTouched(nextField, true);
        document.querySelector(`input[name="${nextField}"]`).focus();
      }
    }

    formik.handleChange(e);
  };

  return (
    <section className="verify">
      <div className="container">
        <div className="verify__inner d-flex align-items-center justify-content-center">
          <motion.div
            className="verify__password"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}
          >
            <h2 className="fs-3 text-center">Parolni kiriting!</h2>
            <p className="text-center mb-4">
              Telefonni tasdiqlash uchun{' '}
              {auth.slice(0, 4) +
                ' ' +
                auth.slice(4, 6) +
                ' ' +
                auth.slice(6, 9) +
                '-' +
                auth.slice(9, 11) +
                '-' +
                auth.slice(11) +
                ' '}
              raqamiga 5 xonali parol yuborildi.
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <div>
                    <Field
                      required
                      type="number"
                      name="code1"
                      onKeyDown={handleBackspace(formik, 'code1', 'code5')}
                      onChange={handleChange(formik, 'code1', 'code2')}
                    />
                    <Field
                      required
                      type="number"
                      name="code2"
                      onKeyDown={handleBackspace(formik, 'code2', 'code1')}
                      onChange={handleChange(formik, 'code2', 'code3')}
                    />
                    <Field
                      required
                      type="number"
                      name="code3"
                      onKeyDown={handleBackspace(formik, 'code3', 'code2')}
                      onChange={handleChange(formik, 'code3', 'code4')}
                    />
                    <Field
                      required
                      type="number"
                      name="code4"
                      onKeyDown={handleBackspace(formik, 'code4', 'code3')}
                      onChange={handleChange(formik, 'code4', 'code5')}
                    />
                    <Field
                      required
                      type="number"
                      name="code5"
                      onKeyDown={handleBackspace(formik, 'code5', 'code4')}
                      onChange={handleChange(formik, 'code5')}
                    />
                  </div>
                  <GreenButton text="Yuborish" type="submit" />
                </Form>
              )}
            </Formik>
            {timer !== 0 ? (
              <p className="text-center mt-3">
                Agar parol kelmasa, siz{' '}
                <span className="text-danger">{timer}</span> soniyadan kegin
                yangi parolni olishingiz mumkun.
              </p>
            ) : isError ? (
              <p className="text-center mt-3">
                Parol yuborishlikda qandaydur xatolik ketdi! <br />{' '}
                <span className="text-danger">Qaytaddan urinib ko'ring!</span>
              </p>
            ) : (
              <p className="text-center mt-3">Sizga yangi parol yuborildi.</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
