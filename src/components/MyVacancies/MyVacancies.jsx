import React, { useContext, useEffect } from 'react';
import './myvacancies.scss';
import { ProductCard } from '../ProductCard/ProductCard.jsx';
import { API } from '../../API/api.js';
import { useState } from 'react';
import { Loading } from '../Loading/Loading';
import { LoadingContext } from '../../context/LoadingContext';
export const MyVacanciesComp = () => {
  // const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [data, setData] = useState([]);

  const getVacancies = async () => {
    // setIsLoading(true);
    const data = await API.getMyPosts();
    console.log(data);
    setData(data.data.data);
  };

  useEffect(() => {
    getVacancies();
  }, [setData]);

  return (
    <>
      <section className='my__vacancies'>
        <div className='my__vacancies__inner'>
          <div className='container'>
            <h2 className='h2 text-center'>My Vacancies</h2>
            <div className='my__vacancies__cards'>
              {data.length
                ? data.map((el) => (
                    <ProductCard
                      edit='true'
                      obj={el}
                      del='true'
                    />
                  ))
                : ''}
            </div>
          </div>
        </div>
      </section>
      {/* {isLoading && <Loading />} */}
    </>
  );
};
