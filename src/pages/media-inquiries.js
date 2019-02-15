import React from 'react'
import Layout from '../components/Layout'
import ContactForm from '../components/ContactForm'

const emailConfig = [
  { label: 'Communications Department', email: 'communications@iqasport.org' },
  { label: 'Events Department', email: 'events@iqasport.org' }
]

const MediaInquiries = () => {
  const renderEmail = ({ label, email }) => (
    <li className="is-flex" style={{ listStyle: 'none', alignItems: 'center' }}>
      <span className="has-text-weight-bold	">
        {label}
        :
      </span>
      <a style={{ marginLeft: '5px' }} href={`mailto:${email}`} target="_top">{email}</a>
    </li>
  )

  return (
    <Layout>
      <div className="container">
        <section className="section has-background-white">
          <h1 className="title is-size-1 home-section-header">Media Inquiries</h1>
          <div className="content">
            <p>
              Are you a media representative looking to inquire about a story or press release? Please reach out using the form below. If you have a question for a specific department or team feel free to email us below.
            </p>
            <ul>
              {emailConfig.map(renderEmail)}
            </ul>
          </div>
          <ContactForm name="media" />
        </section>
      </div>
    </Layout>
  )
}

export default MediaInquiries
