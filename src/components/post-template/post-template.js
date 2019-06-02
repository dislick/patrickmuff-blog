import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout/layout';
import SEO from '../seo';

import styles from './post.module.css';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;

    return (
      <Layout>
        <SEO title={post.frontmatter.title} />
        <p className={styles.meta}>{post.frontmatter.date}</p>
        <h1 className={styles.heading}>{post.frontmatter.title}</h1>
        <hr className={styles.contentDivider} />
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
