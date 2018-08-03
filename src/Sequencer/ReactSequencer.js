import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
import Tone from "tone";
import MIDISounds from 'midi-sounds-react';
import APIManager from "../APIManager"

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drumSnare:15
			,drumBass:5
			,drumHiHat:35
			,drumClap:24,
			selectedInstrument: 4,
			drum5:"",
			drum6:"",
			drum7:"",
			drum8:"",
			drum9:"",
			drum10:"",
			drum11:"",
			drum12:"",
			drum13:"",
			drum14:"",
			

			cached:true,
			synths: [
				new Tone.Synth(),
				new Tone.Synth(),
				new Tone.Synth()
			],
			gain: new Tone.Gain(0.6),

			notes: ['G5', 'E4', 'C3'],
			tracks:[
				[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]



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
	onSelectDrum5(e){
		let list=e.target;
		let n = list.options[list.selectedIndex].getAttribute("value");		
		this.midiSounds.cacheDrum(n);
		let me=this;
		this.midiSounds.player.loader.waitLoad(function(){
			me.setState({
				drum5: n
			});
			me.fillBeat();
			});
		}
		onSelectDrum6(e){
			let list=e.target;
			let n = list.options[list.selectedIndex].getAttribute("value");		
			this.midiSounds.cacheDrum(n);
			let me=this;
			this.midiSounds.player.loader.waitLoad(function(){
				me.setState({
					drum6: n
				});
				me.fillBeat();
				});
			}
			onSelectDrum7(e){
				let list=e.target;
				let n = list.options[list.selectedIndex].getAttribute("value");		
				this.midiSounds.cacheDrum(n);
				let me=this;
				this.midiSounds.player.loader.waitLoad(function(){
					me.setState({
						drum7: n
					});
					me.fillBeat();
					});
				}
				onSelectDrum8(e){
					let list=e.target;
					let n = list.options[list.selectedIndex].getAttribute("value");		
					this.midiSounds.cacheDrum(n);
					let me=this;
					this.midiSounds.player.loader.waitLoad(function(){
						me.setState({
							drum8: n
						});
						me.fillBeat();
						});
					}
					onSelectDrum9(e){
						let list=e.target;
						let n = list.options[list.selectedIndex].getAttribute("value");		
						this.midiSounds.cacheDrum(n);
						let me=this;
						this.midiSounds.player.loader.waitLoad(function(){
							me.setState({
								drum9: n
							});
							me.fillBeat();
							});
						}
						onSelectDrum10(e){
							let list=e.target;
							let n = list.options[list.selectedIndex].getAttribute("value");		
							this.midiSounds.cacheDrum(n);
							let me=this;
							this.midiSounds.player.loader.waitLoad(function(){
								me.setState({
									drum10: n
								});
								me.fillBeat();
								});
							}
							onSelectDrum11(e){
								let list=e.target;
								let n = list.options[list.selectedIndex].getAttribute("value");		
								this.midiSounds.cacheDrum(n);
								let me=this;
								this.midiSounds.player.loader.waitLoad(function(){
									me.setState({
										drum11: n
									});
									me.fillBeat();
									});
								}
								onSelectDrum12(e){
									var list=e.target;
										let n = list.options[list.selectedIndex].getAttribute("value");
											this.setState({
												drum12: n
												,cached:false
											});
													this.midiSounds.cacheInstrument(n);
													var me=this;
													this.midiSounds.player.loader.waitLoad(function () {
													me.setState({
													drum12: n
													,cached:true
															});
															});
									}
									onSelectDrum13(e){
										let list=e.target;
										let n = list.options[list.selectedIndex].getAttribute("value");		
										this.midiSounds.cacheDrum(n);
										let me=this;
										this.midiSounds.player.loader.waitLoad(function(){
											me.setState({
												drum13: n
											});
											me.fillBeat();
											});
										}
										onSelectDrum14(e){
											let list=e.target;
											let n = list.options[list.selectedIndex].getAttribute("value");		
											this.midiSounds.cacheDrum(n);
											let me=this;
											this.midiSounds.player.loader.waitLoad(function(){
												me.setState({
													drum14: n
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
			if(this.state.tracks[5][i]){drums.push(this.state.drum5)}
			if(this.state.tracks[6][i]){drums.push(this.state.drum6)}
			if(this.state.tracks[7][i]){drums.push(this.state.drum7)}
			if(this.state.tracks[8][i]){drums.push(this.state.drum8)}
			if(this.state.tracks[9][i]){drums.push(this.state.drum9)}
			if(this.state.tracks[10][i]){drums.push(this.state.drum10)}
			if(this.state.tracks[11][i]){drums.push(this.state.drum11)}
			if(this.state.tracks[12][i]){drums.push(this.state.drum12)}
			if(this.state.tracks[13][i]){drums.push(this.state.drum13)}
			if(this.state.tracks[14][i]){drums.push(this.state.drum14)}


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

	loadSong = () => {
		APIManager.getSongData("1")
		.then((Song)=>{
			console.log(Song.sequence)
			const songArray = []
			for (const key in Song.sequence){
				console.log(Song.sequence[key])
				songArray.push(Song.sequence[key])
			}   
			console.log(songArray)
			this.setState({tracks:songArray})
		})
	}
	render() {
		
		return (
			
			<div className="App">
			<button onClick={() => this.loadSong()}>Load Song</button>
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
					<td><select value={this.state.drum5} onChange={this.onSelectDrum5.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][0]} onChange={(e)=>this.toggleDrum(5,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][1]} onChange={(e)=>this.toggleDrum(5,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][2]} onChange={(e)=>this.toggleDrum(5,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][3]} onChange={(e)=>this.toggleDrum(5,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][4]} onChange={(e)=>this.toggleDrum(5,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][5]} onChange={(e)=>this.toggleDrum(5,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][6]} onChange={(e)=>this.toggleDrum(5,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][7]} onChange={(e)=>this.toggleDrum(5,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][8]} onChange={(e)=>this.toggleDrum(5,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][9]} onChange={(e)=>this.toggleDrum(5,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][10]} onChange={(e)=>this.toggleDrum(5,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][11]} onChange={(e)=>this.toggleDrum(5,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][12]} onChange={(e)=>this.toggleDrum(5,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][13]} onChange={(e)=>this.toggleDrum(5,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][14]} onChange={(e)=>this.toggleDrum(5,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][15]} onChange={(e)=>this.toggleDrum(5,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][16]} onChange={(e)=>this.toggleDrum(5,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][17]} onChange={(e)=>this.toggleDrum(5,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][18]} onChange={(e)=>this.toggleDrum(5,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][19]} onChange={(e)=>this.toggleDrum(5,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][20]} onChange={(e)=>this.toggleDrum(5,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][21]} onChange={(e)=>this.toggleDrum(5,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][22]} onChange={(e)=>this.toggleDrum(5,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][23]} onChange={(e)=>this.toggleDrum(5,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][24]} onChange={(e)=>this.toggleDrum(5,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][25]} onChange={(e)=>this.toggleDrum(5,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][26]} onChange={(e)=>this.toggleDrum(5,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][27]} onChange={(e)=>this.toggleDrum(5,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][28]} onChange={(e)=>this.toggleDrum(5,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][29]} onChange={(e)=>this.toggleDrum(5,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][30]} onChange={(e)=>this.toggleDrum(5,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[5][31]} onChange={(e)=>this.toggleDrum(5,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.drum6} onChange={this.onSelectDrum6.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][0]} onChange={(e)=>this.toggleDrum(6,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][1]} onChange={(e)=>this.toggleDrum(6,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][2]} onChange={(e)=>this.toggleDrum(6,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][3]} onChange={(e)=>this.toggleDrum(6,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][4]} onChange={(e)=>this.toggleDrum(6,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][5]} onChange={(e)=>this.toggleDrum(6,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][6]} onChange={(e)=>this.toggleDrum(6,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][7]} onChange={(e)=>this.toggleDrum(6,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][8]} onChange={(e)=>this.toggleDrum(6,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][9]} onChange={(e)=>this.toggleDrum(6,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][10]} onChange={(e)=>this.toggleDrum(6,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][11]} onChange={(e)=>this.toggleDrum(6,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][12]} onChange={(e)=>this.toggleDrum(6,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][13]} onChange={(e)=>this.toggleDrum(6,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][14]} onChange={(e)=>this.toggleDrum(6,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][15]} onChange={(e)=>this.toggleDrum(6,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][16]} onChange={(e)=>this.toggleDrum(6,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][17]} onChange={(e)=>this.toggleDrum(6,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][18]} onChange={(e)=>this.toggleDrum(6,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][19]} onChange={(e)=>this.toggleDrum(6,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][20]} onChange={(e)=>this.toggleDrum(6,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][21]} onChange={(e)=>this.toggleDrum(6,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][22]} onChange={(e)=>this.toggleDrum(6,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][23]} onChange={(e)=>this.toggleDrum(6,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][24]} onChange={(e)=>this.toggleDrum(6,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][25]} onChange={(e)=>this.toggleDrum(6,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][26]} onChange={(e)=>this.toggleDrum(6,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][27]} onChange={(e)=>this.toggleDrum(6,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][28]} onChange={(e)=>this.toggleDrum(6,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][29]} onChange={(e)=>this.toggleDrum(6,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][30]} onChange={(e)=>this.toggleDrum(6,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[6][31]} onChange={(e)=>this.toggleDrum(6,31)} /></td>					
				</tr>
				<tr>
					<td><select value={this.state.drum7} onChange={this.onSelectDrum7.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][0]} onChange={(e)=>this.toggleDrum(7,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][1]} onChange={(e)=>this.toggleDrum(7,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][2]} onChange={(e)=>this.toggleDrum(7,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][3]} onChange={(e)=>this.toggleDrum(7,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][4]} onChange={(e)=>this.toggleDrum(7,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][5]} onChange={(e)=>this.toggleDrum(7,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][6]} onChange={(e)=>this.toggleDrum(7,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][7]} onChange={(e)=>this.toggleDrum(7,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][8]} onChange={(e)=>this.toggleDrum(7,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][9]} onChange={(e)=>this.toggleDrum(7,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][10]} onChange={(e)=>this.toggleDrum(7,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][11]} onChange={(e)=>this.toggleDrum(7,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][12]} onChange={(e)=>this.toggleDrum(7,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][13]} onChange={(e)=>this.toggleDrum(7,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][14]} onChange={(e)=>this.toggleDrum(7,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][15]} onChange={(e)=>this.toggleDrum(7,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][16]} onChange={(e)=>this.toggleDrum(7,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][17]} onChange={(e)=>this.toggleDrum(7,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][18]} onChange={(e)=>this.toggleDrum(7,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][19]} onChange={(e)=>this.toggleDrum(7,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][20]} onChange={(e)=>this.toggleDrum(7,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][21]} onChange={(e)=>this.toggleDrum(7,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][22]} onChange={(e)=>this.toggleDrum(7,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][23]} onChange={(e)=>this.toggleDrum(7,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][24]} onChange={(e)=>this.toggleDrum(7,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][25]} onChange={(e)=>this.toggleDrum(7,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][26]} onChange={(e)=>this.toggleDrum(7,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][27]} onChange={(e)=>this.toggleDrum(7,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][28]} onChange={(e)=>this.toggleDrum(7,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][29]} onChange={(e)=>this.toggleDrum(7,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][30]} onChange={(e)=>this.toggleDrum(7,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[7][31]} onChange={(e)=>this.toggleDrum(7,31)} /></td>					
				</tr>
				<tr>
				<td><select value={this.state.drum8} onChange={this.onSelectDrum8.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][0]} onChange={(e)=>this.toggleDrum(8,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][1]} onChange={(e)=>this.toggleDrum(8,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][2]} onChange={(e)=>this.toggleDrum(8,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][3]} onChange={(e)=>this.toggleDrum(8,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][4]} onChange={(e)=>this.toggleDrum(8,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][5]} onChange={(e)=>this.toggleDrum(8,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][6]} onChange={(e)=>this.toggleDrum(8,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][7]} onChange={(e)=>this.toggleDrum(8,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][8]} onChange={(e)=>this.toggleDrum(8,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][9]} onChange={(e)=>this.toggleDrum(8,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][10]} onChange={(e)=>this.toggleDrum(8,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][11]} onChange={(e)=>this.toggleDrum(8,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][12]} onChange={(e)=>this.toggleDrum(8,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][13]} onChange={(e)=>this.toggleDrum(8,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][14]} onChange={(e)=>this.toggleDrum(8,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][15]} onChange={(e)=>this.toggleDrum(8,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][16]} onChange={(e)=>this.toggleDrum(8,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][17]} onChange={(e)=>this.toggleDrum(8,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][18]} onChange={(e)=>this.toggleDrum(8,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][19]} onChange={(e)=>this.toggleDrum(8,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][20]} onChange={(e)=>this.toggleDrum(8,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][21]} onChange={(e)=>this.toggleDrum(8,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][22]} onChange={(e)=>this.toggleDrum(8,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][23]} onChange={(e)=>this.toggleDrum(8,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][24]} onChange={(e)=>this.toggleDrum(8,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][25]} onChange={(e)=>this.toggleDrum(8,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][26]} onChange={(e)=>this.toggleDrum(8,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][27]} onChange={(e)=>this.toggleDrum(8,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][28]} onChange={(e)=>this.toggleDrum(8,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][29]} onChange={(e)=>this.toggleDrum(8,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][30]} onChange={(e)=>this.toggleDrum(8,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[8][31]} onChange={(e)=>this.toggleDrum(8,31)} /></td>					
				</tr>
				<tr>
				<td><select value={this.state.drum9} onChange={this.onSelectDrum9.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][0]} onChange={(e)=>this.toggleDrum(9,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][1]} onChange={(e)=>this.toggleDrum(9,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][2]} onChange={(e)=>this.toggleDrum(9,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][3]} onChange={(e)=>this.toggleDrum(9,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][4]} onChange={(e)=>this.toggleDrum(9,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][5]} onChange={(e)=>this.toggleDrum(9,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][6]} onChange={(e)=>this.toggleDrum(9,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][7]} onChange={(e)=>this.toggleDrum(9,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][8]} onChange={(e)=>this.toggleDrum(9,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][9]} onChange={(e)=>this.toggleDrum(9,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][10]} onChange={(e)=>this.toggleDrum(9,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][11]} onChange={(e)=>this.toggleDrum(9,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][12]} onChange={(e)=>this.toggleDrum(9,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][13]} onChange={(e)=>this.toggleDrum(9,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][14]} onChange={(e)=>this.toggleDrum(9,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][15]} onChange={(e)=>this.toggleDrum(9,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][16]} onChange={(e)=>this.toggleDrum(9,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][17]} onChange={(e)=>this.toggleDrum(9,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][18]} onChange={(e)=>this.toggleDrum(9,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][19]} onChange={(e)=>this.toggleDrum(9,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][20]} onChange={(e)=>this.toggleDrum(9,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][21]} onChange={(e)=>this.toggleDrum(9,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][22]} onChange={(e)=>this.toggleDrum(9,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][23]} onChange={(e)=>this.toggleDrum(9,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][24]} onChange={(e)=>this.toggleDrum(9,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][25]} onChange={(e)=>this.toggleDrum(9,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][26]} onChange={(e)=>this.toggleDrum(9,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][27]} onChange={(e)=>this.toggleDrum(9,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][28]} onChange={(e)=>this.toggleDrum(9,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][29]} onChange={(e)=>this.toggleDrum(9,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][30]} onChange={(e)=>this.toggleDrum(9,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[9][31]} onChange={(e)=>this.toggleDrum(9,31)} /></td>					
				</tr>
				<tr>
				<td><select value={this.state.drum10} onChange={this.onSelectDrum10.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][0]} onChange={(e)=>this.toggleDrum(10,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][1]} onChange={(e)=>this.toggleDrum(10,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][2]} onChange={(e)=>this.toggleDrum(10,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][3]} onChange={(e)=>this.toggleDrum(10,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][4]} onChange={(e)=>this.toggleDrum(10,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][5]} onChange={(e)=>this.toggleDrum(10,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][6]} onChange={(e)=>this.toggleDrum(10,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][7]} onChange={(e)=>this.toggleDrum(10,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][8]} onChange={(e)=>this.toggleDrum(10,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][9]} onChange={(e)=>this.toggleDrum(10,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][10]} onChange={(e)=>this.toggleDrum(10,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][11]} onChange={(e)=>this.toggleDrum(10,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][12]} onChange={(e)=>this.toggleDrum(10,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][13]} onChange={(e)=>this.toggleDrum(10,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][14]} onChange={(e)=>this.toggleDrum(10,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][15]} onChange={(e)=>this.toggleDrum(10,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][16]} onChange={(e)=>this.toggleDrum(10,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][17]} onChange={(e)=>this.toggleDrum(10,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][18]} onChange={(e)=>this.toggleDrum(10,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][19]} onChange={(e)=>this.toggleDrum(10,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][20]} onChange={(e)=>this.toggleDrum(10,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][21]} onChange={(e)=>this.toggleDrum(10,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][22]} onChange={(e)=>this.toggleDrum(10,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][23]} onChange={(e)=>this.toggleDrum(10,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][24]} onChange={(e)=>this.toggleDrum(10,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][25]} onChange={(e)=>this.toggleDrum(10,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][26]} onChange={(e)=>this.toggleDrum(10,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][27]} onChange={(e)=>this.toggleDrum(10,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][28]} onChange={(e)=>this.toggleDrum(10,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][29]} onChange={(e)=>this.toggleDrum(10,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][30]} onChange={(e)=>this.toggleDrum(10,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[10][31]} onChange={(e)=>this.toggleDrum(10,31)} /></td>					
				</tr>
				<tr>
				<td><select value={this.state.drum11} onChange={this.onSelectDrum11.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][0]} onChange={(e)=>this.toggleDrum(11,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][1]} onChange={(e)=>this.toggleDrum(11,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][2]} onChange={(e)=>this.toggleDrum(11,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][3]} onChange={(e)=>this.toggleDrum(11,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][4]} onChange={(e)=>this.toggleDrum(11,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][5]} onChange={(e)=>this.toggleDrum(11,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][6]} onChange={(e)=>this.toggleDrum(11,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][7]} onChange={(e)=>this.toggleDrum(11,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][8]} onChange={(e)=>this.toggleDrum(11,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][9]} onChange={(e)=>this.toggleDrum(11,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][10]} onChange={(e)=>this.toggleDrum(11,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][11]} onChange={(e)=>this.toggleDrum(11,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][12]} onChange={(e)=>this.toggleDrum(11,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][13]} onChange={(e)=>this.toggleDrum(11,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][14]} onChange={(e)=>this.toggleDrum(11,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][15]} onChange={(e)=>this.toggleDrum(11,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][16]} onChange={(e)=>this.toggleDrum(11,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][17]} onChange={(e)=>this.toggleDrum(11,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][18]} onChange={(e)=>this.toggleDrum(11,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][19]} onChange={(e)=>this.toggleDrum(11,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][20]} onChange={(e)=>this.toggleDrum(11,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][21]} onChange={(e)=>this.toggleDrum(11,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][22]} onChange={(e)=>this.toggleDrum(11,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][23]} onChange={(e)=>this.toggleDrum(11,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][24]} onChange={(e)=>this.toggleDrum(11,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][25]} onChange={(e)=>this.toggleDrum(11,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][26]} onChange={(e)=>this.toggleDrum(11,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][27]} onChange={(e)=>this.toggleDrum(11,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][28]} onChange={(e)=>this.toggleDrum(11,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][29]} onChange={(e)=>this.toggleDrum(11,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][30]} onChange={(e)=>this.toggleDrum(11,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[11][31]} onChange={(e)=>this.toggleDrum(11,31)} /></td>					
				</tr>
				<tr>
				<td><select value={this.state.drum12} onChange={this.onSelectDrum12.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][0]} onChange={(e)=>this.toggleDrum(12,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][1]} onChange={(e)=>this.toggleDrum(12,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][2]} onChange={(e)=>this.toggleDrum(12,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][3]} onChange={(e)=>this.toggleDrum(12,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][4]} onChange={(e)=>this.toggleDrum(12,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][5]} onChange={(e)=>this.toggleDrum(12,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][6]} onChange={(e)=>this.toggleDrum(12,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][7]} onChange={(e)=>this.toggleDrum(12,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][8]} onChange={(e)=>this.toggleDrum(12,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][9]} onChange={(e)=>this.toggleDrum(12,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][10]} onChange={(e)=>this.toggleDrum(12,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][11]} onChange={(e)=>this.toggleDrum(12,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][12]} onChange={(e)=>this.toggleDrum(12,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][13]} onChange={(e)=>this.toggleDrum(12,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][14]} onChange={(e)=>this.toggleDrum(12,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][15]} onChange={(e)=>this.toggleDrum(12,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][16]} onChange={(e)=>this.toggleDrum(12,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][17]} onChange={(e)=>this.toggleDrum(12,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][18]} onChange={(e)=>this.toggleDrum(12,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][19]} onChange={(e)=>this.toggleDrum(12,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][20]} onChange={(e)=>this.toggleDrum(12,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][21]} onChange={(e)=>this.toggleDrum(12,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][22]} onChange={(e)=>this.toggleDrum(12,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][23]} onChange={(e)=>this.toggleDrum(12,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][24]} onChange={(e)=>this.toggleDrum(12,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][25]} onChange={(e)=>this.toggleDrum(12,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][26]} onChange={(e)=>this.toggleDrum(12,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][27]} onChange={(e)=>this.toggleDrum(12,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][28]} onChange={(e)=>this.toggleDrum(12,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][29]} onChange={(e)=>this.toggleDrum(12,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][30]} onChange={(e)=>this.toggleDrum(12,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[12][31]} onChange={(e)=>this.toggleDrum(12,31)} /></td>					
				</tr>
				<tr>
				<td><select value={this.state.drum13} onChange={this.onSelectDrum13.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][0]} onChange={(e)=>this.toggleDrum(13,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][1]} onChange={(e)=>this.toggleDrum(13,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][2]} onChange={(e)=>this.toggleDrum(13,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][3]} onChange={(e)=>this.toggleDrum(13,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][4]} onChange={(e)=>this.toggleDrum(13,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][5]} onChange={(e)=>this.toggleDrum(13,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][6]} onChange={(e)=>this.toggleDrum(13,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][7]} onChange={(e)=>this.toggleDrum(13,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][8]} onChange={(e)=>this.toggleDrum(13,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][9]} onChange={(e)=>this.toggleDrum(13,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][10]} onChange={(e)=>this.toggleDrum(13,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][11]} onChange={(e)=>this.toggleDrum(13,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][12]} onChange={(e)=>this.toggleDrum(13,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][13]} onChange={(e)=>this.toggleDrum(13,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][14]} onChange={(e)=>this.toggleDrum(13,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][15]} onChange={(e)=>this.toggleDrum(13,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][16]} onChange={(e)=>this.toggleDrum(13,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][17]} onChange={(e)=>this.toggleDrum(13,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][18]} onChange={(e)=>this.toggleDrum(13,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][19]} onChange={(e)=>this.toggleDrum(13,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][20]} onChange={(e)=>this.toggleDrum(13,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][21]} onChange={(e)=>this.toggleDrum(13,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][22]} onChange={(e)=>this.toggleDrum(13,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][23]} onChange={(e)=>this.toggleDrum(13,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][24]} onChange={(e)=>this.toggleDrum(13,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][25]} onChange={(e)=>this.toggleDrum(13,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][26]} onChange={(e)=>this.toggleDrum(13,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][27]} onChange={(e)=>this.toggleDrum(13,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][28]} onChange={(e)=>this.toggleDrum(13,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][29]} onChange={(e)=>this.toggleDrum(13,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][30]} onChange={(e)=>this.toggleDrum(13,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[13][31]} onChange={(e)=>this.toggleDrum(13,31)} /></td>					
				</tr>
				<tr>
				<td><select value={this.state.drum14} onChange={this.onSelectDrum14.bind(this)}>{this.createSelectItemsInt()}</select></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][0]} onChange={(e)=>this.toggleDrum(14,0)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][1]} onChange={(e)=>this.toggleDrum(14,1)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][2]} onChange={(e)=>this.toggleDrum(14,2)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][3]} onChange={(e)=>this.toggleDrum(14,3)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][4]} onChange={(e)=>this.toggleDrum(14,4)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][5]} onChange={(e)=>this.toggleDrum(14,5)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][6]} onChange={(e)=>this.toggleDrum(14,6)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][7]} onChange={(e)=>this.toggleDrum(14,7)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][8]} onChange={(e)=>this.toggleDrum(14,8)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][9]} onChange={(e)=>this.toggleDrum(14,9)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][10]} onChange={(e)=>this.toggleDrum(14,10)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][11]} onChange={(e)=>this.toggleDrum(14,11)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][12]} onChange={(e)=>this.toggleDrum(14,12)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][13]} onChange={(e)=>this.toggleDrum(14,13)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][14]} onChange={(e)=>this.toggleDrum(14,14)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][15]} onChange={(e)=>this.toggleDrum(14,15)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][16]} onChange={(e)=>this.toggleDrum(14,16)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][17]} onChange={(e)=>this.toggleDrum(14,17)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][18]} onChange={(e)=>this.toggleDrum(14,18)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][19]} onChange={(e)=>this.toggleDrum(14,19)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][20]} onChange={(e)=>this.toggleDrum(14,20)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][21]} onChange={(e)=>this.toggleDrum(14,21)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][22]} onChange={(e)=>this.toggleDrum(14,22)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][23]} onChange={(e)=>this.toggleDrum(14,23)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][24]} onChange={(e)=>this.toggleDrum(14,24)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][25]} onChange={(e)=>this.toggleDrum(14,25)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][26]} onChange={(e)=>this.toggleDrum(14,26)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][27]} onChange={(e)=>this.toggleDrum(14,27)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][28]} onChange={(e)=>this.toggleDrum(14,28)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][29]} onChange={(e)=>this.toggleDrum(14,29)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][30]} onChange={(e)=>this.toggleDrum(14,30)} /></td>
					<td><input type="checkbox" defaultChecked={this.state.tracks[14][31]} onChange={(e)=>this.toggleDrum(14,31)} /></td>					
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
			<p><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItemsInt()}</select></p>
		<p><button onClick={this.playTestInstrument.bind(this)} disabled={!this.state.cached}>Play</button></p>
		</p>
		<input onChange={this.handleFieldChange} type="text"
                    id="BPM"
                    placeholder="Enter BPM"
                    required="" />

					
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



