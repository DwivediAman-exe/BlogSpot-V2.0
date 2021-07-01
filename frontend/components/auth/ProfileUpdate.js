import Link from 'next/link';
import { useState, useEffect, Fragment } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: '',
    username_for_photo: '',
    name: '',
    email: '',
    about: '',
    password: '',
    error: false,
    success: false,
    loading: false,
    photo: '',
    userData: process.browser && new FormData(),
  });

  const token = getCookie('token');
  const {
    username,
    username_for_photo,
    name,
    email,
    about,
    password,
    error,
    success,
    loading,
    photo,
    userData,
  } = values;

  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          username: data.username,
          username_for_photo: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
        });
      }
    });
  };

  useEffect(() => {
    init();
    setValues({ ...values, userData: new FormData() });
  }, []);

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    // let userData = new FormData();
    userData.set(name, value);
    console.log(...userData); // SEE THE FORMDATA IN CONSOLE
    setValues({
      ...values,
      [name]: value,
      userData,
      error: false,
      success: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true });
    update(token, userData).then((data) => {
      if (data.error) {
        console.log('Error', data.error);
        setValues({ ...values, error: data.error, loading: false });
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            username: data.username,
            name: data.name,
            email: data.email,
            about: data.about,
            password: '',
            success: true,
            loading: false,
          });
        });
      }
    });
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mt-3">
        <label className="btn btn-outline-primary btn-rounded">
          Click to change profile pic
          <input
            onChange={handleChange('photo')}
            type="file"
            accept="image/*"
            hidden
          />
        </label>
      </div>
      <div className="form-outline mt-4">
        <label className="text-muted fs-5 mb-0">Username</label>
        <input
          onChange={handleChange('username')}
          type="text"
          value={username}
          className="form-control fs-6 ps-3 pt-1 pb-0"
          className="form-control"
          style={{ borderBottom: '2px solid gray', width: '100%' }}
        />
      </div>
      <div className="form-outline mt-4">
        <label className="text-muted fs-5 mb-0">Name</label>
        <input
          onChange={handleChange('name')}
          type="text"
          value={name}
          className="form-control"
          style={{ borderBottom: '2px solid gray', width: '100%' }}
        />
      </div>
      <div className="form-outline mt-4">
        <label className="text-muted fs-5 mb-0">Email</label>
        <input
          onChange={handleChange('email')}
          type="text"
          value={email}
          disabled
          className="form-control"
          style={{ borderBottom: '2px solid gray', width: '100%' }}
        />
      </div>
      <div className="form-outline mt-4">
        <label className="text-muted fs-5 mb-0">About</label>
        <textarea
          onChange={handleChange('about')}
          type="text"
          value={about}
          className="form-control"
          style={{ borderBottom: '2px solid gray', width: '100%' }}
          maxLength="200"
        />
      </div>
      <div className="form-outline mt-4">
        <label className="text-muted fs-5 mb-0">Password</label>
        <input
          onChange={handleChange('password')}
          type="password"
          value={password}
          className="form-control"
          style={{ borderBottom: '2px solid gray', width: '100%' }}
        />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-primary btn-rounded btn-raised btn-lg mt-3 mb-4 fs-7 shadow-2-strong"
          disabled={!username || !name || !email}
        >
          <i class="fas fa-check pe-2 fa-lg"></i> Update info
        </button>
      </div>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? '' : 'none' }}
    >
      Profile updated
    </div>
  );

  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? '' : 'none' }}
    >
      Loading...
    </div>
  );

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-4 ps-5 pe-5 pt-5 text-center">
            <h3 className="mb-4">Profile Image</h3>
            <img
              src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/user/photo/${username_for_photo}`}
              className="img img-fluid img-thumbnail mb-3 "
              style={{ maxHeight: '300px', maxWidth: '300px' }}
              alt="user profile"
            />
          </div>
          <div className="col-md-8 mb-5">
            <div>
              {showSuccess()}
              {showError()}
              {showLoading()}
            </div>
            {profileUpdateForm()}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileUpdate;
