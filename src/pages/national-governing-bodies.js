import React from 'react'
import Layout from '../components/Layout'
import WorldMap from '../components/WorldMap'

const NationalGoverningBodies = () => (
  <Layout>
    <div className="container">
      <section className="section has-background-white">
        <h1 className="title is-size-1 home-section-header">National Governing Bodies</h1>
        <WorldMap />
      </section>
    </div>
  </Layout>
)

export default NationalGoverningBodies
