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
    import { withRouter, Prompt } from 'react-router';
    import {Endpoints} from '../../services/Endpoints';
    import { Switch, Route,  Redirect, BrowserRouter,  } from "react-router-dom";
    import axios from 'axios';
    
    import '../styles.css'


    const currentUser = window.getCurrentSPUser();

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
                const sitePMOsPromise =  await this.fetchSitePMOS();
                const sitePMOS = await sitePMOsPromise.data.value;
                // const sitePMOS =   await  sitePMOsPromise.data ?  sitePMOsPromise.data.value : this.users.value

                // const sitePMOS = this.users.value
                console.log("TCL: Dashboard -> loadAPI -> sitePMOS", sitePMOS)
                let isPMO = false

                // ? If there is Pmo, look for current user
                if(sitePMOS.length >0) {
                    console.log("TCL: Dashboard -> loadAPI -> sitePMOS", sitePMOS)
                    
                    
                    // const currentUser = {userEmail : 'alan.medina@flex.com'}
                    const PMOSData = sitePMOS.filter((pmo) => {
                        console.log("TCL: Dashboard -> loadAPI -> pmo", pmo)
                        console.log("TCL: Dashboard -> loadAPI -> currentUser", currentUser)

                        console.log("TCL: Dashboard -> loadAPI -> (pmo.Email)", pmo.Email.toLowerCase())

                        console.log("TCL: Dashboard -> loadAPI -> (currentUser.userEmail)", currentUser.userEmail.toLowerCase())
			
                        if((pmo.Email).toLowerCase() === (currentUser.userEmail).toLowerCase())
                            return {
                                pmoName : pmo.Title,
                                pmoEmail: pmo.Email
                            }
                        // else
                        //     return null
                    })


                    console.log("TCL: Dashboard -> loadAPI -> PMOSData", PMOSData)

                    if(PMOSData.length > 0)
                        isPMO = true;    
                    else
                        isPMO = false;

                    console.log("TCL: Dashboard -> loadAPI -> isPMO", isPMO)

                    // ? Set PMO value on sessionStorage to acces it later
                    if(sessionStorage.getItem('isUserPMO') === null ) {
                        window.sessionStorage.setItem('isUserPMO', JSON.stringify(isPMO))
                    }
                    // ? If user wasnt in the list on the first check
                    else if (sessionStorage.getItem('isUserPMO') === "false" && isPMO === true) {
                        window.sessionStorage.setItem('isUserPMO', JSON.stringify(isPMO))
                    }

                    // ? If user was in the list on the first check but now is removed
                    else if (sessionStorage.getItem('isUserPMO') === "true" && isPMO === false) {
                        window.sessionStorage.removeItem('isUserPMO')
                    }
                    
                }
                else {
                    isPMO = false 
                    if(sessionStorage.getItem('isUserPMO') !== null) {
                        window.sessionStorage.removeItem('isUserPMO')
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

                    return (
                        <div className = "int-mainContainer" style = {{maxWidth:responsiveWidth}}>
                            <BrowserRouter history={this.props.history}>

                         

                                <Switch>
                                    {appRoutes.map((prop,key) => {
                                        
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
    // Dashboard.propTypes = {
    //     props: PropTypes
    // };





// --------------------------------------
// Export Component
// --------------------------------------
    // export default withRouter (connect(mapStateToProps, {fetchSitePMOS}) (Dashboard));
    export default  (Dashboard);