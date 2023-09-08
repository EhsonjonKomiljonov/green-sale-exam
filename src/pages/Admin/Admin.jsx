import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { API } from '../../API/api';
import { Loading } from '../../components/Loading/Loading';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './admin.scss';

export const Admin = () => {
  const [sellerData, setSellerData] = useState([]);

  const { mutate } = useMutation(
    'get-products-admin',
    API.getMainSellProducts,
    {
      onSuccess: (data) => {
        if (data.data.status == 200) {
          setSellerData(data.data.data);
        }
      },
      onError: (err) => {
        toast.error(`Ups serverda qandaydur xatolik!
      Browser console da to'liq ma'lumot!`);
      },
    }
  );

  useEffect(() => {
    mutate();
  }, []);

  return (
    <section className="admin">
      <div className="container">
        <h2 className="text-center mb-5 text-dark">Admin Page</h2>
        <div className="admin__inner d-flex align-items-center justify-content-between flex-wrap gap-5">
          {sellerData.length ? (
            sellerData.map((item) => <ProductCard obj={item} />)
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </section>
  );
};
