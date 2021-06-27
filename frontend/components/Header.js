import Link from 'next/link';
import Router from 'next/router';
import { Fragment } from 'react';
import { signout, isAuth } from '../actions/auth';
import NProgress from 'nprogress';
import '.././node_modules/nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-info shadow-1-strong mb-4"
      style={{ letterSpacing: '0.1rem' }}
    >
      <Link href="/">
        <a className="navbar-brand fs-2 ms-4 me-5 fw-bold">
          <i class="fas fa-mail-bulk ms-2 me-3 fs-2 "></i>
          {process.env.NEXT_PUBLIC_APP_NAME}
        </a>
      </Link>
      <button
        className="navbar-toggler me-2"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarButtonsExample"
        aria-controls="navbarButtonsExample"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarButtonsExample">
        {/*  Left links */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {/* <li className="nav-item">
            <a className="nav-link" href="#">
              Dashboard
            </a>
          </li> */}
        </ul>
        {/* right links */}
        <div className="d-flex align-items-center">
          {!isAuth() && (
            <Fragment>
              <Link href="/signin">
                <button
                  type="button"
                  className="btn btn-rounded text-dark me-4 ms-4 mt-1 mb-1"
                  style={{ letterSpacing: '0.07rem' }}
                >
                  <a>LogIn</a>
                </button>
              </Link>
              <Link href="/signup">
                <button
                  type="button"
                  className="btn
						btn-rounded me-4 ps-4 pe-4 text-dark mb-1 mt-1"
                  style={{ letterSpacing: '0.07rem' }}
                >
                  Sign Up for free
                </button>
              </Link>
            </Fragment>
          )}

          {isAuth() && (
            <Fragment>
              {isAuth().role === 0 ? (
                <Link href="/user">
                  <button
                    type="button"
                    className="btn fw-normal
						btn-rounded me-3 ps-4 pe-4 text-dark mb-1 mt-1 ms-4"
                    style={{ letterSpacing: '0.07rem' }}
                  >
                    {`${isAuth().name}`}'s Dashboard
                  </button>
                </Link>
              ) : (
                <Link href="/admin">
                  <button
                    type="button"
                    className="btn fw-normal
						btn-rounded me-3 ps-4 pe-4 text-dark mb-1 mt-1 ms-4"
                    style={{ letterSpacing: '0.07rem' }}
                  >
                    {`${isAuth().name}`}'s Dashboard
                  </button>
                </Link>
              )}

              <button
                type="button"
                className="btn btn-rounded fw-light text-dark me-4 ms-4 mt-1 mb-1"
                style={{ letterSpacing: '0.07rem' }}
                onClick={() => signout(() => Router.replace(`/signin`))}
              >
                <a>Signout</a>
              </button>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
