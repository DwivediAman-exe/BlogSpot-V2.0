import { useState } from 'react';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { resetPassword } from '../../../../actions/auth';

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    name: '',
    newPassword: '',
    error: '',
    message: '',
    showForm: true,
  });

  const { showForm, name, newPassword, error, message } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({
      newPassword,
      resetPasswordLink: router.query.id,
    }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          showForm: false,
          newPassword: '',
        });
      } else {
        setValues({
          ...values,
          message: data.message,
          showForm: false,
          newPassword: '',
          error: false,
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

  const passwordResetForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mt-4">
        <label
          className="text-muted fs-5 mb-4 mb-0"
          style={{
            width: '80%',
            margin: 'auto 10%',
          }}
        >
          Enter your New Password
        </label>
        <input
          type="password"
          onChange={(e) =>
            setValues({ ...values, newPassword: e.target.value })
          }
          className="form-control"
          value={newPassword}
          placeholder="Type your new password"
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
          <i class="fas fa-check pe-2 fa-lg"></i>Change Password
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className=" mb-5 pb-4 text-center">Reset password</h2>
        {showError()}
        {showMessage()}
        {showForm && passwordResetForm()}
      </div>
    </Layout>
  );
};

export default withRouter(ResetPassword);
