import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'
import { uniqueId } from 'lodash'

const navConfig = [
  {
    title: 'About',
    slug: '/about',
    dropdownItems: [
      {
        title: 'What is quidditch?',
        slug: '/what-is-quidditch/'
      },
      {
        title: 'History',
        slug: '/history'
      },
      {
        title: 'Mission and Values',
        slug: '/mission-values'
      },
      {
        title: 'Board of Trustees',
        slug: '/board-of-trustees'
      },
      {
        title: 'Volunteers',
        slug: '/volunteers'
      },
      {
        title: 'Partners',
        slug: '/partners'
      }
    ]
  },
  {
    title: 'Events',
    slug: '/events',
    dropdownItems: [
      {
        title: 'World Cup',
        slug: '/world-cup'
      },
      {
        title: 'Continental Games',
        slug: '/continental-games'
      }
    ]
  },
  {
    title: 'News',
    slug: '/news'
  },
  {
    title: 'Media',
    slug: '/media'
  },
  {
    title: 'Play',
    slug: '/play',
    dropdownItems: [
      {
        title: 'National Governing Bodies',
        slug: '/national-governing-bodies'
      },
      {
        title: 'Teams',
        slug: '/teams'
      },
      {
        title: 'Rules',
        slug: '/rulebook'
      },
      {
        title: 'Referees',
        slug: '/referees'
      }
    ]
  },
  {
    title: 'Resources',
    slug: '/resources',
    dropdownItems: [
      {
        title: 'Guides',
        slug: '/guides'
      },
      {
        title: 'Rules',
        slug: '/rulebook'
      },
      {
        title: 'Internal Documents',
        slug: '/documents'
      },
      {
        title: 'Policies',
        slug: '/policies'
      }
    ]
  },
  {
    title: 'Contact Us',
    slug: '/contact',
    dropdownItems: [
      {
        title: 'FAQs',
        slug: '/faqs'
      },
      {
        title: 'Media Inquires',
        slug: '/media-inquires'
      },
      {
        title: 'Partnership Inquires',
        slug: '/partners'
      },
      {
        title: 'Other Inquiries',
        slug: '/contact'
      }
    ]
  }
]

const Navbar = () => {
  const renderNavLink = ({ slug, title }) => (
    <Link
      className="navbar-item"
      to={slug}
      key={`${uniqueId(`${slug}_`)}`}
    >
      {title}
    </Link>
  )

  const renderNavDropdown = ({ slug, title, dropdownItems }) => (
    <div key={slug} className="navbar-item has-dropdown is-hoverable">
      <Link className="navbar-link is-arrowless" to={slug} key={`${uniqueId(`${slug}_`)}`}>
        {title}
      </Link>
      <div className="navbar-dropdown is-right">
        {dropdownItems.map(renderNavLink)}
      </div>
    </div>
  )

  const renderNavConfig = (config) => {
    if (config.dropdownItems) return renderNavDropdown(config)
    return renderNavLink(config)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <figure className="image">
              <img src={logo} alt="International Quidditch Association" style={{ width: '88px' }} />
            </figure>
          </Link>
        </div>
        <div className="navbar-end">
          {navConfig.map(renderNavConfig)}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
