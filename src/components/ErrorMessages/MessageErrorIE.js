/* ==========================================================================
** Browser Incompatibility Error Message
** 09/05/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const MessageErrorIE = (props) => {
        return (
            <div className = 'int-errorContainer'>

                <div className="int-ieError int-titleSectionMessage">
                    

                    <h3 className = "int-processMessage">
                        This app uses features that are not supported by this browser
                        try to open this site on a different browser
                    </h3>
                </div>

            </div>
        )
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    MessageErrorIE.propTypes = {
        props: PropTypes
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default MessageErrorIE;

