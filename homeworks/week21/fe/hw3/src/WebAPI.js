import { getAuthToken } from './utils';

// api URL
const BASE_URL = 'https://student-json-api.lidemy.me';

// 拿到的文章
export const getPosts = () => {
  return fetch(`${BASE_URL}/posts?_limit=5&_sort=createdAt&_order=desc`);
};

// 根據參數 id, 拿到特定的一篇文章
export const getPost = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}`).then((res) => res.json());
};

// 根據參數 page、limit 拿到限定第幾頁且每頁多少篇的文章
export const getLimitPosts = (page, limit) =>
  fetch(
    `${BASE_URL}/posts?_page=${page}&_limit=${limit}&_sort=createdAt&_order=desc`
  ).then((res) => res.json());

// 新增文章
export const addNewPost = (title, body) => {
  // 拿到 localStorage 中的身份驗證 token
  const token = getAuthToken();
  // 用 POST 方法，將 token、文章標題 title、文章內容 body 上傳到 API
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};

// 刪除文章
export const deletePost = (id) => {
  // 拿到 localStorage 中的身份驗證 token
  const token = getAuthToken();
  // 用 DELETE 方法，將 token、文章 id 上傳到 API
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  }).then((res) => res.json());
};

// 註冊
export const register = (username, nickname, password) => {
  // 用 POST 方法，將 username、nickname、password 上傳到 API
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      nickname,
      password,
    }),
  }).then((res) => res.json());
};

// 登入
export const login = (username, password) => {
  // 用 POST 方法，將 username、password 上傳到 API
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

// 身份驗證
export const getMe = () => {
  // 拿到 localStorage 中的身份驗證 token 內容
  const token = getAuthToken();
  // 在 headers 裡帶入 token，進行驗證
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
