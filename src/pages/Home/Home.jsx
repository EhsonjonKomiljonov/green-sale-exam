import React, { useEffect } from 'react';
import { Blog } from '../../components/Blog/Blog';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Hero } from '../../components/Hero/Hero';
import { Products } from '../../components/Products/Products';


export const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Products />
      <Blog />
      <Footer />
    </>
  );
};
