import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

class Post extends Component {
  render() {
    const StaticPost = this.props.data.wordpressPost

    return (
      <>
      <Layout>
          <SEO title={StaticPost.title} />
        <h1>{StaticPost.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: StaticPost.content }} />
        </Layout>
      </>
    )
  }
}

export default Post

export const postQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
    }
  }
`