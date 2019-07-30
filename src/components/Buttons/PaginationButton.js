/* ==========================================================================
** App Button Layuout Container
** 28/01/2019
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
    const PaginationButton = (props) => {
        const {buttonIcon, buttonClass, onClick,  } = props;
        // const disabledClass = !disbaledButton && '.int-disabledLink';
        return (
            <div className = {`int-${buttonClass}` } onClick = {onClick} >
                
                <i className = {buttonIcon}></i>
                
            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    PaginationButton.propTypes = {
        props: PropTypes
    };
    
// --------------------------------------
// Export Component
// --------------------------------------
    export default PaginationButton;