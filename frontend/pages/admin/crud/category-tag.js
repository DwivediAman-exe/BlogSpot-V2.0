import Layout from '../../../components/Layout';
import Link from 'next/link';
import Admin from '../../../components/auth/Admin';
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="m-4 pt-4 pb-4">
            <h2 class="text-center text-warning">Manage Categories and Tags</h2>
          </div>
          <div className="row">
            <div className="col-md-6 ps-2 text-center ">
              <h2 className="fw-bold mb-4">Categories</h2>
              <Category />
            </div>
            <div className="col-md-6 ps-2 text-center">
              <h2 className=" fw-bold mb-4">Tags</h2>
              <Tag />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
