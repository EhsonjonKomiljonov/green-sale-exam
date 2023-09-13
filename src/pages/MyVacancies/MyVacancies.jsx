import React from 'react';
import { Header } from '../../components/Header/Header.jsx';
import { MyVacanciesComp } from '../../components/MyVacancies/MyVacancies.jsx';
import { Footer } from '../../components/Footer/Footer.jsx';

export const MyVacancies = () => {
  return (
    <>
      <Header />
      <MyVacanciesComp />
      <Footer />
    </>
  );
};
