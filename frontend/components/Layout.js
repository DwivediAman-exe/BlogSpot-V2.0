import Header from './Header';
import { Fragment } from 'react';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
      {/* for footer */}
    </Fragment>
  );
};

export default Layout;
