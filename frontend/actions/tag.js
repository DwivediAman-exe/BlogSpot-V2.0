import fetch from 'isomorphic-fetch';
import { handleResponse } from './auth';

export const createTag = async (tag, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/tag`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tag),
      }
    );
    handleResponse(response);
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

export const getTags = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/tags`,
      {
        method: 'GET',
      }
    );
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

export const singleTag = async (slug) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/tag/${slug}`,
      {
        method: 'GET',
      }
    );
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

export const removeTag = async (slug, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/tag/${slug}`,
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
