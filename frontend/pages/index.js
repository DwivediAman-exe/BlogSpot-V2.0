import Layout from '../components/Layout';
import Link from 'next/link';
import styles from '../styles.module.css';

const Index = () => {
  return (
    <Layout>
      <main className={styles.bg}>
        <div className="text-center">
          <h1 className="fw-bold fs-1 mt-5 pb-5 text-dark">
            Social Blogging and Tutorial Platform
          </h1>
          <h2 className="ms-2 me-2">
            Login / SignUp and start writing your experience/posts and much
            more.
          </h2>
        </div>
        <div className="container p-5 text-center">
          <button className="btn btn-rounded btn-outline-info btn-lg ps-5 pe-5 me-4 mb-3 fs-6">
            <i class="fas fa-user-check"></i> Log In
          </button>
          <button className="btn btn-rounded btn-info btn-lg ps-5 pe-5 me-4 mb-3  fs-6">
            <i class="fas fa-user-plus"></i> Sign Up
          </button>
        </div>
        <div className="container p-4 text-center">
          <button
            className="btn btn-rounded btn-dark btn-lg ps-5 pe-5 me-4 mb-5 pb-3 pt-3 mb-3"
            style={{
              borderTopLeftRadius: '2px',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '2px',
              borderBottomLeftRadius: '10px',
            }}
          >
            <i class="fas fa-rss text-warning fa-lg pe-2" /> Check out Feed
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default Index;
