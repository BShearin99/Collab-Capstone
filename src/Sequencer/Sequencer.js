

//OBSOLETE BUT STILL USEFULL 


// // import React from "react";
// import React, { Component } from "react"
// import SequencerDisplay from "./SequencerDisplay";
// import Tone from "tone";
// // import Babel from "babel-core";

// export default class Sequencer extends Component {
    
//     sounds = () => {

//     console.clear();



// const synths = [
//     new Tone.Synth(),
//     new Tone.Synth(),
//     new Tone.Synth()
// ];

// synths[0].oscillator.type = 'triangle';
// synths[1].oscillator.type = 'sine';
// synths[2].oscillator.type = 'sawtooth';

// const gain = new Tone.Gain(0.6);
// gain.toMaster();

// synths.forEach(synth => synth.connect(gain));

// const $rows = SequencerDisplay.props,
//     notes = ['G5', 'E4', 'C3'];
// let index = 0;

// Tone.Transport.scheduleRepeat(repeat, '8n');
// Tone.Transport.start();

// function repeat(time) {
//     let step = index % 8;
//     for (let i = 0; i < $rows.length; i++) {
//         let synth = synths[i],
//             note = notes[i],
//             $row = $rows[i],
//             $input = $row.querySelector(`input:nth-child(${step + 1})`);
//         if ($input.checked) synth.triggerAttackRelease(note, '8n', time);
//     }
//     index++;
// }
// }
// }