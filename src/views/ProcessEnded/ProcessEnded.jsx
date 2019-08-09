/* ==========================================================================
** Show the User Message That PMO Needs To Review Application
** 22/02/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import { Header, FormBody, AppButton, ProjectLink, NavBar, AppLoader} from '../../components';
    import {appRoutes} from '../../routes/routes';
    import PropTypes from 'prop-types';

// --------------------------------------
// Create Component Class
// --------------------------------------
    class ProcessEnded extends Component {
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
                }
            }
            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {
            }


        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */


            // --------------------------------------
            // Render Loader
            // --------------------------------------
            renderLoader () {
                return <div> <AppLoader customHeight = {400}/> </div>
            }

            // --------------------------------------
            // Render Navigation
            // --------------------------------------
            renderNavigation() {
                // const activeRoute = newProjectRoutes[0];
                return <NavBar routes = {appRoutes} isRoute = {true}/>
            }




            // --------------------------------------
            // Render Form Header
            // --------------------------------------
            renderformHeader() {
                // const title =  'Global Shared \n Development';
                const title =  'Thanks For Your Application';
                return <Header title = {title}/>
            }

        

            // --------------------------------------
            // Render Header Section
            // --------------------------------------
            renderHeaderSection() {
                const {projId} = this.props.match.params
				//console.log("TCL: ProcessEnded -> renderHeaderSection -> projId", projId)
                return (
                    <Fragment>
                        <div className="int-container">
                            

                            <div className="int-row">
                                <div className="int-column ">
                                    <div className="int-headerSection1">
                                        <div className="int-titleSectionMessage">
                                            <h3 className="int-processMessage"> 
                                                The PMO is going to review your application.
                                                We'll let you know when it's done and you can 
                                                move forward.
                                            </h3>

                                            <h3 className="int-processMessage">
                                                Project <ProjectLink route = {`/sites/gsd/intake_process/intake_process_v3/ProjectIntake.aspx/project/${projId}/requirement-definition`}> {projId}  </ProjectLink> 
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                        </div>

                    </Fragment>
                )
            }
            
        
            // --------------------------------------
            // Render Message
            // --------------------------------------
            renderProjects() {
                
                return (
                        <FormBody>

                            {this.renderHeaderSection()}
                            <ProjectLink route = {"/sites/gsd/intake_process/intake_process_v3/ProjectIntake.aspx/add-project/requirement-definition"}>
                                <AppButton buttonText = {'Add Another Project'} buttonClass = {'continueButton'}></AppButton>
                            </ProjectLink>
                            
                        </FormBody>
                );

            }



            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderProcessEnded() {
                return (
                    <Fragment>
                        {this.renderNavigation()}
                        <div className="int-projectsContainer">
                            
                            <div className="int-formContainer int-shadow">

                                {this.renderformHeader()}
                                {this.renderProjects()}
                                
                                
                            </div>

                        </div>
                    </Fragment>
                )
            }
            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                return this.renderProcessEnded();
            }
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    ProcessEnded.propTypes = {
        props: PropTypes
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default ProcessEnded;