import React from 'react'
import Layout from '../components/Layout'
import WorldMap from '../components/WorldMap'

const Teams = () => (
  <Layout>
    <div className="container">
      <section className="section has-background-white">
        <h1 className="title is-size-1 home-section-header">Teams</h1>
        <div className="content">
          <p>
          Quidditch is an incredibly fast growing sport. Current estimates show that there are around 8,000 to 9,000 players in almost 40 countries. The membership resource team is currently working with the IT department and national governing bodies to provide a team database that catalogues the approximately 600 teams in the world. The database will serve as an overview of the development of quidditch around the world and will be updated biannually.
          </p>
        </div>
        <WorldMap />
      </section>
    </div>
  </Layout>
)

export default Teams