import './assets/styles/index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Home } from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { QueryClientProvider, QueryClient, useMutation } from 'react-query';
import { VerifyContact } from './pages/VerifyContact/VerifyContact';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './redux/token/tokenAction';
import { SellVacancyAdd } from './components/SellVacancyAdd/SellVacancyAdd';
import { UpdatePassword } from './pages/UpdatePassword/UpdatePassword';
import { MyProfile } from './pages/MyProfile/MyProfile';
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
          <Route path="/verify-contact" element={<VerifyContact />} />
          <Route path="/new-password" element={<UpdatePassword />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/sell-vacancies" element={<SellVacancyAdd />} />
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
      />
    </QueryClientProvider>
  );
}

export default App;
