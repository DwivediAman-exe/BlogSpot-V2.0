import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="m-4 pt-3 pb-4">
            <h2 class="text-center text-warning">
              <i class="fas fa-user-tie fs-1 pe-2"></i> User Dashboard
            </h2>
          </div>

          <div className="row text-center">
            <div className="col-md-12">
              <div className="mt-3 mb-3 fs-3">
                <Link href="/user/crud/blog">
                  <a className="text-info fw-bold text-decoration-underline">
                    <i class="fas fa-ellipsis-v fs-2 pe-3"></i>Create a Blog
                  </a>
                </Link>
                <br />
                <br />
                <Link href="/user/update">
                  <a className="text-info fw-bold text-decoration-underline">
                    <i class="fas fa-ellipsis-v fs-2 pe-3"></i>Update your
                    Profile
                  </a>
                </Link>
                <br />
                <br />
                <Link href="/user/crud/blogs">
                  <a className="text-info fw-bold text-decoration-underline">
                    <i class="fas fa-ellipsis-v fs-2 pe-3"></i> Update / Delete
                    Your Blog
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
