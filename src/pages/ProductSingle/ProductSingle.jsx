import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import { API } from '../../API/api';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Loading } from '../../components/Loading/Loading';
import { LoadingContext } from '../../context/LoadingContext';
import Placeholder from '../../assets/images/placeholder-product.png';
import './product-single.scss';

export const ProductSingle = () => {
  const params = useParams();
  const id = params?.id.split('$')[0];
  const type = params?.id.split('$type=')[1];
  const [data, setData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const host = import.meta.env.VITE_REACT_APP_HOST;

  const { mutate: buyMutate } = useMutation(
    'get-single-buy-product',
    API.getSingleBuyProduct,
    {
      onSuccess: (data) => {
        console.log(data);
        if (data.data.status == 200) {
          setData(data.data.data);
          setIsLoading(false);
        }
      },
      onError: (err) => {
        toast.error(`Ups serverda qandaydur xatolik!
        Saytni yangilang.`);
      },
      retry: 1,
    }
  );

  const { mutate: sellMutate } = useMutation(
    'get-single-sell-product',
    API.getSingleSellProduct,
    {
      onSuccess: (data) => {
        if (data.data.status == 200) {
          setData(data.data.data);
          setIsLoading(false);
        }
      },
      onError: (err) => {
        toast.error(`Ups serverda qandaydur xatolik!
        Saytni yangilang.`);
      },
      retry: 1,
    }
  );

  const parts = data?.created_at ? data?.created_at.split('T') : '';

  let day;
  let month;
  let hour;
  let minute;

  if (data?.created_at) {
    const dateParts = parts[0]?.split('-');
    const timeParts = parts[1]?.split(':');

    day = dateParts[2];
    month = dateParts[1];
    hour = timeParts[0];
    minute = timeParts[1];
  }

  useEffect(() => {
    if (type == 'seller') {
      setIsLoading(true);
      sellMutate(id);
    } else {
      setIsLoading(true);
      buyMutate(id);
    }
  }, []);

  const settings = {
    className: 'slider',
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log(data);

  return (
    <>
      <Header />
      <div className="single-product">
        <h2 hidden>User Single</h2>
        <div className="container">
          <div className="single-product__inner row">
            <div className="single-product__left col-7">
              <Slider {...settings}>
                {data?.imgLink?.length ? (
                  data.imgLink.map((image) => (
                    <img
                      className="single-carousel__img"
                      key={image}
                      src={host + image}
                    />
                  ))
                ) : (
                  <img className="single-carousel__img" src={Placeholder} />
                )}
              </Slider>
            </div>
            <div className="single-product__right col-5">
              <div className="single-product__product product">
                <time dateTime={data?.created_at || ''}>
                  <i className="fa-solid fa-clock"></i>
                  {`${month}-${day} ${hour}:${minute}`}
                </time>
                <h3>
                  {data.name}, {data.type}
                </h3>
                <p className="product__desc">{data.description}.</p>
                {type == 'seller' ? (
                  <p className="product__price">Narxi: {data.price} so'm</p>
                ) : (
                  ''
                )}
                <p>
                  Hajmi: {data.capacity} {data.capacityMeasure}
                </p>
              </div>
              <div className="single-product__user single-user">
                <p className="single-user__address">
                  Manzil: {data.region}, {data.district}
                </p>
                <a
                  href={`tel:${data.contact}`}
                  className="single-user__contact"
                >
                  Bog'lanish: {data.contact}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {isLoading ? <Loading /> : ''}
    </>
  );
};
