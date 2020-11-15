import { Link, connect } from 'umi';
import React from 'react';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>Ant Design</span>
            </Link>
          </div>
          <div className={styles.desc}>An application for auditors and firms</div>
        </div>
        {children}
      </div>
      <div className={styles.footer}>
        Copyright &copy; {new Date().getFullYear()} AuditMe || Find me on{' '}
        <a href="https://github.com/iammar7" rel="noreferrer" target="_blank">
          GitHub{' '}
        </a>
      </div>
    </div>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
