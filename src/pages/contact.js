import React from 'react'
import Layout from '../components/Layout'
import ContactForm from '../components/ContactForm'

const emailConfig = [
  { label: 'Membership Department', email: 'membership@iqasport.org'},
  { label: 'Communications Department', email: 'communications@iqasport.org' },
  { label: 'Board of Trustees', email: 'trustees@iqasport.org' },
  { label: 'Rulebook Committee', email: 'rulebook@iqasport.org' },
  { label: 'Referee Development Team', email: 'refdevelopment@iqasport.org' },
  { label: 'Information Technology Department', email: 'tech@iqasport.org' },
  { label: 'Events Department', email: 'events@iqasport.org' },
  { label: 'Gameplay Department', email: 'gameplay@iqasport.org' },
  { label: 'Finance Department', email: 'finance@iqasport.org' },
  { label: 'Marketing Department', email: 'marketing@iqasport.org' },
  { label: 'Public Relations', email: 'public.relations@iqasport.org' }
]

const Contact = () => {
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
          <h1 className="title is-size-1 home-section-header">Contact Us</h1>
          <div className="content">
            <p>
              Do you have a general question, comment, or concern? Please reach out to us using the form below. If your
              inquiry is for a specific IQA department send us an email! We look forward to hearing from you.
            </p>
            <ul>
              {emailConfig.map(renderEmail)}
            </ul>
          </div>
          <ContactForm name="contact" />
        </section>
      </div>
    </Layout>
  )
}

export default Contact
