import React, { Component, PropTypes } from 'react';

import MapBox from './MapBox';
import Search from './Search';
import Stores from './Stores';

class StoreLocator extends Component {

  constructor(props){
    super(props);

    this.state = {
      stores: [],
      states: [],
      filteredStores: []
    }
  }

  componentDidMount() {
    fetch(this.props.data)
      .then(res => res.json())
      .then(stores => {

        const states = stores.reduce(this.accumulateStates, []).sort();

        this.setState({ stores, states, filteredStores: stores })

      })
  }

  accumulateStates(acc, store){
    return acc.indexOf(store.state) === -1 && store.state ? acc.concat(store.state) : acc;
  }

  zipSearchHandler(zip){
    this.setState({
      filteredStores: this.filterStoresByZip(zip)
    })
  }

  zipResetHandler(zip){
    this.setState({
      filteredStores: this.state.stores
    })
  }

  filterStoresByZip(zip){
    return this.state.stores.filter(store => store.zipcode === zip);
  }

  stateSelectHandler(state){    
    this.setState({
      filteredStores: state ? this.filterStoresByState(state) : this.state.stores
    })
  }

  filterStoresByState(state){
    return this.state.stores.filter(store => store.state === state);
  }

  render(){
    const { states, filteredStores } = this.state;

    return (
      <div className="store-locator">
        <MapBox stores={filteredStores} />
        <Search 
          states={states} 
          onZipSearch={this.zipSearchHandler.bind(this)} 
          onZipReset={this.zipResetHandler.bind(this)} 
          onStateSelect={this.stateSelectHandler.bind(this)} 
        />
        <Stores stores={filteredStores} />
      </div>
    );
  }

}

StoreLocator.propTypes = {
  data: PropTypes.string.isRequired
}

export default StoreLocator;