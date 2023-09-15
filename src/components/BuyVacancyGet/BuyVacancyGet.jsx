import React, { useContext, useEffect } from 'react';
import './buyVacancyGet.scss';
import { API } from '../../API/api';
import { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Loading } from '../Loading/Loading';
import { LoadingContext } from '../../context/LoadingContext';
import { toast } from 'react-toastify';
import { Pagination } from '../Pagination/Pagination';

export const BuyVacancyGetComp = () => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState();
  const [totalPage, setTotalPage] = useState(1);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const getPosts = async (c) => {
    setIsLoading(true);
    const data = await API.getBuyerPosts({ c, page: activePage });

    if (data.data?.status == 200) {
      setTotalPage(data.data.pages);
      setIsLoading(false);
    } else {
      toast.error(data.data?.message);
    }
    setData(data.data.data);
  };

  useEffect(() => {
    getPosts();
  }, [setData, activePage]);

  const onChange = async (e) => {
    await getPosts(e.target.value);
  };

  return (
    <>
      <section className="buy__vacancy__get pb-5">
        <div className="container">
          <div className="buy__vacancy__get__inner">
            <div className="buy__vacancy__get__top">
              <h2 className="h2 my-4">Oluvchi vakansiyalar</h2>{' '}
              <select onChange={onChange} className="buy__vacancy__get__select">
                <option value="64f07653f7c051e624804d5f">Mevalar</option>
                <option value="64f07653f7c051e624804d60">Poliz-Ekinlari</option>
                <option value="64f07d6885548d0039615a9a">Sabzavotlar</option>
              </select>
            </div>
            <div className="buy__vacancy__get__cards">
              {data.length ? (
                data.map((el) => {
                  return <ProductCard obj={el} />;
                })
              ) : (
                <h1>Oluvchi vakansiyalar topilmadi !</h1>
              )}
            </div>
          </div>
          <Pagination setActivePage={setActivePage} totalPage={totalPage} />
        </div>
      </section>

      {isLoading && !data?.length ? <Loading /> : ''}
    </>
  );
};
