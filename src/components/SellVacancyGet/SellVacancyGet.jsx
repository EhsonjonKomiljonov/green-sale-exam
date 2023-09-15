import React, { useEffect } from 'react';
import './sellVacancyGet.scss';
import { Header } from '../Header/Header.jsx';
import { API } from '../../API/api';
import { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Pagination } from '../Pagination/Pagination';
import { Loading } from '../Loading/Loading';
export const SellVacancyGetComp = () => {
  const [data, setData] = useState('no');
  const [activePage, setActivePage] = useState();
  const [totalPage, setTotalPage] = useState(1);

  const getPosts = async (c) => {
    const data = await API.getSellerPosts({c, page: activePage});

    setTotalPage(data.data.pages);

    return setData(data.data.data);
  };

  useEffect(() => {
    getPosts();
  }, [setData, activePage]);

  const onChange = async (e) => {
    await getPosts(e.target.value);
  };

  return (
    <>
      <section className="sell__vacancy__get pb-5">
        <div className="container">
          <div className="sell__vacancy__get__inner">
            <div className="sell__vacancy__get__top">
              <h2 className="h2 my-4">Sotuvchi vakansiyalar</h2>{' '}
              <select
                onChange={onChange}
                className="sell__vacancy__get__select"
              >
                <option value="64f07653f7c051e624804d5f">Mevalar</option>
                <option value="64f07653f7c051e624804d60">Poliz-Ekinlari</option>
                <option value="64f07d6885548d0039615a9a">Sabzavotlar</option>
              </select>
            </div>
            <div className="sell__vacancy__get__cards">
              {data === 'no' ? (
                <Loading />
              ) : data.length ? (
                data.map((el) => <ProductCard obj={el} />)
              ) : (
                <h2>Sotuvchi vakansiyalar topilmadi!</h2>
              )}
            </div>
          </div>
          <Pagination setActivePage={setActivePage} totalPage={totalPage} />
        </div>
      </section>
    </>
  );
};
