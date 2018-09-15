import React, { Component } from 'react'
import MIDISounds from 'midi-sounds-react'


export default class InstrumentSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDrum: Math.floor(Math.random() * 234) + 1
		};
	}
	componentDidMount() {
		console.log('componentDidMount App');
		this.setState({ initialized: true });
	}
	onSelectDrum(e) {
		var list = e.target;
		let n = list.options[list.selectedIndex].getAttribute("value");
		this.setState({
			selectedDrum: n
		});
		this.midiSounds.cacheDrum(n);
	}
	createSelectItems() {
		if (this.midiSounds) {
			if (!(this.items)) {
				this.items = [];
				for (let i = 0; i < this.midiSounds.player.loader.drumKeys().length; i++) {
					this.items.push(<option key={i} value={i}>{'' + (i + 0) + '. ' + this.midiSounds.player.loader.drumInfo(i).title}</option>);
				}
			}
			return this.items;
		}
	}
	playTestDrum() {
		this.midiSounds.playDrumsNow([this.state.selectedDrum]);
	}
	render() {
		return (
			<span>
				<select value={this.state.selectedDrum} onChange={this.onSelectDrum.bind(this)}>{this.createSelectItems()}</select>
				<MIDISounds id="midi" ref={(ref) => (this.midiSounds = ref)} appElementName="root" drums={[this.state.selectedDrum]} />
			</span>

		);
	}
}