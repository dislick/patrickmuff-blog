import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `StaticQuery`: https://gatsby.dev/staticquery
 */

const Image = props => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "patrick.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 112, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <Img fluid={data.placeholderImage.childImageSharp.fluid} {...props} />
    )}
  />
);
export default Image;
