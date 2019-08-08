/* ==========================================================================
** Form Header
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
    const Header = (props) => {
        const {title} = props;
        return (
            <div className = "int-formHeaderContainer" >
                <h1 className="int-formHeaderTitle">
                    {title}
                </h1>
            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    Header.propTypes = {
        title: PropTypes.string
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default Header;