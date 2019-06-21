import { graphql } from 'gatsby';
import groupBy from 'lodash.groupby';
import React from 'react';
import Layout from '../components/layout/layout';
import { LinkCollectionEntry } from '../components/link_collection_entry/link_collection_entry';
import SEO from '../components/seo';
import styles from './links.module.css';

export default ({ data }) => {
  const groups = groupBy(data.allLinksJson.nodes, link =>
    new Date(link.timestamp).getFullYear(),
  );

  return (
    <Layout>
      <SEO title='Links' />
      <h1>Links</h1>
      <p>This is a collection of links I deemed worthy of being shared here.</p>

      {Object.keys(groups)
        .sort((a, b) => parseInt(b) - parseInt(a)) // sort years from new to old
        .map(year => (
          <div key={year}>
            <h2>{year}</h2>
            <ul className={styles.list}>
              {groups[year].map((link, index) => (
                <LinkCollectionEntry key={index} {...link} />
              ))}
            </ul>
          </div>
        ))}
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    allLinksJson(sort: { fields: timestamp, order: DESC }) {
      nodes {
        title
        url
        timestamp
        description
        language
      }
    }
  }
`;
