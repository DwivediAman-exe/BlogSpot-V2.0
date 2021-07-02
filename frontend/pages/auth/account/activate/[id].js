import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { signup } from '../../../../actions/auth';

const ActivateAccount = ({ router }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    error: '',
    loading: false,
    success: false,
    showButton: true,
  });

  const { name, token, error, loading, success, showButton } = values;

  useEffect(() => {
    let token = router.query.id;
    if (token) {
      const { name } = jwt.decode(token);
      setValues({ ...values, name, token });
    }
  }, [router]);

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    signup({ token }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          showButton: false,
        });
      } else {
        setValues({
          ...values,
          loading: false,
          success: true,
          showButton: false,
        });
      }
    });
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : '');

  return (
    <Layout>
      <div className="container mt-5 pt-5 ps-5">
        <h3 className="pb-4">Hey {name}, Ready to activate your account?</h3>
        {showLoading()}
        {error && error}
        {success &&
          'You have successfully activated your account. Please Login.'}
        {showButton && (
          <button
            className="btn btn-primary btn-rounded btn-raised btn-lg mt-3 mb-4 fs-7 shadow-2-strong"
            onClick={clickSubmit}
          >
            <i class="fas fa-check pe-2 fa-lg"></i> Activate Account
          </button>
        )}
      </div>
    </Layout>
  );
};

export default withRouter(ActivateAccount);
