import './assets/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Home } from './pages/Home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setToken } from './redux/token/tokenAction';
import { SellVacancyAdd } from './components/SellVacancyAdd/SellVacancyAdd';
import { UpdatePassword } from './pages/UpdatePassword/UpdatePassword';
import { MyProfile } from './pages/MyProfile/MyProfile';
import { BuyVacancyAdd } from './pages/BuyVacancyAdd/BuyVacancyAdd';
import { SellVacancyGet } from './pages/SellVacancyGet/SellVacancyGet';
import { Admin } from './pages/Admin/Admin';
import { useRef } from 'react';
import { ProductSingle } from './pages/ProductSingle/ProductSingle';
import { BuyVacancyGet } from './pages/BuyVacancyGet/BuyVacancyGet';
import { AdminLogin } from './pages/AdminLogin/AdminLogin';
import { MyVacancies } from './pages/MyVacancies/MyVacancies';
import { About } from './pages/About/About';
import { AdminSell } from './pages/Admin/AdminSell/AdminSell';
import { AdminBuy } from './pages/Admin/AdminBuy/AdminBuy';
import { Favorites } from './pages/Favorites/Favorites';
const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();

  dispatch(setToken(localStorage.getItem('token') || ''));

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-password" element={<UpdatePassword />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/sell-vacancies" element={<SellVacancyAdd />} />
          <Route path="/buy-vacancies" element={<BuyVacancyAdd />} />
          <Route path="/admin/*" element={<Admin />}>
            <Route index element={<Navigate to="seller" />} />
            <Route path="seller" element={<AdminSell />} />
            <Route path="buyer" element={<AdminBuy />} />
          </Route>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/single-product/:id" element={<ProductSingle />} />
          <Route path="/seller-vacancies" element={<SellVacancyGet />} />
          <Route path="/buyer-vacancies" element={<BuyVacancyGet />} />
          <Route path="/my-vacancies" element={<MyVacancies />} />
          <Route path="/about" element={<About />} />
          <Route path="/favorite-vacancies" element={<Favorites />} />
        </Routes>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit="5"
      />
    </QueryClientProvider>
  );
}
// 2.592e8
export default App;
