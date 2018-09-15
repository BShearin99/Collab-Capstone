import React, { Component } from 'react'
import Measure from './Measure';
import InstrumentSelector from './InstrumentSelector'

export default class Name extends Component {

	state = {
		numMeasures: [],
		beatValue: 8
	}

	componentDidMount() {
		for (let i = 0; i < this.props.rowLength; i++) {
			this.state.numMeasures.push(i);
		}
	}

	render() {
		return (
			<div className="sequencer--row">
				<InstrumentSelector />
				{this.state.numMeasures.map(i => {
					return <Measure beatValue={this.state.beatValue} />;
				})}
			</div>
		)
	}
}