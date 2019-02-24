import React, { Component } from 'react'
import { graphql } from 'gatsby'
import autobind from 'react-autobind'
import Layout from '../components/Layout'

const titleCleaner = (title) => {
  const enDashRegex = /&#8211;/
  return title.replace(enDashRegex, '-')
}

class VolunteerWithUs extends Component {
  constructor(props) {
    super(props)
    autobind(this)

    const jobPostings = props.data.allWordpressPost && props.data.allWordpressPost.edges.map(({ node }) => ({
      id: node.id,
      title: titleCleaner(node.title),
      content: node.content
    }))

    this.state = {
      jobPostings,
      isModalActive: false,
      activePostId: null
    }
  }

  get activePosting () {
    const { jobPostings, activePostId } = this.state

    return jobPostings.find((post) => post.id === activePostId)
  }

  handlePostingClick = (postId) => () => this.setState({ isModalActive: true, activePostId: postId })

  handleClose = () => this.setState({ isModalActive: false, activePostId: null })

  renderPostings = ({ title, id }) => (
    <li style={{ listStyle: 'none' }}>
      <button
        className="button is-large is-info is-outlined"
        onClick={this.handlePostingClick(id)}
        type="button"
      >
        {title}
      </button>
    </li>
  )

  render () {
    const { jobPostings, isModalActive } = this.state
    const activeClass = isModalActive ? 'is-active' : ''
    const activeTitle = this.activePosting ? this.activePosting.title : null
    const activeContent = this.activePosting ? this.activePosting.content : null

    return (
      <Layout>
        <div className="container">
          <section className="section has-background-white" style={{ minHeight: '70vh' }}>
            <h1 className="title is-size-1 home-section-header">Volunteer With Us</h1>
            <div className="content">
              <p>
                Check back soon for information on how to volunteer with the IQA.
              </p>
              <ul>
                {jobPostings.map(this.renderPostings)}
              </ul>
            </div>
          </section>
        </div>
        <div className={`modal ${activeClass}`}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{activeTitle}</p>
              <button onClick={this.handleClose} className="delete" type="button" aria-label="close" />
            </header>
            <section className="modal-card-body">
              <div className="content" dangerouslySetInnerHTML={{ __html: activeContent }} />
            </section>
            <footer className="modal-card-foot">
              <a
                href={`mailto:hiring@iqasport.org?Subject=${activeTitle} Application`}
                target="_top"
                className="button is-success"
              >
                Apply
              </a>
              <button type="button" onClick={this.handleClose} className="button">Close</button>
            </footer>
          </div>
        </div>
      </Layout>
    )
  }
}

export default VolunteerWithUs
export const jobPostingQuery = graphql`
query JobPostings {
  allWordpressPost(filter: { categories: { name: { eq: "Jobs" } } }) {
    edges {
      node {
        id
        title
        content
        categories {
          name
        }
      }
    }
  }
}
`