import React from 'react';
import { useQuery } from 'react-query';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../API/api';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

export const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(
    ['get-single-profile-user', id],
    () => API.getSingleUser(id),
    {
      onError: (err) => {
        toast.error(
          err.response.message == 'Bunday User mavjud emas!'
            ? 'Bunday User mavjud emas!'
            : err.response.message
        );
        navigate('/');
      },
      refetchOnWindowFocus: false,
    }
  );

  const Udata = data?.data?.data;

  return (
    <>
      <Header />
      <section className="user-profile mt-5">
        <div className="container">
          <div className="user-profile__inner">
            <div className="d-flex align-items-center justify-content-between">
              <h2>
                {Udata?.first_name} {Udata?.last_name}
              </h2>
              <time
                className="product-card__time fs-5"
                dateTime={Udata?.created_at || ''}
              >
                <i
                  className="fa-solid fa-clock"
                  style={{
                    display: 'inline-block',
                    margin: '0 5px 0 0',
                    color: '#60be74',
                  }}
                ></i>
                Ro'yxatdan o'tilgan: {Udata?.created_at.split('T')[0]}
              </time>
            </div>
            <div className="mt-4 d-flex align-items-center gap-5">
              <a
                className="fs-5 text-dark"
                target="_blank"
                href={`tel:${Udata?.contact}`}
              >
                Telegon orqali Bog'lanish:{' '}
                <span className="text-primary text-decoration-underline">
                  {Udata?.contact}
                </span>
              </a>
              <a
                className="fs-5 text-dark ms-5"
                target="_blank"
                href={`https://mail.google.com/mail/u/0/?${Udata?.email}#inbox`}
              >
                Email orqali bog'lanish:{' '}
                <span className="text-primary text-decoration-underline">
                  {Udata?.email}
                </span>
              </a>
            </div>
          </div>
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
};
