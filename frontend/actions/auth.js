import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import Router from 'next/router';

// jwt expire
export const handleResponse = (response) => {
  if (response.status === 401) {
    signout(() => {
      Router.push({
        pathname: '/signin',
        query: {
          message: 'Your session has expired. Please signin',
        },
      });
    });
  } else {
    return;
  }
};

// signup action
export const signup = async (user) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/signup`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

// signin action
export const signin = async (user) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/signin`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

// signout action
export const signout = async (next) => {
  removeCookie('token');
  removeLocalStorage('user');
  next();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/signout`,
      {
        method: 'GET',
      }
    );
    console.log('Signout done');
  } catch (err) {
    return console.error(err.message);
  }
};

// setting cookies
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 2,
    });
  }
};

// removing cookies
export const removeCookie = (key, value) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 2,
    });
  }
};

// getting cookies
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

// storing cookie
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// authentication during signin
export const authenticate = (data, next) => {
  setCookie('token', data.token);
  setLocalStorage('user', data.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};

export const updateUser = (user, next) => {
  if (process.browser) {
    if (localStorage.getItem('user')) {
      let auth = JSON.parse(localStorage.getItem('user'));
      auth = user;
      localStorage.setItem('user', JSON.stringify(auth));
      next();
    }
  }
};
