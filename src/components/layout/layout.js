import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Header from '../header/header';

import 'prismjs/themes/prism-tomorrow.css';
import 'typeface-roboto-mono';
import 'normalize.css';
import './layout.css';

import styles from './layout.module.css';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div className={styles.layout}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        {/* <footer>© {new Date().getFullYear()}</footer> */}
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
