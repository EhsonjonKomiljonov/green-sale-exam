import React, { useContext, useEffect } from 'react';
import './myvacancies.scss';
import { ProductCard } from '../ProductCard/ProductCard.jsx';
import { API } from '../../API/api.js';
import { useState } from 'react';

export const MyVacanciesComp = () => {
  const [data, setData] = useState([]);

  const getVacancies = async () => {
    const data = await API.getMyPosts();
    setData(data.data.data);
  };

  useEffect(() => {
    getVacancies();
  }, [setData]);
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
      <section className='my__vacancies'>
        <div className='my__vacancies__inner'>
          <div className='container'>
            <h2 className='h2 my-4'>Mening vakansiyalarim</h2>
            <div className='my__vacancies__cards justify-content-center'>
              {data?.length ? (
                data.map((el) => (
                  <ProductCard
                    edit='true'
                    obj={el}
                    del='true'
                  />
                ))
              ) : (
                <h2 className='text-center w-100 my-5 pb-4'>
                  Hozircha vakansiyalaringiz yo'q !
                </h2>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
