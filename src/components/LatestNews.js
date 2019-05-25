import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import NewsItem from './NewsItem'

const LatestNews = () => {
  const renderNewsItem = (newsItem) => {
    /* eslint-disable */
    const { title, slug, excerpt, featured_media } = newsItem.node
    const imageSrc = featured_media && featured_media.localFile
      ? featured_media.localFile.childImageSharp.fluid.src
      : '../img/logo_long_green_negative.jpg'
    /* eslint-enable */

    return <NewsItem title={title} slug={slug} excerpt={excerpt} imageSrc={imageSrc} />
  }

  const renderNews = (data) => {
    const newsItems = data && data.allWordpressPost.edges

    return (
      <div className="tile is-ancestor is-vertical">
        {newsItems && newsItems.map(renderNewsItem)}
      </div>
    )
  }

  return (
    <StaticQuery
      query={graphql`
      query LatestNews {
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
          },
          limit: 3) {
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
                      base64
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                      originalImg
                      originalName
                    }
                  }
                }
              }
            }
          }
        }
      }
      `}
      render={data => renderNews(data)}
    />
  )
}

export default LatestNews
