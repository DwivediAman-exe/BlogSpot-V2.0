import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { listSearch } from '../../actions/blog';

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: '',
  });

  const { search, results, searched, message } = values;

  const searchSubmit = (e) => {
    e.preventDefault();
    listSearch({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} matching blogs found!`,
      });
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    });
  };

  const searchedBlogs = (results = []) => {
    return (
      <div className="jumbotron bg-light">
        {message && (
          <p className="mt-4 pt-3 mb-3 muted fst-italic">Result : {message}</p>
        )}
        {results.map((blog, i) => {
          return (
            <div key={i}>
              <Link href={`/blogs/${blog.slug}`}>
                <a className="text-primary">
                  <i class="fas fa-map-marker text-dark me-2"></i>
                  {blog.title}
                  <small className="ps-4" style={{ color: 'gray' }}>
                    {' '}
                    - @{blog.postedBy.username}{' '}
                  </small>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="row">
        <div className="col-md-9">
          <input
            type="search"
            className="form-control fst-italic mt-1"
            aria-label="Search"
            placeholder="Search Blogs by Keywords in title or content..."
            onChange={handleChange}
            style={{ borderRadius: '12px' }}
          />
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-rounded shadow-1-strong fw-light text-dark ps-5 pe-5 mt-1 pt-2"
            type="submit"
            data-mdb-ripple-color="dark"
          >
            {' '}
            <i class="fas fa-search " />
            <strong className="ps-2">Search</strong>
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="container ps-5 pe-4">
      <div className="pb-4">{searchForm()}</div>
      {searched && (
        <div style={{ marginTop: '-50px' }}>{searchedBlogs(results)}</div>
      )}
    </div>
  );
};

export default Search;
