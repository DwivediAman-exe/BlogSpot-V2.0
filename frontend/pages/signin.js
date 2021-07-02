import Layout from '../components/Layout';
import SigninComponent from '../components/auth/SigninComponent';
import { withRouter } from 'next/router';

const Signin = ({ router }) => {
  const showRedireectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else {
      return;
    }
  };
  return (
    <Layout>
      <div className="container pt-2 p-5">
        <h2 className="text-center text-success pb-2">
          <i class="fas fa-user-check"></i> SignIn
        </h2>
        <div style={{ width: '80%', margin: 'auto 10%' }}>
          {showRedireectMessage()}
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Signin);
