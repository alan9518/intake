/* ==========================================================================
** Nav Item Layout Component
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import {ProjectLink} from '../../components'
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const NavItem = (props) => {
        const { title, activeRoute, route, disabled } = props;
        // Set Active Route
        let activeClass = activeRoute === true ? 'int-active' : '';
        return (
            <li>
                <ProjectLink route = {route} disabled = {disabled}>
                    <div className={`int-navItem ${activeClass}`}>
                        <span >
                            {title}
                        </span>
                    </div>
                </ProjectLink>
            </li>
        );
    }


    
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    NavItem.propTypes = {
        props: PropTypes
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default NavItem;