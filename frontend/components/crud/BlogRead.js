import Link from 'next/link';
import { useState, useEffect, Fragment } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
import moment from 'moment';

const BlogRead = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');

  const token = getCookie('token');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await list();
      setBlogs(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = (slug) => {
    removeBlog(slug, token).then((data) => {
      if (data.error) {
        console.log(error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      `Are you sure, you wan to delete? \nBLOG: ${slug}`
    );
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/blog/${blog.slug}`}>
          <a className="btn btn-sm btn-secondary ms-2 lh-lg">Update Blog</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a className="btn btn-sm btn-secondary ms-2 lh-lg">Update Blog</a>
        </Link>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, index) => {
      return (
        <div key={index} className="ms-4 mb-4 pb-3 pt-3">
          <h3 className="text-primary">
            <i class="far fa-hand-point-right"></i> {blog.title}
          </h3>
          <p className="fw-light ms-5" style={{ color: '#766161' }}>
            <strong>
              Written by
              {blog.postedBy.username} | Published{' '}
              {moment(blog.updatedAt).fromNow()}
            </strong>
          </p>
          <button
            className="btn btn-sm btn-danger ms-5 lh-lg me-3"
            onClick={() => deleteConfirm(blog.slug)}
          >
            Delete Blog
          </button>
          {showUpdateButton(blog)}
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12">
          {message && <div className="alert alert-warning">{message}</div>}
          {showAllBlogs()}
        </div>
      </div>
    </Fragment>
  );
};

export default BlogRead;
