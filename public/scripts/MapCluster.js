import React, {PropTypes, Component} from 'react';

class MapCluster extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   styles: {
    //     transform: 'scale(1.5, 1.5)'
    //   },
    //   inited: false
    // };
  }

  componentWillUpdate(nextProps, nextState) {
    // if (!nextState.inited) {
    //   this.setState({
    //     styles: {
    //       transform: 'scale(1, 1)'
    //     },
    //     inited: true
    //   })
    // }    
  }

  clickHandler(){
    const { lat, lng } = this.props;

    // this.props.onClusterClick(lat, lng)
  }

  render() {
    // const { styles } = this.state;

    return (
       <div 
         className="map-cluster" 
         // onClick={this.clickHandler.bind(this)}
         // style={styles}
       >
        {this.props.text}
       </div>
    );
  }
}

export default MapCluster