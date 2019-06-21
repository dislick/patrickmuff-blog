import { Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';

export default () => (
  <Layout>
    <SEO title='404: Not found' />
    <h1>Not Found</h1>
    <p>
      You just hit a route that doesn&#39;t exist.{' '}
      <Link to='/'>Go back to Home</Link>
    </p>
  </Layout>
);
