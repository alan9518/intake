/* ==========================================================================
** Main App File
** 12/02/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Internet Explorer Compatibility
// ! App no longer supported on IE
// ! Install Deps before uncomment
// --------------------------------------
    // import 'react-app-polyfill/ie11';
    // import "babel-polyfill";
    // import 'core-js/es6/map';
    // import 'core-js/es6/set';
    // import 'raf/polyfill';
    // import 'babel-plugin-transform-es2015-template-literals';



// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import * as serviceWorker from './serviceWorker';
    import { ErrorBoundary } from './components';



// --------------------------------------
// Deactivate Console.log on Production
// --------------------------------------
if (process.env.NODE_ENV !== 'development') {
    console.log = () => {}
}


// --------------------------------------
// Render App 
// --------------------------------------
    ReactDOM.render(
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        ,document.getElementById('root'));


    // ReactDOM.render(<App />, document.getElementById('root'));

    

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
// serviceWorker.register();
