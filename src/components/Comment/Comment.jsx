import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { VerifyTokenContext } from '../../context/VerifyToken';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../API/api';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import editicon from '../../assets/images/edit_icon.svg';
import deleteicon from '../../assets/images/delete_icon.svg';
import { AuthContext } from '../../context/AuthContext';
import { Loading } from '../Loading/Loading';

export const Comment = ({ obj }) => {
  const admin_sec_key = import.meta.env.VITE_REACT_APP_ADMIN_SECRET_KEY;
  const params = useParams();
  const id = params?.id.split('$')[0];
  const { auth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { verifyToken, setVerifyToken } = useContext(VerifyTokenContext);

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
        }, 1000);
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

  const { mutate: editCommentUser } = useMutation(
    'edit-comment-user',
    API.editComment,
    {
      onSuccess: (data) => {
        if (data.data.status == 200) {
          setIsLoading(false);
          toast.info("Izoh o'zgartirildi!");

          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      },
      onError: (err) => {
        toast.error(`Ups serverda qandaydur xatolik!
        Saytni yangilang.`);
      },
    }
  );

  const { mutate: deleteCommentUser } = useMutation(
    'edit-comment-user',
    API.deleteComment,
    {
      onSuccess: (data) => {
        if (data.data.status == 200) {
          setIsLoading(false);
          toast.info("Izoh o'chirildi!");

          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      },
      onError: (err) => {
        toast.error(`Ups serverda qandaydur xatolik!
        Saytni yangilang.`);
      },
    }
  );

  const { mutate: deleteUserCommentAdmin } = useMutation(
    'delete-comment-admin',
    API.deleteCommentAdmin,
    {
      onSuccess: (data) => {
        console.log(data);
        if (data.data.status == 200) {
          setIsLoading(false);
          toast.info("Izoh o'chirildi!");

          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      },
      onError: (err) => {
        toast.error(`Ups serverda qandaydur xatolik!
        Saytni yangilang.`);
      },
    }
  );

  const deleteComment = (evt) => {
    const res = prompt(
      `Aniq o'chirmoqchimisiz?
    HA yoki YO'Q`,
      "YO'Q"
    );

    if (res.toLowerCase() == "yo'q") {
      toast.info("O'chirilmadi !");
      return;
    } else if (res.toLowerCase() == 'ha') {
      deleteCommentUser(evt.target.id);
    }
  };

  const editComment = async (evt) => {
    let getComment = obj?.comments.find((item) => item._id == evt.target.id);
    let text = await prompt("Yangi ko'mmentni kiriting!", getComment?.text);

    if (!text || text.length < 3) {
      toast.error(`Izohingiz O'zgartirilmadi!
      Izoh eng kami 3 harfdan iborat bo'lishi lozim!`);
    } else {
      setIsLoading(true);
      editCommentUser({ text, id: evt.target.id });
    }
  };

  const deleteCommentAdmin = async (evt) => {
    const res = await prompt(
      `Aniq o'chirmoqchimisiz?
    HA yoki YO'Q`,
      "YO'Q"
    );

    if (res.toLowerCase() == "yo'q") {
      toast.info("O'chirilmadi !");
      return;
    } else if (res.toLowerCase() == 'ha') {
      await deleteUserCommentAdmin(evt.target.id);
    }
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
                  Yuborish
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
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-4 mb-3">
                    <h4 className="m-0">
                      {commentGroup[0].user_ref_id.first_name}{' '}
                      {commentGroup[0].user_ref_id.last_name}:
                    </h4>
                  </div>
                  <div className="d-flex flex-column">
                    <Link
                      className="text-dark text-opacity-75 text-decoration-underline"
                      to={`/user-profile/${commentGroup[0].user_ref_id._id}`}
                    >
                      Profilni ko'rish
                    </Link>
                  </div>
                </div>
                <div>
                  {commentGroup.map((comment) => (
                    <div
                      style={{ whiteSpace: 'pre-wrap' }}
                      className="d-flex flex-column"
                      key={comment._id}
                    >
                      <div className="d-flex flex-column-reverse">
                        <p className="ms-5 fs-6 mb-3">{comment.text}</p>
                        <p
                          className="ms-5"
                          style={{
                            fontWeight: 'bold',
                            color: '#308f1b',
                          }}
                        >
                          {(function () {
                            const createdAt = new Date(comment.created_at);
                            const now = new Date();
                            const diffInHours =
                              Math.abs(now - createdAt) / 36e5;
                            const hours = Math.floor(diffInHours);
                            const minutes = Math.floor(
                              (diffInHours - hours) * 60
                            );
                            return `${hours == 0 ? '' : hours + ' soat-'}${
                              minutes == 0 ? '' : minutes + ' daqiqa'
                            } ${
                              hours == 0 && minutes == 0
                                ? 'Hozir yozildi.'
                                : 'avval.'
                            }`;
                          })()}
                        </p>
                      </div>
                      {commentGroup[0]?.user_ref_id?.contact == auth &&
                      !localStorage.getItem('admin') ? (
                        <div className="w-100 d-flex justify-content-end">
                          <button
                            type="button"
                            className="btn p-0 text-warning fw-bold"
                            id={commentGroup[0]?._id}
                            onClick={(evt) => editComment(evt)}
                          >
                            o'zgartirish
                          </button>
                          <button
                            onClick={(evt) => deleteComment(evt)}
                            type="button"
                            className="btn ms-2 p-0 text-danger fw-bold"
                            id={commentGroup[0]?._id}
                          >
                            o'chirish
                          </button>
                        </div>
                      ) : (
                        ''
                      )}
                      {localStorage.getItem('admin') == admin_sec_key && (
                        <button
                          onClick={(evt) => deleteCommentAdmin(evt)}
                          type="button"
                          className="btn ms-2 p-0 text-danger fw-bold"
                          id={commentGroup[0]?._id}
                        >
                          o'chirish
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </li>
            ))
          ) : (
            <li className="h4">Hozircha izohlar mavjud emas.</li>
          )}
        </ul>

        {isLoading ? <Loading /> : ''}
      </div>
    </section>
  );
};
