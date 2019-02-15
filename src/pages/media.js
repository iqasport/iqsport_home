import React from 'react'
import YouTube from 'react-youtube'

import Layout from '../components/Layout'

const mediaList = [
  'https://www.npr.org/2017/06/03/531044118/there-may-not-be-flying-but-quidditch-still-creates-magic',
  'https://www.chicagotribune.com/redeye/redeye-how-quidditch-works-in-real-life-harry-potter-20161108-story.html',
  'https://www.theatlantic.com/entertainment/archive/2013/04/the-surprisingly-serious-quest-to-make-muggle-quidditch-a-real-sport/274958/',
  'https://www.theringer.com/movies/2018/7/16/17573132/harry-potter-muggle-quidditch-injuries'
]

const Media = () => {
  const opts = {
    height: '500',
    width: '820',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      // autoplay: 1
    }
  }

  const renderArticle = (link) => (
    <li style={{ listStyle: 'none' }}>
      <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
    </li>
  )

  return (
    <Layout>
      <div className="container">
        <section className="section has-background-white">
          <h1 className="title is-size-1 home-section-header">Media</h1>
          <div className="content">
            <h2 className="title is-size-2 home-section-header">Featured Video</h2>
            <YouTube videoId="2Z5rrrnKJnE" opts={opts} />
          </div>
          <div className="content">
            <h2 className="title is-size-2 home-section-header">Featured Articles</h2>
            <p>
            Quidditch has been featured in media around the world. Please send us your favorite videos and articles about quidditch at communications@iqasport.org
            </p>
            <ul>
              {mediaList.map(renderArticle)}
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Media
