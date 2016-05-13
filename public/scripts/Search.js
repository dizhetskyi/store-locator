import React, { Component, PropTypes } from 'react';

class Search extends Component {

  zipcodeChangeHandler(e){
    const { value } = e.target;

    this.props.onZipChange(value)
  }

  zipResetHandler(){    
    this.props.onZipReset('');
  }

  zipSearchHandler(){
    this.props.onZipSearch();    
  }

  stateChangeHandler(e){
    const { value } = e.currentTarget;

    this.props.onStateSelect(value);
  }

  render(){
    const { states, count } = this.props;

    return (
      <div className="store-locator--search">
        <div className="store-locator--search-row">
          <input 
            value={this.props.zipcode} 
            onChange={this.zipcodeChangeHandler.bind(this)} 
            type="text" 
            placeholder="enter zip code"
            ref="zipcode"
          />
          <button onClick={this.zipSearchHandler.bind(this)} type="button">Search</button>
          <button onClick={this.zipResetHandler.bind(this)} type="button">Reset</button>
        </div>        
        <div className="store-locator--search-or">
          OR
        </div>
        <div className="store-locator--search-row">
          <select 
            onChange={this.stateChangeHandler.bind(this)}
            value={this.props.selectedState}
          >
            <option value="">Select State</option>
            {states.map(s => 
              <option 
                key={s} 
                value={s} 
              >
                {s}
              </option>
            )}
          </select>
        </div>
        <div className="store-locator--search-or">
          found {count} store(s)
        </div>
      </div>
    );
  }

}

export default Search;