import React from 'react'
import PropTypes from 'prop-types'

/* eslint-disable */
const Form = ({ name }) => (
  <form name={name} method="POST" data-netlify="true">
    <div className="field">
      <label htmlFor="name" className="label">Name:</label>
      <div className="control">
        <input id="name" className="input" type="text" />
      </div>
    </div>
    <div className="field">
      <label htmlFor="email" className="label">Email:</label>
      <div className="control">
        <input id="email" className="input" type="text" />
      </div>
    </div>
    <div class="field">
      <label htmlFor="message" className="label">Message:</label>
      <div className="control">
        <textarea id="message" class="textarea" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button type="submit" class="button is-link">Submit</button>
      </div>
    </div>
  </form>
)

Form.propTypes = {
  name: PropTypes.string
}

export default Form
