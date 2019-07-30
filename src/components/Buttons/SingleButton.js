/* ==========================================================================
** Single Button
** 28/02/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';
    import './styles.css';

// --------------------------------------
// Create Functional Component
// --------------------------------------
    const SingleButton = (props) => {
        const {buttonText, buttonClass, onClick, disbaledButton } = props;
        const disabledClass = !disbaledButton && '.int-disabledLink';
        return (
            <button 
                onClick = {onClick} 
                className = "int-singleButton">
                {buttonText}
            </button>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    SingleButton.propTypes = {
        props: PropTypes
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default SingleButton;