import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { API } from '../../../API/api';
import { ProductCard } from '../../../components/ProductCard/ProductCard';

export const UserProfileBuyPosts = () => {
  const params = useParams();

  const { data } = useQuery(
    'get-user-buy-posts',
    () => API.getBuyPostsById(params?.id),
    {
      onError: (err) => {
        toast.error('Ups, serverda qandaydur xatolik, saytni yangilang!');
      },
    }
  );

  const postUser = data?.data?.data;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="my-4 mt-5">Joylangan vakansiyalar:</h3>
        <Link
          className="fs-5 text-dark text-decoration-underline"
          to={`/user-profile/${params?.id}/seller`}
        >
          Sotuvchi vakansiyalar
        </Link>
      </div>
      <div className="user-sell-posts__inner d-flex justify-content-between flex-wrap gap-5">
        {postUser?.length ? (
          postUser.map((item) => <ProductCard obj={item} />)
        ) : (
          <h2 className="my-4 text-center">Hozircha vakansiya joylanmagan.</h2>
        )}
      </div>
    </>
  );
};
