import React from 'react';
import { Header } from '../../components/Header/Header';
import { SellVacancyGetComp } from '../../components/SellVacancyGet/SellVacancyGet';
import { Footer } from '../../components/Footer/Footer.jsx';

export const SellVacancyGet = () => {
  return (
    <>
      <Header />
      <SellVacancyGetComp />
      <Footer />
    </>
  );
};
