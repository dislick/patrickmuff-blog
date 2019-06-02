import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';

import styles from './about.module.css';
import { deobfuscateEmail } from './email_obfuscation/email_obfuscation';

const AboutPage = () => (
  <Layout>
    <SEO title='About' />
    <h1>About me</h1>
    <div className={styles.bio}>
      <p>
        I am currently employed as Head of Software Engineering at{' '}
        <a href='http://muffag.ch'>Muff Kirchturmtechnik AG</a>. In my free time
        I enjoy exploring the world with my girlfriend, riding motorcycles and
        learning new things.
      </p>
      <p>
        If you need to contact me it is best to{' '}
        <a
          onClick={event => {
            event.preventDefault();
            window.location.href =
              'mailto:' + deobfuscateEmail('t|mm5whGnthps5jvt');
          }}
          href='mailto:fake.email.do.not.use@gmail.com'
        >
          send me an email
        </a>
        .
      </p>
      <p>
        Check out my <a href='https://github.com/dislick'>Github profile</a> if
        you are interested in web technologies.
      </p>
    </div>
  </Layout>
);

export default AboutPage;
