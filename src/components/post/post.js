import React from 'react';
import { graphql } from 'gatsby';

import styles from './post.module.css';

export default function Post({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <div>
      <p className={styles.meta}>{frontmatter.date}</p>
      <h1 className={styles.heading}>{frontmatter.title}</h1>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
