import Layout from '../../components/Layout';
import Link from 'next/link';
import Admin from '../../components/auth/Admin';

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="m-4 pt-4 pb-4">
            <h2 class="text-center text-warning">Admin Dashboard</h2>
          </div>

          <div className="row">
            <div className="col-md-3 ps-2 pe-2 ms-5 me-5">
              <div className="list-group">
                <Link href="/admin/crud/category-tag">
                  <a
                    className="list-group-item list-group-item-action list-group-item-primary"
                    aria-current="true"
                  >
                    Create Category
                  </a>
                </Link>
                <Link href="/admin/crud/category-tag">
                  <a
                    className="list-group-item list-group-item-action list-group-item-primary"
                    aria-current="true"
                  >
                    Create Tag
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-md-8">right</div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
