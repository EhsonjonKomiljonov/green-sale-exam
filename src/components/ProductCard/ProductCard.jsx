import './product-card.scss';
const host = 'https://green-sale.onrender.com';

export const ProductCard = ({ obj }) => {
  const {
    name,
    description,
    imgLink,
    created_at,
    region,
    district,
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

  return (
    <div className={!sellered ? 'product-card' : 'd-none'}>
      <img
        src={typeof imgLink == 'object' ? host + imgLink[0] : host + imgLink}
        alt={name}
      />
      <div className="product-card__body">
        <div className="product-card__heading">
          <span className={sellered ? 'sellered' : ''}>
            {sellered ? 'Kelishilgan' : 'Yangi'}
          </span>
          <time className="product-card__time" dateTime="2023-08-10">
            <i className="fa-solid fa-clock"></i>
            {`${month}-${day} ${hour}:${minute}`}
          </time>
        </div>
        <h3 className="product-card__title">{name}</h3>
        <p className="product-card__desc">{description.slice(0, 40)}...</p>
        <p className="product-card__region">
          <i className="fa-solid fa-truck"></i>
          Manzil: {region}, {district}
        </p>
      </div>
    </div>
  );
};
