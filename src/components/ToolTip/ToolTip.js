/* ==========================================================================
** Custom ToolTip Component
** Using https://github.com/wwayne/react-tooltip
** 30/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    // import ReactTooltip from 'react-tooltip'
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import { faQuestionCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
    import PropTypes from 'prop-types';

// --------------------------------------
// Create Functional Component
// --------------------------------------
    const ToolTip = (props) => {
        const {tipText, isButton} = props;
        const openLightbox = tipText === 'Click me to Open Details' ? true : false
        return (
            
            
                openLightbox === true 
                ?
                <span data-tip = {tipText}  onClick = {(e) => { window.openDialog('https://flextronics365.sharepoint.com/sites/gsd/intake_process/intake_process_v3/itVectorTip.aspx', 'IT Vector Help') }} >
                    {isButton  === true ? <FontAwesomeIcon icon={faPlus}  /> : <FontAwesomeIcon icon={faQuestionCircle} />}
                </span>
                :
                <span data-tip = {tipText}   >
                    {isButton  === true ? <FontAwesomeIcon icon={faPlus}  /> : <FontAwesomeIcon icon={faQuestionCircle} />}
                </span>
            
              
        )
    }

// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    ToolTip.propTypes = {
        tipText: PropTypes.string
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default ToolTip;