/* ==========================================================================
** Form Footer Layout Container
** 28/01/2019 
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
    const FormFooter = (props) => {
        const {children} =  props;
        return (
            <div className = "int-formFooterContainer">
                {children}
            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    FormFooter.propTypes = {
        children: PropTypes.any
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default FormFooter;