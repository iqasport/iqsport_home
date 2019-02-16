import React, { Component, Fragment } from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps'
import autobind from 'react-autobind'
import ReactTooltip from 'react-tooltip'
import NGB_CONFIG from './ngb_config'

const mapPath =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m-simplified.json'

const findNGB = (names) => {
  const nameValues = Object.values(names)
  return NGB_CONFIG.find(ngb => nameValues.includes(ngb.name))
}

const renderNGBInfo = (ngb) => {
  if (!ngb) return null
  if (ngb.name === 'Spain') {
    const cat = findNGB({ name: 'Catalonia' })
    return `
      <div>
        <div>
          <img src="${ngb.imageSrc}" alt="${ngb.name}" />
          <p>${ngb.name}</p>
        </div>
        <div>
          <img src="${cat.imageSrc}" alt="${cat.name}" />
          <p>${cat.name}</p>
        </div>
      </div>
    `
  }

  return `
    <div>
      <img className="ngb-image" src="${ngb.imageSrc}" alt="${ngb.name}" />
      <p>${ngb.name}</p>
    </div>
  `
}

class WorldMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSpainModalShown: false
    }

    autobind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)
  }

  handleNGBClick = (geo) => {
    const { properties: { NAME, NAME_LONG, FORMAL_EN } } = geo
    const ngb = findNGB({ NAME, NAME_LONG, FORMAL_EN })

    if (!ngb) return null
    if (!ngb.url) return null

    if (ngb.name === 'Spain') {
      this.setState({isSpainModalShown: true})
    } else {
      window.open(ngb.url, '_blank')
    }
  }

  handleSpainModalClose = () => {
    this.setState({isSpainModalShown: false})
  }

  renderGeography = (projection) => (geography, index) => {
    const { properties: { NAME, NAME_LONG, FORMAL_EN } } = geography
    const ngb = findNGB({ NAME, NAME_LONG, FORMAL_EN })

    const defaultFill = ngb ? '#F6AF95' : '#ECEFF1'

    return (
      <Geography
        data-tip={renderNGBInfo(ngb)}
        data-html
        key={`${geography.id}-${index}`}
        geography={geography}
        projection={projection}
        style={{
          default: {
            fill: defaultFill,
            stroke: '#607D8B',
            strokeWidth: 0.75
          },
          hover: {
            fill: defaultFill,
            stroke: '#607D8B',
            strokeWidth: 0.75,
            outline: 'none'
          }
        }}
        onClick={this.handleNGBClick}
      />
    )
  }

  renderNGB = ({ name, imageSrc, url }) => (
    <div key={name} className="ngb-image column">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={imageSrc} alt={name} style={{ height: '140px' }} />
      </a>
    </div>
  )

  renderMap = () => (
    <div className="is-hidden-touch">
      <ComposableMap
        projectionConfig={{
          scale: 205,
          rotation: [-11,0,0],
        }}
        width={980}
        height={551}
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <ZoomableGroup center={[0,20]} disablePanning>
          <Geographies geography={mapPath}>
            {(geographies, projection) => geographies.map(this.renderGeography(projection))}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip />
    </div>
  )

  renderNGBList = () => (
    <div className="is-hidden-desktop columns is-multiline">
      {NGB_CONFIG.map(this.renderNGB)}
    </div>
  )

  renderSpainModal = () => {
    const { isSpainModalShown } = this.state

    const className = isSpainModalShown ? 'modal is-active' : 'modal'

    const esp = findNGB({ name: 'Spain' })
    const cat = findNGB({ name: 'Catalonia' })

    return (
      <div className={className}>
        <div className='modal-background' onClick={this.handleSpainModalClose} />
        <div className='modal-content box columns'>
          <a className='column card has-text-centered' href={esp.url} target="_blank" rel="noopener noreferrer">
            <div className='card-image'>
              <img src={esp.imageSrc} alt={esp.name} />
            </div>
            <div className='card-content has-text-link'>{esp.name}</div>
          </a>
          <a className='column card has-text-centered' href={cat.url} target="_blank" rel="noopener noreferrer">
            <div className='card-image'>
              <img src={cat.imageSrc} alt={cat.name} />
            </div>
            <div className='card-content has-text-link'>{cat.name}</div>
          </a>
        </div>
        <button className='modal-close is-large' aria-label='close' onClick={this.handleSpainModalClose} />
      </div>
    )
  }

  render () {
    return (
      <Fragment>
        {this.renderMap()}
        {this.renderNGBList()}
        {this.renderSpainModal()}
      </Fragment>
    )
  }
}

export default WorldMap
