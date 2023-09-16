import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../../API/api';
import { ProductCard } from '../../ProductCard/ProductCard';

export const MySellVacancies = () => {
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

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="h2 my-4">Mening vakansiyalarim</h2>
        <Link
          to="/my-vacancies/buy"
          className="fs-5 text-dark text-decoration-underline"
        >
          Oluvchi vakansiyalar
        </Link>
      </div>
      <div className="d-flex justify-content-between flex-wrap gap-5">
        {data?.length ? (
          data.map((el) => <ProductCard edit="true" obj={el} del="true" />)
        ) : (
          <h2 className="text-center w-100 my-5 pb-4">
            Hozircha vakansiyalaringiz yo'q !
          </h2>
        )}
      </div>
    </>
  );
};
