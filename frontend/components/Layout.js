import Header from './Header';
import { Fragment } from 'react';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
      <p>footer</p>
    </Fragment>
  );
};

export default Layout;
