import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

const News = ({ data }) => {
  const renderNewsItem = (newsItem) => {
    /* eslint-disable */
    const { title, slug, excerpt, featured_media } = newsItem.node
    const imageSrc = featured_media ?
      featured_media.localFile.childImageSharp.fluid.src
      : '../img/logo_long_green_negative.jpg'
    /* eslint-enable */

    return (
      <div key={slug} className="tile is-parent">
        <div className="tile is-child box is-radiusless is-paddingless has-background-grey-lighter news-container">
          <div className="news-image" style={{ backgroundImage: `url(${imageSrc})` }} />
          <div className="news-content">
            <h4 className="title has-text-weight-bold is-size-4">{title}</h4>
            <span dangerouslySetInnerHTML={{ __html: excerpt }} />
            <Link to={slug}>Read More...</Link>
          </div>
        </div>
      </div>
    )
  }

  const newsItems = data && data.allWordpressPost.edges

  return (
    <Layout>
      <div className="container">
        <section className="section has-background-white">
          <h2 className="title is-size-2 home-section-header">News</h2>
          <div className="tile is-ancestor is-vertical">
            {newsItems && newsItems.map(renderNewsItem)}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default News
export const newsQuery = graphql`
query News {
  allWordpressPost(filter: { categories: { name: { eq: "News" } } }) {
    edges {
      node {
        title
        slug
        excerpt
        categories {
          name
        }
        featured_media {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}`