/* ==========================================================================
** Error Boundary Component
** 09/05/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------

    import React, { Component, Fragment } from 'react';
    import { Header, FormBody, MessageErrorIE, AppButton, ProjectLink } from '../../components';
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Component Class
// --------------------------------------
class ErrorBoundary extends Component {

    /* ==========================================================================
    ** Component Setup
    ** ========================================================================== */


        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                hasError: false,
                error : null,
                errorInfo : null
            }
        }


        static getDerivedStateFromError(error) {
			console.log("TCL: ErrorBoundary -> staticgetDerivedStateFromError -> error", error)
            return { isLoaded: true, hasError: true , errorType : 'error on IE'}
        }

        // ?--------------------------------------
        // ? Catch Error
        // ?--------------------------------------

        componentDidCatch(error, errorInfo) {
            // Catch errors in any components below and re-render with error message
            this.setState({
                error: error,
                errorInfo: errorInfo
            })
            // You can also log error messages to an error reporting service here
        }
    /* ==========================================================================
    ** Render Methods
    ** ========================================================================== */

        // ?--------------------------------------
        // ? Render Error Message 
        // ?--------------------------------------
        renderErrorMesage(errorMessage) {

            if(errorMessage.indexOf('support') >= 0) 
                return <MessageErrorIE/>
            else
                return <h1>  Something went wrong, {errorMessage} </h1>
        }


        // --------------------------------------
        // Render Projects
        // --------------------------------------
        renderErrorBoundary() {
            if (this.state.errorInfo) {
                // Error path


                return(
                        <div className="int-projectsContainer">
                                
                                <div className="int-formContainer int-shadow">

                                    <Header title = {'An Error Ocurred'}/>
                                    <FormBody>
                                        <details style={{ whiteSpace: 'pre-wrap' , textAlign:'center' }}>
                                            {this.state.error && this.renderErrorMesage(this.state.error.toString())}
                                            
                                            
                                        </details>


                                        <ProjectLink route = {"/sites/gsd/intake_process/intake_process_v3/ProjectIntake.aspx"}>
                                            <AppButton buttonText = {'Go to Main Page'} buttonClass = {'continueButton'}></AppButton>
                                        </ProjectLink>



                                    </FormBody>

                                    
                                </div>

                        </div>
                )

                // return (
                //     <div>
                //         <h2>Something went wrong.</h2>
                //         <details style={{ whiteSpace: 'pre-wrap' }}>
                //             {this.state.error && this.renderErrorMesage(this.state.error.toString())}
                //             <br />
                //             {this.state.errorInfo.componentStack}
                //         </details>
                //     </div>
                // );
            }
            
            // Normally, just render children
            return this.props.children;
            
        }
        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            
            return this.renderErrorBoundary();
        }
}

// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    ErrorBoundary.propTypes = {
        chidlren: PropTypes.any
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default ErrorBoundary;