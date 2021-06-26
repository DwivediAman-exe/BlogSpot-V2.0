import fetch from 'isomorphic-fetch';

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
