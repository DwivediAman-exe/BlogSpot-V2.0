import Layout from '../../components/Layout';
import Link from 'next/link';
import Admin from '../../components/auth/Admin';

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="m-4 pt-4 pb-3">
            <h2 class="text-center text-warning">
              <i class="fas fa-user-tie fs-1 pe-2"></i> Admin Dashboard
            </h2>
          </div>
          <div className="row text-center">
            <div className="col-md-12">
              <div className="mt-3 mb-3 fs-3">
                <Link href="/user/update">
                  <a className="text-info fw-bold text-decoration-underline">
                    <i class="fas fa-ellipsis-v fs-2 pe-3" />
                    Update Profile
                  </a>
                </Link>
                <br />
                <br />
                <Link href="/admin/crud/category-tag">
                  <a className="text-info fw-bold text-decoration-underline me-5">
                    <i class="fas fa-ellipsis-v fs-2 pe-3" />
                    Create Tag
                  </a>
                </Link>
                <Link href="/admin/crud/category-tag">
                  <a className="text-info fw-bold text-decoration-underline">
                    <i class="fas fa-ellipsis-v fs-2 pe-3" />
                    Create Category
                  </a>
                </Link>
                <br />
                <br />
                <Link href="/admin/crud/blog">
                  <a className="text-info fw-bold text-decoration-underline">
                    <i class="fas fa-ellipsis-v fs-2 pe-3" />
                    Create Blog
                  </a>
                </Link>
                <br />
                <br />
                <Link href="/admin/crud/blogs">
                  <a className="text-info fw-bold text-decoration-underline">
                    <i class="fas fa-ellipsis-v fs-2 pe-3" />
                    Update or Delete Blogs
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
