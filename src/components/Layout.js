import React from 'react'
import Helmet from 'react-helmet'

import Navbar from './Navbar'
import './all.sass'

const disclaimerText = "IQA and its activities are not licensed by, sponsored by or associated with Warner Bros., J.K."
  + " Rowling or their affiliates. 'Quidditch,' 'Harry Potter' and all related names, characters and indicia are " +
  "trademarks of and © Warner Bros. - Harry Potter publishing rights © J.K. Rowling"

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
      </div>
    </footer>
  </div>
)

export default Layout
