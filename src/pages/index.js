import React from 'react'
import Carousel from 'nuka-carousel'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import WorldMap from '../components/WorldMap'

const iqaImages = new Array(10).fill(0).map((_) => Math.random() * (100 - 1) + 1)

const Index = ({ data }) => {
  const homeImages = data.allWordpressWpMedia && data.allWordpressWpMedia.edges.map(edge => edge.node)

  const renderHomeImage = () => (
    <Carousel
      autoplay
      autoplayInterval={10000}
      speed={3000}
      withoutControls
      wrapAround
      transitionMode="fade"
      heightMode="max"
    >
      {
        homeImages.map((image) => (
          <div key={image.id} style={{ backgroundImage: `url(${image.link})`}} className="home-image" />
        ))
      }
    </Carousel>
  )

  const renderMeetIQA = () => (
    <div className="container">
      <Carousel
        autoplay
        wrapAround
        autoplayInterval={3000}
        cellSpacing={125}
        slidesToShow={4}
        slideWidth="200px"
        transitionMode="scroll"
      >
        {iqaImages.map((image) => (
          <div key={image} className="iqa-image">{image}</div>
        ))}
      </Carousel>
    </div>
  )

  return (
    <Layout>
      <section className="section section--gradient" style={{ padding: '0' }}>
        <div className="home-image-container">
          <div className="home-image-mask"><h1>International Quidditch Association</h1></div>
          {renderHomeImage()}
        </div>
      </section>
      <section className="section section-gradient" style={{ backgroundColor: 'rgb(105,172,223)' }}>
        <h2 className="title is-2">Recent News</h2>
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-radiusless has-background-grey-lighter">
              <p>Main Content</p>
            </div>
          </div>
          <div className="tile is-parent">
            <div className="tile is-child box is-radiusless has-background-grey-lighter">
              <p>Secondary Content</p>
            </div>
          </div>
          <div className="tile is-parent">
            <div className="tile is-child box is-radiusless has-background-grey-lighter">
              <p>Tertiary Content</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-gradient has-background-white">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 className="title is-2 is-pulled-right" style={{ width: '100%', textAlign: 'right' }}>Meet the IQA</h2>
          {renderMeetIQA()}
        </div>
      </section>
      <section className="section section-gradient" style={{ backgroundColor: 'rgb(105,172,223)' }}>
        <h2 className="title is-2">Quidditch Around the World</h2>
        <div className="container">
          <WorldMap />
        </div>
      </section>
    </Layout>
  )
}

export default Index
export const homePageData = graphql`
query HomePage {
  allWordpressWpMedia(filter: { mime_type: { eq: "image/jpeg" }, caption: { eq: "<p>home</p>\n" } }, limit: 3) {
    edges {
      node {
        id
        slug
        date
        link
        alt_text
        caption
        type
        mime_type
      }
    }
  }
}`