import React, { Component, PropTypes } from 'react';
import GoogleMap from 'google-map-react';

import MapMarker from './MapMarker';
import MapCluster from './MapCluster';

import supercluster from 'points-cluster';

class MapBox extends Component {

  constructor(props){
    super(props);

    this.state = {
      zoom: this.props.zoom,
      center: this.props.center
    }
  }

  clusterClickHandler(lat, lng){
    this.setState({zoom: this.state.zoom + 2, center: [lat, lng]})
  }

  render(){

    const { stores } = this.props;

    const points = stores.map(store => ({ lat: +store.latitude, lng: +store.longtitude }));

    const clusters = supercluster(points, {
      minZoom: 3,
      maxZoom: 15,
      radius: 80
    })({ 
      bounds: { 
        nw: { lat: 85, lng: -180 }, 
        se: { lat: -85, lng: 180 } 
      }, 
      zoom: this.state.zoom 
    }).map(({wx, wy, numPoints}) => {
      return {
        lat: wy,
        lng: wx,
        numPoints
      }
    });

    return (
      <div style={{width: '100%', height: '500px'}}>
        <GoogleMap 
          center={this.state.center}
          // defaultZoom={this.props.zoom}
          zoom={this.state.zoom}
          onChange={({zoom})=>{
            this.setState({zoom})
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
                  onClusterClick={this.clusterClickHandler.bind(this)}
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
  zoom: 15
};

export default MapBox;