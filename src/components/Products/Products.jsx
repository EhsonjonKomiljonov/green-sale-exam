import './products.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { useQuery } from 'react-query';
import { API } from '../../API/api';
import { toast } from 'react-toastify';
import { GreenButton } from '../GreenButton/GreenButton';
import { Link } from 'react-router-dom';

export const Products = () => {
  const { data } = useQuery('get-products', API.getProducts, {
    onSuccess: (data) => {
      console.log('1');
    },
    onError: (err) => {
      toast.error('Ups serverda xatolik saytni yangilang!');
    },
    refetchOnWindowFocus: false,
  });

  return (
    <section className="products py-5">
      <div className="container">
        <h2 className="mb-5">Products</h2>
        <div className="products__inner d-flex flex-wrap">
          {data?.data?.data?.length ? (
            data.data.data.map((item) => (
              <div key={item._id}>
                <ProductCard obj={item} />
              </div>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <Link to="/seller-vacancies">
          <GreenButton text="Barchasini ko'rish" />
        </Link>
      </div>
    </section>
  );
};
