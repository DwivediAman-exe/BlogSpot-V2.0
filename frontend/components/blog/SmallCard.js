import renderHTML from 'react-render-html';
import moment from 'moment';
import Link from 'next/link';

const SmallCard = ({ blog }) => {
  return (
    <div
      className="card me-1 p-3 hover-shadow text-start"
      style={{ height: '100%' }}
    >
      <section>
        <div className="fs-4 ps-3 pb-2">
          <Link href={`blogs/${blog.slug}`}>
            <a className="card-title">{blog.title}</a>
          </Link>
        </div>
        <Link href={`blogs/${blog.slug}`}>
          <a className="ps-3">
            <img
              className="img img-fluid shadow-1-strong  img-thumbnail rounded"
              src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog/photo/${blog.slug}`}
              alt={blog.title}
              style={{
                height: '150px',
                width: '150px',
                maxHeight: '150px',
                maxWidth: '150px',
                objectFit: 'cover',
              }}
            />
          </a>
        </Link>
      </section>
      <div className="card-body text-start">
        <small>{renderHTML(blog.excerpt)}</small>
      </div>
      <div className="card-footer">
        <p className="">
          Published {moment(blog.updatedAt).fromNow()},{' '}
          <Link href={`/`}>
            <a>@{blog.postedBy.username}</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SmallCard;
