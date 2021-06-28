import Head from 'next/head';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Layout from '../../components/Layout';
import { Fragment, useState } from 'react';
import { singleBlog } from '../../actions/blog';

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
        ccontent={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta
        property="fb:app_id"
        content={`${process.env.NEXT_PUBLIC_FACEBOOKAPP_ID}`}
      />
    </Head>
  );

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
    <Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container">
              <section>
                <div className="row">
                  <h1>{blog.title}</h1>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid"
                    style={{
                      width: '100',
                      maxHeight: '500px',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </section>
              <section>
                <p className="p-2">
                  Written by {blog.postedBy.name} | Published{' '}
                  {moment(blog.updatedAt).fromNow()}
                </p>
                <div>
                  {showBlogCategories(blog)}
                  {showBlogTags(blog)}
                </div>
              </section>
            </div>
            <div className="container">
              <section className="col-md-12">{renderHTML(blog.body)}</section>
            </div>
            <div>realetd blogs</div>
            <div>coments show</div>
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
