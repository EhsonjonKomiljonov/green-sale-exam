import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../../API/api';
import { ProductCard } from '../../ProductCard/ProductCard';
import SearchIcon from '../../../assets/images/search-icon.png';

export const MyBuyVacancies = () => {
  const [data, setData] = useState([]);

  const getVacancies = async () => {
    const data = await API.getMyBuyPosts();

    if (data.data.status == 200) {
      setData(data.data.data);
    }
  };

  const getPosts = async (s, cId) => {
    const data = await API.getMyBuyPosts(s, cId);

    if (data.data?.status == 200) {
    } else {
      toast.error(data.data?.message);
    }

    return setData(data.data.data);
  };

  const onChange = async (e) => {
    await getPosts(null, e.target.value == 'null' ? null : e.target.value);
  };

  const searchSubmit = async (e) => {
    e.preventDefault();
    getPosts(e.target.elements[0].value, null);
  };
  const getMainPosts = (evt) => {
    if (!evt.target.value.length) {
      getPosts();
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
          to="/my-vacancies/sell"
          className="fs-5 text-dark text-decoration-underline"
        >
          Sotuvchi vakansiyalar
        </Link>
      </div>{' '}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <select onChange={onChange} className="sell__vacancy__get__select ">
          <option value="1" selected disabled>
            Kategoriyani tanlang...
          </option>
          <option value="6507ea8059f642ae7e96e29b">Sabzavotlar</option>
          <option value="6507eaa8a56f231cf168c608">Poliz-ekinlari</option>
          <option value="6507ea98ed8a459c1bb6b595">Mevalar</option>
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
