import './update-password-form.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { GreenButton } from '../GreenButton/GreenButton';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { API } from '../../API/api';
import { toast } from 'react-toastify';
import { useContext, useRef } from 'react';
import { LoadingContext } from '../../context/LoadingContext';
import { Loading } from '../Loading/Loading';
import Logo from '../../assets/images/logo.svg';
import GmailIcon from '../../assets/images/gmail-icon.png';

export const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const emailModalRef = useRef();

  const initialValues = {
    email: '',
    newPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Iltimos emailni kiriting!')
      .min(5)
      .max(120)
      .email("Noto'g'ri email!")
      .matches(
        /^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/,
        "Noto'g'ri email!"
      ),
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
      ),
  });

  const { mutate } = useMutation('update-user-password', API.updatePassword, {
    onSuccess: (data) => {
      if (data.data.status) {
        setIsLoading(false);
        emailModalRef.current.style.display = 'grid';
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
    mutate(values);
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
                  <label className="label" htmlFor="email">
                    Email (gmail, email, mail)
                  </label>
                  <Field name="email" type="text" />
                  <span className="err-message">
                    <ErrorMessage name="email" />
                  </span>
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

      <div className="verify-email-modal" ref={emailModalRef}>
        <div className="verify-email-modal__inner">
          <a className="logo" href="/">
            <img src={Logo} alt="Green Sale" width="70px" />
            <p>GREEN SALE</p>
          </a>
          <h2 className="h4 text-center">
            Biz emailingizga xabar yubordik, emailingizni tekshiring.
          </h2>
          <a href="https://mail.google.com/" target='_blank'>
            <img src={GmailIcon} alt="M" />
            Pochta
          </a>
        </div>
      </div>

      {isLoading ? <Loading /> : ''}
    </>
  );
};
