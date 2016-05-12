import React, {PropTypes, Component} from 'react';



class MapCluster extends Component {
  constructor(props) {
    super(props);
  }

  clickHandler(){
    const { lat, lng } = this.props;

    this.props.onClusterClick(lat, lng)
  }

  render() {
    return (
       <div className="map-cluster" onClick={this.clickHandler.bind(this)}>{this.props.text}</div>
    );
  }
}

export default MapCluster