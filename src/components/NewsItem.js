import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const NewsItem = (props) => {
  const { title, slug, excerpt, imageSrc } = props

  return (
    <div key={slug} className="tile is-parent">
      <div className="tile is-child box is-radiusless is-paddingless has-background-grey-lighter news-container">
        <div className="news-image is-hidden-mobile" style={{ backgroundImage: `url(${imageSrc})` }} />
        <div className="news-content">
          <h4 className="title has-text-weight-bold is-size-4">{title}</h4>
          <span dangerouslySetInnerHTML={{ __html: excerpt }} />
          <Link to={slug}>Read More...</Link>
        </div>
      </div>
    </div>
  )
}

NewsItem.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  excerpt: PropTypes.string,
  imageSrc: PropTypes.string,
}

export default NewsItem