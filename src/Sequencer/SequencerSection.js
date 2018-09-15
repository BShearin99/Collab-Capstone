import React, { Component } from 'react'
import SequencerRow from "./SequencerRow"

export default class SequencerSection extends Component {

	state = {
		rowLength: 4
	};

	render() {
		return (
			<React.Fragment>
				<SequencerRow rowLength={this.state.rowLength}/>
			</React.Fragment>
		)
	}
}