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
          <a href="${ngb.url}" target="_blank">${ngb.name}</a>
        </div>
        <div>
          <img src="${cat.imageSrc}" alt="${cat.name}" />
          <a href="${cat.url}" target="_blank">${cat.name}</a>
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

    window.open(ngb.url, '_blank')
  }

  renderGeography = (projection) => (geography, index) => {
    const { properties: { NAME, NAME_LONG, FORMAL_EN } } = geography
    const ngb = findNGB({ NAME, NAME_LONG, FORMAL_EN })

    const defaultFill = ngb ? '#F6AF95' : '#ECEFF1'
    const tooltipEffect = ngb && ngb.name === 'Spain' ? 'solid' : 'float'

    return (
      <Geography
        data-tip={renderNGBInfo(ngb)}
        data-html
        data-effect={tooltipEffect}
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

  render () {
    return (
      <Fragment>
        {this.renderMap()}
        {this.renderNGBList()}
      </Fragment>
    )
  }
}

export default WorldMap
