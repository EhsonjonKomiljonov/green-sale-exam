import React, { useEffect } from 'react';
import './buyVacancyGet.scss';
import { API } from '../../API/api';
import { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';

export const BuyVacancyGetComp = () => {
  const [data, setData] = useState([]);

  const getPosts = async (c) => {
    console.log(c);
    const data = await API.getBuyerPosts(c);
    setData(data.data.data);
  };

  useEffect(() => {
    getPosts();
  }, [setData]);

  const onChange = async (e) => {
    console.log(await getPosts(e.target.value));
  };

  return (
    <>
      <section className='buy__vacancy__get'>
        <div className='container'>
          <div className='buy__vacancy__get__inner'>
            <div className='buy__vacancy__get__top'>
              <h2 className='h2 text-center'>
                  Oluvchi vakansiyalar
              </h2>{' '}
              <select
                onChange={onChange}
                className='buy__vacancy__get__select'
              >
                <option value='64f07653f7c051e624804d5f'>Mevalar</option>
                <option value='64f07653f7c051e624804d60'>Poliz-Ekinlari</option>
                <option value='64f07d6885548d0039615a9a'>Sabzavotlar</option>
              </select>
            </div>
            <div className='buy__vacancy__get__cards'>
              {data.length ? (
                data.map((el) => {
                  return <ProductCard obj={el} />;
                })
              ) : (
                <h1>Loading...</h1>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
