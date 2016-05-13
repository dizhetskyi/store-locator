import React, { Component, PropTypes } from 'react';

import MapBox from './MapBox';
import Search from './Search';
import Stores from './Stores';

class StoreLocator extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      stores: [],
      states: [],
      filteredStores: [],
      selectedState: '',
      enteredZipcode: ''
    }
  }

  componentDidMount() {

    fetch(this.props.data)
      .then(res => res.json())
      .then(stores => {

        const states = stores.reduce(this.accumulateStates, []).sort();

        this.setState({ stores, states, filteredStores: stores, loading: false })

      })
  }

  accumulateStates(acc, store){
    return acc.indexOf(store.state) === -1 && store.state ? acc.concat(store.state) : acc;
  }

  zipChangeHandler(enteredZipcode){
    this.setState({enteredZipcode})
  }

  zipSearchHandler(){
    const { enteredZipcode: zipcode } = this.state;

    if (zipcode === '') return;

    this.setState({
      filteredStores: this.filterStoresByZip(zipcode),
      selectedState: ''
    })
  }

  zipResetHandler(zip){
    this.setState({
      filteredStores: this.state.stores,
      selectedState: '',
      enteredZipcode: ''
    })
  }

  filterStoresByZip(zip){
    return this.state.stores.filter(store => store.zipcode === zip);
  }

  stateSelectHandler(state){    
    this.setState({
      filteredStores: state ? this.filterStoresByState(state) : this.state.stores,
      enteredZipcode: '',
      selectedState: state
    })
  }

  filterStoresByState(state){
    return this.state.stores.filter(store => store.state === state);
  }

  render(){
    const { loading, states, filteredStores, selectedState, enteredZipcode } = this.state;

    let loadingMessage = (
      <div className="store-locator">
        <div className="store-locator--loader">LOADING DATA...</div>
      </div>
    );

    let content = (
      <div className="store-locator">
        <MapBox stores={filteredStores} />
        <div className="store-locator--data">
          <Search 
            states={states}
            count={filteredStores.length}
            zipcode={enteredZipcode}
            selectedState={selectedState}
            onZipChange={this.zipChangeHandler.bind(this)} 
            onZipSearch={this.zipSearchHandler.bind(this)} 
            onZipReset={this.zipResetHandler.bind(this)} 
            onStateSelect={this.stateSelectHandler.bind(this)} 
          />
          <Stores stores={filteredStores} />
        </div>
      </div>
    )    

    return (loading ? loadingMessage : content);
  }

}

StoreLocator.propTypes = {
  data: PropTypes.string.isRequired
}

export default StoreLocator;