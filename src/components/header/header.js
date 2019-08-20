import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import AuthorImage from '../author_image';
import styles from './header.module.css';

const Header = ({ siteTitle }) => (
  <header>
    <div className={styles.header}>
      <div className={styles.authorContainer}>
        <Link to='/'>
          <AuthorImage className={styles.author} />
        </Link>
      </div>
      <div className={styles.about}>
        <h1 className={styles.title}>{siteTitle}</h1>
        <p className={styles.aboutText}>
          Web professional living in Switzerland. Interested in software
          engineering, design, and motor racing.
        </p>
        <ul className={styles.links}>
          <li>
            <Link to='/about'>About Me</Link>
          </li>
          <li>
            <Link to='/links'>Link Collection</Link>
          </li>
        </ul>
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
