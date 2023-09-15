import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { API } from '../../../API/api';
import { Loading } from '../../../components/Loading/Loading';
import { Pagination } from '../../../components/Pagination/Pagination';
import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { LoadingContext } from '../../../context/LoadingContext';

export const AdminBuy = () => {
  const [data, setData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { mutate } = useMutation('get-buyyer-admin', API.getBuyerPosts, {
    onSuccess: (data) => {
      if (data.data.status == 200) {
        setTotalPage(data.data.pages);
        setIsLoading(false);
        setData(data.data.data);
      }
    },
    onError: (err) => {
      toast.error(`Ups serverda qandaydur xatolik!
      Browser console da to'liq ma'lumot!`);
    },
  });

  useEffect(() => {
    setIsLoading(true);
    mutate({ c: null, page: activePage });
  }, [activePage]);

  return (
    <>
      <section className="admin">
        <div className="container">
          <div className="d-flex align-items-start justify-content-between">
            <h2 className="text-center mb-5 text-dark">Admin Page</h2>
            <div className='d-flex w-50 justify-content-between'>
              <input
                className="form-control w-50 ms-5"
                type="text"
                placeholder="Vakansiyani nomi bo'yicha izlang..."
              />
              <Link
                className="ms-5 fs-5 text-dark text-decoration-underline"
                to="/admin/seller"
              >
                Sotuvchi vakansiyalar
              </Link>
            </div>
          </div>
          <h3 className='mb-4'>Oluvchilar</h3>
          <div className="admin__inner d-flex align-items-center justify-content-between flex-wrap gap-5">
            {data.length ? (
              data.map((item) => <ProductCard obj={item} key={item._id} />)
            ) : (
              <h2 className="text-center w-100">
                Hozircha vakansiyalar mavjud emas!
              </h2>
            )}
          </div>
          <Pagination setActivePage={setActivePage} totalPage={totalPage} />
        </div>
      </section>

      {isLoading ? <Loading /> : ''}
    </>
  );
};
