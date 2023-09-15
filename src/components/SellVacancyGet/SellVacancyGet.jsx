import React, { useEffect } from 'react';
import './sellVacancyGet.scss';
import { Header } from '../Header/Header.jsx';
import { API } from '../../API/api';
import { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
export const SellVacancyGetComp = () => {
  const [data, setData] = useState('no');

  const getPosts = async (c) => {
    const data = await API.getSellerPosts(c);

    return setData(data.data.data);
  };

  useEffect(() => {
    getPosts();
  }, [setData]);

  const onChange = async (e) => {
    await getPosts(e.target.value);
  };

  const searchSubmit = async (e) => {
    e.preventDefault();
    const data = await API.getSellSearch(e.target.elements[0].value);
    if (data.data?.status == 200) {
      setData(data.data?.data);
    } else {
      toast.error(data.data?.message);
    }
  };

  return (
    <>
      <section className='sell__vacancy__get pb-5'>
        <div className='container'>
          <div className='sell__vacancy__get__inner'>
            <div className='sell__vacancy__get__top'>
              <h2 className='h2 my-4'>Sotuvchi vakansiyalar</h2>{' '}
              <div className='d-flex justify-content-between align-items-center'>
                <select
                  onChange={onChange}
                  className='sell__vacancy__get__select '
                >
                  <option value='64f07653f7c051e624804d5f'>Mevalar</option>
                  <option value='64f07653f7c051e624804d60'>
                    Poliz-Ekinlari
                  </option>
                  <option value='64f07d6885548d0039615a9a'>Sabzavotlar</option>
                </select>{' '}
                <form
                  onSubmit={searchSubmit}
                  className='d-flex input-group w-25'
                >
                  <input
                    type='text'
                    className='form-control '
                    placeholder='search'
                  />
                  <button className='btn btn-primary'>&#128270;</button>
                </form>
              </div>
            </div>
            <div className='sell__vacancy__get__cards'>
              {data === 'no' ? (
                <h2>Yuklanmoqda...</h2>
              ) : data.length ? (
                data.map((el) => <ProductCard obj={el} />)
              ) : (
                <h2>Sotuvchi vakansiyalar topilmadi!</h2>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
