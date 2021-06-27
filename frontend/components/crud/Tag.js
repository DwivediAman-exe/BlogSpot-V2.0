import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import { createTag, getTags, singleTag, removeTag } from '../../actions/tag';

const Tag = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    Tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, Tags, removed, reload } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          Tags: data,
        });
      }
    });
  };

  const showTags = () => {
    return Tags.map((c, index) => {
      return (
        <button
          title="Double click to delete"
          key={index}
          onDoubleClick={() => deleteConfirm(c.slug)}
          className="btn btn-outline-secondary btn-rounded text-secondary m-1 mt-3"
        >
          <strong className="fw-bold lh-lg">{c.name}</strong>
        </button>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are you sure you want to delete this Tag');
    if (answer) deleteTag(slug);
  };

  const deleteTag = (slug) => {
    removeTag(slug, token).then((data) => {
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
    createTag({ name }, token).then((data) => {
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
      return <p className="text-success">Tag is created !</p>;
    }
  };
  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag already exist !</p>;
    }
  };
  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Tag is removed !</p>;
    }
  };

  const newTagForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted float-start fw-normal fs-5 ms-5 ms-4">
          Tag Name
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
        {newTagForm()}
        <div className="ps-3 pe-3">
          <h4 className="text-center mt-5 ">All Tags</h4>
          {showTags()}
        </div>
      </div>
    </Fragment>
  );
};

export default Tag;
