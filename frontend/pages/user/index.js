import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="m-4 pt-4 pb-4">
            <h2 class="text-center text-warning">User Dashboard</h2>
          </div>

          <div className="row">
            <div className="col-md-3 ps-2 pe-2 ms-5 me-5">
              <div className="list-group">
                <Link href="/user/update">
                  <a
                    className="list-group-item list-group-item-action list-group-item-primary"
                    aria-current="true"
                  >
                    Update Profile
                  </a>
                </Link>
                <Link href="/user/crud/blog">
                  <a
                    className="list-group-item list-group-item-action list-group-item-primary"
                    aria-current="true"
                  >
                    Create Blog
                  </a>
                </Link>
                <Link href="/user/crud/blogs">
                  <a
                    className="list-group-item list-group-item-action list-group-item-primary"
                    aria-current="true"
                  >
                    Update or Delete Blog
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-md-8">right</div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
