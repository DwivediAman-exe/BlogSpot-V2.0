import fetch from 'isomorphic-fetch';

export const signup = (user) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.error(err.message));
};
