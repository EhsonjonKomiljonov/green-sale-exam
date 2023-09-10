import React, { useEffect } from 'react';
import './sellVacancyGet.scss';
import { Header } from '../Header/Header.jsx';
import { API } from '../../API/api';
import { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
export const SellVacancyGetComp = () => {
  const [data, setData] = useState([]);

  const getPosts = async (c) => {
    const data = await API.getSellerPosts(c);
    setData(data.data.data);
  };

  useEffect(() => {
    getPosts();
  }, [setData]);

  const onChange = async (e) => {
    await getPosts(e.target.value);
  };

  return (
    <>
      <section className='sell__vacancy__get'>
        <div className='container'>
          <div className='sell__vacancy__get__inner'>
            <div className='sell__vacancy__get__top'>
              <select
                onChange={onChange}
                className='sell__vacancy__get__select'
              >
                <option value='64f07653f7c051e624804d5f'>Mevalar</option>
                <option value='64f07653f7c051e624804d60'>Poliz-Ekinlari</option>
                <option value='64f07d6885548d0039615a9a'>Sabzavotlar</option>
              </select>
            </div>
            <div className='sell__vacancy__get__cards'>
              {data.map((el) => {
                return <ProductCard obj={el} />;
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
