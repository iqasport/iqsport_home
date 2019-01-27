import React from 'react'
import Helmet from 'react-helmet'

import Navbar from './Navbar'
import './all.sass'

const Layout = ({ children }) => (
  <div>
    <Helmet title="International Quidditch Association" />
    <Navbar />
    <div className="main-container">{children}</div>
    <footer className="footer">
      <div className="content has-text-centered">
        <p>This is the footer</p>
      </div>
    </footer>
  </div>
)

export default Layout
