import Layout from '../../../components/Layout';
import Link from 'next/link';
import Private from '../../../components/auth/Private';
import BlogRead from '../../../components/crud/BlogRead';
import { isAuth } from '../../../actions/auth';

const Blogs = () => {
  const username = isAuth() && isAuth().username;
  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="m-4 pt-4 pb-4">
            <h1 class="text-center text-warning">
              <i class="fas fa-tasks pe-2"></i>Manage Your Blogs
            </h1>
          </div>
          <div className="row">
            <div className="col-md-12 ps-2">
              <BlogRead username={username} />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blogs;
