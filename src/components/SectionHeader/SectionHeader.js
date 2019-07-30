/* ==========================================================================
** Section Header Layout Component
** 30/01/2019
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
    const SectionHeader = (props) => {
        const {title, children} = props;
        return (
            <div className = "int-singleTitleContainer">
                <h3 className = "int-blueText int-sectionTitle"> {title}  </h3>
                {children && children}
            </div>
        )
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    SectionHeader.propTypes = {
        title: PropTypes.string
    };
// --------------------------------------
// Export Component
// --------------------------------------
export default SectionHeader;