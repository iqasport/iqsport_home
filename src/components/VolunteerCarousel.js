import React from 'react'
import Carousel from 'nuka-carousel'
import { StaticQuery, graphql, Link } from 'gatsby'

const VolunteerCarousel = () => {
  const renderImage = ({ name, imageSrc }) => (
    <div key={name} className="iqa-image">
      <Link to="/volunteer">
        <img src={imageSrc} alt={name} />
      </Link>
    </div>
  )

  const renderCarousel = (data) => {
    const transformedData = data.allWordpressPost && data.allWordpressPost.edges.map(({ node }) => (
      {
        name: node.title,
        imageSrc: node.featured_media.localFile.childImageSharp.fluid.src
      }
    ))

    return (
      <div className="container volunteer-carousel">
        <Carousel
          autoplay
          autoplayInterval={7000}
          wrapAround
          withoutControls
          transitionMode="fade"
        >
          {transformedData.map(renderImage)}
        </Carousel>
      </div>
    )
  }

  return (
    <StaticQuery
      query={graphql`
      query VolunteerImages {
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
      }`}
      render={data => (renderCarousel(data))}
    />
  )
}

export default VolunteerCarousel
