import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Route, Redirect } from "react-router-dom"
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render((
//     <Router>
//         <App/>
//     </Router>
// ), document.getElementById('root'));

registerServiceWorker()

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';





// WEBPACK FOOTER //
// ./src/index.js