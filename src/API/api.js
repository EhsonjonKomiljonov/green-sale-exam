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
  getBuySearch: ({ val, page }) =>
    axios.get(host + `/buyer-post?search=${val}&page=${page}`),
  getSellSearch: ({ val, page }) =>
    axios.get(host + `/seller-post?search=${val}&page=${page}`),
  getSellerPosts: ({ c, page }) =>
    c
      ? axios.get(host + '/seller-post?categoryId=' + c)
      : axios.get(host + '/seller-post?page=' + page),
  getBuyerPosts: ({ c, page }) =>
    c
      ? axios.get(host + '/buyer-post?categoryId=' + c)
      : axios.get(host + '/buyer-post?page=' + page),
  getSellPostsById: (id) => axios.get(host + `/seller-post/user/${id}`),
  getBuyPostsById: (id) => axios.get(host + `/buyer-post/user/${id}`),
  getMySellPosts: (s, cId) =>
    axios.get(
      s
        ? host + '/seller-post/my-posts?search=' + s
        : cId
        ? host + '/seller-post/my-posts?categoryId=' + cId
        : host + '/seller-post/my-posts',
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }
    ),
  getMyBuyPosts: (s, cId) =>
    axios.get(
      s
        ? host + '/buyer-post/my-posts?search=' + s
        : cId
        ? host + '/buyer-post/my-posts?categoryId=' + cId
        : host + '/buyer-post/my-posts',
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }
    ),
  createSeller: (formData) =>
    axios.post(host + '/seller-post', formData, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }),
  updateSeller: (id, formData) =>
    axios.put(host + '/seller-post/' + id, formData, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }),
  updateBuyer: (id, value) =>
    axios.put(host + '/buyer-post/' + id, value, {
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
  likedPost: (product_id) =>
    axios.post(
      host + '/favorites',
      { product_ref_id: product_id },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    ),
  deleteLikedPost: (id) =>
    axios.delete(host + `/favorites/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }),
  getFavoritePosts: () =>
    axios.get(host + '/favorites', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }),
  postComment: ({ text, product_ref_id }) =>
    axios.post(
      host + '/comments',
      { text, product_ref_id },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    ),
  getSingleUser: (id) => axios.get(host + `/users/${id}`),
  editComment: ({ text, id }) =>
    axios.put(
      host + `/comments/${id}`,
      { text },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    ),
  deleteComment: (id) =>
    axios.delete(host + `/comments/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }),
  deleteCommentAdmin: (id) =>
    axios.delete(host + `/admin/delete-comment/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }),
};
