import React from 'react'
import Layout from '../components/Layout'
import ContactForm from '../components/ContactForm'

const emailConfig = [
  { label: 'Business Development', email: 'business.development@iqasport.org' },
  { label: 'Communications Department', email: 'communications@iqasport.org' },
  { label: 'Media Relations', email: 'media@iqasport.org' },
  { label: 'Events Department', email: 'events@iqasport.org' }
]

const PartnerInquiries = () => {
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
          <h1 className="title is-size-1 home-section-header">Partnership Inquiries</h1>
          <div className="content">
            <p>
              Are you a looking to partner with the International Quidditch Association? Please reach out using the form below. If you have a question for a specific department or team feel free to email us below.
            </p>
            <ul>
              {emailConfig.map(renderEmail)}
            </ul>
          </div>
          <ContactForm name="partner" />
        </section>
      </div>
    </Layout>
  )
}

export default PartnerInquiries
