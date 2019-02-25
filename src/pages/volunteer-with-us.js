import React, { Component } from 'react'
import { graphql } from 'gatsby'
import autobind from 'react-autobind'
import { groupBy, toPairs } from 'lodash'
import Layout from '../components/Layout'

const titleCleaner = (title) => {
  const enDashRegex = /&#8211;/
  return title.replace(enDashRegex, '-')
}

const overviewText = "The IQA could not operate without the hard work and dedication of an entirely volunteer staff. While IQA volunteers are not financially compensated, volunteering with the IQA has provided numerous personal benefits, including valuable experience that can be listed on a c.v./resume, the opportunity to make a difference in quidditch and the chance to try new things or hone skills in a supportive, fun environment. Many of our volunteers love the international aspect of the organization and have made friends they wouldn't have otherwise made from around the world."

const linkText = "Check out the position descriptions below to learn more about our opportunities or fill out this google form to have someone reach out to you. "

class VolunteerWithUs extends Component {
  constructor(props) {
    super(props)
    autobind(this)

    const transformedData = props.data.allWordpressPost && props.data.allWordpressPost.edges.map(({ node }) => ({
      id: node.id,
      title: titleCleaner(node.title),
      content: node.content,
      department: node.tags[0].name
    }))

    const jobPostings = toPairs(groupBy(transformedData, (post) => post.department))

    this.state = {
      jobPostings,
      jobPostingsRaw: transformedData,
      isModalActive: false,
    }
  }

  get activePosting () {
    const { jobPostingsRaw, activePostId } = this.state

    return jobPostingsRaw.find((post) => post.id  === activePostId)
  }

  handlePostingClick = (postId) => () => this.setState({ isModalActive: true, activePostId: postId })

  handleClose = () => this.setState({ isModalActive: false, activePostId: null })

  renderPost = ({ title, id }) => (
    <li key={id} style={{ listStyle: 'none' }}>
      <button
        className="button is-medium is-info is-outlined"
        onClick={this.handlePostingClick(id)}
        type="button"
      >
        {title}
      </button>
    </li>
  )

  renderPostings = (posting) => (
    <div style={{ margin: '20px' }}>
      <h3>{posting[0]}</h3>
      <ul>
        {posting[1].map(this.renderPost)}
      </ul>
    </div>
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
              <p>{overviewText}</p>
              <p>
                {linkText}
                <a href="https://goo.gl/forms/QYtdQPLcOFPY0Z5a2" target="_blank" rel="noopener noreferrer">
                  https://goo.gl/forms/QYtdQPLcOFPY0Z5a2
                </a>
              </p>
              {jobPostings.map(this.renderPostings)}
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
        tags {
          name
        }
      }
    }
  }
}
`