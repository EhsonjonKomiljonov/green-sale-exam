import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../API/api';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { LoadingContext } from '../../context/LoadingContext';
import { Loading } from '../../components/Loading/Loading';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './admin.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

export const Admin = () => {
  const [data, setData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const token = useSelector((state) => state.token.token);
  const navigate = useNavigate();
  const admin_secret_key = import.meta.env.VITE_REACT_APP_ADMIN_SECRET_KEY;

  if (!token || admin_secret_key != localStorage.getItem('admin')) {
    navigate('/admin-login');
  }

  const { mutate } = useMutation('get-products-admin', API.getSellerPosts, {
    onSuccess: (data) => {
      if (data.data.status == 200) {
        setIsLoading(false);
        setData(data.data.data);
      }
    },
    onError: (err) => {
      toast.error(`Ups serverda qandaydur xatolik!
      Browser console da to'liq ma'lumot!`);
    },
  });

  const { mutate: buyMutate } = useMutation(
    'get-products-admin',
    API.getBuyerPosts,
    {
      onSuccess: (data) => {
        if (data.data.status == 200) {
          setIsLoading(false);
          setData(data.data.data);
        }
      },
      onError: (err) => {
        toast.error(`Ups serverda qandaydur xatolik!
      Browser console da to'liq ma'lumot!`);
      },
    }
  );

  useEffect(() => {
    setIsLoading(true);
    mutate();
  }, []);

  const changeProduct = (evt) => {
    if (evt.target.value == 'seller') {
      mutate();
    } else {
      buyMutate();
    }
  };

  return (
    <>
      <Header />
      <section className="admin">
        <div className="container">
          <div className="d-flex align-items-start justify-content-between">
            <h2 className="text-center mb-5 text-dark">Admin Page</h2>

            <select
              className="admin__change-product"
              onChange={(evt) => changeProduct(evt)}
            >
              <option defaultValue="seller" selected>
                Seller posts
              </option>
              <option value="buyer">Buyer posts</option>
            </select>
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
        </div>
      </section>
      <Footer />

      {isLoading ? <Loading /> : ''}
    </>
  );
};
