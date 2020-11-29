import React from 'react';
import { Link, connect, Redirect } from 'umi';
import jwt_decode from 'jwt-decode';

// import logo from '../assets/logo.svg';
import styles from './AuthLayout.less';

const AuthLayout = ({ children }) => {
  // Check for Token
  if (localStorage.userToken) {
    // Decode token and get user info and expression
    const decoded = jwt_decode(localStorage.userToken);
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp > currentTime) {
      // Redirect to respective page if token has not expired
      return <Redirect to={`/${decoded.role}/`} />;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img
                alt="logo"
                className={styles.logo}
                src="https://upload.wikimedia.org/wikipedia/en/7/7b/Petromin_Logo.png"
              />
            </Link>
          </div>
          <div className={styles.desc}>An application for auditors and firms</div>
        </div>
        {children}
      </div>
      <div className={styles.footer}>
        Copyright &copy; {new Date().getFullYear()} Petromin || Our{' '}
        <a href="https://petromin.com/" rel="noreferrer" target="_blank">
          website
        </a>
      </div>
    </div>
  );
};

export default connect(({ settings }) => ({ ...settings }))(AuthLayout);
