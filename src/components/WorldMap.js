import React, { Component } from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps'

const mapPath = 'https://unpkg.com/world-atlas@1.1.4/world/110m.json'
// const ngbNames = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Catalonia', 'Czech Republic', 'France', 'Germany', 'Ireland', 'Italy', 'Mexico', 'Netherlands', 'Norway', 'Peru', 'Poland', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Uganda', 'United Kingdom', 'United States', 'Chile', 'Denmark', 'Iceland', 'New Zealand','Hong Kong', 'Republic of Korea', 'Hungary', 'India', 'Indonesia', 'Israel', 'Japan', 'Pakistan', 'Portugal', 'Romania', 'Serbia']

const renderGeography = (projection) => (geography, index) => (
  <Geography
    key={`${geography.id}-${index}`}
    geography={geography}
    projection={projection}
    style={{
      default: {
        fill: "#ECEFF1",
        stroke: "#607D8B",
        strokeWidth: 0.75,
        outline: "none",
      },
      hover: {
        fill: "#607D8B",
        stroke: "#607D8B",
        strokeWidth: 0.75,
        outline: "none",
      },
      pressed: {
        fill: "#FF5722",
        stroke: "#607D8B",
        strokeWidth: 0.75,
        outline: "none",
      },
    }}
  />
)

class WorldMap extends Component {
  render () {
    return (
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
            {(geographies, projection) => geographies.map(renderGeography(projection))}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    )
  }
}

export default WorldMap
