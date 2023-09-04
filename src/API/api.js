import axios from 'axios';

// const host = 'https://green-sale.onrender.com';
const host = 'http://localhost:9000';

export const API = {
  verifyToken: () =>
    axios.get(host + '/check-token', {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }),
  registerUser: (user) => axios.post(host + '/users', user),
  loginUser: (user) => axios.post(host + '/users/login', user),
  // sendContact: (phone) =>
  //   axios.post(
  //     host + `/api/auth/register/send-code?phone=${phone.replace('+', '%2B')}`
  //   ),
  createSeller: (formData) =>
    axios.post(host + '/seller-post', formData, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }),
  updatePassword: (data) => axios.post(host + '/users/reset-password', data),
  // verifyNewPassword: (data) =>
  //   axios.post(host + '/api/auth/password/verify', data),
  getUser: () =>
    axios.get(host + '/users/my-profile', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }),
  editUser: (user) =>
    axios.put(host + '/users/my-profile/info', user, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }),
  editUserPassword: (password) =>
    axios.put(host + '/users/my-profile/security', password, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }),
};
