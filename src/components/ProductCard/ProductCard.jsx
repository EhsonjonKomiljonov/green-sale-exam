import { useContext, useEffect, useRef, useState } from 'react';
import { LoaderImageContext } from '../../context/LoaderImage';
import Loader from '../../assets/images/img-loader.svg';
import Placeholder from '../../assets/images/placeholder-product.png';
import './product-card.scss';
import { Link } from 'react-router-dom';
const host = 'https://green-sale.onrender.com';

export const ProductCard = ({ obj }) => {
  const {
    name,
    description,
    imgLink,
    created_at,
    region,
    district,
    _id,
    updated_at = null,
  } = obj;
  const sellered = false;

  const parts = created_at ? created_at.split('T') : updated_at.split('T');
  const dateParts = parts[0].split('-');
  const timeParts = parts[1].split(':');

  const day = dateParts[2];
  const month = dateParts[1];
  const hour = timeParts[0];
  const minute = timeParts[1];

  const { isLoadingImage, setIsLoadingImage } = useContext(LoaderImageContext);
  const [placeholderImg, setPlaceholderImg] = useState(false);

  const onLoadImage = () => {
    setIsLoadingImage(false);
  };

  const onErrorImage = () => {
    setPlaceholderImg(true);
  };

  return (
    <Link
      className="product-card-link"
      to={
        '/single-product/' + _id + '$type=' + (obj.price ? 'seller' : 'buyer')
      }
    >
      <div className={!sellered ? 'product-card' : 'd-none'}>
        <img
          onLoad={onLoadImage}
          onError={onErrorImage}
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
        <div className="product-card__body">
          <div className="product-card__heading">
            <span className={sellered ? 'sellered' : ''}>
              {sellered ? 'Kelishilgan' : 'Yangi'}
            </span>
            <time className="product-card__time" dateTime={created_at || ''}>
              <i className="fa-solid fa-clock"></i>
              {`${month}-${day} ${hour}:${minute}`}
            </time>
          </div>
          <h3 className="product-card__title">{name}</h3>
          <p className="product-card__desc">{description.slice(0, 40)}...</p>
          <p className="product-card__region">
            <i className="fa-solid fa-truck"></i>
            Manzil: {region}, {district.slice(0, 10)}...
          </p>
        </div>
      </div>
    </Link>
  );
};
