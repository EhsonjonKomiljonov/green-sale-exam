import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import SearchIcon from '../../../assets/images/search-icon.png';
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
        setData(data.data.data.slice(0, 10));
      }
    },
    onError: (err) => {
      toast.error(`Ups serverda qandaydur xatolik!
      Browser console da to'liq ma'lumot!`);
    },
  });

  const onChange = (e) => {
    mutate({ c: e.target.value == 'null' ? null : e.target.value });
  };

  const searchSubmit = async (e) => {
    e.preventDefault();
    const data = await API.getBuySearch({
      val: e.target.elements[0].value,
      page: activePage,
    });
    if (data.data?.status == 200) {
      setData(data.data?.data);
    } else {
      toast.error(data.data?.message);
    }
  };

  const getMainPosts = (evt) => {
    if (!evt.target.value.length) {
      mutate({ c: null, page: activePage });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    mutate({ c: null, page: activePage });
  }, [activePage]);

  return (
    <>
      <section className="admin">
        <div className="container">
          <div className="d-flex align-items-start justify-content-between">
            <h2 className="text-center mb-4 text-dark">Admin Page</h2>
            <Link
              className="ms-5 fs-5 text-dark text-decoration-underline"
              to="/admin/seller"
            >
              Sotuvchi vakansiyalar
            </Link>
          </div>
          <h3 className="mb-4">Oluvchilar</h3>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <select onChange={onChange} className="sell__vacancy__get__select ">
              <option value="1" selected disabled>
                Kategoriya tanlang...
              </option>
              <option value="64f07653f7c051e624804d5f">Mevalar</option>
              <option value="64f07653f7c051e624804d60">Poliz-Ekinlari</option>
              <option value="64f07d6885548d0039615a9a">Sabzavotlar</option>
              <option value="null">Barchasi</option>
            </select>
            <form
              style={{ width: 400 }}
              onSubmit={searchSubmit}
              className="d-flex input-group"
            >
              <input
                onChange={(evt) => getMainPosts(evt)}
                type="text"
                className="form-control"
                placeholder="Sotuvchi vakansiyani nomi bo'yicha izlang..."
              />
              <button className="btn border">
                <img
                  src={SearchIcon}
                  alt="search"
                  width={20}
                  style={{ transform: 'scaleX(-1)' }}
                />
              </button>
            </form>
          </div>
          <div className="admin__inner d-flex align-items-center justify-content-between flex-wrap gap-5">
            {data.length ? (
              data.map((item) => <ProductCard obj={item} key={item._id} />)
            ) : (
              <h2 className="text-center w-100">
                Hozircha vakansiyalar mavjud emas!
              </h2>
            )}
          </div>
          {data.length ? (
            <Pagination setActivePage={setActivePage} totalPage={totalPage} />
          ) : (
            ''
          )}
        </div>
      </section>

      {isLoading ? <Loading /> : ''}
    </>
  );
};
