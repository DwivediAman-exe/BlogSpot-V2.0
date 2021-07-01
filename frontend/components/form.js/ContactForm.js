import { emailContactForm } from '../../actions/form';
import { Fragment, useState } from 'react';

const ContactForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    sent: false,
    buttonText: 'Send Message',
    success: false,
    error: false,
  });

  const { name, message, email, sent, buttonText, success, error } = values;

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: 'Send Message',
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: 'Sending...' });
    emailContactForm({ name, email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          sent: true,
          name: '',
          email: '',
          message: '',
          buttonText: 'Sent',
          success: data.success,
        });
      }
    });
  };

  const showSuccessMessage = () =>
    success && (
      <div className="alert alert-info pt-4 pb-4 text-center text-info">
        <strong>Thanks for contacting me, I will get back to you soon !</strong>
      </div>
    );

  const showErrorMessage = () => (
    <div
      className="alert alert-danger pt-5 pb-5"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const contactForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-outline mt-4">
          <label className="text-muted fs-5 mb-0">Name</label>
          <input
            onChange={handleChange('name')}
            type="text"
            value={name}
            required
            className="form-control"
            style={{ borderBottom: '2px solid gray', width: '100%' }}
            maxLength="32"
          />
        </div>
        <div className="form-outline mt-4">
          <label className="text-muted fs-5 mb-0">Email</label>
          <input
            onChange={handleChange('email')}
            type="email"
            value={email}
            required
            className="form-control"
            style={{ borderBottom: '2px solid gray', width: '100%' }}
          />
        </div>
        <div className="form-outline mt-4">
          <label className="text-muted fs-5 mb-0">Message</label>
          <textarea
            onChange={handleChange('message')}
            type="text"
            value={message}
            required
            className="form-control"
            rows="5"
            style={{ borderBottom: '2px solid gray', width: '100%' }}
            maxLength="200"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary btn-rounded btn-raised btn-lg mt-3 mb-5 fs-7 shadow-2-strong"
          >
            <i class="fas fa-check pe-2 fa-lg"></i> {buttonText}
          </button>
        </div>
      </form>
    );
  };

  return (
    <Fragment>
      {showSuccessMessage()}
      {showErrorMessage()}
      {contactForm()}
    </Fragment>
  );
};

export default ContactForm;
