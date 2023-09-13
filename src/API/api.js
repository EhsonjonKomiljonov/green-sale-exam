import axios from 'axios';

// const host = 'https://green-sale.onrender.com';
const host = 'http://localhost:9000';

export const API = {
  verifyToken: async () =>
    await axios.get(host + '/check-token', {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }),
  registerUser: (user) => axios.post(host + '/users', user),
  loginUser: (user) => axios.post(host + '/users/login', user),
  getSellerPosts: (c) =>
    c
      ? axios.get(host + '/seller-post?categoryId=' + c)
      : axios.get(host + '/seller-post'),
  getBuyerPosts: (c) =>
    c
      ? axios.get(host + '/buyer-post?categoryId=' + c)
      : axios.get(host + '/buyer-post'),
  getMyPosts: () =>
    axios.get(host + '/seller-post/my-posts', {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }),
  createSeller: (formData) =>
    axios.post(host + '/seller-post', formData, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }),
  deleteSeller: (id) =>
    axios.delete(host + '/seller-post/' + id, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }),
  deleteBuyer: (id) =>
    axios.delete(host + '/buyer-post/' + id, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }),
  createBuyer: (formData) =>
    axios.post(host + '/buyer-post', formData, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }),
  updatePassword: (data) => axios.post(host + '/users/reset-password', data),
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
  getProducts: () => axios.get(host + '/seller-post/get-posts'),
  getSingleSellProduct: (id) => axios.get(host + `/seller-post/` + id),
  getSingleBuyProduct: (id) => axios.get(host + `/buyer-post/` + id),
  loginAdmin: (admin) => axios.post(host + '/admin/login', admin),
  deleteSellProduct: (id) =>
    axios.delete(host + '/admin/delete-seller-post/' + id, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }),
  deleteBuyProduct: (id) =>
    axios.delete(host + '/admin/delete-buyer-post/' + id, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }),
  addCategory: (cat_name) =>
    axios.post(host + '/admin/add-category', cat_name, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }),
};
