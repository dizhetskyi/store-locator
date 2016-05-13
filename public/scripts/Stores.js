import React, { Component, PropTypes } from 'react';

class Stores extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.stores != this.props.stores){
      this.refs.scroll.scrollTop = 0;
    }
  }

  render(){
    const {stores} = this.props;
    
    return (
      <div className="store-locator--stores" ref="scroll">
        <ul>
          {stores.map(store => 
            <li key={store.storelocator_id}>
              <h4>{store.name}</h4>
              <p>{store.address}<br/>
              {store.phone}<br/>
              {store.state}<br/>
              {store.zipcode}<br/>
              {store.city}</p>
            </li>
          )}
        </ul>
      </div>
    );
  }

}

export default Stores;