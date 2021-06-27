import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import {
  createCategory,
  getCategories,
  singleCategory,
  removeCategory,
} from '../../actions/category';

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          categories: data,
        });
      }
    });
  };

  const showCategories = () => {
    return categories.map((c, index) => {
      return (
        <button
          title="Double click to delete"
          key={index}
          onDoubleClick={() => deleteConfirm(c.slug)}
          className="btn btn-outline-secondary btn-rounded text-secondary m-1"
        >
          <strong className="fw-bold lh-lg">{c.name}</strong>
        </button>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      'Are you sure you want to delete this category'
    );
    if (answer) deleteCategory(slug);
  };

  const deleteCategory = (slug) => {
    removeCategory(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    createCategory({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: '',
          removed: false,
          reload: !reload,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: false,
      success: false,
      removed: '',
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category is created !</p>;
    }
  };
  const showError = () => {
    if (error) {
      return <p className="text-danger">Category already exist !</p>;
    }
  };
  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category is removed !</p>;
    }
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted float-start fw-normal fs-5 ms-5">
          Category Name
        </label>
        <input
          type="text"
          className="form-control mt-2 mb-3"
          onChange={handleChange}
          value={name}
          name="name"
          required
          style={{ width: '84%', margin: 'auto 8%' }}
        />
        <button className="btn btn-primary btn-rounded btn-lg mb-4 fs-7 shadow-1-strong">
          <i class="fas fa-check pe-2 fa-lg"></i> Create
        </button>
      </div>
    </form>
  );

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: '' });
  };

  return (
    <Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newCategoryForm()}
        <div className="ps-3 pe-3">
          <h4 className="text-center mt-5 mb-4">All Categories</h4>
          {showCategories()}
        </div>
      </div>
    </Fragment>
  );
};

export default Category;
