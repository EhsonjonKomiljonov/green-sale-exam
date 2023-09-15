import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { LoadingContext } from '../../context/LoadingContext';
import { Loading } from '../../components/Loading/Loading';
import './admin.scss';

export const Admin = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const token = useSelector((state) => state.token.token);
  const navigate = useNavigate();
  const admin_secret_key = import.meta.env.VITE_REACT_APP_ADMIN_SECRET_KEY;

  if (!token || admin_secret_key != localStorage.getItem('admin')) {
    navigate('/admin-login');
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />

      {isLoading ? <Loading /> : ''}
    </>
  );
};
