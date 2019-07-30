/* ==========================================================================
** Projects Holder Parent Component
** Main Form Screen, Controls the Other Views
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import PropTypes from 'prop-types';
    import {  NavBar, Header, FormBody, AppButton} from '../../components';
    import {  Switch, Route, Link, Redirect } from "react-router-dom";
    // import { connect } from 'react-redux';
    import { withRouter } from 'react-router';
    // import { fetchSitePMOS } from '../../actions'
    import { newProjectRoutes } from '../../routes/routes';
    import '../styles.css'
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';

// --------------------------------------
// Create Component Class
// --------------------------------------
    class formHolder extends Component {
        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */
    
            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    currentView : 'requirement-definition',
                    isLoaded: false,
                }
                
            }
        
        // --------------------------------------
        // Set Initial Values
        // --------------------------------------
        componentDidMount() {
            // const pmos = this.props.sharepoint;
            this.setState({isLoaded : true});
        }

        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */


            // --------------------------------------
            // Set Enabled Routes based on User role
            // --------------------------------------
            enableNavigationRoutes() {
                // const {isPMO} = this.props;

                const isPMO = localStorage.getItem('isUserPMO') === "true" ? true  : false

                const routesWithState = newProjectRoutes.map((route)=> {
                    if(route.allowNormalUser) 
                        route.disabled = false
                    else {
                        if(isPMO)  
                            route.disabled = false
                        else
                            route.disabled = true
                    }
                        

                    return route;
                })

                return routesWithState;
            }



        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */


            // --------------------------------------
            // Render Navigation
            // --------------------------------------
            renderNavigation() {
                // const activeRoute = newProjectRoutes[0];
                const navigationRoutes = this.enableNavigationRoutes();
                return <NavBar routes = {navigationRoutes} activeRoute = {0}/>
            }


            // --------------------------------------
            // Render Form Header
            // --------------------------------------
            renderformHeader() {
                // const title =  'Global Shared \n Development';
                const title =  'Global Shared Development';
                return <Header title = {title}/>
            }

            // --------------------------------------
            // Render Form Body
            // --------------------------------------
            renderformBody() {
            
                // this.props
                console.log("TCL: formHolder -> renderformBody -> this.props", this.props)

                return (
                    
                            <Switch>
                                
                                    {newProjectRoutes.map((prop, key) => {
                                        return prop.redirect ?  
                                            <Redirect from = {prop.path} to = {prop.to} ></Redirect> :
                                            <Route  
                                                    route={this.props.route} 
                                                    path={prop.path} 
                                                    component={prop.component} 
                                                    key={`index-${key}`} 
                                                    ref = {prop.ref}>
                                            </Route>
                                            
                                },this)}


                            </Switch>
                    
                );

            }

          
            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderformHolder() {
                return (
                        <Fragment>
                            {this.renderNavigation()}
                            <div className="int-projectsContainer">
                                
                                <div className="int-formContainer int-shadow">

                                    {this.renderformHeader()}
                                    {/* Load Here the Current Form Tab Component*/}
                                    {this.renderformBody()}
                                    <Alert stack={{limit: 1}}  timeout={2000} />

                                    
                                </div>

                            </div>
                        </Fragment>
                    )
            }

            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                const {isLoaded} = this.state;
                return isLoaded && this.renderformHolder();
            }
    }



// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    // formHolder.propTypes = {
    //     props: PropTypes
    // };




/* ==========================================================================
** Redux Functions
** ========================================================================== */
// const mapStateToProps = (state) => {
//     //console.log('TCL: mapStateToProps -> state', state)
//     return {
//         pmos : state.sharepoint,
//         pmosData:state.sharepoint.pmos,
//         isPMO : state.sharepoint.isPMO,
//         isLoaded : state.sharepoint.pmosLoaded
//     }
// }





// --------------------------------------
// Export Component
// --------------------------------------
    // export default  withRouter (connect(mapStateToProps, {fetchSitePMOS}) (formHolder));
    export default  withRouter  (formHolder);