import React, { Component, PropTypes } from 'react';
import GoogleMap from 'google-map-react';

import MapMarker from './MapMarker';
import MapCluster from './MapCluster';

import supercluster from 'points-cluster';

class MapBox extends Component {

  constructor(props){
    super(props);

    this.state = {
      zoom: this.props.defaultZoom,
      bounds: { 
        nw: { lat: 85, lng: -180 }, 
        se: { lat: -85, lng: 180 } 
      }
    }
  }

  clusterClickHandler(lat, lng){
    this.setState({zoom: this.state.zoom + 2/*, center: [lat, lng]*/})
  }

  render(){

    const { stores } = this.props;
    const { bounds, zoom } = this.state;

    const points = stores.map(store => ({ lat: +store.latitude, lng: +store.longtitude }));

    const clusters = supercluster(points, {
      minZoom: 3,
      maxZoom: 15,
      radius: 80
    })({ 
      bounds, 
      zoom
    }).map(({wx, wy, numPoints}) => {
      return {
        lat: wy,
        lng: wx,
        numPoints
      }
    });

    return (
      <div className="store-locator--map">
        <GoogleMap 
          defaultCenter={this.props.center}
          defaultZoom={this.props.defaultZoom}
          onChange={({zoom, bounds})=>{
            this.setState({zoom, bounds})
          }}
          bootstrapURLKeys={{
            key: 'AIzaSyB603cndqog_XY7xGWHlZxmwJBWSUhLhow'
          }}
        >
          {clusters.map(({numPoints, lat, lng}, i) => {
            return numPoints === 1 
              ? <MapMarker key={i} lat={lat} lng={lng} />
              : <MapCluster 
                  key={i} 
                  lat={lat} 
                  lng={lng} 
                  text={numPoints} 
                  // onClusterClick={this.clusterClickHandler.bind(this)}
                />
            }
          )}
        </GoogleMap>
      </div>
    );
  }

}

MapBox.defaultProps = {
  center: [31.21594, -81.49319],
  defaultZoom: 2
};

export default MapBox;