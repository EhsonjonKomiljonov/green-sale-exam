import './product-card.scss';

export const ProductCard = ({ obj }) => {
  const { title, desc, img, time } = obj;
  const sellered = 0;
  return (
    <div 
      className={
        sellered == 0
          ? 'product-card'
          : sellered == 1
          ? 'product-card sellered'
          : 'd-none'
      }
    >
      <img src={img} alt={title} />
      <div className="product-card__body">
        <div className="product-card__heading">
          <span className={sellered ? 'sellered' : ''}>
            {sellered ? 'Kelishilgan' : 'Yangi'}
          </span>
          <time className="product-card__time" dateTime="2023-08-10">
            <i className="fa-solid fa-clock"></i> {time}
          </time>
        </div>
        <h3 className="product-card__title m-0">{title}</h3>
        <p className="product-card__desc">{desc}</p>
        <p className="product-card__region">
          <i className="fa-solid fa-truck"></i>
          Manzil: Andijon, Olmaliq
        </p>
      </div>
    </div>
  );
};
