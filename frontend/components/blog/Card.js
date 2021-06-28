import renderHTML from 'react-render-html';
import moment from 'moment';
import Link from 'next/link';

const Card = ({ blog }) => {
  const showBlogCategories = (blog) => {
    return blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary btn-sm m-1">{c.name}</a>
      </Link>
    ));
  };

  const showBlogTags = (blog) => {
    return blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary btn-sm m-1">{t.name}</a>
      </Link>
    ));
  };

  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="text-info">{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="p-2">
          Written by {blog.postedBy.name} | Published{' '}
          {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        <p>
          {showBlogCategories(blog)}
          {showBlogTags(blog)}
        </p>
      </section>
      <div className="row">
        <div className="col-md-4">
          <section>
            <img
              classname="img img-fluid"
              src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog/photo/${blog.slug}`}
              alt={blog.title}
              style={{ maxHeight: '250px', width: 'auto' }}
            />
          </section>
        </div>
        <div className="col-md-8">
          <section>
            <div className="pb-3">{renderHTML(blog.excerpt)}</div>

            <Link href={`/blogs/${blog.slug}`}>
              <a className="fw-bold text-secondary">
                <small>Read more</small>
              </a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
