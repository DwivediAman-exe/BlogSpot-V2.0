import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { singleBlog, updateBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState({});
  const [values, setValues] = useState({
    error: '',
    success: '',
    formData: '',
    title: '',
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]); // categories
  const [checkedTag, setCheckedTag] = useState([]); // tags

  const { error, success, formData, title } = values;

  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = (blogCategories) => {
    let ca = [];
    blogCategories.map((c, i) => {
      ca.push(c._id);
      setChecked(ca);
    });
  };

  const setTagsArray = (blogTags) => {
    let ta = [];
    blogTags.map((t, i) => {
      ta.push(t._id);
      setCheckedTag(ta);
    });
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const handleToggle = (c) => () => {
    setValues({ ...values, error: '' });
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set('categories', all);
  };

  const handleTagsToggle = (t) => () => {
    setValues({ ...values, error: '' });
    // return the first index or -1
    const clickedTag = checkedTag.indexOf(t);
    const all = [...checkedTag];

    if (clickedTag === -1) {
      all.push(t);
    } else {
      all.splice(clickedTag, 1);
    }
    console.log(all);
    setCheckedTag(all);
    formData.set('tags', all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggle(c._id)}
            checked={findOutCategory(c._id)}
            type="checkbox"
            className="me-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const findOutCategory = (c) => {
    const result = checked.indexOf(c);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleTagsToggle(t._id)}
            checked={findOutTag(t._id)}
            type="checkbox"
            className="me-2"
          />
          <label className="form-check-label ">{t.name}</label>
        </li>
      ))
    );
  };

  const findOutTag = (t) => {
    const result = checkedTag.indexOf(t);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set('body', e);
  };

  const editBlog = (e) => {
    e.preventDefault();
    updateBlog(formData, token, router.query.slug).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          success: `Blog titled "${data.title}" is successfully updated`,
        });
        if (isAuth() && isAuth().role === 1) {
          Router.replace(`/admin`);
        } else if (isAuth() && isAuth().role === 0) {
          Router.replace(`/user`);
        }
      }
    });
  };

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
      {success}
    </div>
  );

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className="form-group">
          <label className="text-info fs-4">Title</label>
          <input
            type="text"
            className="form-control fst-italic fs-7 pt-2 pb-2"
            value={title}
            placeholder="Lets start with an interesting Title..."
            onChange={handleChange('title')}
          />
        </div>

        <div className="form-group mt-4">
          <label className="text-info fs-3">Content</label>
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write something amazing here..."
            onChange={handleBody}
          />
        </div>

        <div>
          <button className="btn btn-primary btn-rounded btn-raised btn-lg mt-4 mb-4 fs-7 shadow-2-strong lh-lg">
            <i class="fas fa-check pe-2 fa-lg"></i> Update Blog
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {updateBlogForm()}
          <div className="pt-3">
            {showError()}
            {showSuccess()}
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4  pb-2">
            <hr style={{ height: '1px' }} />
            <div className="form-group mb-1 pt-2 pb-2">
              {body && (
                <img
                  className="float-end img img-fluid"
                  src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog/photo/${router.query.slug}`}
                  alt={title}
                  style={{
                    maxWidth: '100px',
                    height: '120px',
                    maxHeight: '120px',
                  }}
                />
              )}
              <h5 className="text-info mb-4">Featured Old Image</h5>
              <label className="btn btn-outline-dark lh-lg text-secondary">
                Click to upload NEW IMAGE
                <input
                  onChange={handleChange('photo')}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
              <small className="fst-italic fw-normal float-start mt-3">
                <strong>Max size: 1 mb</strong>
              </small>
              <hr style={{ height: '1px', marginTop: '60px' }} />
            </div>
          </div>
          <div className="p-4 pb-2">
            <hr style={{ height: '1px', marginTop: '5px' }} />
            <h5 className="text-info">Select Categories</h5>

            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showCategories()}
            </ul>
            <hr style={{ height: '1px', marginTop: '30px' }} />
          </div>
          <div className="p-4 pb-2">
            <hr style={{ height: '1px', marginTop: '1px' }} />
            <h5 className="text-info">Select Tags</h5>

            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showTags()}
            </ul>
            <hr style={{ height: '1px', marginTop: '30px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogUpdate);
