/* ==========================================================================
** Initial View Component
** Toggle Between all projects view & add project
** 05/02/2019
** Alan Medina Silva
** ========================================================================== */




// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import PropTypes from 'prop-types';
    import {appRoutes} from '../../routes/routes';
    import { withRouter } from 'react-router';
    import {Endpoints} from '../../services/Endpoints';
    import { Switch, Route,  Redirect, BrowserRouter,  } from "react-router-dom";
    import axios from 'axios';
    
    import '../styles.css'

// --------------------------------------
// Create Component Class
// --------------------------------------
    class Dashboard extends Component {

        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */

            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    isLoaded: false,
                    responsiveWidth : window.innerWidth
                }

                this.users = {
                    value: [
                            
                            {
                                "Email": "Alan.Medina@flex.com",
                                "Expiration": "",
                                "Id": 37,
                                "IsEmailAuthenticationGuestUser": false,
                                "IsHiddenInUI": false,
                                "IsShareByEmailGuestUser": false,
                                "IsSiteAdmin": false,
                                "LoginName": "i:0#.f|membership|alan.medina@flex.com",
                                "PrincipalType": 1,
                                "Title": "Alan Medina",
                                "UserId": {NameId: "10030000a46f877f", NameIdIssuer: "urn:federation:microsoftonline"},
                                "UserPrincipalName": "alan.medina@flex.com",
                                "odata.editLink": "Web/GetUserById(37)",
                                "odata.id": "https://flextronics365.sharepoint.com/sites/gsd/intake_process/_api/Web/GetUserById(37)",
                                "odata.type": "SP.User"
                            }

                           
                    ]
                }   
            }
        
            // --------------------------------------
            // Load API & Register Window Listener
            // Event for Responsive Sharepoint
            // --------------------------------------
            async componentDidMount() {
                
                window.addEventListener("resize", this.updateContainerDimensions);
                // ? Check if user is PMO
                try {
                    console.log("TCL: Dashboard -> componentDidMount -> DidMount", )    
                    this.loadAPI();
                }
                catch(error) {
                    console.log("TCL: Dashboard -> componentDidMount -> error", error)
                    
                }
            }


            // --------------------------------------
            // Unregister Window Listener Event
            // --------------------------------------
            componentWillUnmount() {
                window.removeEventListener("resize", this.updateContainerDimensions);
            }


            // --------------------------------------
            // Window Resizing
            // --------------------------------------
            updateContainerDimensions = () => {
                let newWidth = window.innerWidth;
                this.setState({responsiveWidth : newWidth});
            }



        /* ==========================================================================
        ** Load API
        ** ========================================================================== */

            // --------------------------------------
            // Load All API GET Requests
            // --------------------------------------
            async loadAPI() {
                const sitePMOsPromise =  this.fetchSitePMOS();
                // const sitePMOS =   await  sitePMOsPromise.data ?  sitePMOsPromise.data.value : this.users.value

                const sitePMOS = this.users.value
                console.log("TCL: Dashboard -> loadAPI -> sitePMOS", sitePMOS)
                let isPMO = false

                // ? If there is Pmo, look for current user
                if(sitePMOS.length >0) {
                    console.log("TCL: Dashboard -> loadAPI -> sitePMOS", sitePMOS)
                    //? const currentUser = window.getCurrentSPUser();
                    const currentUser = {userEmail : 'alan.medina@flex.com'}
                    const PMOSData = sitePMOS.filter((pmo) => {
			
                        if((pmo.Email).toLowerCase() === (currentUser.userEmail).toLowerCase())
                            return {
                                pmoName : pmo.Title,
                                pmoEmail :pmo.Email
                            }
                    })

                    if(PMOSData.length > 0)
                        isPMO = true;
                    else
                        isPMO = false;

                    // ? Set PMO value on localStorage to acces it later
                    if(localStorage.getItem('isUserPMO') === null) {
                        window.localStorage.setItem('isUserPMO', JSON.stringify(isPMO))
                    }
                    
                }
                else {
                    isPMO = false 
                    if(localStorage.getItem('isUserPMO') !== null) {
                        window.localStorage.removeItem('isUserPMO')
                    }

                }
                  

                // ? Set State
                this.setState({
                    isLoaded : true
                });
            }


            // --------------------------------------
            // Load Sharepoint PMOS
            // --------------------------------------
            async fetchSitePMOS () {
                return axios.get(Endpoints.getSitePMOS);
            }
            


        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */

            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderDashboard() {
                
                const {responsiveWidth} = this.state;
                // const history = createBrowserHistory();

                console.log("TCL: Dashboard -> renderDashboard -> this.props", this.props)

                // console.log("TCL: Dashboard -> renderDashboard -> this.props.route", this.props.route)


                    return (
                        <div className = "int-mainContainer" style = {{maxWidth:responsiveWidth}}>
                            <BrowserRouter history={this.props.history}>
                                <Switch>
                                    {appRoutes.map((prop,key) => {
                                        console.log("TCL: Dashboard -> renderDashboard -> prop", prop)
                                        if (prop.redirect)
                                            return <Redirect from={prop.path} to={prop.to} key={key} />;
                                        
                                        return <Route 
                                                    // route={this.props.route}
                                                    exact={prop.exact} 
                                                    path={prop.path} 
                                                    component={prop.component} 
                                                    key={prop.key} />;
                                                    
                                    })}
                                </Switch>
                            </BrowserRouter>
                        </div>
                    )
            }

            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                const {isLoaded} = this.state;
                
                return isLoaded && this.renderDashboard();
            }
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    Dashboard.propTypes = {
        props: PropTypes
    };



/* ==========================================================================
** Redux Functions
** ========================================================================== */
    // const mapStateToProps = (state) => {
		
    //     return {
    //         pmos : state.sharepoint,
    //         pmosData:state.sharepoint.pmos,
    //         isLoaded : state.sharepoint.pmosLoaded
    //     }
    // }



// --------------------------------------
// Export Component
// --------------------------------------
    // export default withRouter (connect(mapStateToProps, {fetchSitePMOS}) (Dashboard));
    export default  (Dashboard);