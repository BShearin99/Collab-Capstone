import React, { Component } from "react"
import Sequencer from "./Sequencer/SequencerSection";
import Tone from "tone";
import "./App.css"
import APIManager from "./APIManager"






class App extends Component {
state={drum1:''}
  componentDidMount(){
APIManager.getSongData(1)
.then(response => { this.setState({drum1:response})})

  }
  render() {
    return (

    <React.Fragment>
    {/* <Login /> */}
    <Sequencer drum1={this.state.drum1}/>
    </React.Fragment>
    )
  }
}

export default App;
