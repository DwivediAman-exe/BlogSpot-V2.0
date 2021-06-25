import { Fragment } from 'react';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <p>header</p>
      {children}
      <p>footer</p>
    </Fragment>
  );
};

export default Layout;
