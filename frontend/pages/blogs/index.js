import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Fragment, useState } from 'react';
import { listAllBlogsCategoriesTags } from '../../actions/blog';
import Card from '../../components/blog/Card';
import { withRouter } from 'next/router';

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogSkip,
  router,
}) => {
  const head = () => (
    <Head>
      <title>Blogs | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      <meta name="description" content="Blogs on Programming" />
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_DOMAIN_DEVELOPMENT}${router.pathname}`}
      />
      <meta
        property="og:title"
        content={`Latest Blogs and Tutorials on Programming | ${process.env.NEXT_PUBLIC_APP_NAME}`}
      />
      <meta
        property="og:description"
        content={`Latest Blogs and Tutorials on Programming | ${process.env.NEXT_PUBLIC_APP_NAME}`}
      />
      <meta property="og:type" content="Website" />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_DOMAIN_DEVELOPMENT}${router.pathname}`}
      />
      <meta
        property="og:site_name"
        content={`${process.env.NEXT_PUBLIC_APP_NAME}`}
      />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_DOMAIN_DEVELOPMENT}/public/seoblog.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${process.env.NEXT_PUBLIC_DOMAIN_DEVELOPMENT}/public/seoblog.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta
        property="fb:app_id"
        content={`${process.env.NEXT_PUBLIC_FACEBOOKAPP_ID}`}
      />
    </Head>
  );

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listAllBlogsCategoriesTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button
          onClick={loadMore}
          className="btn btn-rounded btn-lg text-dark"
          style={{
            border: '2px solid #D6E0F0',
            borderTopLeftRadius: '0px',
            backgroundColor: '#D6E0F0',
          }}
        >
          Load more
        </button>
      )
    );
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
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

  const showAllTags = () => {
    return tags.map((t, i) => (
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

  const showAllBlogs = () => {
    return blogs.map((blog, index) => (
      <article key={index}>
        <Card blog={blog} />
      </article>
    ));
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));
  };

  return (
    <Fragment>
      {head()}
      <Layout>
        <main className="m-4">
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-2 pb-4">
                <h1 className="fw-bold text-center text-warning">
                  Newest Blogs
                </h1>
              </div>
              <section>
                <div className="text-center pb-5">
                  {showAllCategories()}
                  <br />
                  <br />
                  {showAllTags()}
                </div>
              </section>
            </header>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                {showAllBlogs()}
                {showLoadedBlogs()}
              </div>
              <div className="text-center pt-4 pb-5">{loadMoreButton()}</div>
            </div>
          </div>
        </main>
      </Layout>
    </Fragment>
  );
};

Blogs.getInitialProps = async () => {
  let skip = 0;
  let limit = 2;

  const data = await listAllBlogsCategoriesTags(skip, limit);
  if (data.error) {
    console.log(data.error);
  } else {
    return {
      blogs: data.blogs,
      categories: data.categories,
      tags: data.tags,
      totalBlogs: data.size,
      blogsLimit: limit,
      blogSkip: skip,
    };
  }
};

export default withRouter(Blogs);
