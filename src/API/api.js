import axios from 'axios';

const host = 'http://95.130.227.68:8080';

export const API = {
  verifyToken: (token) =>
    axios.post(host + '/api/auth/token/verify', {
      authorization: token,
    }),
  registerUser: (user) => axios.post(host + '/api/auth/register', user),
  loginUser: (user) => axios.post(host + '/api/auth/login', user),
  verifyContact: (obj) => axios.post(host + '/api/auth/register/verify', obj),
  sendContact: (phone) =>
    axios.post(
      host + `/api/auth/register/send-code?phone=${phone.replace('+', '%2B')}`
    ),
  createSeller: (formData) =>
    axios.post(host + '/api/client/seller/post', {
      headers: {
        Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
      },
      formData,
    }),
  updatePassword: (data) => axios.post(host + '/api/auth/password/reset', data),
  verifyNewPassword: (data) =>
    axios.post(host + '/api/auth/password/verify', data),
  getUser: () =>
    axios.get(host + '/api/account', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }),
  editUser: (user) =>
    axios.put(host + '/api/account/information', user, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }),
  editUserPassword: (password) =>
    axios.put(host + '/api/account/security', password, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }),
};
 
