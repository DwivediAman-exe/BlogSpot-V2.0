import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createBlog = async (data, token) => {
  try {
    let createBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
      createBlogEndpoint = `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog`;
    } else if (isAuth() && isAuth().role === 0) {
      createBlogEndpoint = `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/user/blog`;
    }
    const response = await fetch(`${createBlogEndpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

export const listAllBlogsCategoriesTags = async (skip, limit) => {
  try {
    const data = {
      limit,
      skip,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blogs-categories-tags`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

export const singleBlog = async (slug = undefined) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog/${slug}`,
      {
        method: 'GET',
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const listRelated = async (blog) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blogs/related`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      }
    );
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

export const list = async (username) => {
  try {
    let listBlogsEndpoint;

    if (username) {
      listBlogsEndpoint = `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/${username}/blogs`;
    } else {
      listBlogsEndpoint = `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blogs`;
    }
    const response = await fetch(`${listBlogsEndpoint}`, {
      method: 'GET',
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const removeBlog = async (slug, token) => {
  try {
    let deleteBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
      deleteBlogEndpoint = `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
      deleteBlogEndpoint = `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/user/blog/${slug}`;
    }
    const response = await fetch(`${deleteBlogEndpoint}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

export const updateBlog = async (blog, token, slug) => {
  try {
    let updateBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
      updateBlogEndpoint = `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
      updateBlogEndpoint = `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/user/blog/${slug}`;
    }
    const response = await fetch(`${updateBlogEndpoint}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: blog,
    });
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};

export const listSearch = async (params) => {
  console.log('search params', params);
  let query = queryString.stringify(params);
  console.log('query params', query);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blogs/search?${query}`,
      {
        method: 'GET',
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
