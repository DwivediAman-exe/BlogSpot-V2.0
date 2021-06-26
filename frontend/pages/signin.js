import Layout from '../components/Layout';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = () => {
  return (
    <Layout>
      <div className="container pt-2 p-5">
        <h2 className="text-center pb-2">SignIn</h2>
        <div style={{ width: '80%', margin: 'auto 10%' }}>
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
