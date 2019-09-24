/* ==========================================================================
 * App File Init Components And Routes 
 * 12/02/2019
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
  import React, { Component, Fragment } from 'react';
  import createBrowserHistory from 'history/createBrowserHistory'
  import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
  import indexRoutes from './routes/index';
  import ReactGA from 'react-ga';
  import Dashboard from './layouts/Dashboard/Dashboard'
  import './App.css';


// --------------------------------------
// Create Component Class
// --------------------------------------
  class App extends Component { 
    


    /* ==========================================================================
    ** Render Methods
    ** ========================================================================== */


      componentDidMount() {
        const CurrentSPUser = window.getCurrentSPUser();

        ReactGA.initialize('UA-142850304-1', {
          debug: true,
          titleCase: false,
          gaOptions: {
            userId: CurrentSPUser.userID,
            dimensionValue: CurrentSPUser.userEmail
          }
        });
  
        ReactGA.pageview(window.location.pathname + window.location.search);
        console.log('ReactGA', ReactGA);

      }



      
      // --------------------------------------
      // Render Component
      // {indexRoutes.map((prop, key) => {
      //   return <Route path={prop.path} component={prop.component} key={`index-${key}`} ></Route>
      // })}

      // <Route path={'/'} component={Dashboard} key={`dashboard`} ></Route>
      // --------------------------------------
      render() { 
        
        const history = createBrowserHistory();

       
        return (
          <BrowserRouter history={history}>
            <Switch> 
            {indexRoutes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={`index-${key}`} ></Route>
            })}
            </Switch>

          </BrowserRouter>
        );
      
      }
  } 



// --------------------------------------
// Export Component
// --------------------------------------
export default App;