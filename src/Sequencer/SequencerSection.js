import React, { Component } from 'react'
import SequencerRow from "./SequencerRow"

export default class SequencerSection extends Component {

	state = {
		numRows: [],
		rowLength: 4
	};

	componentDidMount() {
		const sectionLength = [];
		for (let i = 0; i < 18; i++) {
			sectionLength.push(i);
		}
		this.setState({ numRows: sectionLength });
	}

	render() {
		return (
			<div className="sequencer--section">
				{this.state.numRows.map(i => {
					return (<SequencerRow rowLength={this.state.rowLength} />);
				})}
			</div>
		)
	}
}