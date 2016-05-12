import React, { Component, PropTypes } from 'react';

class Stores extends Component {

  render(){
    const {stores} = this.props;
    
    let content;

    if (!stores.length){
      content = <div>no items</div>
    } else {
      content = <ul>
        {stores.map(store => 
          <li key={store.storelocator_id}>
            <h4>{store.name}</h4>
            <p>{store.address}</p>
            <p>{store.phone}</p>
            <p>{store.state}</p>
            <p>{store.zipcode}</p>
            <p>{store.city}</p>
          </li>
        )}
      </ul>;
    }
 

    return (
      <div className="store-locator--stores">
        {content}
      </div>
    );
  }

}

export default Stores;