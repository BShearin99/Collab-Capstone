// Will be implented after login module
import React, { Component } from "react";
import Login from "./Login"
import App from "./App"
import { Route, Redirect } from "react-router-dom"
import { BrowserRouter as Router } from 'react-router-dom'

export default class ApplicationViews extends Component {
    isAuthenticated = () => localStorage.getItem("credentials") !== null

    render() {
        return (

            <React.Fragment>
                <Route exact path="/" render={props => {
                    if (this.isAuthenticated()) {
                        return <App />
                        
                    } else {
                        return <Login{...props}/>
                    }
                }} />
                <Route path="/App" component={App} />
            </React.Fragment>
        )
    }
}