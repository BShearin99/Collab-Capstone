import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
import Tone from "tone";
import MIDISounds from 'midi-sounds-react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drumSnare:15
			,drumBass:5
			,drumHiHat:35
			,drumClap:24,
			selectedInstrument: 4
			,cached:true,
			synths: [
				new Tone.Synth(),
				new Tone.Synth(),
				new Tone.Synth()
			],
			gain: new Tone.Gain(0.6),

			notes: ['G5', 'E4', 'C3'],
			tracks:[
				[1,0,0,0,0,0,0,1,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1]
				,[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1]
				,[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1]
				,[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]
				,[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]

			],

		};
		this.state.data=[]
		this.beats=[];
	}
	componentDidMount() {
		this.setState({ initialized: 1 });
	}
	onSelectInstrument(e){
		var list=e.target;
		let n = list.options[list.selectedIndex].getAttribute("value");
		this.setState({
			selectedInstrument: n
			,cached:false
		});
		this.midiSounds.cacheInstrument(n);
		var me=this;
		this.midiSounds.player.loader.waitLoad(function () {
			me.setState({
				selectedInstrument: n
				,cached:true
			});
		});
	}
	createSelectItemsInt() {
		if (this.midiSounds) {
			if (!(this.items)) {
				this.items = [];
				for (let i = 0; i < this.midiSounds.player.loader.instrumentKeys().length; i++) {
					this.items.push(<option key={i} value={i}>{'' + (i + 0) + '. ' + this.midiSounds.player.loader.instrumentInfo(i).title}</option>);
				}
			}
			return this.items;
		}
	}
	playTestInstrument() {
		this.midiSounds.playChordNow(this.state.selectedInstrument, [60], 2.5);
	}
	onSelectDrumSnare(e){
		let list=e.target;
		let n = list.options[list.selectedIndex].getAttribute("value");		
		this.midiSounds.cacheDrum(n);
		let me=this;
		this.midiSounds.player.loader.waitLoad(function(){
			me.setState({
				drumSnare: n
			});
			me.fillBeat();
			});
	}
	onSelectDrumBass(e){
		let list=e.target;
		let n = list.options[list.selectedIndex].getAttribute("value");		
		this.midiSounds.cacheDrum(n);
		let me=this;
		this.midiSounds.player.loader.waitLoad(function(){
			me.setState({
				drumBass: n
			});
			me.fillBeat();
			});
	}
	onSelectDrumHiHat(e){
		let list=e.target;
		let n = list.options[list.selectedIndex].getAttribute("value");		
		this.midiSounds.cacheDrum(n);
		let me=this;
		this.midiSounds.player.loader.waitLoad(function(){
			me.setState({
				drumHiHat: n
			});
			me.fillBeat();
			});
	}
	onSelectDrumClap(e){
		let list=e.target;
		let n = list.options[list.selectedIndex].getAttribute("value");		
		this.midiSounds.cacheDrum(n);
		let me=this;
		this.midiSounds.player.loader.waitLoad(function(){
			me.setState({
				drumClap: n
			});
			me.fillBeat();
			});
			
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
	fillBeat(){
		for(let i=0;i<31;i++){
			let drums=[];
			if(this.state.tracks[0][i]){drums.push(this.state.drumBass);}
			if(this.state.tracks[1][i]){drums.push(this.state.drumSnare);}
			if(this.state.tracks[2][i]){drums.push(this.state.drumClap);}
			if(this.state.tracks[3][i]){drums.push(this.state.drumHiHat);}
			if(this.state.tracks[4][i]){drums.push(this.state.selectedInstrument)}
			let beat=[drums,[]];
			this.beats[i]=beat;
		}
	}
	playLoop(){
		this.fillBeat();
		this.midiSounds.startPlayLoop(this.beats, 120, 1/16); // starts loop /bpm
	}
	stopLoop(){
		this.midiSounds.stopPlayLoop();  //stop
	}
	toggleDrum(track,step){
		let a=this.state.tracks;
		a[track][step]=!a[track][step];
		this.setState({tracks:a});
		this.fillBeat();
	}
	render() {
		return (
			
			<div className="App">
			<button onClick={() =>
			{localStorage.clear()
			window.location.reload()}}>Logout</button>

		<h1 className="h3 mb-3 font-weight-normal">Co-Lab</h1>
		<table align='center'>
			<tbody>
				<tr>
					<td><select value={this.state.drumBass} onChange={this.onSelectDrumBass.bind(this)}>{this.createSelectItems()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][0]} onChange={(e)=>this.toggleDrum(0,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][1]} onChange={(e)=>this.toggleDrum(0,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][2]} onChange={(e)=>this.toggleDrum(0,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][3]} onChange={(e)=>this.toggleDrum(0,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][4]} onChange={(e)=>this.toggleDrum(0,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][5]} onChange={(e)=>this.toggleDrum(0,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][6]} onChange={(e)=>this.toggleDrum(0,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][7]} onChange={(e)=>this.toggleDrum(0,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][8]} onChange={(e)=>this.toggleDrum(0,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][9]} onChange={(e)=>this.toggleDrum(0,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][10]} onChange={(e)=>this.toggleDrum(0,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][11]} onChange={(e)=>this.toggleDrum(0,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][12]} onChange={(e)=>this.toggleDrum(0,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][13]} onChange={(e)=>this.toggleDrum(0,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][14]} onChange={(e)=>this.toggleDrum(0,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][15]} onChange={(e)=>this.toggleDrum(0,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][16]} onChange={(e)=>this.toggleDrum(0,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][17]} onChange={(e)=>this.toggleDrum(0,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][18]} onChange={(e)=>this.toggleDrum(0,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][19]} onChange={(e)=>this.toggleDrum(0,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][20]} onChange={(e)=>this.toggleDrum(0,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][21]} onChange={(e)=>this.toggleDrum(0,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][22]} onChange={(e)=>this.toggleDrum(0,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][23]} onChange={(e)=>this.toggleDrum(0,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][24]} onChange={(e)=>this.toggleDrum(0,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][25]} onChange={(e)=>this.toggleDrum(0,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][26]} onChange={(e)=>this.toggleDrum(0,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][27]} onChange={(e)=>this.toggleDrum(0,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][28]} onChange={(e)=>this.toggleDrum(0,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][29]} onChange={(e)=>this.toggleDrum(0,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][30]} onChange={(e)=>this.toggleDrum(0,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[0][31]} onChange={(e)=>this.toggleDrum(0,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.drumSnare} onChange={this.onSelectDrumSnare.bind(this)}>{this.createSelectItems()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][0]} onChange={(e)=>this.toggleDrum(1,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][1]} onChange={(e)=>this.toggleDrum(1,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][2]} onChange={(e)=>this.toggleDrum(1,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][3]} onChange={(e)=>this.toggleDrum(1,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][4]} onChange={(e)=>this.toggleDrum(1,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][5]} onChange={(e)=>this.toggleDrum(1,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][6]} onChange={(e)=>this.toggleDrum(1,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][7]} onChange={(e)=>this.toggleDrum(1,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][8]} onChange={(e)=>this.toggleDrum(1,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][9]} onChange={(e)=>this.toggleDrum(1,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][10]} onChange={(e)=>this.toggleDrum(1,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][11]} onChange={(e)=>this.toggleDrum(1,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][12]} onChange={(e)=>this.toggleDrum(1,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][13]} onChange={(e)=>this.toggleDrum(1,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][14]} onChange={(e)=>this.toggleDrum(1,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][15]} onChange={(e)=>this.toggleDrum(1,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][16]} onChange={(e)=>this.toggleDrum(1,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][17]} onChange={(e)=>this.toggleDrum(1,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][18]} onChange={(e)=>this.toggleDrum(1,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][19]} onChange={(e)=>this.toggleDrum(1,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][21]} onChange={(e)=>this.toggleDrum(1,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][21]} onChange={(e)=>this.toggleDrum(1,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][22]} onChange={(e)=>this.toggleDrum(1,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][23]} onChange={(e)=>this.toggleDrum(1,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][24]} onChange={(e)=>this.toggleDrum(1,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][25]} onChange={(e)=>this.toggleDrum(1,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][26]} onChange={(e)=>this.toggleDrum(1,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][27]} onChange={(e)=>this.toggleDrum(1,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][28]} onChange={(e)=>this.toggleDrum(1,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][29]} onChange={(e)=>this.toggleDrum(1,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][31]} onChange={(e)=>this.toggleDrum(1,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[1][31]} onChange={(e)=>this.toggleDrum(1,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.drumClap} onChange={this.onSelectDrumClap.bind(this)}>{this.createSelectItems()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][0]} onChange={(e)=>this.toggleDrum(2,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][1]} onChange={(e)=>this.toggleDrum(2,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][2]} onChange={(e)=>this.toggleDrum(2,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][3]} onChange={(e)=>this.toggleDrum(2,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][4]} onChange={(e)=>this.toggleDrum(2,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][5]} onChange={(e)=>this.toggleDrum(2,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][6]} onChange={(e)=>this.toggleDrum(2,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][7]} onChange={(e)=>this.toggleDrum(2,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][8]} onChange={(e)=>this.toggleDrum(2,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][9]} onChange={(e)=>this.toggleDrum(2,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][10]} onChange={(e)=>this.toggleDrum(2,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][11]} onChange={(e)=>this.toggleDrum(2,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][12]} onChange={(e)=>this.toggleDrum(2,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][13]} onChange={(e)=>this.toggleDrum(2,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][14]} onChange={(e)=>this.toggleDrum(2,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][15]} onChange={(e)=>this.toggleDrum(2,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][16]} onChange={(e)=>this.toggleDrum(2,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][17]} onChange={(e)=>this.toggleDrum(2,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][18]} onChange={(e)=>this.toggleDrum(2,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][19]} onChange={(e)=>this.toggleDrum(2,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][20]} onChange={(e)=>this.toggleDrum(2,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][21]} onChange={(e)=>this.toggleDrum(2,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][22]} onChange={(e)=>this.toggleDrum(2,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][23]} onChange={(e)=>this.toggleDrum(2,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][24]} onChange={(e)=>this.toggleDrum(2,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][25]} onChange={(e)=>this.toggleDrum(2,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][26]} onChange={(e)=>this.toggleDrum(2,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][27]} onChange={(e)=>this.toggleDrum(2,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][28]} onChange={(e)=>this.toggleDrum(2,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][29]} onChange={(e)=>this.toggleDrum(2,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][30]} onChange={(e)=>this.toggleDrum(2,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[2][31]} onChange={(e)=>this.toggleDrum(2,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.drumHiHat} onChange={this.onSelectDrumHiHat.bind(this)}>{this.createSelectItems()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][0]} onChange={(e)=>this.toggleDrum(3,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][1]} onChange={(e)=>this.toggleDrum(3,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][2]} onChange={(e)=>this.toggleDrum(3,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][3]} onChange={(e)=>this.toggleDrum(3,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][4]} onChange={(e)=>this.toggleDrum(3,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][5]} onChange={(e)=>this.toggleDrum(3,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][6]} onChange={(e)=>this.toggleDrum(3,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][7]} onChange={(e)=>this.toggleDrum(3,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][8]} onChange={(e)=>this.toggleDrum(3,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][9]} onChange={(e)=>this.toggleDrum(3,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][10]} onChange={(e)=>this.toggleDrum(3,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][11]} onChange={(e)=>this.toggleDrum(3,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][12]} onChange={(e)=>this.toggleDrum(3,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][13]} onChange={(e)=>this.toggleDrum(3,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][14]} onChange={(e)=>this.toggleDrum(3,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][15]} onChange={(e)=>this.toggleDrum(3,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][16]} onChange={(e)=>this.toggleDrum(3,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][17]} onChange={(e)=>this.toggleDrum(3,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][18]} onChange={(e)=>this.toggleDrum(3,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][19]} onChange={(e)=>this.toggleDrum(3,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][20]} onChange={(e)=>this.toggleDrum(3,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][21]} onChange={(e)=>this.toggleDrum(3,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][22]} onChange={(e)=>this.toggleDrum(3,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][23]} onChange={(e)=>this.toggleDrum(3,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][24]} onChange={(e)=>this.toggleDrum(3,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][25]} onChange={(e)=>this.toggleDrum(3,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][26]} onChange={(e)=>this.toggleDrum(3,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][27]} onChange={(e)=>this.toggleDrum(3,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][28]} onChange={(e)=>this.toggleDrum(3,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][29]} onChange={(e)=>this.toggleDrum(3,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][30]} onChange={(e)=>this.toggleDrum(3,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[3][31]} onChange={(e)=>this.toggleDrum(3,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][0]} onChange={(e)=>this.toggleDrum(4,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][1]} onChange={(e)=>this.toggleDrum(4,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][2]} onChange={(e)=>this.toggleDrum(4,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][3]} onChange={(e)=>this.toggleDrum(4,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][4]} onChange={(e)=>this.toggleDrum(4,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][5]} onChange={(e)=>this.toggleDrum(4,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][6]} onChange={(e)=>this.toggleDrum(4,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][7]} onChange={(e)=>this.toggleDrum(4,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][8]} onChange={(e)=>this.toggleDrum(4,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][9]} onChange={(e)=>this.toggleDrum(4,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][10]} onChange={(e)=>this.toggleDrum(4,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][11]} onChange={(e)=>this.toggleDrum(4,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][12]} onChange={(e)=>this.toggleDrum(4,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][13]} onChange={(e)=>this.toggleDrum(4,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][14]} onChange={(e)=>this.toggleDrum(4,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][15]} onChange={(e)=>this.toggleDrum(4,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][16]} onChange={(e)=>this.toggleDrum(4,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][17]} onChange={(e)=>this.toggleDrum(4,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][18]} onChange={(e)=>this.toggleDrum(4,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][19]} onChange={(e)=>this.toggleDrum(4,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][20]} onChange={(e)=>this.toggleDrum(4,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][21]} onChange={(e)=>this.toggleDrum(4,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][22]} onChange={(e)=>this.toggleDrum(4,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][23]} onChange={(e)=>this.toggleDrum(4,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][24]} onChange={(e)=>this.toggleDrum(4,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][25]} onChange={(e)=>this.toggleDrum(4,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][26]} onChange={(e)=>this.toggleDrum(4,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][27]} onChange={(e)=>this.toggleDrum(4,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][28]} onChange={(e)=>this.toggleDrum(4,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][29]} onChange={(e)=>this.toggleDrum(4,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][30]} onChange={(e)=>this.toggleDrum(4,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[4][31]} onChange={(e)=>this.toggleDrum(4,31)} /></td>					
				</tr>
			</tbody>
		</table>
		<p>
			<button onClick={this.playLoop.bind(this)}>Play loop</button>
			<button onClick={this.stopLoop.bind(this)}>Stop loop</button>
			<p><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItems()}</select></p>
		<p><button onClick={this.playTestInstrument.bind(this)} disabled={!this.state.cached}>Play</button></p>
		</p>
		<MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" 
			drums={[this.state.drumSnare
					,this.state.drumBass
					,this.state.drumHiHat
					,this.state.drumClap
				]} 
			/>	
		<hr/>
    </div>
    );
}
}

export default App;



