import React from 'react';
import { useContext } from 'react';
import { LoaderImageContext } from '../../context/LoaderImage';
import Loader from '../../assets/images/img-loader.svg';
import Placeholder from '../../assets/images/placeholder-product.png';
import { useState } from 'react';
import './compare-card.scss';
import { Link } from 'react-router-dom';

export const CompareCard = ({ obj }) => {
  const host = import.meta.env.VITE_REACT_APP_HOST;
  const {
    name,
    description,
    imgLink,
    created_at,
    region,
    district,
    _id,
    updated_at = null,
    favorite,
  } = obj;

  const { isLoadingImage, setIsLoadingImage } = useContext(LoaderImageContext);
  const [placeholderImg, setPlaceholderImg] = useState(false);

  const parts = created_at ? created_at.split('T') : updated_at.split('T');
  const dateParts = parts[0].split('-');
  const timeParts = parts[1].split(':');

  const day = dateParts[2];
  const month = dateParts[1];
  const hour = timeParts[0];
  const minute = timeParts[1];

  const onLoadImage = () => {
    setIsLoadingImage(false);
  };

  const onErrorImage = () => {
    setPlaceholderImg(true);
  };

  console.log(obj);

  return (
    <div className="compare-card">
      <Link
        className="product-card-link"
        to={
          '/single-product/' + _id + '$type=' + (obj.price ? 'seller' : 'buyer')
        }
      >
        <img
          onLoad={onLoadImage}
          onError={onErrorImage}
          className="product__card__img"
          style={{
            display: isLoadingImage ? 'block' : '',
            width: isLoadingImage ? '200px' : '',
            height: isLoadingImage ? 'auto' : '',
            margin: isLoadingImage ? '0 auto' : '',
          }}
          src={
            isLoadingImage
              ? Loader
              : placeholderImg != false
              ? Placeholder
              : typeof imgLink == 'object'
              ? host + imgLink[0]
              : host + imgLink
          }
          alt={name}
        />
        <div className="compare-card__content">
          <h3 className="h5 mb-4">
            Vakansiya egasi: {obj?.user_ref_id?.first_name}{' '}
            {obj?.user_ref_id?.last_name}
          </h3>
          <div className="d-flex justify-content-between">
            <h3 className="mb-4">Nomi: {name}</h3>
            <time className="product-card__time" dateTime={created_at || ''}>
              <i
                style={{
                  margin: '0 10px',
                  color: '#60be74',
                  fontSize: '14px',
                }}
                className="fa-solid fa-clock"
              ></i>
              {`${month}-${day} ${hour}:${minute}`}
            </time>
          </div>
          <p className="fs-5">Tipi: {obj?.type}</p>
          <p className="fs-5 mb-2">Kategoriya: {obj?.category_ref_id?.name}</p>
          <p className="mb-1">
            Manzil: {region.slice(0, 1).toUpperCase() + region.slice(1)},{' '}
            {district.slice(0, 1).toUpperCase() + district.slice(1)}
          </p>
          <a href={'tel:' + obj?.contact} className="text-dark">
            Bog'lanish:{' '}
            <span className="text-decoration-underline text-secondary">
              {obj?.contact}
            </span>
          </a>
          <p>
            Sig'imi: {obj?.capacity} {obj?.capacityMeasure}
          </p>
          <p className="mt-3">Izoh: {description}</p>
        </div>
      </Link>
    </div>
  );
};
