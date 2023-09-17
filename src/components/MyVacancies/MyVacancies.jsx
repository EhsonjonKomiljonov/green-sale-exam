import React, { useContext, useEffect } from 'react';
import './myvacancies.scss';
import { ProductCard } from '../ProductCard/ProductCard.jsx';
import { API } from '../../API/api.js';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const MyVacanciesComp = () => {
  const [data, setData] = useState([]);

  const getVacancies = async () => {
    const data = await API.getMySellPosts();

    if (data.data.status == 200) {
      setData(data.data.data);
    }
  };

  useEffect(() => {
    getVacancies();
  }, []);
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
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};
