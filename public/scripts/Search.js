import React, { Component, PropTypes } from 'react';

class Search extends Component {

	constructor(...args){
		super(...args);

		this.state = {
			zipcode: ''
		}
	}

	zipcodeChangeHandler(e){
		const { value: zipcode } = e.target;

		this.setState({ zipcode })
	}

	zipResetHandler(){
		this.setState({zipcode: ''}, () => {
			this.props.onZipReset();
		})
	}

	zipSearchHandler(){
		const { zipcode } = this.state;

		if (zipcode !== '') this.props.onZipSearch(zipcode);		
	}

	stateChangeHandler(e){
		const { value } = e.currentTarget;
		this.props.onStateSelect(value);
	}

	render(){
		const { states } = this.props;

		return (
			<div className="store-locator--search">
				<input 
					value={this.state.zipcode} 
					onChange={this.zipcodeChangeHandler.bind(this)} 
					type="text" 
					placeholder="enter zip code"
				/>
				<button onClick={this.zipSearchHandler.bind(this)} type="button">Search</button>
				<button onClick={this.zipResetHandler.bind(this)} type="button">Reset</button>
				<br/>
				OR
				<br/>
				<select onChange={this.stateChangeHandler.bind(this)}>
					<option value="">Select State</option>
					{states.map(s => <option key={s} value={s}>{s}</option>)}
				</select>
			</div>
		);
	}

}

export default Search;