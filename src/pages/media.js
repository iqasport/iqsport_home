import React from 'react'
import YouTube from 'react-youtube'

import Layout from '../components/Layout'

const Media = () => {
  const opts = {
    height: '500',
    width: '820',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      // autoplay: 1
    }
  }
  return (
    <Layout>
      <div className="container">
        <section className="section has-background-white">
          <h1 className="title is-size-1 home-section-header">Media</h1>
          <div>
            <h2 className="title is-size-2 home-section-header">Featured Video</h2>
            <YouTube videoId="2Z5rrrnKJnE" opts={opts} />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Media
