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
