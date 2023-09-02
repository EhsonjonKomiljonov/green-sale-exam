import './update-password-form.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { GreenButton } from '../GreenButton/GreenButton';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { API } from '../../API/api';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';
import { Loading } from '../Loading/Loading';
import { VerifyContactContext } from '../../context/VerifyContactContext';
import { AuthContext } from '../../context/AuthContext';

export const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { setVerify } = useContext(VerifyContactContext);
  const { setAuth } = useContext(AuthContext);

  const initialValues = {
    phoneNumber: '',
    newPassword: '',
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required('Iltimos Telefon raqamingizni kiriting!')
      .min(8, 'Telefon raqam uzunligi 8 tadan ortiq bolishi lozim!')
      .max(9, "Telefon raqam uzunligi eng ko'pi 9 ta bolishi mumkin!"),
    newPassword: Yup.string()
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

  const { mutate } = useMutation('update-user-password', API.updatePassword, {
    onSuccess: (data) => {
      if (data.data.result) {
        setIsLoading(false);
        setVerify('update-password');
        navigate('/verify-contact');
      }
    },
    onError: (err) => {
      setIsLoading(false);
      if (err.response.data.ErrorMessage == 'User not found!') {
        toast.error('Bunday foydalanuvchi topilmadi!');
      } else toast.error(err.message);
    },
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    setAuth('+998' + values.phoneNumber);
    mutate({
      phoneNumber: '+998' + values.phoneNumber,
      newPassword: values.newPassword,
    });
  };

  return (
    <>
      <section className="update-password">
        <div className="container">
          <div className="update-password__inner">
            <h2>Yangi parol</h2>
            <p className="mb-4 mt-3 text-center">
              Bir urinishda parolinggizni yangilang.
            </p>
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
                    <Field id="phoneNumber" name="phoneNumber" type="number" />
                    <span className="err-message" data-has-content>
                      <ErrorMessage name="phoneNumber" />
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-column input-box">
                  <label className="label" htmlFor="newPassword">
                    Yangi parol
                  </label>
                  <Field id="newPassword" name="newPassword" type="password" />
                  <span className="err-message" data-has-content>
                    <ErrorMessage name="newPassword" />
                  </span>
                </div>

                <div className="verify__btn-box">
                  <GreenButton text="Yuborish" type="submit" />
                  <Link
                    className="d-block text-center text-dark mt-4 fs-5"
                    to="/"
                  >
                    Ortga
                  </Link>
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
