import React from 'react'
import { graphql, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'

import Layout from '../components/Layout'
import WorldMap from '../components/WorldMap'
import VolunteerCarousel from '../components/VolunteerCarousel'
import LatestNews from '../components/LatestNews'

const quickLinksConfig = [
  { slug: '/rules', label: 'Rulebook' },
  { slug: '/guides', label: 'Guidebooks' },
  { slug: '/contact', label: 'Contact Us' },
]

const socialLinks = [
  {
    link: 'https://www.facebook.com/InternationalQuidditchAssociation/',
    icon: faFacebook,
  },
  {
    link: 'https://www.youtube.com/channel/UC-oBgQgyuFRkvYEgG1unTUw/videos',
    icon: faYoutube,
  },
]

const Index = ({ data }) => {
  const homeImages =
    data.allWordpressWpMedia &&
    data.allWordpressWpMedia.edges.map(edge => edge.node)

  const renderHomeImage = () => {
    if (!homeImages) return null
    return (
      <div
        key={homeImages[0].id}
        style={{ backgroundImage: `url(${homeImages[0].link})` }}
        className="home-image"
      />
    )
  }

  return (
    <Layout>
      <div className="message is-danger is-medium">
        <div className="message-body has-text-centered">
          {'COVID-19 UPDATE: Click '}
          <Link to="/covid-19">here</Link>
          {' to read more'}
        </div>
      </div>
      <section
        className="section section--gradient is-hidden-mobile"
        style={{ padding: '0' }}
      >
        <div className="home-image-container">
          {renderHomeImage()}
          <div className="home-image-mask">
            <Link to="/what-is-quidditch">
              <img
                src="../img/logo_short_white.png"
                alt="International Quidditch Association"
              />
            </Link>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-8">
            <div className="tile is-parent">
              <section className="section section-gradient">
                <h2 className="title is-2 home-section-header">Latest News</h2>
                <LatestNews />
              </section>
            </div>
          </div>
          <div className="tile is-vertical is-4">
            <div className="tile is-parent">
              <section className="section section-gradient">
                <div className="tile is-child">
                  <h3 className="title is-3 home-section-header">
                    Meet The IQA
                  </h3>
                  <VolunteerCarousel />
                </div>
              </section>
            </div>
            <div className="tile is-parent">
              <section className="section section-gradient">
                <div className="tile is-child">
                  <h3 className="title is-3 home-section-header">
                    Quick Links
                  </h3>
                  <div>
                    <ul>
                      {quickLinksConfig.map(link => (
                        <li key={link.slug}>
                          <Link to={link.slug}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>
            <div className="tile is-parent">
              <section className="section section-gradient">
                <div className="tile is-child">
                  <h3 className="title is-3 home-section-header">Follow Us</h3>
                  <div>
                    <ul className="social-links">
                      {socialLinks.map(link => (
                        <li key={link.link}>
                          <a
                            href={link.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon icon={link.icon} size="2x" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <section
        className="section section-gradient is-hidden-mobile"
        style={{ backgroundColor: 'rgb(114,186,107)' }}
      >
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
