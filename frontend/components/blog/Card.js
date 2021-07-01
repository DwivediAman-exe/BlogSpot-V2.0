import renderHTML from 'react-render-html';
import moment from 'moment';
import Link from 'next/link';

const Card = ({ blog }) => {
  const showBlogCategories = (blog) => {
    return blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a
          className="btn btn-rounded fw-bold hover-shadow m-1"
          style={{ color: '#1EAE98' }}
        >
          {c.name}
        </a>
      </Link>
    ));
  };

  const showBlogTags = (blog) => {
    return blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a
          className="btn btn-rounded fw-bold hover-shadow m-1"
          style={{ color: '#FB743E' }}
        >
          {t.name}
        </a>
      </Link>
    ));
  };

  return (
    <div
      className="pb-4 pt-4 ps-4 pe-3 mt-3 mb-4 card shadow-1-strong"
      style={{
        borderRadius: '20px',
        height: '100%',
      }}
    >
      <header className="card-title">
        <Link href={`/blogs/${blog.slug}`}>
          <a
            className=" text-decoration-underline fs-2"
            style={{ color: 'black' }}
          >
            {blog.title}
          </a>
        </Link>
      </header>
      <section>
        <p className="fst-italic" style={{ color: '#766161' }}>
          <small>Written by </small>
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a className="text-info">{blog.postedBy.username}</a>
          </Link>{' '}
          | <small>Published {moment(blog.updatedAt).fromNow()}</small>
        </p>
      </section>
      <section>
        <p>
          {showBlogCategories(blog)}
          {showBlogTags(blog)}
          <small
            className="fw-strong float-end mt-2 mb-1 pe-4 fst-italic"
            style={{ color: '#A7BBC7' }}
          >
            - categories and tags
          </small>
        </p>
      </section>
      <div className="row">
        <div className="col-md-3">
          <section className="pt-4 text-center">
            <img
              className="img img-fluid shadow-2-strong  img-thumbnail rounded"
              src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog/photo/${blog.slug}`}
              alt={blog.title}
              style={{
                height: '200px',
                width: '180px',
                maxHeight: '200px',
                maxWidth: '180px',
                objectFit: 'cover',
              }}
            />
          </section>
        </div>
        <div className="col-md-9">
          <section className="pt-3">
            <div>{renderHTML(blog.excerpt)}</div>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="text-info float-end fw-bold pe-4">Read more...</a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
