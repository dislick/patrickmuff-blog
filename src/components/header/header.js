import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import AuthorImage from '../author_image';
import styles from './header.module.css';
import { getAge } from './get_age/get_age';

const Header = ({ siteTitle }) => (
  <header>
    <div className={styles.header}>
      <Link to='/' className={styles.authorContainer}>
        <AuthorImage className={styles.author} />
      </Link>
      <div className={styles.about}>
        <h1 className={styles.title}>{siteTitle}</h1>
        <h2 className={styles.subtitle}>Blog</h2>
        <p>
          {getAge(new Date(1993, 9, 1))} year old web enthusiast and person.{' '}
          <Link to='/about'>Read more about me</Link>
        </p>
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
