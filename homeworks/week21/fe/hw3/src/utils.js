const TOKEN_NAME = 'token';

// save token to localStorage
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

// extract token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const getPages = (totalPages) => {
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return pages;
};
