import fetch from 'isomorphic-fetch';
import { handleResponse } from './auth';

export const createCategory = async (category, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/category`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      }
    );
    handleResponse(response);
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/categories`,
      {
        method: 'GET',
      }
    );
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

export const singleCategory = async (slug) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/category/${slug}`,
      {
        method: 'GET',
      }
    );
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

export const removeCategory = async (slug, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/category/${slug}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    handleResponse(response);
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};
