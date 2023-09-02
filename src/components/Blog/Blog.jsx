import React from 'react';
import Banner from '../../assets/images/blogBanner.jpg';
import Blog1 from '../../assets/images/Blog1.png';
import Blog2 from '../../assets/images/Blog2.png';
import './blog.scss';
import { BlogCard } from '../BlogCard/BlogCard';

export const Blog = () => {
  const propsCard = [
    {
      img: Blog1,
      postedBy: 'Posted By MagikThemes',
      comments: '5 Comments',
      date: 'January 04, 2016',
      title: 'Pellentesque habitant morbi',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Vestibulum et mi vulputate gen vehicula maximus sagittis 
    rhoncus tortor. Class aptent taciti sociosqu ad litora`,
    },
    {
      img: Blog2,
      postedBy: 'Posted By MagikThemes',
      comments: '4 Comments',
      date: 'December 02, 2015',
      title: 'Standard blog post with photo',
      text: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec mollis. Quis quefgh
      convallis libero in sapien pharetra tincidunt. Aliquam elit ante, malesuada id, tempor`,
    },
  ];
  return (
    <>
      <section className="blog">
        <div className="container">
          <div className="blog__inner">
            <img className="w-100" src={Banner} alt="" />
            <div
              className="row pt-4 blog__cards justify-content-between m-0 
            "
            >
              {propsCard.map((el) => {
                return (
                  <div key={el.date} className='col'>
                    <BlogCard props={el} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
