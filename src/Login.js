import APIManager from "./APIManager"
import React, { Component } from "react"

export default class Login extends Component {
    state = {
        email: " ",
        userName: " ",
        password: " "
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)

    }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()
        APIManager.getUserByUserName(this.state.userName)
        .then ((taco) => {
            console.log(taco[0].id)
            localStorage.setItem(
                "credentials",
                JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    userName: this.state.userName,
                    currentUserId: taco[0].id
                    
                })
                
            ) 
        })
    
    }

    render() {
        return (
            <div className="login">
            <form onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail">
                    Email address:
                </label>
                <input onChange={this.handleFieldChange} type="email"
                    id="email"
                    placeholder="Email address"
                    required="" autoFocus="" />
                <label htmlFor="inputPassword">
                    Password:
                </label>
                <input onChange={this.handleFieldChange} type="password"
                    id="password"
                    placeholder="Password"
                    required="" />
                <label htmlFor="inputUserName">
                    UserName:
                </label>
                <input onChange={this.handleFieldChange} type="text"
                    id="userName"
                    placeholder="Enter UserName"
                    required="" />
                <button type="submit"onClick={() => window.location.reload()
                }>
                Sign In
                </button>
                <br></br>
                <input type="checkbox" name="checkbox" /> <label>REMEMBER ME</label>
            </form>
            </div>
        )
    }
}