import React from 'react';
import SEO from '../components/seo';
import styles from './about.module.css';
import { deobfuscateEmail } from '../utils/email_obfuscation/email_obfuscation';
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { CurrentAge } from '../components/current_age/current_age';

export default () => (
  <div className={styles.container}>
    <SEO title='About' />
    <p>
      <Link to='/'>← Back to Home</Link>
    </p>
    <h1>About me</h1>

    <div className={styles.bio}>
      <StaticQuery
        query={graphql`
          query {
            placeholderImage: file(relativePath: { eq: "patrick_full.jpg" }) {
              childImageSharp {
                fluid(maxWidth: 640, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        `}
        render={data => (
          <Img
            fluid={data.placeholderImage.childImageSharp.fluid}
            className={styles.photo}
          />
        )}
      />

      <p>
        Hello! My name is Patrick, I live in Switzerland and I'm{' '}
        <CurrentAge birthday={new Date(1993, 9, 1)} /> years old.
      </p>
      <p>
        At around age 14 I started getting interested in programming. I was
        playing around with Visual Basic before getting serious with C. Since
        then I have been developing software in all kinds of programming
        languages and have been working professionally for{' '}
        {new Date().getFullYear() - 2010} years and counting.
      </p>
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
  </div>
);
