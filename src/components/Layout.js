import React from 'react'
import Helmet from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'gatsby'

import Navbar from './Navbar'
import './all.sass'

const disclaimerText = "IQA and its activities are not licensed by, sponsored by or associated with Warner Bros., J.K."
  + " Rowling or their affiliates. 'Quidditch,' 'Harry Potter' and all related names, characters and indicia are " +
  "trademarks of and © Warner Bros. - Harry Potter publishing rights © J.K. Rowling"

const socialLinks = [
  { link: 'https://www.facebook.com/InternationalQuidditchAssociation/', icon: faFacebook },
  { link: 'https://twitter.com/IQAsport', icon: faTwitter },
  { link: 'https://www.youtube.com/channel/UC-oBgQgyuFRkvYEgG1unTUw/videos', icon: faYoutube },
  { link: 'https://www.instagram.com/iqaquidditch/', icon: faInstagram },
]

const quickLinksConfig = [
  { slug: '/volunteer-with-us', label: 'Volunteer with us' },
  { slug: '/privacy', label: 'Privacy Policy' },
  { slug: '/contact', label: 'Contact Us' }
]

const Layout = ({ children }) => (
  <div>
    <Helmet className="has-navbar-fixed-top" title="International Quidditch Association" />
    <Navbar />
    <div className="main-container">{children}</div>
    <footer className="footer">
      <div className="columns">
        <div className="column is-one-third is-flex" style={{ alignItems: 'center' }}>
          <img
            className="image is-128x128"
            src="../img/logo_short_monochrome_white.png"
            alt="International Qudditch Association logo"
          />
          <p className="is-size-7 has-text-white-bis has-text-left">{disclaimerText}</p>
        </div>
        <div className="column is-one-third is-flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <ul>
            {quickLinksConfig.map((link) => (
              <li key={link.slug}><Link className="has-text-white-ter" to={link.slug}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="column is-one-third">
          <h3 className="title is-size-3 has-text-white-bis">Follow Us</h3>
          <ul className="social-links">
            {socialLinks.map((link) => (
              <li key={link.link}>
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={link.icon} className="has-text-white-ter" size="2x" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  </div>
)

export default Layout
