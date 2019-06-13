import React from 'react';
import { Link } from 'gatsby';
import styles from './link_button.module.css';

export const LinkButton = props => (
  <Link {...props} className={styles.root}>
    {props.children}
  </Link>
);
