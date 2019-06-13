import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import styles from './links.module.css';

const LinksPage = ({ data }) => {
  const links = data.allLinksJson.nodes;

  return (
    <Layout>
      <SEO title='Links' />
      <h1>Links</h1>
      <p>This is a collection of links I deemed worthy of being shared here.</p>
      <h2>2019</h2>
      <ul className={styles.list}>
        {links.map((link, index) => (
          <li key={index} className={styles.listEntry}>
            <a href={link.url}>{link.title}</a>{' '}
            {link.description && (
              <span className={styles.description}>{link.description}</span>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default LinksPage;

export const pageQuery = graphql`
  {
    allLinksJson {
      nodes {
        title
        url
        timestamp
        description
      }
    }
  }
`;
