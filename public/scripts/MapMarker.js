import React, {PropTypes, Component} from 'react';

const styles = {
  position: 'absolute',
  width: 35,
  height: 35,
  left: -35 / 2,
  top: -35 / 2,
  background: "url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png') no-repeat center",
  backgroundSize: "100% 100%",
  textAlign: 'center',
  color: '#000',
  fontSize: 16,
};

class MapMarker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
       <div style={styles}></div>
    );
  }
}

export default MapMarker