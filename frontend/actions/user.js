import fetch from 'isomorphic-fetch';
import { handleResponse } from './auth';

export const userPublicProfile = async (username) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/user/${username}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

export const getProfile = async (token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/user/profile`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const update = async (token, user) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/user/update`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: user,
      }
    );
    handleResponse(response);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
