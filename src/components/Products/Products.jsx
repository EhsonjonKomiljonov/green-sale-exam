import './products.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { products } from '../../db/products.js';
import { useState } from 'react';

export const Products = () => {
  const [data, setData] = useState(products.slice(0, 3));

  const viewAll = () => {
    data.length === 3 ? setData(products) : setData(products.slice(0, 3));
  };

  return (
    <section className="products py-5">
      <div className="container">
        <h2 className="mb-5">Products</h2>
        <div className="products__inner d-flex flex-wrap">
          {data.length ? (
            data.map((item) => <div key={item.title}><ProductCard obj={item} /></div>)
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <button onClick={() => viewAll()} className="view-btn">
          {data.length == 3 ? 'View All' : 'Hide All'}
        </button>
      </div>
    </section>
  );
};
