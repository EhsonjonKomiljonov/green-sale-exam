import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { API } from '../../API/api';
import { CompareCard } from '../../components/CompareCard/CompareCard';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import RotatePhone from '../../assets/images/scroll-to-right.jpg';
import './compare.scss';

export const Compare = () => {
  const [prData, setPrData] = useState([]);
  const products = JSON.parse(localStorage.getItem('compare-products')) || [];

  const getProducts = async () => {
    const res = await Promise.all(
      products.map(async (item) => {
        let data = await API.getSingleBuyProduct(item);
        let data2 = await API.getSingleSellProduct(item);

        if (data?.data?.data?._id) {
          return data;
        }

        if (data2?.data?.data?._id) {
          return data2;
        }
      })
    );

    setPrData(res.map((el) => el.data.data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Header />
      <section className="compare-product my-5 pt-4 pb-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Taqqoslash</h2>
            <img
              className="rotate-phone"
              src={RotatePhone}
              alt="scroll"
              width={70}
            />
          </div>
          <div className="compare__inner d-flex justify-content-between mt-5">
            {prData.length ? (
              prData.map((item) => <CompareCard key={item._id} obj={item} />)
            ) : (
              <h3 className="my-3 text-center w-100 none-title">
                Hozircha Taqqoslov uchun vakansiyalar yo'q.
              </h3>
            )}
          </div>
          {prData.length ? (
            <button
              className="btn btn-danger mt-5 delete-compare-product-btn"
              onClick={(evt) => {
                localStorage.removeItem('compare-products');
                toast.success("O'chirildi!");

                setTimeout(() => {
                  location.reload();
                }, 1000);
              }}
            >
              Barchasini o'chirish
            </button>
          ) : (
            ''
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};
