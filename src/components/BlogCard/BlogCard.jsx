import React from 'react';

import './blogCard.scss';
export const BlogCard = (props) => {
  const { img, postedBy, comments, date, title, text } = props.props;

  return (
    <div className='col-12 p-0 blog__card col-xl-6 pt-xl-0  w-100 pt-3'>
      <img
        className='w-100'
        src={img}
        alt=''
      />
      <ul className='blog__card__info'>
        <li>{postedBy}</li>
        <li>{comments}</li>
        <li>{date}</li>
      </ul>
      <h3 className='blog__card__title'>{title}</h3>
      <p className='blog__card__text'>{text}</p>
      <button className='blog__card__button'>READ MORE</button>
    </div>
  );
};
