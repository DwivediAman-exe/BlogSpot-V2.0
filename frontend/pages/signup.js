import Layout from '../components/Layout';
import SignupComponent from '../components/auth/SignupComponent';

const Signup = () => {
  return (
    <Layout>
      <div className="container pt-2 p-5">
        <h2 className="text-center text-success pb-2">
          <i class="fas fa-user-plus"></i> SignUp
        </h2>
        <div style={{ width: '80%', margin: 'auto 10%' }}>
          <SignupComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
