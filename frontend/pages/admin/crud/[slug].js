import Layout from '../../../components/Layout';
import Link from 'next/link';
import Admin from '../../../components/auth/Admin';
import BlogUpdate from '../../../components/crud/BlogUpdate';

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="m-4 pt-4 pb-4">
            <h2 class="text-center text-warning">
              <i class="fas fa-feather-alt pe-2"></i>Update Blog
            </h2>
          </div>
          <div className="row">
            <div className="col-md-12 ps-2">
              <BlogUpdate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
