import Layout from '../../../components/Layout';
import Link from 'next/link';
import Admin from '../../../components/auth/Admin';
import BlogRead from '../../../components/crud/BlogRead';

const Blogs = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="m-4 pt-4 pb-4">
            <h1 class="text-center text-warning">
              <i class="fas fa-tasks pe-3"></i>Manage All Blogs
            </h1>
          </div>
          <div className="row">
            <div className="col-md-12 ps-2">
              <BlogRead />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blogs;
