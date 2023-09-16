import SearchIcon from '../../assets/images/search-icon.png';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { VerifyTokenContext } from '../../context/VerifyToken';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../API/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

export const Comment = ({ obj }) => {
  const params = useParams();
  const id = params?.id.split('$')[0];
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { verifyToken, setVerifyToken } = useContext(VerifyTokenContext);
  const type = params?.id.split('$type=')[1];
  const navigate = useNavigate();

  const query = useQuery('verify-token', API.verifyToken, {
    onSuccess: (data) => {
      setIsLoading(false);
      if (data.data.data) {
        setIsLoading(false);
        setVerifyToken(true);
      } else setVerifyToken(false);
    },
    onError: (err) => {
      setIsLoading(false);
      setVerifyToken(false);
      toast.error('Qandaydur xatolik saytni yangilang!');
    },
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation('post-comment', API.postComment, {
    onSuccess: (data) => {
      if (data.data.status == 200) {
        toast.success("Izohingiz qo'shildi!");
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    },
    onError: (err) => {
      toast.error(`Ups serverda qandaydur xatolik!
      Saytni yangilang.`);
    },
    retry: 1,
  });

  const initialValue = {
    text: '',
  };

  const validate = Yup.object({
    text: Yup.string()
      .required("Izoh qoldirish uchun to'ldiring!")
      .min(3, "Izon kamida 3 harfdan iborat bo'ishi lozim!")
      .max(120, "Izon ko'pi 120 harfdan iborat bo'ishi lozim!"),
  });

  const onSubmit = (values) => {
    mutate({ text: values.text, product_ref_id: obj._id });
  };

  return (
    <section className="comments">
      <div className="container">
        <h2 className="mt-5">Izohlar:</h2>
        {verifyToken ? (
          <Formik
            initialValues={initialValue}
            validationSchema={validate}
            onSubmit={onSubmit}
          >
            <Form className="w-75">
              <div className="w-50 mt-4 input-group">
                <Field
                  name="text"
                  type="text"
                  className="form-control"
                  placeholder="Siz ham izoh qoldiring..."
                />
                <button className="btn border" type="submit">
                  <img
                    src={SearchIcon}
                    alt="search"
                    width={20}
                    style={{ transform: 'scaleX(-1)' }}
                  />
                </button>
              </div>
              <span className="text-danger">
                <ErrorMessage name="text" />
              </span>
            </Form>
          </Formik>
        ) : (
          <h4 className="mt-4">
            Izoh qoldirish uchun ro'yxatdan o'ting!{' '}
            <Link className="fs-5" to="/register">
              Ro'yxatdan o'tish
            </Link>
          </h4>
        )}

        <ul className="list-group mt-5">
          {obj?.comments?.length ? (
            Object.values(
              obj.comments.reduce((groupedComments, comment) => {
                const userEmail = comment.user_ref_id.email;
                if (!groupedComments[userEmail]) {
                  groupedComments[userEmail] = [];
                }
                groupedComments[userEmail].push(comment);
                return groupedComments;
              }, {})
            ).map((commentGroup, index) => (
              <li className="list-group-item" key={index}>
                <div className="d-flex align-items-center">
                  <h4 className="me-5 pe-5">
                    {commentGroup[0].user_ref_id.first_name}{' '}
                    {commentGroup[0].user_ref_id.last_name}
                  </h4>
                  <Link
                    className="text-dark text-opacity-75 text-decoration-underline"
                    to={`/user-profile/${commentGroup[0].user_ref_id._id}`}
                  >
                    Profilni ko'rish
                  </Link>
                </div>
                <ul>
                  {commentGroup.map((comment) => (
                    <li key={comment._id}>
                      <p className="ms-5 fs-5">{comment.text}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))
          ) : (
            <li className="h4">Hozircha izohlar mavjud emas.</li>
          )}
        </ul>
      </div>
    </section>
  );
};
