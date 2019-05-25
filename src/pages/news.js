import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import NewsItem from '../components/NewsItem'

const News = ({ data }) => {
  const renderNewsItem = (newsItem) => {
    /* eslint-disable */
    const { title, slug, excerpt, featured_media } = newsItem.node
    const imageSrc = featured_media && featured_media.localFile
      ? featured_media.localFile.childImageSharp.fluid.src
      : '../img/logo_long_green_negative.jpg'
    /* eslint-enable */

    return <NewsItem title={title} slug={slug} excerpt={excerpt} imageSrc={imageSrc} />
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
  allWordpressPost(
    filter: {
      categories: {
        name: {
          eq: "News"
        }
      }
    },
    sort: {
      order: DESC, 
      fields: [date],
    }) {
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