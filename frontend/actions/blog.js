import fetch from 'isomorphic-fetch';

export const createBlog = async (data, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );
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
