import Router from 'next/router';
import { loginWithGoogle, authenticate, isAuth } from '../../actions/auth';
import GoogleLogin from 'react-google-login';

const LoginGoogle = () => {
  const responseGoogle = (response) => {
    // console.log(response);
    const tokenId = response.tokenId;
    const user = { tokenId };

    loginWithGoogle(user).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user`);
          }
        });
      }
    });
  };

  return (
    <div>
      <GoogleLogin
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme="dark"
      />
    </div>
  );
};

export default LoginGoogle;
