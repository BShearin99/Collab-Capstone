// import APIManager from "./APIManager"
import React, { Component } from "react"


export default class DropDown extends Component {
    state = {
        value:""
    }
    handleChange=(event)=> {
        this.setState({value: event.target.value});
    }
    
    handleSubmit=(event) => {
        event.preventDefault();
        console.log(this.state.value)
        this.props.loadSong(this.state.value)
    }
    render(){
    console.log("props", this.props.userSongArray)
    return (
        <form onSubmit={this.handleSubmit}>
        <label>Select A Song
        <select value={this.state.value} onChange={this.handleChange}>
        <option>Choose a song></option>
        {this.props.userSongArray.map((song)=> {
            console.log("song", song.song.name)
            return <option value= {song.songId}>{song.song.name}</option>
        })}
    
        </select>
        </label>
        <button type="submit" value="Submit" />
        </form>
    )}}

    