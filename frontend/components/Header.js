import Link from 'next/link';
import Router from 'next/router';
import { Fragment } from 'react';
import { signout, isAuth } from '../actions/auth';
import NProgress from 'nprogress';
import '.././node_modules/nprogress/nprogress.css';
import Search from '../components/blog/Search';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Header = () => {
  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-lg sticky-top navbar-dark bg-info shadow-1-strong mb-4"
        style={{ letterSpacing: '0.1rem' }}
      >
        <Link href="/">
          <a className="navbar-brand fs-2 ms-2 me-3 fw-bold pe-1">
            <i class="fas fa-mail-bulk ms-2 me-2 fs-2 "></i>
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
            <Link href="/blogs">
              <a className="text-light fs-5 ps-3 me-4 pt-1 fw-lighter">
                <i class="fas fa-rss" /> Social Feed
              </a>
            </Link>
            <Link href="/user/crud/blog">
              <a className="text-light fs-5 pt-1 ps-3 fw-lighter">
                <i class="fas fa-feather-alt"></i> Write Blog
              </a>
            </Link>
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
                    SignUp for free
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
						btn-rounded me-2 ps-4 pe-4 text-dark mb-1 mt-1 ms-3"
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
						btn-rounded me-2 ps-4 pe-4 text-dark mb-1 mt-1 ms-4"
                      style={{ letterSpacing: '0.07rem' }}
                    >
                      {`${isAuth().name}`}'s Dashboard
                    </button>
                  </Link>
                )}

                <button
                  type="button"
                  className="btn btn-rounded fw-light text-dark me-4 ms-2 mt-1 mb-1"
                  style={{ letterSpacing: '0.07rem' }}
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  <a>Signout</a>
                </button>
              </Fragment>
            )}
            <Link href="/contact">
              <a className="">
                <i
                  class="fab fa-dev fs-2 pe-3 pt-1"
                  style={{ color: '#CDF0EA' }}
                ></i>
              </a>
            </Link>
          </div>
        </div>
      </nav>
      <Search />
    </Fragment>
  );
};

export default Header;
