import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';
import ProfileUpdate from '../../components/auth/ProfileUpdate';

const UserProfileUpdate = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="m-3 pt-3 pb-4">
            <h2 class="text-center text-warning">User Dashboard</h2>
          </div>

          <div className="row">
            <ProfileUpdate />
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserProfileUpdate;
