import React, { Component } from 'react'
import Checkbox from './Checkbox';

export default class Measure extends Component {

	state = {
		numBeats: []
	}

	componentDidMount() {
		const measureLength = [];
		for (let j = 0; j < this.props.beatValue; j++) {
			measureLength.push(j);
		}
		this.setState({ numBeats: measureLength });
	}

	render() {
		return (
			<React.Fragment>
				{this.state.numBeats.map(i => {
					return (<span>{i} <Checkbox /></span>);
				})}
			</React.Fragment>
		)
	}
}