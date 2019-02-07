import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

const LatestNews = () => {
  const renderNewsItem = (newsItem) => {
    const { title, slug, excerpt, featured_media } = newsItem.node
    const imageSrc = featured_media ? featured_media.localFile.childImageSharp.fluid.src : '../img/products-grid1.jpg'

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
        allWordpressPost(filter: { categories: { name: { eq: "News" } } }, limit: 3) {
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
