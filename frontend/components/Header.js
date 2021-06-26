import Link from 'next/link';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info shadow-1-strong mb-4">
      <Link href="/">
        <a className="navbar-brand fs-2 ms-4 me-5">
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
          <Link href="/signin">
            <button
              type="button"
              className="btn btn-rounded text-dark me-4 ms-4 mt-1 mb-1"
            >
              <a>LogIn</a>
            </button>
          </Link>
          <Link href="/signup">
            <button
              type="button"
              className="btn
						btn-rounded me-5 ps-4 pe-4 text-dark mb-1 mt-1"
            >
              Sign Up for free
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
