import { useState } from 'react';
import Layout from '../../../components/Layout';
import { forgotPassword } from '../../../actions/auth';

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
    message: '',
    error: '',
    showForm: true,
  });

  const { email, message, error, showForm } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, message: '', error: '', [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, message: '', error: '' });
    forgotPassword({ email }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          message: data.message,
          email: '',
          showForm: false,
        });
      }
    });
  };

  const showError = () =>
    error ? (
      <div className="text-center ms-5 me-5 alert alert-danger">{error}</div>
    ) : (
      ''
    );
  const showMessage = () =>
    message ? (
      <div className="text-center ms-5 me-5 alert alert-success">{message}</div>
    ) : (
      ''
    );

  const passwordForgotForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mt-4">
        <label
          className="text-muted fs-5 mb-4 mb-0"
          style={{
            width: '80%',
            margin: 'auto 10%',
          }}
        >
          Enter your Registered Email
        </label>
        <input
          type="email"
          onChange={handleChange('email')}
          className="form-control"
          value={email}
          placeholder="Type your email"
          required
          style={{
            borderBottom: '2px solid gray',
            width: '100%',
            width: '80%',
            margin: 'auto 10%',
          }}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary btn-rounded btn-raised btn-lg mt-5 mb-5 fs-7 shadow-2-strong"
        >
          <i class="fas fa-check pe-2 fa-lg"></i>Send Reset Password Link
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className=" mb-5 pb-4 text-center">Forgot password</h2>
        {showError()}
        {showMessage()}
        {showForm && passwordForgotForm()}
      </div>
    </Layout>
  );
};

export default ForgotPassword;
