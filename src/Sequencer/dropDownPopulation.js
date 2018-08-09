import APIManager from "../APIManager"
import React, { Component } from "react"


export default class DropDown extends Component {
    state = {
        value:""
    }
    deleteSong(id){
        APIManager.deleteSong(id)
    }
    editSong = (songID) => {
	
		let userObject = JSON.parse(localStorage.getItem("credentials"))
        let userId = userObject.currentUserId
        console.log(APIManager.getSongData(parseInt(this.state.value)))
        let songId= parseInt(this.state.value)
        console.log("song Id " + songId)
		const editedSong = { sequence: this.props.tracks,  }
        console.log(userObject)
        console.log(this.state.value)
		APIManager.editSong(songId,editedSong)
	// 	.then((e) => {
	// 	console.log(e.id)
	// 	let songStuff = {
	// 		userId:userId,
	// 		songId:songId
	// 	}
	// 	APIManager.joinSongs(songStuff)
	// 	.then(console.log("song stuff ", songStuff))
	// }) 
		}
    handleChange=(event)=> {
        this.setState({value: event.target.value});
    }
    
    handleSubmit=(event) => {
        event.preventDefault();
        console.log(this.state.value)
        this.props.loadSong(this.state.value)
    }
    handleDelete=(event) => {
        event.preventDefault();
        console.log(this.state.value)
        this.deleteSong(this.sate.value)
    }
    handleEdit=(event) => {
        event.preventDefault();
        console.log(this.state.value)
        this.editSong(this.sate.value)
    }
    render(){
    console.log("props", this.props.userSongArray)
    return (
        <form onSubmit={this.handleSubmit} onDelete={this.handleDelete} onEdit={this.handleEdit}>
        <label>Select A Song
        <select value={this.state.value} onChange={this.handleChange}>
        <option>Choose a song</option>
        {this.props.userSongArray.map((song)=> {
            console.log("song", song.songId)
            return <option value= {song.songId}>{song.song.name}</option>
        })}
    
        </select>
        </label>
        <button type="button" value="Delete" onClick={() =>{this.deleteSong(this.state.value)} }>Delete Song</button>
        <button type="button" value="Edit" onClick={() =>{this.editSong(this.state.value)} }>Save Song</button>
        <button type="submit" value="Submit">Load Song </button>
        <button type="reset" value="Reset">New Song</button>
        </form>
    )}}

    