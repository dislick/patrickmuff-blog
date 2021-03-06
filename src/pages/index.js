import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import styles from './index.module.css';

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title='Home' />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <div key={node.fields.slug} className={styles.entry}>
            <p className={styles.date}>{node.frontmatter.date}</p>
            <h3 className={styles.heading}>
              <Link to={'/blog' + node.fields.slug}>{title}</Link>
            </h3>
            <p
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        );
      })}
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
