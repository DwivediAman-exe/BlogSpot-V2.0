import Head from 'next/head';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Layout from '../../components/Layout';
import { Fragment, useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../actions/blog';
import SmallCard from '../../components/blog/SmallCard';
import DisqusThread from '../../components/DisqusThread';

const SingleBlog = ({ blog, query }) => {
  const head = () => (
    <Head>
      <title>
        {blog.title} | {process.env.NEXT_PUBLIC_APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_DOMAIN_DEVELOPMENT}/blogs/${query.slug}`}
      />
      <meta
        property="og:title"
        content={`${blog.title}| ${process.env.NEXT_PUBLIC_APP_NAME}`}
      />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="webiste" />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_DOMAIN_DEVELOPMENT}/blogs/${query.slug}`}
      />
      <meta
        property="og:site_name"
        content={`${process.env.NEXT_PUBLIC_APP_NAME}`}
      />

      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog/photo/${blog.slug}`}
      />
      <meta
        property="og:image:secure_url"
        content={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta
        property="fb:app_id"
        content={`${process.env.NEXT_PUBLIC_FACEBOOKAPP_ID}`}
      />
    </Head>
  );

  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated({ blog }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const showBlogCategories = (blog) => {
    return blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a
          className="btn btn-lg btn-rounded fw-bold hover-shadow m-1"
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
          className="btn btn-lg btn-rounded fw-bold hover-shadow m-1"
          style={{ color: '#FB743E' }}
        >
          {t.name}
        </a>
      </Link>
    ));
  };

  const showRelatedBlogs = () => {
    return related.map((blog, index) => {
      return (
        <div className="col-md-4" key={index}>
          <article className="ms-5 me-5">
            <SmallCard blog={blog} />
          </article>
        </div>
      );
    });
  };

  const showComments = () => {
    return (
      <div>
        <DisqusThread
          id={blog.id}
          title={blog.title}
          path={`/blog/${blog.slug}`}
        />
      </div>
    );
  };

  return (
    <Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container ps-5 pe-5">
              <section>
                <div className="row">
                  <h1 className="text-black  mt-4 mb-3">{blog.title}</h1>
                  <img
                    className="img img-fluid"
                    src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    style={{
                      height: '400px',
                      width: '96%',
                      maxHeight: '400px',
                      objectFit: 'cover',
                      margin: 'auto 0%',
                      objectFit: 'fill',
                      borderRadius: '30px',
                    }}
                  />
                  <div
                    className="fw-normal mt-3 mb-1"
                    style={{ color: '#5E8B7E' }}
                  >
                    <p className="float-end">
                      {' '}
                      <Link href={`/profile/${blog.postedBy.username}`}>
                        <a className="text-info">{blog.postedBy.username}</a>
                      </Link>{' '}
                      | Published {moment(blog.updatedAt).fromNow()}
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <div className="mb-3 text-center">
                  {showBlogCategories(blog)}
                  {showBlogTags(blog)}
                </div>
              </section>
            </div>
            <div className="container ps-5 pe-5 mb-5">
              <section className="col-md-12">{renderHTML(blog.body)}</section>
            </div>
            <div className="row">
              <h2 className="text-warning text-decoration-underline text-center mt-2 mb-5 pb-3">
                Related Blogs
              </h2>
              {showRelatedBlogs()}
            </div>
            <div className="container-fluid ms-3 me-3 ps-4 pe-4 mt-4 mb-5">
              <h2 className="text-warning text-decoration-underline text-center mt-2 mb-5 pb-3">
                Related Comments
              </h2>
              {showComments()}
            </div>
          </article>
        </main>
      </Layout>
    </Fragment>
  );
};

SingleBlog.getInitialProps = async ({ query }) => {
  const data = await singleBlog(query.slug);
  if (data.error) {
    console.log(data.error);
  } else {
    return { blog: data, query };
  }
};

export default SingleBlog;
