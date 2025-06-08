import {useState} from 'react'
import { Map, Draggable, GeoJsonLoader } from 'pigeon-maps'

const geoJsonLink = "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/4_niedrig.geo.json"

const Maps = () => {
  const [anchor, setAnchor] = useState([4.711, -74.0721])
  return (
    <Map 
    height={300} 
    defaultCenter={[4.711, -74.0721]} 
    defaultZoom={11}
    className="w-full h-[768px] md:h-[480px] md:w-[768px] lg:w-[1440px] lg:h-[129px] rounded-md shadow-3xl"
    >
      <Draggable offset={[60, 87]} anchor={anchor} onDragEnd={setAnchor}>
        <img src="pigeon.svg" width={100} height={95} alt="Ubicacion!" />
      </Draggable>
      <GeoJsonLoader
      link={geoJsonLink}
      styleCallback={(feature, hover) =>
        hover
          ? { fill: '#93c0d099', strokeWidth: '2'}
          : { fill: '#d4e6ec99', strokeWidth: '1'}
      }
      />
  </Map>
  )
}

export default Maps
