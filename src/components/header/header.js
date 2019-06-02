import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import AuthorImage from '../author_image';
import styles from './header.module.css';
import { getAge } from './get_age/get_age';

const Header = ({ siteTitle }) => (
  <>
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
            {getAge(new Date(1993, 9, 1))} year old web enthusiast living in
            Switzerland. Interested in software engineering, design and motor
            racing.
          </p>
          <Link to='/about'>More about me</Link>
        </div>
      </div>
    </header>
    <hr className={styles.divider} />
  </>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
