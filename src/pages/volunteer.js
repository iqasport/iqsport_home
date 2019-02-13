import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'

const Volunteer = ({ data }) => {
  const transformedData = data.allWordpressPost && data.allWordpressPost.edges.map(({ node }) => (
    {
      name: node.title,
      imageSrc: node.featured_media.localFile.childImageSharp.fluid,
      content: node.content
    }
  ))

  const renderVolunteer = ({ name, imageSrc, content }) => (
    <div className="column">
      <div className="card">
        <div className="card-image">
          <Img fluid={imageSrc} />
        </div>
        <div className="card-content">
          <div className="content">
            <h4 className="title is-4">{name}</h4>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className="container">
        <section className="section">
          <div className="columns is-multiline">
            {transformedData.map(renderVolunteer)}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Volunteer
export const volunteerPageData = graphql`
query VolunteersPage {
  allWordpressPost(filter: { categories: { name: { eq: "Volunteers" } } }) {
    edges {
      node {
        title
        content
        categories {
          name
        }
        featured_media {
          localFile {
            childImageSharp {
              fluid(maxWidth: 250) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
}
`
