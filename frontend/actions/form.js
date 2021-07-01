import fetch from 'isomorphic-fetch';

export const emailContactForm = async (data) => {
  try {
    let emailEndpoint;

    if (data.authorEmail) {
      emailEndpoint = `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/contact-blog-author`;
    } else {
      emailEndpoint = `${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/contact`;
    }
    const response = await fetch(`${emailEndpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (err) {
    return console.error(err.message);
  }
};
