import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

// import Masonry from "react-masonry-component"

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
}

class Posts extends Component {
  render() {
    function FeaturedImage(image) {
      if (!image) {
        return null
      }
      console.log(image)
      return (
        <div>
          <Img
            fluid={image.localFile.childImageSharp.fluid}
            alt=""
            className="img-thumb"
          />
        </div>
      )
    }

    const data = this.props.data
    console.log(data)
    return (
      <>
        <Layout>
          <SEO title="Posts" />
          <div>
            <h1>Pages</h1>
            {data.allWordpressPage.edges.map(({ node }) => (
              <div key={node.slug}>
                <Link to={node.slug}>
                  <h2>{node.title}</h2>
                  {FeaturedImage(node.featured_media)}
                </Link>
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            ))}
          </div>

          <h1>Posts</h1>
          <div>
            {data.allWordpressPost.edges.map(({ node }) => (
              <div key={node.slug}>
                <Link to={`/blog/${node.slug}`}>
                  <div>
                    <h2>{node.title}</h2>
                  </div>
                  {FeaturedImage(node.featured_media)}
                </Link>
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            ))}
          </div>
        </Layout>
      </>
    )
  }
}

export default Posts

export const pageQuery = graphql`
  query {
    allWordpressPage {
      edges {
        node {
          id
          title
          excerpt
          slug
        }
      }
    }
    allWordpressPost {
      edges {
        node {
          title
          excerpt
          slug
          featured_media {
            source_url
            localFile {
              childImageSharp {
                sizes(maxWidth: 1800) {
                  ...GatsbyImageSharpSizes
                }
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
                resize(width: 400, jpegProgressive: true) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
