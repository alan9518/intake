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
    const AppButton = (props) => {
        const {buttonText, buttonClass, onClick, disabled, buttonName } = props;
        const disabledClass = disabled === true ? 'int-disabledLink' : '';
        return (
            <div className = {`int-appButtonContainer int-${buttonClass} ${disabledClass}`} onClick = {onClick} >
                <span className = "int-buttonText" name = {buttonName} id = {buttonName}> {buttonText} {disabled && '(Only the PMO Can Edit)'} </span>
            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    AppButton.propTypes = {
        props: PropTypes
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default AppButton;