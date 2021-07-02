import Head from 'next/head';
import Layout from '../../components/Layout';
import { Fragment } from 'react';
import { singleCategory } from '../../actions/category';
import Card from '../../components/blog/Card';

const Category = ({ category, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {category.name} | {process.env.NEXT_PUBLIC_APP_NAME}
      </title>
      <meta name="description" content={`Best Blogs on ${category.name}`} />
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_DOMAIN_DEVELOPMENT}/categories/${query.slug}`}
      />
      <meta
        property="og:title"
        content={`${category.name}| ${process.env.NEXT_PUBLIC_APP_NAME}`}
      />
      <meta
        property="og:description"
        content={`Best Blogs on ${category.name}`}
      />
      <meta property="og:type" content="webiste" />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_DOMAIN_DEVELOPMENT}/categories/${query.slug}`}
      />
      <meta
        property="og:site_name"
        content={`${process.env.NEXT_PUBLIC_APP_NAME}`}
      />
      <meta property="og:image" content="image/jpg" />
      <meta property="og:image:secure_url" content="image/jpg" />
      <meta property="og:image:type" content="image/jpg" />
      <meta
        property="fb:app_id"
        content={`${process.env.NEXT_PUBLIC_FACEBOOKAPP_ID}`}
      />
    </Head>
  );

  return (
    <Fragment>
      <Layout>
        <main className="m-4">
          <div className="container-fluid">
            <header>
              <div className="col-md-12 ps-3 pe-3">
                <h1 className="fw-bold text-center text-warning mt-5 mb-5 pt-3">
                  <i class="fas fa-tags pe-2"></i>Blogs on {category.name}
                </h1>
                {blogs.map((b, i) => (
                  <Card key={i} blog={b} />
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </Fragment>
  );
};

Category.getInitialProps = async ({ query }) => {
  const data = await singleCategory(query.slug);
  if (data.error) {
    console.log(data.error);
  } else {
    return { category: data.category, blogs: data.blogs, query };
  }
};

export default Category;
