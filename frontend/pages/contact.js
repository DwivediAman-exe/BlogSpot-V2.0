import Layout from '../components/Layout';
import Link from 'next/link';
import ContactForm from '../components/form/ContactForm';

const Contact = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2 className="text-center pb-2 pt-4 text-warning">
              Contact Developer
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
