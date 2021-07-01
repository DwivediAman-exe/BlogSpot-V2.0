import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/user';
import moment from 'moment';
import { Fragment } from 'react';

const UserProfile = ({ user, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.username} | {process.env.NEXT_PUBLIC_APP_NAME}
      </title>
      <meta name="description" content={`Blogs by ${user.name}`} />
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_DOMAIN_DEVELOPMENT}/profile/${query.username}`}
      />
      <meta
        property="og:title"
        content={`${user.username}| ${process.env.NEXT_PUBLIC_APP_NAME}`}
      />
      <meta property="og:description" content={`Blogs by ${user.name}`} />
      <meta property="og:type" content="webiste" />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_DOMAIN_DEVELOPMENT}/profile/${query.username}`}
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

  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div className="ms-3 mb-3" key={i}>
          <i class="fas fa-map-marker text-dark me-2" />
          <Link href={`/blogs/${blog.slug}`}>
            <a>{blog.title}</a>
          </Link>
        </div>
      );
    });
  };

  return (
    <Fragment>
      {head()}
      <Layout>
        <div className="container ">
          <div className="row ms-1 me-1">
            <div className="col-md-12">
              <div
                className="card shadow-1-strong mb-5 mt-4 ps-2 pt-3 pb-3"
                style={{
                  backgroundColor: '#A4EBF3',
                  borderTopLeftRadius: '20px',
                  borderBottomRightRadius: '20px',
                }}
              >
                <div className="card-body">
                  <div className="float-end">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/user/photo/${user.username}`}
                      className="img img-fluid shadow-1-strong me-3 img-thumbnail"
                      style={{
                        height: '130px',
                        maxHeight: '130px',
                        width: '130px',
                        maxWidth: '130px',
                        borderRadius: '15px',
                        objectFit: 'cover',
                      }}
                      alt="user profile"
                    />
                  </div>
                  <div>
                    <h4>
                      User :{' '}
                      <strong className="fw-light ps-5">{user.name}</strong>
                    </h4>
                    <h4>
                      Joined :{' '}
                      <strong className="fw-light ps-4">
                        {moment(user.createdAt).fromNow()}
                      </strong>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-4">
          <div className="row ms-1 me-1">
            <div className="col-md-6">
              <div className="mb-5 me-2">
                <div
                  className="card-body hover-shadow"
                  style={{ backgroundColor: '#CCF2F4', borderRadius: '20px' }}
                >
                  <h5 className="ps-2 pb-3 pt-3">
                    Recent blogs by {user.name}
                  </h5>
                  {showUserBlogs()}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="card-body hover-shadow"
                style={{ backgroundColor: '#CCF2F4', borderRadius: '20px' }}
              >
                <h5 className="ps-3 pb-3 pt-3">Message {user.name}</h5>
                <p>formmmm</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

UserProfile.getInitialProps = async ({ query }) => {
  const data = await userPublicProfile(query.username);
  if (data.error) {
    console.log(data.error);
  } else {
    return { user: data.user, blogs: data.blogs, query };
  }
};

export default UserProfile;
