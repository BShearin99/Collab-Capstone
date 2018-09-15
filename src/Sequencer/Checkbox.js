import React, { Component } from 'react'

export default class Checkbox extends Component {

	toggleDrum(track, step) {
		let a = this.state.tracks;
		a[track][step] = !a[track][step];
		this.setState({ tracks: a });
		this.fillBeat();
	}
	render() {
		return (
			<input
				type="checkbox"
				className="sequencer--checkbox"
				checked={0}
				onChange={(e) => this.toggleDrum(0, 0)} />
		)
	}
}