import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './header.module.css';

const Header = ({ siteTitle }) => (
  <header>
    <div className={styles.header}>
      <h1 className={styles.title}>
        <Link to='/'>{siteTitle}</Link>
      </h1>
      <div>
        <Link to='/about'>About</Link>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
