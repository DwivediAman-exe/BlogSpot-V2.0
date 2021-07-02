import Layout from '../../../components/Layout';
import Link from 'next/link';
import Private from '../../../components/auth/Private';
import BlogCreate from '../../../components/crud/BlogCreate';

const CreateBlog = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="m-4 pt-4 pb-4">
            <h2 class="text-center text-warning">
              <i class="fas fa-feather-alt pe-2"></i>Create a Blog
            </h2>
          </div>
          <div className="row">
            <div className="col-md-12 ps-2">
              <BlogCreate />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default CreateBlog;
